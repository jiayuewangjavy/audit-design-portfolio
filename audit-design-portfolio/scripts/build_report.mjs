#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const EVIDENCE_GRADES = new Set([
  "Strong evidence",
  "Partial evidence",
  "Missing evidence",
  "Contradictory evidence",
  "Not assessable",
]);

const PRIORITIES = new Set([
  "Must address",
  "High-value improvement",
  "Quick win",
  "Optional refinement",
  "Do not prioritize for this JD",
]);

const FORBIDDEN_KEYS = new Set([
  "score",
  "match_percentage",
  "ranking",
  "overall_score",
]);

const GRADE_CLASSES = {
  "Strong evidence": "grade-strong",
  "Partial evidence": "grade-partial",
  "Missing evidence": "grade-missing",
  "Contradictory evidence": "grade-contradictory",
  "Not assessable": "grade-not-assessable",
};

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slug(value) {
  const normalized = String(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "section";
}

function humanList(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value == null ? "" : String(value);
}

function collectForbiddenKeys(value, currentPath = "root", errors = []) {
  if (Array.isArray(value)) {
    value.forEach((child, index) =>
      collectForbiddenKeys(child, `${currentPath}[${index}]`, errors)
    );
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => {
      if (FORBIDDEN_KEYS.has(key.trim().toLowerCase())) {
        errors.push(`${currentPath}.${key} is forbidden`);
      }
      collectForbiddenKeys(child, `${currentPath}.${key}`, errors);
    });
  }
  return errors;
}

function validate(data) {
  const errors = collectForbiddenKeys(data);
  if (!data.meta || typeof data.meta !== "object" || Array.isArray(data.meta)) {
    errors.push("meta must be an object");
  }
  if (!Array.isArray(data.sources)) errors.push("sources must be an array");
  if (!Array.isArray(data.findings)) errors.push("findings must be an array");

  const sources = Array.isArray(data.sources) ? data.sources : [];
  const findings = Array.isArray(data.findings) ? data.findings : [];
  const sourceIds = new Set(sources.map((source) => String(source.id ?? "")));
  const findingIds = new Set();

  findings.forEach((finding, index) => {
    if (!finding || typeof finding !== "object" || Array.isArray(finding)) {
      errors.push(`findings[${index}] must be an object`);
      return;
    }
    const id = String(finding.id ?? "").trim();
    if (!id) errors.push(`findings[${index}].id is required`);
    if (findingIds.has(id)) errors.push(`duplicate finding id: ${id}`);
    findingIds.add(id);

    if (!EVIDENCE_GRADES.has(finding.grade)) {
      errors.push(`${id || index}: invalid evidence grade ${JSON.stringify(finding.grade)}`);
    }
    if (finding.priority && !PRIORITIES.has(finding.priority)) {
      errors.push(`${id || index}: invalid priority ${JSON.stringify(finding.priority)}`);
    }

    const hasX = Object.hasOwn(finding, "x");
    const hasY = Object.hasOwn(finding, "y");
    if (hasX !== hasY) errors.push(`${id || index}: x and y must be supplied together`);
    if (hasX && hasY) {
      const x = Number(finding.x);
      const y = Number(finding.y);
      if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 1 || y < 0 || y > 1) {
        errors.push(`${id || index}: x and y must be between 0 and 1`);
      }
      if (!sourceIds.has(String(finding.source_id ?? ""))) {
        errors.push(`${id || index}: pinned finding needs a valid source_id`);
      }
    }
  });

  if (errors.length) {
    throw new Error(`Invalid report data:\n- ${errors.join("\n- ")}`);
  }
}

function embedImage(source, baseDir) {
  if (!source) return "";
  if (source.startsWith("data:")) return source;
  if (/^https?:\/\//.test(source)) {
    throw new Error(
      `Remote source images are not portable: ${source}. Capture or download the image first.`
    );
  }
  const imagePath = path.resolve(baseDir, source);
  if (!fs.existsSync(imagePath) || !fs.statSync(imagePath).isFile()) {
    throw new Error(`Source image not found: ${imagePath}`);
  }
  const mime = MIME_TYPES[path.extname(imagePath).toLowerCase()] ?? "application/octet-stream";
  return `data:${mime};base64,${fs.readFileSync(imagePath).toString("base64")}`;
}

