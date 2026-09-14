# Josh Flippance

Senior product leader. I build the AI systems I spec.

Twenty years building software, from engineering into VP and director product leadership across healthcare, fintech, edtech, cybersecurity, martech, and telematics. These days I don't just write the requirement, I prototype it. I set the architecture and the data model, read the diffs, and own the calls the model can't make: what the schema has to guarantee, where a confident wrong answer costs more than no answer, and when a working implementation gets thrown out because the shape is wrong. This profile is where that work lives.

Full background at **[joshflippance.com](https://joshflippance.com)** · [LinkedIn](https://linkedin.com/in/joshflippance)

---

## Projects

### fairway — [live app](https://fairway-s4vl.onrender.com)
Golf handicap tracking for amateur players. Photograph your paper scorecard or score live hole by hole, and it computes your World Handicap System index automatically. I directed AI coding agents to build it, solo.

The scorecard photo runs through a vision model that returns hole-by-hole scores, course, tee, and rating as structured JSON, plus a confidence rating. Low confidence routes back to the player to confirm instead of silently saving a wrong score. The other hard part was live multiplayer: four people scoring one match at once, handled with a Postgres function that updates a single hole inside a JSONB array so concurrent editors can't overwrite each other.

Web app live, iOS and Android in store testing. React, Node, Supabase, Capacitor, Claude vision. Instrumented with PostHog and Sentry. <!--stats:fairway-->137 commits<!--/stats:fairway-->, 65 automated tests.

### sidekick — Google Play testing
An AI job-search app that tailors a resume and cover letter to a specific role, with an honesty guardrail that fact-checks the output against your actual history before it ships. Tailoring tools that quietly invent experience are worse than useless when someone checks a reference.

React Native, Claude API, Supabase.

### mapping-copilot
I spent a year at MealSuite cutting EHR integration delivery from 65 days to under 30. This attacks the part that stayed manual: healthcare SaaS vendors still spend weeks and five figures per customer hand-mapping each hospital's HL7 v2 feed into their schema. A model drafts the mapping, a human approves it field by field, then a deterministic engine executes the approved version. The model proposes, it never touches live clinical data.

The part I care about is the benchmark: a blind test of whether the drafts are any good, with a leakage check that fails the run if a ground-truth value appears in the prompt without being in the source feed. Otherwise an accuracy number just tells you the model read the answer.

Prototype, synthetic data. TypeScript, zero runtime dependencies, Anthropic API.

### Agentic sourcing pipeline
A daily agent that pulls candidate records from 30+ sources, dedupes on a composite key, verifies each against the live source, scores it on a weighted rubric, and writes to a 32-column schema behind write guardrails. An inbox sweep advances each record through a status state machine. Every consequential action stays human-in-the-loop.

A stale cache once made it read 23 rows in a 147-row file, which would have silently overwritten data. So it now re-reads before every run, halts if the row count drops unexpectedly, and verifies after write. 362 records processed across 33 sources.

### circle — [case study](https://github.com/joshflippance/circle-case-study), pre-build
A one-way notice board for families that span more than one household. Divorced parents, step-parents, and two or three sets of grandparents all need updates on the same kids, and every family sharing app puts them in one room where they see each other's names and comments. That is the reason the whole category is unusable for these families, and no product on the market fixes it.

The hard part is the visibility model, not the feature list. A reply has to belong to the relationship rather than to the post: the thread is keyed on (circle, subscriber), so a grandparent answering a question never turns into a group chat with hidden UI. Authorization runs server-side at query time on every read, because client-side hiding is the failure mode that leaks. The spec names sixteen inference leaks, the places where one subscriber could deduce another's involvement from something other than their reply.

It holds children's information, so residency and identity were settled before any code. Supabase and inbound/outbound email in ca-central-1, functions in Montréal, first-party telemetry only, no third-party analytics or error SDK. Subscribers get no account at all: a single-use link creates a long-lived, revocable session scoped to one subscriber in one circle.

Discovery, spec, architecture, and a 31-item security assessment are done and folded into a 162-story backlog with a 53-story pilot cut. One unmoderated user test run so far. Building it myself with Claude Code. The spec and backlog stay private; the write-up of the problem, the decisions and the security review is public in the case study above.

---

## Background

**MealSuite** — Director, Data Integrations (2025–2026). Scaled to 100+ EMR/EHR, ERP, and supply chain integrations. Cut delivery from 65+ business days to under 30.

**Limelight Platforms** — VP Product (2023–2025). Led the concept-to-launch rebuild serving 100+ brands including Toyota, BMW, and BRP. $2M budget. Event setup from months to days.

**IMS** — Senior PM (2020–2021). Industry-first connected claims using telematics and crash data. Built and mentored 5 PMs.

**Prodigy Education** — PM (2019). Content authoring platform behind a 50M+ student user base.

**Points.com** — Senior PM (2007–2011). 14+ product lines, $5M+ ARR.

Earlier: Altus Group, BlueSun, Scalar Decisions, ADP Canada, Invatron Systems.

---

## Tools

TypeScript, Node, React / React Native, Python, Supabase, Next.js. Claude API and Claude Code, MCP, agent orchestration, structured output, evals, retrieval and grounding, human-in-the-loop design. HL7 / FHIR, REST, SAML / OIDC / SCIM. PostHog, Sentry, Playwright.

AI Product Management certification (Product School) · Certified Agile Product Owner (Scrum Alliance) · Business analysis master's certificate, Schulich School of Business

---

Open to senior PM and product leadership roles. Burlington, Ontario, open to remote.
jflippance@gmail.com
