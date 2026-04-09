# Helvetiqa Website - PRD + TRD

**Project:** Helvetiqa Agency Website  
**Repo:** byahmadfarooq/helvetiqa  
**Stack:** Next.js 14 App Router · Tailwind CSS · Supabase · GSAP · Lenis  
**Deployment:** Vercel  
**Version:** 1.0  
**Date:** April 2026  
**Owner:** Ahmad Farooq

---

## Part 1 - Product Requirements Document

---

### 1.1 Purpose

Helvetiqa is a multidisciplinary digital studio based in Lahore. The website is its primary conversion asset. It must communicate the agency positioning, showcase case studies, surface services, and convert visitors into booked discovery calls with zero friction.

The personal site (ahmadfarooq.vercel.app) is the direct design reference. Visual hierarchy, spacing system, typography scale, and interaction language are inherited and adapted for a two-founder studio context.

---

### 1.2 Goals

- Drive inbound discovery calls via the Work With Us flow
- Establish authority through case studies and a blog
- Communicate 7 services on a single page with zero navigation overhead
- Capture email leads at 3 points across the site
- Allow Ahmad to publish blog posts from an admin panel without touching code

---

### 1.3 Non-Goals

- No e-commerce or payment processing
- No live chat widget
- No third-party CMS (Sanity, Contentful, Tally, Typeform, Mailchimp)
- No package pricing on the public site - custom quote only

---

### 1.4 ICP & Positioning

**Primary audience:** Founders, coaches, consultants, and creators who are already posting content consistently but not converting it into booked calls or revenue.

**Core positioning:** Most agencies do one thing. Helvetiqa builds the whole system. Content + funnels + ads + web, all of it connected.

The website must feel like proof of that positioning. The design, copy, and interactions should themselves feel like a system that works.

---

### 1.5 Brand System

#### Colors

| Token | Value | Usage |
|---|---|---|
| Background | `#F5F0E8` | Cream. All light sections. |
| Text | `#0A0A0A` | Primary body copy and headings. |
| Accent Orange | `#E8341A` | CTAs, logo dot, highlights. |
| Accent Lime | `#C8F135` | Book a Call button. Hover states. |
| Dark BG | `#0A0A0A` | Footer. Dark sections. |
| White | `#FFFFFF` | Cards. White sections. |

#### Typography

| Token | Value |
|---|---|
| Display font | Bebas Neue (Google Fonts) - all headings, nav, labels |
| Body font | DM Sans (Google Fonts) - all body copy |
| Logo | `h.` - Bebas Neue, black text, dot in `#E8341A` |

#### Texture

Faint dot-grid CSS background on all cream sections at ~4% opacity. Implemented as a `dot-grid` Tailwind utility class via `globals.css`.

---

### 1.6 Voice Rules

These apply to every word on the site. No exceptions.

- Zero em dashes. Ever.
- No filler words: passionate, leverage, solutions, streamline, synergy
- Short sentences. Direct. No fluff.
- No SaaS speak.
- Placeholder copy is never acceptable. Every section ships with real copy.

---

### 1.7 Site Architecture

| Route | Type | Notes |
|---|---|---|
| `/` | Static | Homepage. Full conversion page. |
| `/services` | Static | Single page. Maxima-style expandable rows for all 7 services. |
| `/services/[slug]` | Static (7) | Deep dive per service. SEO-optimised. |
| `/work` | Static | Case studies index. |
| `/work/[slug]` | Static (5) | Individual case study pages. |
| `/work-with-us` | Static | Contact + Cal.com embed. Primary CTA destination. |
| `/about` | Static | Team bios. Ahmad + Shahid. |
| `/blog` | Dynamic | Blog index. CMS-driven. |
| `/blog/[slug]` | Dynamic | Individual post. Rendered from markdown. |
| `/admin` | Protected | Redirect to /admin/dashboard. |
| `/admin/dashboard` | Protected | List all posts. Edit / delete links. |
| `/admin/new` | Protected | Create new post. Commits markdown to GitHub. |
| `/admin/edit/[slug]` | Protected | Edit existing post. Updates GitHub file. |

---

### 1.8 Page-by-Page Requirements

#### Homepage `/`