function tagGrade(grade) {
  const className = GRADE_CLASSES[grade] ?? "grade-not-assessable";
  return `<span class="grade ${className}">${esc(grade)}</span>`;
}

function chapterHeading(number, title, description) {
  return `<header class="chapter-heading">
    <div><span class="chapter-kicker">Section ${esc(number)}</span></div>
    <div><h2>${esc(title)}</h2><p>${esc(description)}</p></div>
  </header>`;
}

function renderCover(meta) {
  const title = meta.report_title || "Portfolio evidence review";
  const candidate = meta.candidate_name || "Portfolio owner";
  const role = meta.target_role || "Target role";
  const company = meta.target_company || "Target company";
  const date = meta.audit_date || "Date not supplied";
  return `<header class="report-header">
    <div class="masthead">
      <span>Independent portfolio audit</span>
      <span>${esc(date)}</span>
    </div>
    <div class="cover-title">
      <h1><span class="cover-mark" aria-hidden="true"></span>${esc(title)}</h1>
      <p class="deck">${esc(candidate)} · Evidence review for ${esc(role)} at ${esc(company)}</p>
    </div>
    <div class="cover-footer">
      <span>No scores · Observable evidence only</span>
      <span>${esc(meta.annotation_mode || "Annotation mode not supplied")}</span>
    </div>
  </header>`;
}

function availableSections(data) {
  const sections = [
    ["diagnosis", "Executive diagnosis"],
    ["evidence", "Annotated evidence"],
    ["findings", "Detailed findings"],
    ["actions", "Action plan"],
  ];
  if (data.inventory?.length) sections.push(["inventory", "Portfolio inventory"]);
  if (data.requirements?.length) sections.push(["requirements", "JD evidence"]);
  if (data.reviewer_lenses) sections.push(["lenses", "Reviewer lenses"]);
  if (data.health_checks?.length) sections.push(["health", "Experience health"]);
  if (data.candidate_questions?.length || data.scope || data.limitations?.length) {
    sections.push(["notes", "Scope and questions"]);
  }
  return sections;
}

function renderNav(sections) {
  const links = sections
    .map(
      ([id, label], index) =>
        `<li><a href="#${esc(id)}"><span class="nav-number">${String(index + 1).padStart(2, "0")}</span><span>${esc(label)}</span></a></li>`
    )
    .join("");
  return `<nav class="report-nav" aria-label="Report contents">
    <div class="toc-label">Contents</div><ol>${links}</ol>
  </nav>`;
}

function renderDiagnosis(meta) {
  const facts = [
    ["Portfolio quality", meta.portfolio_quality],
    ["Fit for this JD", meta.jd_fit],
    ["Primary strength", meta.primary_strength],
    ["Primary risk", meta.primary_risk],
    ["Next action", meta.next_action],
  ]
    .map(
      ([label, value]) =>
        `<div><dt>${esc(label)}</dt><dd>${esc(value || "Not assessable")}</dd></div>`
    )
    .join("");
  return `<section class="chapter" id="diagnosis">
    ${chapterHeading("01", "Executive diagnosis", "The shortest useful reading of the complete portfolio against this role.")}
    <div class="opening-diagnosis">
      <blockquote>${esc(meta.executive_summary || "No executive diagnosis supplied.")}</blockquote>
      <dl class="diagnosis-facts">${facts}</dl>
    </div>
  </section>`;
}

