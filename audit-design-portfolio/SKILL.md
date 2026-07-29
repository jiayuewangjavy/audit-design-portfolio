---
name: audit-design-portfolio
description: Audit a UI/UX, product design, UX research, content design, UX engineering, or design engineering portfolio against a target job description. Use when a job seeker or student provides a portfolio website, PDF, screenshots, case studies, or work samples together with a JD and wants an evidence-based portfolio review, job-fit analysis, recruiter and hiring-manager perspectives, concrete improvement examples, or a follow-up re-audit. Produce findings and suggestions only; never edit the portfolio or invent candidate evidence.
---

# Audit Design Portfolio

Audit a candidate's portfolio against a specific job description. Base every judgment on observable evidence, distinguish portfolio quality from job alignment, and give concrete but non-destructive recommendations.

## Operating contract

- Treat the job description as the target, not as unquestionable truth.
- Treat the portfolio as evidence, not as proof of every claimed skill.
- Keep the audit read-only. Do not edit the website, PDF, source files, or copy.
- Do not assign an overall score, percentage match, rank, or benchmark.
- Do not invent metrics, research, shipped outcomes, responsibilities, constraints, or leadership.
- Give concrete example structures with explicit placeholders for facts only the candidate can supply.
- Audit the portfolio as a complete body of work. Inventory every submitted or reachable case study and assess what the collection communicates together.
- Do not silently select one representative case and treat it as the whole portfolio.
- Match the language of the user's request unless the user asks for another language.
- State what could not be inspected and label it `Not assessable`.

## Inputs

Require both:

1. A target job description as text, URL, PDF, image, or attachment.
2. A portfolio as a public or password-accessible website, PDF, screenshots, case studies, work samples, or equivalent artifact.

Request missing required inputs before issuing an audit. Accept an incomplete artifact when the user explicitly asks for a partial audit, but label the scope.

Use these optional inputs when available:

- Target role and level
- Student, career changer, or experienced-job-seeker context
- Target market or location
- Resume
- One to three questions the candidate most wants answered
- NDA, confidentiality, or disclosure constraints
- A previous audit for re-audit mode

Never require optional inputs when a useful audit is still possible.

## Capability detection

Use whatever read-only tools the host agent provides.

- For a website, inspect reachable pages, navigation, responsive behavior, and technical health when browser or diagnostic tools are available.
- For a PDF, inspect text and rendered pages when document or vision tools are available.
- For screenshots, distinguish visible evidence from content that may exist outside the captured area.
- When screenshot, image-markup, or PDF-annotation tools are available, create annotated copies with numbered callouts. Never write to the live website or overwrite the submitted PDF.
- When the host can view but not annotate an artifact, return numbered findings mapped to exact pages, headings, screenshots, or visible regions.
- When the host cannot open a URL or render a PDF, ask for an accessible export or screenshots. Continue with available content and label the visual review limitation.
- When a capability is unavailable, continue with accessible material and record the limitation. Never imply that a check ran when it did not.
- Do not bypass access controls. If a portfolio is password protected, ask the user to provide an authorized access method or a PDF backup.

## Required references

Read [audit-framework.md](references/audit-framework.md) for the evidence system, review passes, reviewer lenses, audit dimensions, health checks, prioritization, and integrity rules.

After identifying the target discipline, read the corresponding sections of [role-lenses.md](references/role-lenses.md). Apply only relevant role criteria; do not judge every candidate as a generalist product designer.

Read [report-template.md](references/report-template.md) before writing the final audit. Follow its structure while adapting depth to the available evidence.

Use [research-basis.md](references/research-basis.md) when explaining why a criterion exists, maintaining the skill, or tracing the market and hiring guidance behind the framework. Do not burden a normal audit with external citations unless the user asks for them.

## Workflow

### 1. Establish scope

Record:

- Target role and inferred level
- Candidate context
- Materials inspected
- Materials unavailable
- User's focus questions
- Access, NDA, or tool limitations

If role or level is inferred rather than explicit, label the inference and let the user correct it.

### 2. Model the job

Translate the JD into observable requirements rather than matching keywords.

For each material requirement:

- Preserve the original or faithfully paraphrased requirement.
- Classify it as `Essential`, `Emphasized`, or `Supporting`.
- Identify what credible portfolio evidence would look like for this discipline and level.
- Separate hard skills, collaboration, scope, leadership, domain context, and outcomes.
- Flag vague, inflated, internally inconsistent, or unobservable requirements.

Do not infer that a repeated keyword is automatically more important than the responsibilities and outcomes described by the role.

### 3. Inventory the complete portfolio

Before detailed judgment, map the whole submitted portfolio:

- Home, work index, about, contact, resume, experiments, and other primary sections
- Every submitted or reachable case study
- Project title, type, domain, date, status, candidate role, and apparent relevance to the JD
- Repeated capabilities, duplicated project stories, missing capability coverage, and contradictions
- Which projects lead, support, dilute, or conflict with the target positioning

Open every case study reachable through the portfolio's intended navigation when access and tool limits permit. Do not audit only the first or strongest case. If the portfolio is too large to inspect in one run, disclose the size and use a staged audit only with the user's agreement.

Return a portfolio inventory and coverage map before project-level findings.

### 4. Run the fast-screen pass

Simulate a time-constrained first review. Determine whether a recruiter or hiring manager can quickly understand:

- Who the candidate is
- Which role they are targeting
- Their strongest relevant capabilities
- The kind and complexity of work shown
- Their personal ownership
- Whether projects appear relevant to the JD
- How to reach them
- Whether access, navigation, legibility, or trust issues create early friction

Report the likely first-screen takeaway and the largest early-screen risks. Do not claim a universal number of seconds.

### 5. Run the deep-review pass

Inspect the overall portfolio and every submitted or reachable case study. Evaluate each case's quality, JD relevance, role in the collection, and contribution to the candidate's overall positioning. Apply only dimensions relevant to the artifact, framework, and role lens.

For every material finding:

- Cite the exact page, PDF page, project, section, heading, screenshot, or visible element.
- State the observation before the interpretation.
- Explain why it matters for this JD.
- Assign an evidence grade.
- Describe the hiring risk or opportunity.
- Give a concrete recommendation and, when useful, an example structure.

Do not repeat identical feedback for every case. Record a portfolio-wide pattern once, then cite every case that demonstrates it and note meaningful exceptions.

### 6. Produce the visual annotation pack

When the host supports visual output:

- Capture or render the relevant website views and PDF pages.
- Preserve an unmodified source copy.
- Add numbered callouts to copies only.
- Map every callout ID to a finding with observation, evidence grade, JD relevance, risk, and recommendation.
- Use labels and shapes in addition to color so annotations remain accessible.
- Include both local issues and portfolio-wide pattern references.

When direct visual annotation is unavailable, produce the same callout index as text with exact locations. State `Visual overlay not available in this host`.

Follow [visual-annotations.md](references/visual-annotations.md) for source preservation, coverage, callout IDs, accessibility, and degraded modes.

### 7. Build the JD-to-evidence matrix

Use only these grades:

- `Strong evidence`
- `Partial evidence`
- `Missing evidence`
- `Contradictory evidence`
- `Not assessable`

Do not collapse the matrix into a score. A polished but irrelevant portfolio and a relevant but poorly communicated portfolio are different diagnoses.

### 8. Apply three reviewer lenses

Provide distinct observations from:

- `Recruiter lens`: role clarity, relevance, scanability, access, basic credibility.
- `Hiring manager lens`: ownership, judgment, complexity, collaboration, level, and outcomes.
- `Craft lens`: discipline-specific quality from the selected role lens.

Avoid repeating the same sentence under all three lenses. Explain where the lenses disagree.

### 9. Check portfolio experience and health

When tools and artifact format permit, inspect:

- Navigation and return paths
- Mobile or responsive behavior
- Legibility and information density
- Image quality
- Broken links or missing assets
- Loading problems
- Semantic structure and basic accessibility
- Password and access friction
- Contact information
- Spelling, grammar, and formatting consistency
- PDF page numbers, presentation readability, and standalone comprehension

Mark unperformed checks `Not assessed`.

### 10. Create the action plan

Group recommendations as:

- `Must address`: likely to block or materially weaken this application.
- `High-value improvement`: meaningfully strengthens evidence or relevance.
- `Quick win`: limited effort with clear readability or credibility benefit.
- `Optional refinement`: improves finish without changing the core hiring signal.
- `Do not prioritize for this JD`: effort unlikely to improve this application.

Prioritize evidence gaps before cosmetic polish unless the visual or usability problem itself undermines the target craft.

### 11. Give examples without rewriting

Use examples to demonstrate a structure, not to create candidate history.

For example:

```text
Current evidence:
"Worked closely with engineers to improve checkout."

Why it is partial:
The statement names collaboration but does not show the constraint, the
candidate's action, the decision, or the result.

Possible structure:
"Faced with [verified technical constraint], I worked with [actual roles] to
compare [real options]. I recommended [candidate's real decision] because
[real evidence or tradeoff]. The verified outcome was [known result or
qualitative signal]."

Candidate must supply:
The constraint, options, decision rationale, and outcome.
```

Never present placeholder text as ready-to-publish copy. Do not silently rewrite a full case study.

### 12. Close with candidate questions

List only questions whose answers could materially change the audit or fill important evidence gaps. Prefer specific questions such as:

- What part of this decision did you personally own?
- Was the design shipped, tested, or neither?
- Which outcome can be shared without violating confidentiality?
- What tradeoff did the team reject, and why?

Do not turn the report into a long generic intake questionnaire.

## Re-audit mode

When a previous audit and revised portfolio are available:

- Compare against the prior findings.
- Mark each prior issue `Resolved`, `Partially resolved`, `Unresolved`, or `Not assessable`.
- Distinguish stronger evidence from surface-level wording changes.
- Identify newly introduced problems.
- Produce the next smallest useful action set.
- Do not score improvement.

## Final quality check

Before returning an audit, verify that:

- Every important judgment points to evidence or is labeled as inference.
- The portfolio inventory includes every submitted or reachable case, or explicitly lists what could not be opened.
- The report synthesizes the complete body of work before giving project-level advice.
- Visual annotations, when produced, map one-to-one to report finding IDs and modify copies only.
- Every material JD requirement appears in the matrix.
- Role and seniority expectations are calibrated.
- Portfolio quality and JD fit remain separate.
- Suggestions are concrete and prioritized.
- Examples contain placeholders where candidate facts are missing.
- No edits were made.
- No fabricated achievement, metric, ownership, or outcome appears.
- No unsupported score or percentage appears.