1. **Hero** - full viewport. Bebas Neue headline. Subhead. Two CTAs: Work With Us (primary, lime) and See Our Work (ghost/outline).
2. **Ticker** - horizontal scroll strip. Agency name + tagline repeating. GSAP infinite scroll.
3. **Services preview** - 7 service names as Maxima-style hover-expand rows. Arrow CTA to `/services`.
4. **Case study tease** - 3 featured cards: Nick FarrenKopf, O! Millionaire, ARKA. Headline metric visible. CTA to `/work`.
5. **About tease** - two column. Left: Ahmad bio snippet. Right: Shahid bio snippet. CTA to `/about`.
6. **Email capture** - email input. Saves to Supabase `leads` with `source: 'home_email_capture'`. Inline success/error. No reload.
7. **CTA band** - black bg. White Bebas Neue headline. Lime CTA to `/work-with-us`.
8. **Footer**

#### Services `/services`

- Page hero
- All 7 service rows (same Maxima component, full descriptions)
- CTA band to `/work-with-us`

**Service rows (Maxima-style):** Each row is full-width with a bottom border. Shows number, service name, arrow icon. On hover/click, description block smoothly expands via CSS height transition. One open at a time. First open by default.

#### Individual Service Pages `/services/[slug]`

For each of the 7 slugs: hero, deliverables grid (includes as chips), 5-step process timeline, 1-2 relevant case study cards, CTA band.

**Slugs:** `linkedin`, `instagram`, `paid-ads`, `brand-strategy`, `funnels`, `community`, `web-tech`

#### Work `/work`

- Page hero
- Case study grid - 5 cards with client, category tag, headline metric, brief description
- Each card links to `/work/[slug]`
- CTA band

#### Work With Us `/work-with-us`

- Page hero
- Contact form: Name, Email, Services needed (multi-select checkboxes for all 7), Tell us more (textarea), How did you find us (select). Saves to Supabase `contact_submissions` with `source: 'work_with_us'`. Inline success/error. No reload.
- Cal.com inline embed: `ahmad-farooq-tuwcnw/30min`, `month_view`
- Email capture with `source: 'packages_email_capture'`

#### About `/about`

- Page hero: "Two founders. One obsession."
- Ahmad card: Head of Systems & Strategy + full bio + skills chips
- Shahid card: CEO + bio + skills chips
- Short agency origin paragraph
- CTA band

#### Blog `/blog`

- Page hero
- Category filter bar: All, Growth Frameworks, Content Systems, Philosophy, Brand Strategy, Productivity Systems
- Blog grid - CMS-driven, `published: true` only, sorted newest first. Card shows: category tag, title, excerpt, date, read time.
- Empty state when no posts
- Email capture with `source: 'blog_email_capture'`

#### Blog Post `/blog/[slug]`

- Fetch markdown from `/content/posts/{slug}.md`
- Render with `marked`
- Show: category tag, title, date, read time, full content
- Email capture with `source: 'blog_post_email_capture'`
- CTA band

#### Admin `/admin/*`

**Login `/admin`:** Email + password. Show/hide toggle on password. `signInWithPassword`. Redirect to dashboard on success. Inline error on failure.

**Dashboard `/admin/dashboard`:** Table of all posts - title, date, category, published badge, Edit + Delete. Delete requires confirm modal. New Post button.

**New Post `/admin/new`:** Fields: Title, Slug (auto from title, editable), Category (select), Excerpt, Body (markdown textarea), Published (toggle). Slug collision check before publish. readTime auto-calculated: `Math.ceil(wordCount / 200)`. On submit: commit to `/content/posts/{slug}.md` via GitHub API.

**Edit `/admin/edit/[slug]`:** Fetch from GitHub, decode base64, parse frontmatter, pre-fill all fields. On save: `updateFile` with SHA. readTime recalculated.

---

### 1.9 Forms & Lead Capture

| Page | Source tag |
|---|---|
| `/` | `home_email_capture` |
| `/work-with-us` | `work_with_us` (contact form) + `packages_email_capture` (email capture) |
| `/blog` | `blog_email_capture` |
| `/blog/[slug]` | `blog_post_email_capture` |

All forms: inline success/error. No page reloads. No third-party form tools.

---

### 1.10 Hard Rules