function renderPlate(source, findings, baseDir) {
  const sourceId = String(source.id ?? "");
  const related = findings.filter(
    (finding) => String(finding.source_id ?? "") === sourceId
  );
  const pins = related
    .filter((finding) => Object.hasOwn(finding, "x") && Object.hasOwn(finding, "y"))
    .map((finding) => {
      const id = String(finding.id ?? "");
      return `<a class="annotation-pin" data-finding="${esc(id)}"
        href="#finding-${esc(slug(id))}"
        style="left:${(Number(finding.x) * 100).toFixed(3)}%;top:${(Number(finding.y) * 100).toFixed(3)}%;"
        aria-label="${esc(`${id}: ${finding.title || "Finding"}`)}">${esc(id)}</a>`;
    })
    .join("");

  const shortFindings =
    related
      .map((finding) => {
        const id = String(finding.id ?? "");
        return `<article class="plate-finding" data-finding="${esc(id)}" tabindex="0">
          <div class="finding-id">${esc(id)}</div>
          <div>
            <h3><a href="#finding-${esc(slug(id))}">${esc(finding.title)}</a></h3>
            <p>${esc(finding.observation)}</p>
            ${tagGrade(finding.grade)}
          </div>
        </article>`;
      })
      .join("") || '<p class="empty-note">No pinned findings for this view.</p>';

  const image = embedImage(String(source.image ?? ""), baseDir);
  const imageMarkup = image
    ? `<img src="${esc(image)}" alt="${esc(source.alt || source.label || "Portfolio capture")}">`
    : '<div class="empty-note">Visual capture unavailable for this source.</div>';

  return `<article class="evidence-plate" id="source-${esc(slug(sourceId))}">
    <div class="source-view">
      <div class="source-caption">
        <strong>${esc(source.label || sourceId)}</strong>
        <span class="source-meta">${esc(source.capture_context || source.kind || "Source view")}</span>
      </div>
      <div class="source-image">${imageMarkup}${pins}</div>
      <p class="source-meta">${esc(source.location || "Location not supplied")}</p>
    </div>
    <aside class="plate-findings" aria-label="${esc(`Findings for ${source.label || sourceId}`)}">
      <header><span class="eyebrow">Pinned observations</span></header>
      <div class="plate-findings-list">${shortFindings}</div>
    </aside>
  </article>`;
}

function renderEvidence(data, baseDir) {
  const plates =
    data.sources
      .map((source) => renderPlate(source, data.findings, baseDir))
      .join("") ||
    '<p class="empty-note">No visual sources were available. See exact locations in detailed findings.</p>';
  return `<section class="chapter" id="evidence">
    ${chapterHeading("02", "Annotated evidence", "Captured copies of the portfolio with stable IDs linked to complete findings.")}
    ${plates}
  </section>`;
}

function detailRow(label, value) {
  if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
    return "";
  }
  return `<div><dt>${esc(label)}</dt><dd>${esc(humanList(value))}</dd></div>`;
}

function renderFindings(findings) {
  const filters = [
    ["all", "All findings"],
    ["Must address", "Must address"],
    ["High-value improvement", "High value"],
    ["Quick win", "Quick wins"],
    ["Optional refinement", "Optional"],
  ];
  const buttons = filters
    .map(
      ([value, label]) =>
        `<button class="control-button" type="button" data-filter="${esc(value)}" aria-pressed="${value === "all"}">${esc(label)}</button>`
    )
    .join("");

  const content =
    findings
      .map((finding) => {
        const id = String(finding.id ?? "");
        const priority = finding.priority || "Optional refinement";
        const rows = [
          detailRow("Location", finding.location),
          detailRow("Observation", finding.observation),
          detailRow("Why it matters", finding.why_it_matters),
          detailRow("Recommended response", finding.recommendation),
          detailRow("Example structure", finding.example_structure),
          detailRow("Candidate must supply", finding.candidate_facts_needed),
        ].join("");
        return `<article class="finding-detail" id="finding-${esc(slug(id))}" data-priority="${esc(priority)}">
          <div>
            <div class="finding-id">${esc(id)}</div>
            ${tagGrade(finding.grade)}
            <div class="priority">${esc(priority)}</div>
          </div>
          <div class="finding-content"><h3>${esc(finding.title)}</h3><dl>${rows}</dl></div>
        </article>`;
      })
      .join("") || '<p class="empty-note">No findings supplied.</p>';

  return `<section class="chapter" id="findings">
    ${chapterHeading("03", "Detailed findings", "Observation first, interpretation second, and a candidate-controlled response.")}
    <div class="report-controls" aria-label="Filter findings">${buttons}</div>
    ${content}
  </section>`;
}

