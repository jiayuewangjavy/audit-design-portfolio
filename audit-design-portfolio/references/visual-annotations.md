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
- Capability recovery
- Accepted degraded mode

## Purpose

Use visual annotations to connect a material finding to an exact visible location. Treat annotations as a required report layer, not a scoring system or an optional decoration.

Always pair visual callouts with a text finding index inside the standalone HTML report. The image should make the location obvious; the linked finding should contain the reasoning and recommendation.

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

Use one readable source view for multiple findings on the same surface. Do not
capture redundant viewport, full-page, desktop, and mobile variants by
default. Capture mobile only for an observed responsive issue, an explicit
responsive audit, or a user request. Stop collecting views once every material
finding has a readable visual source.

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
4. Place numbered HTML overlay pins over screenshot copies inside the report; do not modify the live DOM or website source.
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

## Capability recovery

If the host can inspect but cannot capture:

1. Ask the user for screenshots or a PDF export.
2. Continue the non-visual analysis while waiting only when that work remains useful.
3. Do not complete the audit as a chat-only report.

If the host can capture but cannot edit image pixels, use HTML overlay pins.
Pixel-level image markup is not required.

If the host cannot create files, ask for a writable workspace. Do not describe
the chat transcript as a visual report.

## Accepted degraded mode

Use `Location-only` only when the user explicitly agrees after being told that
visual capture or rendering is unavailable. In that case:

- Still create the standalone HTML report.
- Show the exact URL, PDF page, section, heading, or quoted text.
- State `Visual capture unavailable in this host` in the report scope.
- Preserve stable IDs so screenshots can be added during a later re-audit.
