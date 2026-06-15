# antoniogioia.com Redesign Plan

## Goal

Revamp antoniogioia.com into a bilingual, SEO-rich, recruiter-friendly technical portfolio while preserving the current site's minimal, code-oriented identity.

The new site should position Antonio Gioia as:

> Senior Full-Stack Developer based in Lecce, Italy, building AI automation, internal tools, and production web platforms.

This positioning should support both international recruiter searches and local SEO searches such as "AI automation developer Lecce", "sviluppatore AI Lecce", "full-stack developer Lecce", and related service queries.

## Current Evaluation

The existing website has a useful and distinctive foundation:

- Minimal, personal, technical visual identity.
- Code-window motif that communicates "builder" more effectively than a generic portfolio template.
- Existing blog content with long-tail technical SEO value.
- Existing structured-data awareness through Person microdata.
- Strong fit for static Astro architecture.

The main issue is not the design idea. The main issue is outdated positioning.

The current site mostly communicates:

- JavaScript/Python full-stack developer.
- Freelance web developer in Lecce.
- General technical blog.

The CV and recent work communicate something stronger:

- Senior full-stack and product-oriented developer.
- Production platform owner with 15+ years of professional development experience.
- Developer of AI-connected business workflows.
- Builder of internal tools used by real staff.
- Developer of AI customer-care automation, CRM integrations, multilingual chatbots, voice-call workflows, data dashboards, maps, authentication systems, and deployment infrastructure.

The redesign should make this newer story visible without turning the site into a generic AI agency landing page.

## Core Positioning

Primary English positioning:

> Senior Full-Stack Developer based in Lecce, Italy, building AI automation, internal tools, and production web platforms.

Primary Italian positioning:

> Senior Full-Stack Developer a Lecce, specializzato in automazioni AI, strumenti interni e piattaforme web in produzione.

Shorter variants for metadata and structured data:

- Full-Stack & AI Automation Developer in Lecce, Italy.
- Senior developer for AI automation, internal tools, and production web platforms.
- Sviluppatore full-stack e AI automation a Lecce.

Avoid vague positioning such as:

- AI expert.
- AI consultant.
- AI solutions for business.
- Innovative AI-powered digital transformation.

The message should be specific: Antonio connects AI models to real systems, APIs, databases, CRMs, dashboards, authentication, cloud services, and operational workflows.

## Target Audiences

### Recruiters And Hiring Managers

They need to understand quickly:

- Antonio is senior.
- He has production experience, not only prototypes.
- He can work remotely in English.
- He can own full-stack delivery end to end.
- He has recent AI automation experience connected to real business systems.

### Technical Decision Makers

They need proof of:

- Systems thinking.
- Practical architecture.
- Real-world constraints.
- Backend, frontend, infrastructure, and integration ability.
- Ability to turn messy operations into maintainable software.

### Local And Italian Clients

They may search for:

- AI automation developer Lecce.
- Consulente AI Lecce.
- Sviluppatore full-stack Lecce.
- Automazioni AI per aziende Lecce.
- Sviluppo software e strumenti interni Lecce.

The site should keep local SEO signals visible, but not make the personal brand feel provincial. Lecce should appear as a real location signal, while the professional positioning remains remote/international.

## Content Principles

The site should not become a list of technologies or services.

Every major page should show a resolution pattern:

1. Problem.
2. Constraints.
3. Resolution pattern.
4. Real use case.
5. Systems connected.
6. Stack.
7. Recruiter signal.
8. Call to action.

This creates pages that are useful to humans and rich in structured meaning for search engines.

Good pattern:

> Customer conversations were unstructured and difficult to follow up. I connected a multilingual AI assistant to CRM flows, room suggestion APIs, and staff handoff processes so conversations could become structured operational records.

Weak pattern:

> I build AI chatbots using OpenAI and n8n.

The content should be concise, technical, and concrete.

## Site Structure

Use bilingual URLs with English as the primary recruiter-facing path and Italian mirrored for local SEO.

Recommended structure:

