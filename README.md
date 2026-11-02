# Josh Flippance

Senior product leader. I build the AI systems I spec.

I started in engineering and moved into VP and director product leadership across healthcare, fintech, edtech, cybersecurity, martech, and telematics. These days I don't just write the requirement, I prototype it. I set the architecture and the data model, read the diffs, and own the calls the model can't make: what the schema has to guarantee, where a confident wrong answer costs more than no answer, and when a working implementation gets thrown out because the shape is wrong. This profile is where that work lives.

Full background at **[joshflippance.com](https://joshflippance.com)** · [build log](https://joshflippance.com/build-log) · [LinkedIn](https://linkedin.com/in/joshflippance)

---

## Projects

Six products, built solo between August and October 2026 by directing AI coding agents. All live.

### Plumb, with Mapping Copilot · [live demo](https://integrationplatform.vercel.app) · [case study](https://github.com/joshflippance/mapping-copilot-case-study)
I spent a year at MealSuite cutting EHR integration delivery from 65 days to under 30. This attacks the part that stayed manual: vertical healthcare SaaS vendors in long term care still spend weeks and five figures per customer hand mapping each facility's HL7 v2 feed into their schema. Plumb takes HL7 v2 in, checks it, maps it and delivers it with a queue and retries. Mapping Copilot drafts each mapping, a person approves it field by field, and a deterministic engine runs the approved version. No model ever touches a live message.

The number that matters is not accuracy, it is the silent error rate: a wrong value nobody flagged is the only failure that reaches a live system unnoticed. The live model's own confidence turned out to be overconfident, so I replaced it with evidence based calibration and tested it on feeds it never saw.

| Run | Silent errors | Wrong fields surfaced | Field accuracy |
|---|---|---|---|
| Offline reference mapper (pipeline check, no model) | 0% | 100% | 91% |
| Live model, HL7, calibrated, held out run | 0.5% (4.7% raw) | 99% (87% raw) | about 63 to 65% |
| Live model, CSV census exports, same calibration | 0.5% | 100% | 91% |

Three apps that really talk to each other (a mock EHR, the platform, a mock dining system), over HTTPS or MLLP. Byte identical output on every re run, 365 automated checks. Synthetic data only, no real patient data, ever. TypeScript, Claude API.

### JobProgress · [live](https://jobprogress.app)
A private workspace for one person's job search: roles, notes, contacts, resumes and, if they choose, job related email. AI drafts application packages, interview prep and replies; the person reviews and sends. It cannot send, delete or change email.

It started as Sidekick, a mobile tailoring app with a second AI pass that checks every claim against the person's real history. That became the agent pipeline running my own search, then a hosted product. Every table refuses one account's rows to another, enforced in the database, reviewed and tested end to end on Oct 24. A Chrome extension saves jobs from LinkedIn, Indeed or a careers page. Next.js, Supabase in Canada, Claude API, read only Gmail.

### Family Circles · [live](https://tryfamilycircles.app) · [case study](https://github.com/joshflippance/circle-case-study)
A one way notice board for families that span more than one household. Divorced parents, step parents, and two or three sets of grandparents all need updates on the same kids, and every family sharing app puts them in one room where they see each other's names and comments.

The hard part is the visibility model, not the feature list. A reply belongs to the relationship rather than to the post: the thread is keyed on (circle, subscriber), so a grandparent answering a question never turns into a group chat with hidden UI. Authorization runs in the database on every read, because client side hiding is the failure mode that leaks. It holds children's information, so residency and identity were settled before any code: data in Canada, two factor sign in for owners, location data stripped from photos.

Owner and relative web apps are live. Not yet tested with real families; that is the next gate. Next.js 16, Supabase with row level security, Amazon S3, Resend, Amazon SES.

### Cottage Book · [live](https://cottagebook.ca)
A booking calendar for shared family properties: one link the whole family opens on their phone. Tenant isolation lives in Postgres, with isolation tests in CI that block a production migration when they fail. Members leave feedback in the app, and a weekly Claude job weighs each note against the PRD and opens a pull request to the backlog for my review. Branches with shares, shared costs, chat, a calendar feed and Stripe billing. Live and dogfooding with my own family.

### fairway · [live app](https://fairway-gilt.vercel.app)
Started as a handicap tracker: photograph a scorecard, a vision model returns hole by hole scores as structured JSON with a confidence rating, and low confidence routes back to the player to confirm instead of silently saving a wrong score. On Sep 11 I changed the bet. An unofficial index can never beat the official services, so the wedge became group play for golf trips and small tournaments: an organizer shares a link and everyone scores live with no account. Events shipped 18 days later. Native apps paused to keep it web only.

The other hard part was live multiplayer: several people scoring one match at once, handled with a Postgres function that updates a single hole inside a JSONB array so concurrent editors can't overwrite each other. React, Supabase, Claude vision, Vercel, PostHog, Sentry. <!--stats:fairway-->137 commits<!--/stats:fairway-->.

### Cottage Games · [live](https://cottage-games.vercel.app)
A live cornhole scoreboard for the cottage tournament. Scores are an append only log, so nothing is ever deleted, only replaced or voided, and a disputed game can always be traced. TanStack Start, Supabase.

---

## How I work

The reusable parts of the method behind these projects: the ten step research pass I run before writing a spec, the working rules I give coding agents, the guardrails I apply to any AI feature, and the Claude Code skills I use day to day. [ai-product-workflow](https://github.com/joshflippance/ai-product-workflow)

---

## Background

**MealSuite**, Director, Data Integrations (2025 to 2026). Scaled to 100+ EMR/EHR, ERP, and supply chain integrations. Cut delivery from 65+ business days to under 30.

**Limelight Platforms**, VP Product (2023 to 2025). Led the concept to launch rebuild serving 100+ brands including Toyota, BMW, and BRP. $2M budget. Event setup from months to days.

**IMS**, Senior PM (2020 to 2021). Industry first connected claims using telematics and crash data. Built and mentored 5 PMs.

**Prodigy Education**, PM (2019). Content authoring platform behind a 50M+ student user base.

**Points.com**, Senior PM (2007 to 2011). 14+ product lines, $5M+ ARR.

Earlier: Altus Group, BlueSun, Scalar Decisions, ADP Canada, Invatron Systems.

---

## Tools

TypeScript, Node, React / React Native, Python, Supabase, Next.js. Claude API and Claude Code, MCP, agent orchestration, structured output, evals, retrieval and grounding, human in the loop design. HL7 / FHIR, REST, SAML / OIDC / SCIM. PostHog, Sentry, Playwright.

Vibe Coding, Claude Code for Product Managers and AI Product Management certifications (Product School) · Certified Agile Product Owner (Scrum Alliance) · Business analysis master's certificate, Schulich School of Business

---

Open to senior PM and product leadership roles. Burlington, Ontario, open to remote.
jflippance@gmail.com
