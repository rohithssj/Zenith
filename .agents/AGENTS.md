# Zanki Architecture and Design Guidelines

From this point onward, every page of Zanki should follow this architecture.

## Tech Stack
**Frontend:**
- React 19
- Vite
- JavaScript (ES6+)
- CSS Modules OR Tailwind CSS (choose ONE and remain consistent)
- GSAP
- React Router
- React Icons

**Backend:**
- Supabase (Authentication, Database, Storage, Realtime where required)

**Database:**
- Supabase PostgreSQL

**Authentication:**
- Supabase Auth (Google Login, Email & Password, Future ready)

**State Management:**
- React Context
- If necessary, Zustand
- Avoid Redux unless absolutely required.

## Styling
- Dark Theme
- CSS Variables
- Reusable Design Tokens
- Component Library
- Responsive-first
- No inline styles.

## Animations
- GSAP
- Intersection Observer
- Only subtle animations.
- Never over-animate.

## Icons
- Lucide React

## Fonts
- Geist
- Fallback: Inter

## Code Structure
```
src/
  components/
  pages/
  layouts/
  hooks/
  context/
  assets/
  animations/
  utils/
  services/
  styles/
```

## Design System
- **Background**: `#0A0A0A`
- **Surface**: `#111111`
- **Card**: `#171717`
- **Border**: `rgba(255,255,255,.08)`
- **Text**: `#FAFAFA`
- **Secondary**: `#A3A3A3`
- **Accent**: Orange `#F97316`
- **Restrictions**: No blue. No purple.

## Responsiveness
Mobile First. Every component must work on:
- Mobile
- Tablet
- Laptop
- Desktop

## Philosophy
Every design decision should reinforce:
- Consistency.
- Momentum.
- Calm.
- Simplicity.

## Important Instructions
- Do not generate generic SaaS components.
- Every component should feel like it belongs to Zanki.
- Maintain the same typography, spacing, animations, colors, and interaction style throughout the project.

---

# Zanki — Landing Page Design Summary
> Complete design reference for every section of the landing page.
> Every decision here is locked. Follow this when building.

## Page Structure (Top to Bottom)
1. Navbar
2. Hero Section
3. Feature Cards (GSAP scroll-driven, full-screen stack)
4. How It Works (horizontal scroll-snap, 4 panels)
5. Built in Public (social proof)
6. Comparison / Positioning
7. Final CTA
8. Footer

## Section 1 — Navbar
**Behavior:** Sticky. Stays fixed at top during all scroll.
**Background:** `rgba(10,10,10,0.85)` with `backdrop-filter: blur(8px)`
**Border:** `0.5px solid rgba(255,255,255,0.08)` on the bottom only.
**Left:** `Zanki` wordmark — Geist, 17px, weight 500, white.
**Center:** Nav links — `Features`, `How it works`, `Pricing`. 14px, `rgba(255,255,255,0.45)`. Hover to full white.
**Right:** Single CTA button — `Get started`. Background `#FAFAFA`, color `#0A0A0A`, 13px, weight 500, `border-radius: 7px`, padding `9px 18px`.
**Spacing:** `padding: 22px 48px` on desktop. Collapses to hamburger menu on mobile.

## Section 2 — Hero
**Layout:** Centered, single column, `max-width: 820px`, `padding: 130px 48px 60px`. No pill badges.
**Headline (h1):**
"Show up today.
Build a streak
that lasts."
- 60px, weight 500, letter spacing `-2px`, line height `1.06`, color `#FAFAFA`. "streak" is colored `#F97316`.
**Subheadline:**
"Zanki is a productivity system built around one idea: consistency beats complexity. No workspaces, no clutter — just your work, every day."
- 17px, `rgba(255,255,255,0.4)`, `line-height: 1.7`, `max-width: 480px`, centered.
**CTA Row:**
- Primary: `Start for free` (white bg, black text, 9px radius)
- Ghost: `See how it works` (transparent, `rgba(255,255,255,0.45)` text, 0.5px border)
**App Preview:** Browser-frame mockup of Zanki app. `border-radius: 16px`, `border: 0.5px solid rgba(255,255,255,0.1)`, `margin-top: 70px`.

