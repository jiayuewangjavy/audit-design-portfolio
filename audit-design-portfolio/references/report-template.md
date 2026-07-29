# Visual Portfolio Audit Report Specification

## Contents

- Delivery contract
- Visual direction
- Report sequence
- Cover
- Executive diagnosis
- Annotated evidence
- Detailed findings
- Prioritized action plan
- Complete portfolio inventory
- JD-to-evidence review
- Reviewer lenses
- Experience and health
- Scope and candidate questions
- Chat handoff

## Delivery contract

Create a self-contained `portfolio-audit-report.html` as the primary
deliverable. Build it from `report-data.json` with
`scripts/build_report.mjs`. Keep the full audit out of the chat response.

The report must:

- Open locally without a server or build step
- Embed local screenshot and rendered-page assets
- Remain useful when printed to PDF
- Work with keyboard navigation and browser zoom
- Link every visual pin to one detailed finding
- Cover the complete submitted portfolio
- Preserve evidence grades without scores or percentages
- Keep recommendations candidate-controlled

## Visual direction

Use a restrained, Fluent 2-inspired review workspace. Optimize for focus,
scanability, and long-form reading rather than visual spectacle.

- Use quiet neutral surfaces with one restrained blue brand color
- Use Segoe UI or the native platform sans-serif stack
- Keep the cover compact; the report should begin above the fold
- Use a clear type ramp, sentence case, and left alignment
- Use thin strokes to group related information
- Reserve low elevation and soft shadow for sticky or raised surfaces
- Keep source captures and critique in the same visual field
- Use stable numbered markers rather than decorative charts
- Use semantic color only when it communicates evidence state
- Display evidence badges as `Strong`, `Partial`, `Missing`, `Conflict`, or
  `N/A`; keep the canonical evidence grade in the report data and accessible
  label
- Show a compact evidence key after the executive diagnosis in every report.
  Explain that grades evaluate observable portfolio evidence, not the
  candidate's underlying ability.

Avoid editorial-poster styling, oversized serif headlines, ornamental
backgrounds, repeated nested cards, glass effects, gradients, giant metrics,
score gauges, traffic-light summaries, and chat transcript styling.

## Report sequence

Use this default reading order:

1. Cover
2. Executive diagnosis
3. Annotated evidence
4. Detailed findings
5. Prioritized action plan
6. Complete portfolio inventory
7. JD-to-evidence review
8. Reviewer lenses
9. Portfolio experience and health
10. Scope, limitations, and candidate questions

Adapt optional sections to the evidence, but do not remove the annotated
evidence, detailed findings, action plan, inventory, or JD review.

## Cover

Show:

- Report title
- Candidate or portfolio owner
- Target role and company
- Audit date
- Annotation mode
- The statement `No scores · Observable evidence only`

Keep the cover compact and left aligned. Do not place fake metrics,
decorative charts, or large ornamental graphics on it.

## Executive diagnosis

Write one concise thesis and separate:

- Portfolio quality
- Fit for this JD
- Primary strength
- Primary application risk
- Most valuable next action

Keep portfolio quality and job alignment distinct.

## Annotated evidence

Create one evidence plate per captured website view or rendered PDF page.
Each plate contains:

- Readable source capture
- Source URL or PDF page number
- Viewport or render context
- Numbered overlay pins
- Adjacent short finding index

Clicking a pin or short finding must lead to the matching detailed finding.
Use multiple plates for long pages. Do not shrink a full page until its text is
unreadable.

## Detailed findings

For every material finding include:

- Stable ID
- Evidence grade
- Priority
- Exact location
- Observation
- Why it matters for the JD
- Recommended response
- Concrete example structure when useful
- Candidate facts that must be verified or supplied

State the observation before interpretation. Never provide invented final
portfolio copy.

## Prioritized action plan

Group actions with:

- Priority
- Reason
- Effort estimate when useful
- Linked finding IDs
- A reminder that the candidate decides whether to make the change

Use `Must address`, `High-value improvement`, `Quick win`,
`Optional refinement`, and `Do not prioritize for this JD`.

## Complete portfolio inventory

List every submitted or reachable portfolio surface and case study. Include:

- Item and type
- Candidate role
- Capabilities shown
- JD relevance
- Contribution to the overall positioning
- Access status

List inaccessible material as `Not assessable`; do not omit it.

## JD-to-evidence review

For each material requirement show:

- Importance
- Evidence found
- Exact location
- Evidence grade
- Interpretation and hiring risk
- Recommended response

Use only `Strong evidence`, `Partial evidence`, `Missing evidence`,
`Contradictory evidence`, and `Not assessable`.

## Reviewer lenses

Keep three distinct readings:

- Recruiter: role clarity, relevance, scanability, access, and credibility
- Hiring manager: ownership, judgment, complexity, collaboration, and outcomes
- Craft: discipline-specific quality from the selected role lens

State disagreements between lenses instead of repeating the same observation.

## Experience and health

Record navigation, responsive behavior, legibility, broken assets, loading,
semantic structure, accessibility observations, password friction, contact
information, and PDF presentation quality when inspected. Use `Observed`,
`Issue`, or `Not assessed`.

## Scope and candidate questions

Close with:

- Materials inspected
- Materials unavailable
- Role lens and candidate context
- Tool, NDA, or access limitations
- Only the questions that could materially change the audit

## Chat handoff

After verifying the HTML, return no more than five diagnosis bullets, a link to
the HTML report, unavailable material, and an optional link to the JSON used
for re-audit. Do not duplicate the complete report in chat.
