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
- Annotated screenshots or PDF copies when the host supports visual markup
- Exact location-based findings when visual markup is unavailable
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
portfolio where supported, and do not modify the original.
```

The agent will use the richest supported delivery mode:

1. Annotated screenshots or PDF copies plus a finding index
2. Unmodified visual references plus numbered textual callouts
3. URL, page, section, or quoted-text locations plus a finding index

## Skill structure

```text
audit-design-portfolio/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── audit-framework.md
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
