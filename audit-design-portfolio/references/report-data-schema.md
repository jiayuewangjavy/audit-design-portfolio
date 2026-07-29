# Visual Report Data Contract

## Contents

- Purpose
- Required top-level fields
- Source views
- Findings and annotation coordinates
- Portfolio inventory
- JD requirements
- Actions and supporting sections
- Integrity constraints
- Build command

## Purpose

Use this JSON contract with `scripts/build_report.mjs` to create the default
self-contained HTML audit report. Keep the JSON beside the generated report
when the user may want a re-audit.

## Required top-level fields

```json
{
  "meta": {
    "candidate_name": "Candidate name or Portfolio owner",
    "target_role": "Senior Product Designer",
    "target_company": "Company name",
    "audit_date": "2026-07-28",
    "report_title": "Portfolio evidence review",
    "executive_summary": "Short evidence-based diagnosis.",
    "portfolio_quality": "Qualitative diagnosis, never a score.",
    "jd_fit": "Qualitative diagnosis, never a percentage.",
    "primary_strength": "Strongest observed signal.",
    "primary_risk": "Largest application risk.",
    "next_action": "Most valuable next action.",
    "annotation_mode": "Annotated artifact"
  },
  "sources": [],
  "findings": [],
  "inventory": [],
  "requirements": [],
  "actions": []
}
```

Optional top-level fields are `scope`, `projects`, `reviewer_lenses`,
`health_checks`, `candidate_questions`, and `limitations`.

## Source views

Create one source object for every screenshot or rendered PDF page shown in the
report:

```json
{
  "id": "home-desktop",
  "label": "Home page · desktop",
  "kind": "website",
  "location": "https://portfolio.example/",
  "image": "screenshots/home-desktop.png",
  "alt": "Desktop capture of the portfolio home page",
  "capture_context": "1440 × 1100 · public view",
  "project": "Portfolio-wide"
}
```

`image` must be a local PNG, JPEG, WEBP, GIF, or SVG path, or a data URI. The
builder embeds local images so the report remains portable and rejects remote
image URLs. Keep the live page URL in `location`.

## Findings and annotation coordinates

Use only the evidence grades defined by the skill. Coordinates are normalized
from `0` to `1` relative to the displayed source image.

```json
{
  "id": "HOME-01",
  "source_id": "home-desktop",
  "x": 0.68,
  "y": 0.21,
  "title": "Target role is difficult to identify",
  "scope": "Home page",
  "priority": "Must address",
  "grade": "Partial evidence",
  "location": "Hero heading and supporting line",
  "observation": "The heading describes values but does not name the role.",
  "why_it_matters": "The JD expects a product designer with systems scope.",
  "recommendation": "Add a factual role-and-scope line near the heading.",
  "example_structure": "[Role] working across [verified scope] for [real context].",
  "candidate_facts_needed": "Actual role, scope, and domain."
}
```

Omit `x` and `y` only when a visual location is genuinely unavailable. Every
pin must have one matching finding ID, and every pinned finding must reference
an existing source.

## Portfolio inventory

```json
{
  "title": "Checkout orchestration",
  "type": "Case study",
  "status": "Shipped",
  "candidate_role": "Product designer",
  "capabilities": ["Systems thinking", "Cross-functional delivery"],
  "jd_relevance": "High",
  "contribution": "Lead case",
  "access_status": "Inspected"
}
```

Include every submitted or reachable case study, including inaccessible items
marked `Not assessable`.

## JD requirements

```json
{
  "requirement": "Lead ambiguous, cross-functional product work",
  "importance": "Essential",
  "evidence": "Checkout orchestration case",
  "location": "Case 01 · Decision section",
  "grade": "Partial evidence",
  "interpretation": "Complexity is visible; personal decision authority is not.",
  "response": "Clarify which decision the candidate owned."
}
```

Do not add numeric weights, match percentages, or aggregate scores.

## Actions and supporting sections

Action object:

```json
{
  "priority": "Must address",
  "title": "Clarify role and scope above the fold",
  "reason": "Recruiters cannot quickly connect the portfolio to the JD.",
  "finding_ids": ["HOME-01"],
  "effort": "Small",
  "candidate_choice": true
}
```

`reviewer_lenses` may contain `recruiter`, `hiring_manager`, and `craft`.
`health_checks` may contain objects with `check`, `finding`, `location`, and
`status`. `projects` may contain project summaries and related finding IDs.

## Integrity constraints

- Never include a field named `score`, `match_percentage`, or `ranking`.
- Never invent candidate facts to fill empty values.
- Use `Not assessable` for evidence the agent could not inspect.
- Keep original source URLs and page numbers in `location` fields.
- Redact secrets and private access details before generating the report.
- Treat the HTML as a read-only critique artifact, not a modified portfolio.

## Build command

```text
node scripts/build_report.mjs report-data.json --output portfolio-audit-report.html
```

The output is a single self-contained HTML file. Open it in a browser or print
it to PDF. The script uses only built-in Node.js modules. If Node.js is
unavailable, use the files in `assets/report/` as the source for an equivalent
self-contained HTML report.
