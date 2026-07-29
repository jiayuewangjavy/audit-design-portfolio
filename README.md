# Audit Design Portfolio

An evidence-based Agent Skill for auditing a complete design portfolio against
a target job description.

The skill reviews the portfolio as a body of work, inventories every submitted
or reachable case study, and then evaluates both overall positioning and
project-level evidence. It supports:

- UI/UX Designers
- Product Designers
- UX and Product Researchers
- Content Designers and UX Writers
- UX Engineers
- Design Engineers

## What it produces

- A complete portfolio inventory and cross-case synthesis
- A JD capability model
- Recruiter, hiring-manager, and craft perspectives
- A JD-to-evidence matrix without scores or match percentages
- Project-by-project findings
- A standalone, self-contained visual HTML report
- Website screenshot and rendered-PDF annotations with linked finding IDs
- Prioritized recommendations and concrete example structures
- A re-audit workflow for reviewing candidate-made revisions

The skill is read-only. It does not modify the submitted portfolio, overwrite
PDFs, edit live websites, or invent candidate metrics, ownership, research, or
outcomes.

## Install

Copy the complete [`audit-design-portfolio`](audit-design-portfolio) directory
to a skills directory supported by your agent.

### Codex

Install as a personal skill:

```text
~/.codex/skills/audit-design-portfolio/
```

### Claude Code

Install as a personal skill:

```text
~/.claude/skills/audit-design-portfolio/
```

Or as a project skill:

```text
.claude/skills/audit-design-portfolio/
```

See the [Claude Code skills documentation](https://code.claude.com/docs/en/slash-commands).

### GitHub Copilot

Install as a personal skill:

```text
~/.copilot/skills/audit-design-portfolio/
```

Or as a project skill:

```text
.github/skills/audit-design-portfolio/
```

GitHub Copilot also discovers compatible skills from `.agents/skills/` and
`.claude/skills/`. See the
[GitHub Copilot Agent Skills documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).

## Use

Provide both a target job description and a portfolio:

```text
Use $audit-design-portfolio to audit my complete portfolio against this job
description.

JD: [paste, attach, or link the job description]
Portfolio: [attach a PDF or provide the portfolio URL]

Review every submitted or reachable case study. Annotate copies of the
portfolio and deliver a standalone visual HTML report. Keep the chat response
to a short summary and do not modify the original.
```

### Full audit prompt template

Attach the JD and portfolio files, or replace the placeholders with accessible
links, then copy this prompt into your agent:

```text
Use $audit-design-portfolio to audit my complete portfolio and evaluate how
well its observable evidence supports the target job description.

Target job description:
[Paste the JD, attach the JD file, or provide an accessible URL]

Portfolio:
[Attach the portfolio PDF or provide the portfolio website URL]

Candidate context:
- Target role: [e.g. Senior Product Designer]
- Career stage: [e.g. experienced job seeker, career changer, or student]
- Target market or location: [optional]
- Questions I most want answered: [optional]

Audit requirements:

1. Review the complete portfolio, including every submitted or reachable case
   study. Do not evaluate only the home page or one representative project.
2. Create a complete portfolio inventory before judging individual projects.
   Explain what the collection communicates as a body of work, including
   repeated strengths, evidence gaps, contradictions, and positioning risks.
3. Translate the JD into observable hiring requirements and map each material
   requirement to evidence in the portfolio.
4. Use only Strong, Partial, Missing, Conflict, and N/A evidence grades. Do not
   produce an overall score, percentage match, rank, or benchmark.
5. Capture relevant website views or render relevant PDF pages. Place numbered
   annotations on those captured copies and link each annotation to its
   detailed finding.
6. For every material finding, include:
   - Exact location
   - Observable evidence
   - Why it matters for this JD
   - Evidence grade
   - A concrete recommendation
   - An example structure when useful
   - Any facts the candidate must verify or supply
7. Review the portfolio from three distinct perspectives:
   - Recruiter
   - Hiring manager
   - Role-specific craft reviewer
8. Do not modify the original portfolio, website, PDF, source files, or copy.
   Do not invent metrics, outcomes, research, responsibilities, ownership, or
   decision-making evidence.
9. Generate a standalone, self-contained, interactive HTML report as the
   primary deliverable. Include the complete inventory, annotated evidence,
   detailed findings, JD-to-evidence review, reviewer lenses, and prioritized
   action plan.
10. Keep the chat response to no more than five summary bullets and provide a
    link to the HTML report.
11. If a website page cannot be accessed, a PDF cannot be rendered, or visual
    captures cannot be created, ask me for screenshots or an accessible export
    before completing the audit. Do not silently replace the visual report with
    a chat-only review.

Begin the audit.
```

For a password-protected portfolio, add:

```text
This portfolio requires authorized access. Tell me how to provide access
securely. Do not include credentials or passwords in the final report.
```

The default delivery is:

1. `portfolio-audit-report.html` with embedded captures and clickable pins
2. `report-data.json` for traceability and future re-audits
3. A short chat summary linking to the report

If the host cannot capture a website or render a PDF, the agent requests
screenshots or an export instead of silently replacing the visual report with
chat text.

## Skill structure

```text
audit-design-portfolio/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   └── report/
│       ├── report-shell.html
│       ├── report.css
│       └── report.js
├── scripts/
│   └── build_report.mjs
└── references/
    ├── audit-framework.md
    ├── report-data-schema.md
    ├── report-template.md
    ├── research-basis.md
    ├── role-lenses.md
    └── visual-annotations.md
```

The core `SKILL.md` follows the open Agent Skills format. Detailed criteria are
loaded from references only when needed.

## Research basis

The framework draws transferable patterns from public portfolio-audit products,
human review services, and hiring-team guidance. The sources and the decisions
to adopt, modify, or reject particular patterns are recorded in
[`research-basis.md`](audit-design-portfolio/references/research-basis.md).

## License

MIT — see [LICENSE](LICENSE).
