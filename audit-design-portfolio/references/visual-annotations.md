# Visual Annotation Protocol

## Contents

- Purpose
- Source handling
- Coverage
- Stable IDs
- Callout content
- Website annotations
- PDF annotations
- Accessible presentation
- Degraded modes

## Purpose

Use visual annotations to connect a material finding to an exact visible location. Treat annotations as a delivery format, not a scoring system.

Always pair visual callouts with a text finding index. The image should make the location obvious; the report should contain the reasoning and recommendation.

## Source handling

- Never modify a live website.
- Never overwrite the user's original PDF, image, slide deck, or source file.
- Create screenshots, rendered pages, or duplicate working copies for annotation.
- Avoid exposing passwords, credentials, hidden URLs, or confidential data in exported annotation files.
- If the artifact is highly sensitive, ask before creating persistent annotated files.
- State which files are copies and which are originals.

## Coverage

Annotate:

- Portfolio-level surfaces such as home, work index, navigation, about, and contact
- Every case study with material visual, structural, or content findings
- PDF pages containing material findings
- Representative mobile and desktop views when responsive review is available

Do not add callouts merely to decorate every page. A page with no material issue may remain unmarked and still appear in the complete portfolio inventory.

## Stable IDs

Use:

- `PW-01`: portfolio-wide pattern
- `HOME-01`: home or landing page
- `NAV-01`: navigation or access
- `CASE-<number>-01`: case-study finding
- `PDF-<page>-01`: PDF-page finding
- `TECH-01`: technical or accessibility finding

Keep IDs stable across the annotation pack, report, and later re-audit.

## Callout content

Keep text drawn on the artifact short:

```text
CASE-2-03
Ownership is unclear
```

Put the full explanation in the finding index:

```text
ID:
Artifact and location:
Observation:
Evidence grade:
Why it matters for the JD:
Recommended change:
Concrete example or structure:
Candidate facts needed:
```

## Website annotations

When browser and screenshot tools are available:

1. Crawl the portfolio's intended navigation and build the complete inventory.
2. Capture each surface with a material finding.
3. Capture representative desktop and mobile views when responsive behavior is in scope.
4. Mark screenshot copies, not the live DOM or website source.
5. Preserve page URL, viewport, and capture context in the finding index.
6. Use multiple screenshots for long pages rather than shrinking the full page until unreadable.

When interaction itself is the issue, describe the interaction path and supplement the still image with a short sequence of screenshots if possible.

## PDF annotations

When PDF rendering and annotation tools are available:

1. Preserve the original PDF.
2. Render or duplicate only the pages needed for visual callouts.
3. Retain original page numbers in filenames and callout IDs.
4. Produce an annotated copy or annotated page images.
5. Do not flatten or destroy the only copy of the document.
6. Include unmarked pages in the inventory even when they need no annotation.

## Accessible presentation

- Use labels, numbering, and shapes rather than color alone.
- Keep callouts outside important content when possible.
- Use sufficient contrast and readable text size.
- Provide a text alternative for every annotation.
- Avoid covering the content being discussed.

## Degraded modes

Use the best supported mode:

1. `Annotated artifact`: marked-up screenshots or PDF copy plus finding index.
2. `Visual reference`: unmodified screenshot or rendered page plus numbered textual regions and finding index.
3. `Location-only`: URL, page, section, heading, or quoted text plus finding index.

State which mode was used and which richer modes were unavailable.