```text
/
/en/
/it/

/en/services/
/it/servizi/

/en/services/ai-customer-care-automation/
/it/servizi/automazioni-ai-customer-care/

/en/services/ai-crm-workflows/
/it/servizi/workflow-ai-crm/

/en/services/internal-tools-full-stack-development/
/it/servizi/sviluppo-strumenti-interni-full-stack/

/en/services/ai-data-analysis-dashboards/
/it/servizi/dashboard-ai-analisi-dati/

/en/services/authentication-sso-node-nextjs/
/it/servizi/autenticazione-sso-node-nextjs/

/en/services/self-hosted-infrastructure-devops/
/it/servizi/infrastruttura-self-hosted-devops/

/en/services/maps-location-platforms/
/it/servizi/piattaforme-mappe-geolocalizzazione/

/en/case-studies/
/it/casi-studio/

/en/case-studies/cercoalloggio-platform/
/it/casi-studio/piattaforma-cercoalloggio/

/en/case-studies/keplero-ai-customer-care/
/it/casi-studio/keplero-ai-customer-care/

/en/case-studies/market-oracle-ai-dashboard/
/it/casi-studio/market-oracle-dashboard-ai/

/en/projects/
/it/progetti/

/en/blog/
/it/blog/
```

The existing root can either redirect to `/en/` or act as a language-neutral landing page with `x-default` hreflang. If most recruiter traffic is expected in English, prefer `/en/` as the canonical primary experience and make `/` a concise language selector or redirect depending on SEO strategy.

## Homepage Plan

The homepage should keep a minimal technical atmosphere, but make the professional story clear in the first viewport.

### Hero

Headline:

> Senior Full-Stack Developer based in Lecce, Italy, building AI automation, internal tools, and production web platforms.

Supporting copy:

> I design, build, deploy, and maintain full-stack software that connects AI models to real business systems: APIs, databases, CRMs, dashboards, voice workflows, cloud services, and staff tools.

Proof line:

> 15+ years professional development · production platforms · AI workflows · remote English-speaking roles

Calls to action:

- View service patterns.
- View case studies.
- Contact / download CV.

### Proof Strip

Use compact metrics, not oversized counters:

- 15+ years professional development.
- Platform serving around 200,000 users.
- Internal tools for around 50 staff members.
- 20+ Italian university cities.
- AI customer-care, CRM, voice, and data workflows.

### Resolution Patterns Section

Show 6-7 concise pattern links:

- AI customer-care automation.
- AI CRM workflows.
- Internal tools for operations.
- AI-assisted data dashboards.
- Authentication and SSO.
- Self-hosted infrastructure.
- Maps and location platforms.

Each item should be a compact text block, not a decorative card-heavy grid.

Example:

```text
AI Customer-Care Automation
Pattern: multilingual conversation -> tool call -> room suggestion API -> CRM record -> staff handoff.
```

### Selected Case Studies

Feature 3 case studies:

- CercoAlloggio platform.
- Keplero AI customer care.
- Market Oracle AI-assisted trading dashboard.

The case studies should emphasize systems, constraints, and outcomes. Avoid exposing private business data or confidential implementation details.

### Technical Writing

Keep blog links, but curate them around current positioning:

- Poor man's data analysis with OpenAI.
- SAML SSO setup with Express and Passport.
- Authentication in Next.js with Passport.js, cookies, and Redis.
- MongoDB replica set with Coolify.
- Protomaps single-file maps.
- Self-hosting Next.js with Coolify.

Older posts can stay, but the homepage should prioritize current relevance.

## Service Page Template

Each service page should follow a stable structure.

### Page Sections

1. H1 with service and location/remote relevance.
2. Short positioning paragraph.
3. Problem.
4. Constraints.
5. Resolution pattern.
6. Example use case.
7. Systems connected.
8. Stack and tools.
9. What a recruiter or client can infer.
10. Related articles or case studies.
11. CTA.

### Example Structure

```text
H1: AI Customer-Care Automation Developer in Lecce, Italy

Intro:
I build AI customer-care workflows that connect multilingual conversations to real business systems: APIs, CRMs, dashboards, voice calls, and staff handoff processes.

Problem:
Customer conversations often remain unstructured and difficult to process.

Constraints:
- The AI must not invent operational data.
- Staff need structured records.
- Users may speak different languages.
- Internal systems need controlled API access.

Resolution Pattern:
conversation -> intent extraction -> business rules -> tool call -> structured response -> CRM upsert -> human follow-up

Use Case:
Production customer-care automation for student housing, including room suggestions, tenant/landlord flows, and voice-call request handling.

Systems Connected:
OpenAI/LLM APIs, WhatsApp/voice channels, Bitrix24 CRM, REST APIs, MongoDB, staff dashboards.

Recruiter Signal:
This demonstrates practical AI integration, backend architecture, API design, CRM workflows, and production ownership.
```

## Recommended Service Pages

### AI Customer-Care Automation

Main intent:

- Recruiters and companies looking for practical AI automation experience.
- Local SEO for AI automation developer Lecce.

Resolution pattern:

```text
multilingual conversation -> intent extraction -> tool call -> business data lookup -> grounded response -> CRM/staff handoff
```

Evidence from CV:

- Keplero production chatbot and voice-call integration.
- Multilingual conversations.
- Connection to internal business tools.
- Room suggestion engine exposed through REST API.

### AI CRM Workflows

Resolution pattern:

```text
conversation -> structured extraction -> tenant/landlord/voice flow selection -> CRM upsert -> staff follow-up
```

Evidence:

- Bitrix24 integrations.
- Separate connector flows for tenants, landlords, and voice-call requests.
- Structured operational records from AI conversations.

### Internal Tools And Full-Stack Platforms

Resolution pattern:

```text
messy operations -> domain model -> custom staff UI -> backend workflows -> dashboards -> maintainable platform
```

Evidence:

- Internal applications used by around 50 staff.
- Calendars, maintenance alerts, availability, occupancy, contracts, CRM workflows, dashboards, rich data grids.
- CercoAlloggio platform at meaningful scale.

### AI-Assisted Data Analysis Dashboards

Resolution pattern:

```text
raw data sources -> aggregation -> indicators/sentiment/news -> LLM-assisted analysis -> human decision support
```

Evidence:

- Market Oracle.
- Portfolio, market indicators, news, sentiment, strategy templates.
- Electron client.
- Local and remote LLM workflows.

Important positioning:

- Make clear this is decision support, not automated financial advice or trading recommendations.

### Authentication, SSO, And Sessions

Resolution pattern:

```text
identity requirements -> authentication strategy -> SSO/SAML -> session storage -> production integration
```

Evidence:

- Passport.js.
- SSO.
- SAML 2.0.
- Redis-backed sessions.
- Existing blog posts.

### Self-Hosted Infrastructure And DevOps

Resolution pattern:

```text
deployment/control/cost constraints -> Linux server -> Docker/Coolify -> Cloudflare/AWS -> repeatable operations
```

Evidence:

- Linux servers.
- Docker.
- Coolify.
- AWS S3/Lambda/Bedrock/Translate.
- Cloudflare Workers/DNS/R2.
- VPS management.

### Maps And Location Platforms

Resolution pattern:

```text
location-heavy product -> geodata model -> map rendering -> tile/storage strategy -> frontend integration
```

Evidence:

- Self-hosted map infrastructure using Protomaps PMTiles, MapLibre GL, Cloudflare R2, AWS S3.
- Real-estate/student housing platform context.

## Case Study Pages

Case studies should be concise and credible. They should show enough specificity to prove expertise without exposing confidential business internals.

### CercoAlloggio Platform

Themes:

- Product/platform ownership.
- Full-stack architecture.
- Internal tools.
- Scale.
- Operational complexity.

Useful facts:

- Around 200,000 users.
- Around 180,000 students.
- Around 15,000 properties.
- 20+ Italian university cities.
- Around 50 staff users.
- Modern platform with Next.js, React, Tailwind, Node.js, Express, MongoDB, Redis, AWS, Cloudflare, Linux.

### Keplero AI Customer Care

Themes:

- Production AI automation.
- Chatbot and voice-call integration.
- Multilingual workflows.
- Tool-using AI.
- CRM integrations.
- Room suggestion REST API.

### Market Oracle

Themes:

- AI-assisted data dashboard.
- Electron desktop client.
- Market/news/sentiment aggregation.
- Local and remote LLM experimentation.
- Human decision support.

Use careful wording:

- "Decision-support dashboard".
- "Structured analysis workflow".
- "Not automated financial advice".

### Racing Balls

Themes:

- Independent product building.
- JavaScript/Canvas/Electron.
- Steam publishing.
- Physics/gameplay systems.

This is less central to recruiter AI positioning, but it is valuable as proof of independence, product persistence, and non-web technical range.

## Blog Strategy

The blog should be preserved and gradually expanded.

Current high-value posts:

- Poor man's data analysis with OpenAI.
- SAML Single Sign On setup with Express and Passport.
- How to handle Authentication in Next.js with Passport.js.
- MongoDB Replica Set with Coolify.
- Protomaps single-file maps.
- Self-host Next.js on a VPS with Coolify.
- Accessibility consultancy.

Recommended new posts:

- From AI chatbot to CRM record: a practical automation pattern.
- Building tool-using AI workflows without losing control of business data.
- When to use CSV, JSON, embeddings, or APIs in AI data workflows.
- Multilingual AI customer care: architecture and failure modes.
- How to connect LLMs to internal tools safely.
- Building internal tools that staff actually use.
- Self-hosted maps with PMTiles, MapLibre, Cloudflare R2, and S3.

Blog posts should support the service pages through internal links.

## Bilingual Content Plan

English should be complete and polished for recruiter reach.

Italian should be equally complete for local SEO and Italian business searches.

Do not mix Italian and English on the same content page except where natural, such as contact information or project names.

Recommended language rules:

- `/en/` pages use `lang="en"`.
- `/it/` pages use `lang="it"`.
- Every translated pair has reciprocal `hreflang`.
- Use `x-default` for the default homepage or language selector.
- Avoid automatic low-quality translations.
- Blog translations can be rolled out gradually.

Priority translation order:

1. Homepage.
2. Service index.
3. AI customer-care automation page.
4. AI CRM workflows page.
5. Internal tools page.
6. Contact page.
7. Core case studies.
8. High-value blog posts.

## SEO And Metadata Plan

Every page should have:

- Unique title.
- Unique meta description.
- Canonical URL.
- `hreflang` alternates.
- Open Graph title/description/image.
- Twitter card metadata.
- Breadcrumbs where useful.
- JSON-LD structured data.

Avoid metadata duplication. The current global description is too generic and should not be reused everywhere.

### Example English Homepage Title

```text
Senior Full-Stack & AI Automation Developer in Lecce, Italy | Antonio Gioia
```

### Example English Homepage Description

```text
Antonio Gioia is a senior full-stack developer based in Lecce, Italy, building AI automation, internal tools, CRM workflows, dashboards, and production web platforms.
```

### Example Italian Homepage Title

```text
Senior Full-Stack Developer e AI Automation a Lecce | Antonio Gioia
```

### Example Italian Homepage Description

```text
Antonio Gioia e uno sviluppatore senior full-stack a Lecce specializzato in automazioni AI, strumenti interni, workflow CRM, dashboard e piattaforme web in produzione.
```

Use ASCII apostrophes and accents only where the project supports UTF-8 correctly. Italian content naturally requires accented characters.

## Structured Data Plan

Prefer JSON-LD over scattered microdata for new pages.

Structured data should describe visible page content. Do not create pages that exist only to host schema.

Recommended schema types:

- `Person` for Antonio.
- `ProfilePage` for the homepage/about page.
- `WebSite` for the site.
- `Service` for service pages.
- `BlogPosting` for blog posts.
- `CreativeWork` for case studies.
- `SoftwareApplication` for software projects where appropriate.
- `BreadcrumbList` for navigational hierarchy.

### Person Schema Concepts

Include:

- `name`: Antonio Gioia.
- `url`: https://www.antoniogioia.com.
- `jobTitle`: Senior Full-Stack Developer and AI Automation Developer.
- `address`: Lecce, Italy.
- `knowsAbout`: Full-stack development, AI automation, LLM integration, internal tools, CRM workflows, Node.js, React, Next.js, Astro, MongoDB, Redis, AWS, Cloudflare, Linux, SAML, SSO.
- `sameAs`: GitHub, LinkedIn if available, Steam page if appropriate, other public professional profiles.
- `makesOffer` or service links if modeled carefully and visibly on page.

### Service Schema Concepts

Each service page can include:

- `@type`: Service.
- `name`.
- `description`.
- `provider`: Antonio Gioia as Person.
- `areaServed`: Italy, Europe, Remote, Lecce.
- `serviceType`.
- `url`.

### BlogPosting Schema Concepts

For each post:

- `headline`.
- `description`.
- `datePublished`.
- `dateModified` if available.
- `author`.
- `image`.
- `mainEntityOfPage`.

## Design Direction

Keep:

- Minimal dark/code identity.
- Square motif.
- Technical tone.
- Compact layout.
- Personal feel.

Improve:

- Clearer first-viewport positioning.
- Less reliance on draggable code windows for essential information.
- Better mobile readability.
- Stronger hierarchy.
- More service/case-study navigation.
- More modern metadata and structured data.

Avoid:

- Generic AI SaaS look.
- Abstract robot illustrations.
- Purple/blue gradient AI aesthetic.
- Glassmorphism cards.
- Huge marketing hero sections.
- Decorative bloat.
- Long technology lists without context.

Recommended visual vocabulary:

- Code fragments as content, not decoration.
- Compact "system flow" blocks.
- Terminal-style labels.
- Square bullets.
- Thin dividers.
- Monospace accents.
- Real screenshots where safe.
- Simple diagrams rendered as text or lightweight HTML/CSS.

Example pattern component:

```text
[conversation]
      |
      v
[intent + constraints]
      |
      v
[tool/API call]
      |
      v
[CRM record + staff handoff]
```

## Implementation Approach

### Phase 1: Foundation

- Audit existing Astro structure.
- Create a content model for localized pages.
- Update layout to support `lang`, title, description, canonical, hreflang, Open Graph, and JSON-LD.
- Create shared SEO/schema helpers.
- Preserve existing URLs or add redirects where needed.
- Decide root strategy: redirect to `/en/` or keep `/` as x-default.

### Phase 2: Homepage And Core Navigation

- Build `/en/` and `/it/` homepages.
- Update header with language switcher and core navigation.
- Add service-pattern section.
- Add case-study previews.
- Add curated technical-writing section.
- Add updated contact/CV CTA.

### Phase 3: Service Pages

Create English and Italian versions for:

- AI customer-care automation.
- AI CRM workflows.
- Internal tools and full-stack platforms.
- AI-assisted data dashboards.
- Authentication, SSO, and sessions.
- Self-hosted infrastructure and DevOps.
- Maps and location platforms.

Each page should include visible content matching its JSON-LD.

### Phase 4: Case Studies

Create case studies for:

- CercoAlloggio platform.
- Keplero AI customer care.
- Market Oracle.
- Racing Balls, optional or lower priority.

### Phase 5: Blog Migration And Translation

- Keep existing blog URLs working.
- Add `/en/blog/` and `/it/blog/`.
- Migrate posts into a content collection if useful.
- Add translated versions gradually.
- Add schema for posts.
- Add related links from posts to service pages.

### Phase 6: Technical SEO

- Generate sitemap with hreflang alternates.
- Keep robots.txt.
- Add canonical links.
- Add Open Graph images.
- Validate JSON-LD with Rich Results Test where applicable.
- Check titles and descriptions.
- Check accessibility and mobile layout.

### Phase 7: Verification

- Run build.
- Inspect generated HTML for metadata and schema.
- Check representative English and Italian pages.
- Check mobile layout.
- Check internal links.
- Check redirects.
- Check sitemap.

## Content Tone

The tone should be:

- Direct.
- Technical.
- Specific.
- Senior.
- Calm.
- Evidence-based.

Avoid:

- Overpromising.
- AI hype.
- Agency language.
- Generic phrases like "unlock your business potential".
- Empty words such as innovative, cutting-edge, seamless, scalable unless backed by specifics.

Good wording:

> I build AI workflows that turn conversations into structured operational data.

Bad wording:

> I leverage cutting-edge AI to transform customer engagement.

## Recruiter Signal Checklist

The final site should make these facts easy to find:

- Based in Lecce, Italy.
- Available for remote English-speaking roles.
- 15+ years professional software development.
- Full-stack ownership from frontend to backend to infrastructure.
- Production AI automation experience.
- Internal tools for staff operations.
- Platform scale and real users.
- Authentication and SSO experience.
- Cloud and self-hosted infrastructure.
- Technical writing and communication ability.
- Contact and CV access.

## Local SEO Checklist

Ensure the Italian and English pages include natural references to:

- Lecce.
- Italy.
- Puglia where appropriate.
- Remote collaborations.
- AI automation developer.
- Sviluppatore AI.
- Sviluppatore full-stack.
- Consulente automazioni AI.
- Strumenti interni aziendali.
- Workflow CRM.

Do not keyword-stuff. Use the terms naturally in headings, intros, metadata, and structured data.

## Risks And Constraints

- Do not expose confidential implementation details from CercoAlloggio or HOMA.
- Do not imply direct financial advice for Market Oracle.
- Do not over-index on AI at the expense of senior full-stack credibility.
- Do not break existing blog URLs with SEO value.
- Do not add structured data that is not backed by visible content.
- Do not create thin service pages.

## Definition Of Done

The revamp is complete when:

- English and Italian homepage experiences exist.
- Main service pages exist in both languages.
- Core case studies exist.
- Existing blog posts remain reachable.
- Metadata is unique per page.
- JSON-LD is present and valid for major page types.
- Hreflang alternates are reciprocal.
- Sitemap includes localized pages.
- The design remains minimal and technical.
- The first viewport clearly communicates the new professional positioning.
- Build passes.
- Manual browser review confirms desktop and mobile layout quality.