function renderActions(actions = []) {
  const content =
    actions
      .map((action) => {
        const findingIds = humanList(action.finding_ids) || "No linked finding ID";
        const choice =
          action.candidate_choice === false
            ? "Required for report integrity"
            : "Candidate decides whether to change";
        return `<article class="action">
          <div><h3>${esc(action.title)}</h3><p>${esc(action.reason)}</p></div>
          <div class="action-meta">
            <div><strong>Priority</strong>${esc(action.priority || "Not supplied")}</div>
            <div><strong>Effort</strong>${esc(action.effort || "Not estimated")}</div>
            <div><strong>Trace</strong>${esc(findingIds)}</div>
            <div><strong>Choice</strong>${esc(choice)}</div>
          </div>
        </article>`;
      })
      .join("") || '<p class="empty-note">No action plan supplied.</p>';
  return `<section class="chapter" id="actions">
    ${chapterHeading("04", "Prioritized action plan", "Evidence gaps first; cosmetic refinement only where it changes the hiring signal.")}
    <div class="action-list">${content}</div>
  </section>`;
}

function renderTable(id, number, title, description, columns, rows = []) {
  const heads = columns
    .map(([, label]) => `<th scope="col">${esc(label)}</th>`)
    .join("");
  const body =
    rows
      .map((row) => {
        const cells = columns
          .map(([key]) => {
            if (key === "grade" && row[key]) return `<td>${tagGrade(row[key])}</td>`;
            return `<td>${esc(humanList(row[key]) || "—")}</td>`;
          })
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("") || `<tr><td colspan="${columns.length}">No data supplied.</td></tr>`;
  return `<section class="chapter" id="${esc(id)}">
    ${chapterHeading(number, title, description)}
    <div class="table-wrap"><table><thead><tr>${heads}</tr></thead><tbody>${body}</tbody></table></div>
  </section>`;
}

function renderLenses(lenses, number) {
  const items = [
    ["Recruiter", lenses.recruiter],
    ["Hiring manager", lenses.hiring_manager],
    ["Craft", lenses.craft],
  ]
    .map(
      ([label, value]) =>
        `<article class="lens"><h3>${esc(label)}</h3><p>${esc(value || "Not assessable")}</p></article>`
    )
    .join("");
  return `<section class="chapter" id="lenses">
    ${chapterHeading(number, "Three reviewer lenses", "Where initial screening, decision authority, and role-specific craft agree or diverge.")}
    <div class="lens-grid">${items}</div>
  </section>`;
}

function renderNotes(data, number) {
  const scope = data.scope || {};
  const rows = [
    detailRow("Materials inspected", scope.materials_inspected),
    detailRow("Materials unavailable", scope.materials_unavailable),
    detailRow("Role lens", scope.role_lens),
    detailRow("Candidate context", scope.candidate_context),
    detailRow("Limitations", data.limitations),
    detailRow("Questions that could change the audit", data.candidate_questions),
  ].join("");
  return `<section class="chapter" id="notes">
    ${chapterHeading(number, "Scope and candidate questions", "What was inspected, what remains unknown, and which answers could materially change the review.")}
    <div class="finding-content"><dl>${rows}</dl></div>
  </section>`;
}

function renderFooter(meta) {
  return `<footer class="report-footer">
    <div class="report-footer-inner">
      <div>
        <span class="eyebrow">Read-only audit</span>
        <p>This report annotates captured or rendered copies. It does not modify the original portfolio, invent candidate evidence, or decide whether the candidate should make a change.</p>
      </div>
      <div>
        <span class="eyebrow">Prepared for</span>
        <p>${esc(meta.candidate_name || "Portfolio owner")} · ${esc(meta.target_role || "Target role")} · ${esc(meta.audit_date || "Date not supplied")}</p>
      </div>
    </div>
  </footer>`;
}

function renderBody(data, baseDir) {
  const meta = data.meta || {};
  const sections = availableSections(data);
  let number = 5;
  const bodySections = [
    renderDiagnosis(meta),
    renderEvidence(data, baseDir),
    renderFindings(data.findings),
    renderActions(data.actions),
  ];

  if (data.inventory?.length) {
    bodySections.push(
      renderTable(
        "inventory",
        String(number++).padStart(2, "0"),
        "Complete portfolio inventory",
        "Every submitted or reachable project and the role it plays in the collection.",
        [
          ["title", "Item"],
          ["type", "Type"],
          ["candidate_role", "Candidate role"],
          ["capabilities", "Capabilities shown"],
          ["jd_relevance", "JD relevance"],
          ["contribution", "Positioning role"],
          ["access_status", "Access"],
        ],
        data.inventory
      )
    );
  }

  if (data.requirements?.length) {
    bodySections.push(
      renderTable(
        "requirements",
        String(number++).padStart(2, "0"),
        "JD-to-evidence review",
        "Material job requirements mapped to observable portfolio evidence without a match score.",
        [
          ["requirement", "Requirement"],
          ["importance", "Importance"],
          ["evidence", "Evidence found"],
          ["location", "Location"],
          ["grade", "Evidence grade"],
          ["interpretation", "Interpretation"],
          ["response", "Recommended response"],
        ],
        data.requirements
      )
    );
  }

  if (data.reviewer_lenses) {
    bodySections.push(renderLenses(data.reviewer_lenses, String(number++).padStart(2, "0")));
  }

  if (data.health_checks?.length) {
    bodySections.push(
      renderTable(
        "health",
        String(number++).padStart(2, "0"),
        "Portfolio experience and health",
        "Observed access, navigation, legibility, responsive, and technical conditions.",
        [
          ["check", "Check"],
          ["finding", "Finding"],
          ["location", "Location"],
          ["status", "Status"],
        ],
        data.health_checks
      )
    );
  }

  if (data.candidate_questions?.length || data.scope || data.limitations?.length) {
    bodySections.push(renderNotes(data, String(number).padStart(2, "0")));
  }

  return (
    renderCover(meta) +
    `<div class="report-layout">${renderNav(sections)}<main class="report-main" id="report-main">` +
    bodySections.join("") +
    `</main></div>${renderFooter(meta)}`
  );
}

function readAsset(assetDir, filename) {
  const assetPath = path.join(assetDir, filename);
  if (!fs.existsSync(assetPath)) throw new Error(`Missing report asset: ${assetPath}`);
  return fs.readFileSync(assetPath, "utf8");
}

function buildReport(dataPath, outputPath) {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Report data root must be a JSON object");
  }
  validate(data);

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const assetDir = path.join(scriptDir, "..", "assets", "report");
  const meta = data.meta || {};
  const replacements = {
    "{{LANG}}": esc(meta.language || "en"),
    "{{DESCRIPTION}}": esc(meta.executive_summary || "Portfolio audit report"),
    "{{TITLE}}": esc(meta.report_title || "Portfolio evidence review"),
    "{{STYLES}}": readAsset(assetDir, "report.css"),
    "{{BODY}}": renderBody(data, path.dirname(dataPath)),
    "{{DATA}}": JSON.stringify(data).replaceAll("<", "\\u003c"),
    "{{SCRIPT}}": readAsset(assetDir, "report.js"),
  };

  let result = readAsset(assetDir, "report-shell.html");
  Object.entries(replacements).forEach(([token, value]) => {
    result = result.replace(token, value);
  });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result, "utf8");
}

function parseArgs(argv) {
  if (!argv.length || argv.includes("--help") || argv.includes("-h")) {
    console.log("Usage: node scripts/build_report.mjs report-data.json --output portfolio-audit-report.html");
    process.exit(argv.length ? 0 : 1);
  }
  const dataPath = path.resolve(argv[0]);
  const outputFlag = Math.max(argv.indexOf("--output"), argv.indexOf("-o"));
  const outputPath =
    outputFlag >= 0 && argv[outputFlag + 1]
      ? path.resolve(argv[outputFlag + 1])
      : path.resolve("portfolio-audit-report.html");
  return { dataPath, outputPath };
}

try {
  const { dataPath, outputPath } = parseArgs(process.argv.slice(2));
  buildReport(dataPath, outputPath);
  console.log(`Report written to ${outputPath}`);
} catch (error) {
  console.error(`Report build failed: ${error.message}`);
  process.exit(1);
}