- Zero em dashes anywhere in copy or code comments
- No placeholder copy - every page ships complete
- Custom cursor on every page
- Faint dot-grid texture on all cream sections
- All forms save to Supabase with correct source tag
- All forms inline success/error, no page reloads
- Admin protected by Supabase session via middleware
- Password show/hide toggle on admin login
- Case studies are static pages, not CMS-managed
- Service pages have Maxima-style hover-expand interaction
- `rounded-none` on all buttons
- No box shadows on cards
- Section padding minimum `py-32` desktop, `py-20` mobile
- Mobile responsive on every single page
- No Tally, Typeform, Mailchimp, Sanity, Contentful

---

## Part 2 - Technical Requirements Document

---

### 2.1 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 - App Router. Server components by default. |
| Styling | Tailwind CSS. Config in `tailwind.config.mjs`. No inline style tags except for dynamic values. |
| Database | Supabase (Postgres). Anon key MUST be regenerated before first deploy. |
| Animations | GSAP + @gsap/react + ScrollTrigger. Lenis for smooth scroll. |
| CMS | Custom. Markdown in `/content/posts/`. GitHub API commits via PAT. |
| Deployment | Vercel. Repo: `byahmadfarooq/helvetiqa`. |

---

### 2.2 Dependencies

Install exactly these. No others without explicit sign-off.

| Package | Version | Purpose |
|---|---|---|
| `next` | 14.x | Framework |
| `react` / `react-dom` | 18.x | UI runtime |
| `tailwindcss` | latest | Styling |
| `gsap` | latest | Animations |
| `@gsap/react` | latest | GSAP React hooks |
| `lenis` | latest | Smooth scroll |
| `@supabase/supabase-js` | latest | DB client |
| `@supabase/ssr` | latest | SSR auth helpers |
| `gray-matter` | latest | Frontmatter parsing |
| `marked` | latest | Markdown to HTML |
| `@vercel/speed-insights` | latest | Performance monitoring |

---

### 2.3 Project Structure

```
/src
  /app
    layout.tsx
    page.tsx
    /services
      page.tsx
      /[slug]
        page.tsx
    /work
      page.tsx
      /[slug]
        page.tsx
    /work-with-us
      page.tsx
    /about
      page.tsx
    /blog
      page.tsx
      /[slug]
        page.tsx
    /admin
      page.tsx
      /dashboard
        page.tsx
      /new
        page.tsx
      /edit
        /[slug]
          page.tsx
    /api
      /leads
        route.ts
      /contact
        route.ts
  /components
    /layout
      Header.tsx
      Footer.tsx
      CursorProvider.tsx
      LenisProvider.tsx
    /ui
      Button.tsx
      SectionLabel.tsx
      Tag.tsx
  /lib
    /supabase
      client.ts
      server.ts
    github.ts
    posts.ts
  middleware.ts
/content
  /posts
/public
```

---

### 2.4 Environment Variables

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://gfeupqyepvvozeyytfuj.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **REGENERATE.** Old key was exposed in chat. |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase dashboard. Never expose to client. |
| `GITHUB_PAT` | Personal access token. `repo` scope required. |
| `GITHUB_REPO_OWNER` | `byahmadfarooq` |
| `GITHUB_REPO_NAME` | `helvetiqa` |

Never commit `.env.local`. All vars must also be set in Vercel dashboard.

---

### 2.5 Supabase Schema

#### Table: `leads`

```sql
id          uuid primary key default gen_random_uuid()
email       text not null
source      text not null
created_at  timestamptz default now()
```

#### Table: `contact_submissions`

```sql
id          uuid primary key default gen_random_uuid()
name        text not null
email       text not null
message     text
source      text not null
services    text[]
how_found   text
created_at  timestamptz default now()
```

#### RLS Policies

- Anon: `INSERT` on `leads` and `contact_submissions`
- Authenticated: `SELECT` on all tables
- No public `SELECT`. Never expose data to anonymous visitors.

---

### 2.6 Auth & Admin Middleware

Supabase email/password auth. Admin user created manually in Supabase dashboard - no sign-up flow.

`/src/middleware.ts` protects all routes matching `/admin/:path*`. Missing or expired session redirects to `/admin`.

---

### 2.7 CMS: GitHub API Blog

