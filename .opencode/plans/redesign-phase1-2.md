# Safal AI Redesign — Phase 1+2 Execution Plan

## Phase 1 — Quick Wins

### Step 1: Rename title + meta (src/index.html)

**Title** (benefit-led, visitor-first):
```
SAFAL AI — AI Training, Automation & Digital Tools for Nepal
```

**Description** (visitor benefit, not company superlative):
```
Hands-on AI training for teachers, corporate teams, and individuals in Nepal.
CDC-aligned lesson planning, workflow automation, and custom AI solutions — built for how Nepal works.
```

**OG title**: Same as title
**OG description**: Same as description
**Twitter title/description**: Same as title/description
**Keywords**: keep existing, add "ai training nepal, ai course nepal, python course nepal"

### Step 2: Wire WHY_CHOOSE_SAFAL onto homepage

- `WHY_CHOOSE_SAFAL` array already exists in `data.ts` (4 items) but is never rendered
- `WHY_CHOOSE_SAFAL_NE` exists in `translations.ts`
- Add it to `HomePage.tsx` between `StatsSection` and `LearningHubSection`
- Render as a clean 2x2 grid: icon + title + description per card
- Use `.card-white` styling with brand-muted icon backgrounds

### Step 3: Fix AGENTS.md

- "Space Grotesk" → "Fraunces" for display/headings font

---

## Phase 2 — Audience Segmentation

### Step 4: Add audience path section to homepage

Insert new `AudiencePathsSection` between `HeroSection` and `SolutionsSection`.

**Three cards, each with ONE clear CTA:**

| Card | Icon | Heading | Description | CTA Label | CTA Action |
|------|------|---------|-------------|-----------|------------|
| Corporates | Briefcase | For Corporates & Teams | Upskill your workforce or automate workflows with hands-on AI training and custom solutions. | Request a training proposal | Opens ConsultModal (sector="Enterprise") |
| Schools | GraduationCap | For Schools & Teachers | CDC-aligned lesson planning, teacher training, and student-ready AI tools for Nepali classrooms. | Book a school training | Opens ConsultModal (sector="Education") |
| Individuals | User | For Individuals & Students | Learn AI from scratch — Python, prompt engineering, vibe coding, and career-ready skills. | Explore training programs | Scrolls to #training |

**Design:**
- 3-column grid on desktop (lg:grid-cols-3), stacked on mobile
- Each card: icon in brand-muted circle → heading → 1-line description → pill CTA button (brand bg)
- No competing secondary CTAs per card
- Below the cards: one-line text "Not sure which path? Book a free consultation" with a text link to ConsultModal

### Step 5: Add data + translations

- Add `AUDIENCE_PATHS` array to `data.ts` (3 entries: icon, title, description, ctaLabel)
- Add `AUDIENCE_PATHS_NE` to `translations.ts`
- Create `src/components/sections/AudiencePathsSection.tsx`
- Import + render in `HomePage.tsx`

---

## Files to modify

| File | Change |
|------|--------|
| `src/index.html` | Title + meta |
| `src/data.ts` | Add `AUDIENCE_PATHS` |
| `src/translations.ts` | Add `AUDIENCE_PATHS_NE` |
| `src/pages/HomePage.tsx` | Import + render AudiencePathsSection, wire WHY_CHOOSE_SAFAL |
| `src/components/sections/AudiencePathsSection.tsx` | New file |
| `AGENTS.md` | Font correction |

## Commit strategy

1. `SEO: benefit-led title + description, updated meta tags`
2. `Home: wire up WHY_CHOOSE_SAFAL grid between Stats and Learning Hub`
3. `Home: add audience path section — 3 CTA cards for Corporates, Schools, Individuals`
4. `Docs: fix font name in AGENTS.md (Space Grotesk → Fraunces)`
