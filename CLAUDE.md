@AGENTS.md

# Studio Rocinante — Project Overview

## ⚠️ This is the repo that pushes to GitHub

This folder (`/home/kodd/studiorocinantehomepage`) is tracked in git and its `origin` remote points to `Koddulfsen/studiorocinantehomepage` on GitHub. There is a similarly-named but separate, untracked working folder at `/home/kodd/studiorocinante` — changes made there do NOT get pushed unless replicated here. Always double-check `pwd` and `git remote -v` before committing/pushing.

## What this is

Studio Rocinante is a Toronto-based web design studio (Quixote = the human, Rocinante = the AI). The studio has two layers:

1. **The studio's own website** — already built, four design directions (Trail, Manuscript, Main, Horizon) living at `/trail`, `/manuscript`, `/main`, `/horizon`. These showcase Rocinante's style and act as the portfolio/credibility layer.

2. **Client template system** — restaurant and cafe websites built as demo pages. The goal is cold outreach at volume: find Toronto businesses without a website (or with a bad one), drop their info into a template, generate a preview page at `studiorocinante.com/[business-slug]`, screenshot it, and email them. The page looks hand-built for them — they have no idea it's a template.

## The template library

Templates are defined by two axes:

**Archetype** (what the site sells you on): Food Closeup · Atmosphere · Story · Bold Graphic · Minimal

**Subcategory** (visual language): Noir · Broadsheet · Polaroid · Market · Neon · Manor · Corner · Marquee

See `/docs/templates.md` for the full breakdown and the 9 planned combos.

## What's built so far

### Studio site
- `/` — gallery of all studio templates
- `/trail`, `/manuscript`, `/main`, `/horizon` — four studio design directions

### Client templates (Food Closeup + Noir)
Three layout variations, all using a fictional restaurant "Maro" (upscale Italian, 342 King St W, Toronto) as placeholder content:

- `/noir-obsidian` — Cinematic. Each dish gets its own full-screen frame. Fixed nav, gold accents, scrolling through 5 dish scenes.
- `/noir-velvet` — Editorial split-screen. Left image / right text hero, story section, menu grid, gold line accents.
- `/noir-ember` — Big title card entry. Restaurant name fills the screen, then amber-red warmth as you scroll. Aggressive and confident.

All three use CSS gradient placeholders where client photos will go. Real photos drop in by replacing the `background` values.

## Outreach workflow (planned)

1. Find Toronto restaurant/cafe on Google Maps with no/bad website
2. Pull their name, address, hours, cuisine, photos
3. Pick 3 fitting templates from the library
4. Generate a page at `/[business-slug]` with their real info
5. Screenshot each template (Puppeteer)
6. Send cold email: screenshots embedded + live link
7. They click, land on their "custom" page, click the header → studio landing page

## Key design decisions

- Templates use CSS radial gradients as photo placeholders — warm amber center fading to near-black simulates lit food photography
- Photo-forgiving templates (Noir, Broadsheet, Neon, Manor, Corner, Marquee) are prioritized since Google Maps photos are often low quality
- The `/[business-slug]` URL looks personal and hand-built — no visible signs of mass production
- Fonts: Fraunces (serif), Inter (sans), JetBrains Mono, Caveat (hand) — loaded via `next/font/google` in `layout.tsx`