| Concern | Spec |
|---|---|
| Mechanism | Markdown committed to `/content/posts/{slug}.md` via GitHub API using PAT |
| Frontmatter fields | `title`, `date` (YYYY-MM-DD), `excerpt`, `slug`, `category`, `published` (bool), `readTime` (auto) |
| Read time | `Math.ceil(wordCount / 200)`. Not editable. |
| Slug check | Before publish, check GitHub for existing file. Warn if exists. |
| Edit flow | Fetch file content, decode base64, pre-fill form. On save: `PUT` with SHA. |
| Delete | `DELETE` with SHA. Requires confirmation modal. |

---

### 2.8 Animation System

| Concern | Spec |
|---|---|
| Library | GSAP + ScrollTrigger |
| Smooth scroll | Lenis wrapping full layout. Synced with GSAP ticker. |
| Scroll reveal | Opacity 0 to 1, y 30 to 0. Duration 0.7s, power2.out. |
| Stagger | 0.12s between grid/list children |
| Page transition | Fade out on navigate, fade in on arrive. 0.3s. |
| Nav hover | Underline slides from left via `scaleX` transform 0 to 1 |
| Button hover | `scale: 1.02`, transition 0.2s ease |
| Service rows | Smooth height transition on expand. No jump. |
| No-go | No blobs. No particles. No GPU-heavy parallax. |

---

### 2.9 Custom Cursor

| Concern | Spec |
|---|---|
| Implementation | `CursorProvider` wrapping `layout.tsx` |
| Dot | 8px. Filled `#E8341A`. Exact mouse tracking. |
| Ring | 36px. 1.5px border `#0A0A0A`. Transparent fill. ~80ms lerp lag. |
| Hover links/CTAs | Dot scales 0. Ring scales 60px, lime fill 20% opacity. |
| Hover dark sections | Ring and dot switch to white. |
| Mobile | Hidden via `pointer: coarse` media query. |

---

### 2.10 Navigation

| Slot | Spec |
|---|---|
| Left | `h.` logo. Links to `/`. |
| Center | Work With Us, Services (dropdown: 7 slugs), Work, Blog, About |
| Right | "Book a Call" - bg `#C8F135`, black text, `rounded-none` → `/work-with-us` |
| Mobile | Hamburger → full screen overlay, black bg, white Bebas Neue, close on nav click |
| Scroll state | `border-bottom: 1px solid rgba(0,0,0,0.08)` on scroll > 0 |

---

### 2.11 Performance & SEO

- All images: `next/image` with `width`, `height`, `alt`, `loading="lazy"` (below fold)
- Hero image: `loading="eager"`, `fetchPriority="high"`
- Every page exports `generateMetadata()` with title, description, openGraph, twitter, canonical
- JSON-LD schema: Person on `/` and `/about`. Blog on `/blog`. BlogPosting on `/blog/[slug]`.
- `robots.txt`: index all except `/admin/*`
- `@vercel/speed-insights` in root layout
- No blocking scripts in `<head>`. GSAP loaded client-side only.

---

### 2.12 Accessibility

- All interactive elements keyboard-focusable
- ARIA labels on all icon-only buttons and SVG elements
- `role="list"` on all `ul` elements
- `aria-expanded` on dropdowns and accordion rows
- Skip-to-main-content as first focusable element in layout
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- Focus ring always visible - never `outline: none` without replacement

---

### 2.13 Deployment Checklist

Run before every production deploy.

- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` regenerated and updated in Vercel
- [ ] All 6 env vars set in Vercel dashboard
- [ ] Supabase RLS policies active on both tables
- [ ] Admin user created in Supabase Auth dashboard
- [ ] GitHub PAT has `repo` scope and is not expired
- [ ] `npm run build` passes with zero errors and zero warnings
- [ ] All pages tested at 375px and 1440px
- [ ] Custom cursor hidden on touch devices
- [ ] All forms submit and save to Supabase correctly
- [ ] Cal.com embed loads on `/work-with-us`
- [ ] Admin login works. Unauthenticated `/admin/dashboard` redirects to `/admin`
- [ ] Blog create/edit/delete tested end to end
- [ ] No console errors in production build
- [ ] `robots.txt` live and correct