## Section 3 — Feature Cards
**Mechanism:** Vertical scroll-snapping, full-screen panels. GSAP ScrollTrigger pins section. Contextual particle field per card.
**Transition intro:** "Everything you need. Nothing you don't." / "Six ideas, working together quietly." (32px, weight 500).
- **Card 01 (Streak System):** Amber particles. Left: `01 — streak system`, Headline: `Every day you show up, counts.` Right: Large flame emoji, `12` day streak label.
- **Card 02 (Story Calendar):** Neutral particles. Left: `02 — story calendar`, Headline: `Your calendar tells the story of your past.` Right: 7-column calendar grid, past days highlighted.
- **Card 03 (Daily Reflection):** Warm particles. Left: `03 — daily reflection`, Headline: `One question. Every evening.` Right: Reflection prompt with realistic italic entry.
- **Card 04 (Focus Mode):** Orange particles. Left: `04 — focus mode`, Headline: `One task. Nothing else.` Right: Centered task name inside thin orange progress ring.
- **Card 05 (Heatmap):** Dense particles. Left: `05 — heatmap`, Headline: `Months of effort. One glance.` Right: 10x7 GitHub-style heatmap.
- **Card 06 (Zero Complexity):** Restrained particles. Left: `06 — zero complexity`, Headline: `What we left out matters too.` Right: Struck-through list of generic features (Workspaces, Kanban, AI, etc.).

## Section 4 — How It Works
**Mechanism:** Horizontal scroll panels (GSAP + xPercent). Progress indicator: 4 dots at bottom.
- **Panel 1:** Intro text ("Three steps. That's it.").
- **Panel 2 (Step 01):** Fake signup form. "Sign up in seconds".
- **Panel 3 (Step 02):** Three task rows with dot checkboxes. "Add today's work".
- **Panel 4 (Step 03):** Large 🔥 emoji counting 0 to 12. "Watch your streak grow".

## Section 5 — Built in Public
**Layout:** Two columns, `max-width: 980px`.
**Left (Founder note):** "Built in public, by someone who needed it." with founder tag.
**Right (Stats card):** Mini heatmap on top. Stat rows: `v1.0`, `6` core features, `0` workspaces/AI.

## Section 6 — Comparison
**Headline:** "Most apps ask you to manage more. Zanki asks you to do more."
**Left Card (Others):** 6 rows of complex features, crossed out result: spend more time organizing.
**Right Card (Zanki):** 6 rows of focused features, result: time goes toward work. Border: `0.5px solid rgba(232,130,60,0.3)`.
**Below:** Small browser-frame app preview showing Today page.

## Section 7 — Final CTA
**Background:** Faint concentric rings.
**Headline:** "Start your streak. Show up tomorrow." (`streak` in `#F97316`).
**Buttons:** Primary ("Create your account") and Ghost ("See the full demo").

## Section 8 — Footer
**Layout:** Three columns. Top border: `0.5px solid rgba(255,255,255,0.07)`.
**Col 1:** Brand wordmark, tagline, small orange heatmap.
**Col 2 & 3:** Product links and Info links.

## Animation Reference
- **GSAP:** Navbar fade, Hero text staggering, Hero preview scaling, Feature card pins, How it works horizontal scroll.
- **Duration:** 0.6s–0.9s max. Ease: `power2.out`. Never loop unsolicited animations. Slow contextual particles (`6s-12s`).

## Responsiveness
- **Mobile (< 768px):** Hamburger menu, 36px hero font, stacked feature cards, vertical snap instead of horizontal scroll for "How It Works".
- **Tablet (768–1024px):** 48px hero font, cards side-by-side but tighter padding.
- **Desktop (1024px+):** Full layout.

## Philosophy
Every section answers one specific question. No generic SaaS components. No bloat.
