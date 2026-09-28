# THE CHRONICLES

### An interactive world history timeline — 5,500 years from Ādam AS to the present, read side by side across the world

**By Chaudhry Muhammad Rayyan Shahid**

**▶ Live site: [rayyan200103.github.io/THE-CHRONICLE](https://rayyan200103.github.io/THE-CHRONICLE/)**

---

> *"I wish there was a website that could showcase all the major events of history, where a curious person could understand it all by looking at that one platform."*
>
> — the conversation in Norwich, England, on the night of 5 April 2026, from which The Chronicles began

Scroll **down** and the centuries pass. Scroll **across** and you cross the world within a single moment — what was happening in Arabia alongside China, West Africa, Mesoamerica, the Nordic north, the Subcontinent and Europe. Every cell opens into a sourced entry, and where a single cell cannot carry the weight of an event, the timeline opens outward into full companion works of their own.

---

## At a glance

| | The Chronicles |
|---|---|
| **Timeline entries** | 550 sourced event cells |
| **Structure** | 25 columns in 9 bands — one thematic band and eight world regions |
| **Span** | 3800 BCE to 2026 CE, with two deep-time overview entries reaching further back |
| **Calendar** | Dual — BCE/CE and AH, side by side, so no civilisation keeps time by another's reckoning |
| **Companion documents** | *Before Adam* · *Karbala* · *Comparative Religion* · *About the Author* |
| **Search** | *Ask Rayyan* — one search across all 607 entries in the timeline and the companion documents |
| **Views** | Laptop, phone portrait and phone landscape, each with its own layout |
| **Build** | Hand-written HTML, CSS and JavaScript — no framework, no build step, no backend |
| **Updates** | Weekly |

---

## The repository

```
THE-CHRONICLE/
├── index.html                  The Chronicles — the main timeline            (~1.8 MB)
├── before_adam.html            Before Adam — creation before humanity        (~390 KB)
├── karbala.html                Karbala — the full sourced account            (~120 KB)
├── comparative_religion.html   Comparative Religion — the traditions         (~575 KB)
├── AboutMe.html                The author                                    (~1.0 MB)
├── .nojekyll                   Tells GitHub Pages to serve the files as-is   (empty)
└── README.md                   This file
```

Every page is a single self-contained file. Styles, scripts, map geometry and icons are embedded; the only external request is for web fonts.

---

## The main timeline — `index.html`

### How it is organised

The world is divided into **nine bands**. The first is thematic — the disciplines that cut across every region. The remaining eight are geographic.

| Band | Columns |
|---|---|
| **Divine Knowledge · International Politics · Philosophy & Discovery** | Prophets & Revelation · Islamic Caliphates & Battles · Islamic Scholarship · Christianity Scholarship & History · Jewish Scholarship & History · International Relations & Politics · Science, Philosophy & Discovery |
| **Middle East** | Arabia & Hejaz · Levant · Persia & Iran |
| **Africa** | North Africa · West & Central Africa · East & Southern Africa |
| **South Asia** | Indian & Pakistani Subcontinent · Sri Lanka, Nepal & Maldives |
| **East & Southeast Asia** | East Asia · Southeast Asia & Pacific |
| **Central Asia** | Central Asia & Steppes |
| **Europe** | Western Europe · Eastern Europe & Russia · Scandinavia & Nordic |
| **The Americas** | North America · Mesoamerica & Caribbean · South America |
| **Oceania** | Australia, New Zealand & Pacific Islands |

A fixed year spine runs down the left edge and stays aligned with the rows as you scroll. **22 era filters** — from *Ancient World* and *Axial Age* through the *Rashidun*, *Umayyad* and *Abbasid* periods, the *Crusades*, *Mongol*, *Ottoman* and *Mughal* eras, to the *World Wars*, *Cold War* and *Contemporary* — narrow the timeline to a single period.

### The cells

Each cell carries a type — Battle, Prophet, Revelation, Caliphate, Dynasty, Madhab/School, Empire, Discovery, Civilisation, Accord/Treaty, Independence, Institution, Geopolitics, Holy Book, Figure or City — and opens into a full entry with both calendars, the narrative, and its sources.

Three families of cells carry their own colour so they read as a set:

- **Emerald** — *★ The Prophets*, the complete prophetic register that heads the Prophets & Revelation column
- **Illuminated gold** — the hadith-compilation corpus, from the earliest written *ṣaḥīfas* to the post-canonical collections
- **Royal purple** — the four schools of Islamic law

### The prophetic register and the globe

The first cell of the timeline holds:

- **All known prophets, Ādam AS → Ibrāhīm AS → Muḥammad ﷺ‎** — 44 figures in the traditional chronological sequence, in English and Arabic. The five to whom the Qur'an names a revealed book — Ibrāhīm, Mūsā, Dāwūd, ʿĪsā and Muḥammad ﷺ‎ — are marked as messengers.
- **The complete register** — 48 entries across three tables in Arabic, Hebrew, Greek and English: the 25 named in the Qur'an, 7 whose prophethood is debated, and 16 prophets of the Hebrew Bible.
- **An interactive globe** — genuine Natural Earth coastlines and borders, with terrain banded from the polar ice to the equatorial forest. It carries all 25 Qur'anic prophets as luminous points. Drag to rotate, scroll or pinch to zoom (1× to 7×), and tap a point to open its record: the people sent to, the land as it was then called, where that is today, the language of the message, when, and how the life ended — each with a note on the strength of the evidence. A row of chips flies directly to any prophet.

### Moving through it

- **The overture** — the opening page: a night sky of more than a thousand stars over a dark chocolate-and-wine ground. Stars bloom where you click, and constellation lines surface as the cursor passes. *Tap for Introduction* opens the full origin story.
- **Scroll to see the world** — a compass in the header with an arrow on each side. Tap to move one screen; press and hold to glide continuously in that direction.
- **Ask Rayyan** — see below.

---

## Ask Rayyan

A search assistant that reads the whole corpus at once: all 550 timeline cells and 57 entries drawn from the four companion documents — 607 in total.

Ask in plain words and it returns the best-matching entry, says where in the site it lives, quotes the relevant passage, and lists every other place the subject is covered. Results from the companion documents link straight to the exact chapter.

Where a question falls outside everything The Chronicles holds, it says so plainly and points to Claude and the specialist literature instead.

**How it works:** Ask Rayyan runs entirely in the reader's browser. It is a weighted keyword and synonym search over the site's own text — not a language model. No question is sent anywhere.

---

## The companion documents

### Before Adam — `before_adam.html`

Everything that unfolded before humanity was placed on the earth: 13.8 billion years of cosmic, geological and human history, read alongside the Qur'an, Hadith and the Bible.

| Chapters | Movement |
|---|---|
| 1 – 6 | **The unseen** — Allah before all creation; the Pen and the Preserved Tablet; the Throne, the waters and the seven heavens; the angels; the jinn; Iblis |
| 7 – 10 | **The cosmos** — space, time and first matter; first light; the forging of the elements in the stars; the earth takes shape |
| 11 – 19 | **The earth prepared** — the six stages; water and first life; the four eons; from one cell to many; the great diversification; the five great extinctions; the hominin line; the threshold of mind |
| 20 – 27 | **Ādam AS** — was there mankind before Ādam; the announcement of the *khalīfah*; the clay; the breath, the names and the prostration; Ḥawwāʾ AS; the Trust, the Tree and the descent; where they landed; the lineage to Nūḥ AS |
| 28 – 32 | **The reckoning** — the two accounts side by side; where scholars genuinely differ; other traditions; the full correlated timeline; conclusion |
| — | **Evidence tiers and the full bibliography** |

### Karbala — `karbala.html`

The full sourced account of 10 Muḥarram 61 AH / 10 October 680 CE: a mind map and a note on method, then nine parts — the causes; the road to Karbala; the siege; the Day of ʿĀshūrāʾ; the captivity and Yazīd's court; the political aftermath; Shia theological significance and the Imamate; ritual practice; and the Sunni perspective — with family trees, a visual timeline and a quick-sourcing index. Opened from the Karbala cell on the timeline.

### Comparative Religion — `comparative_religion.html`

The living traditions in their own vocabulary, with graded sources, in seven parts: *The Field and the Landscape* · *The Abrahamic House — One God, Three Accounts* · *The Dharmic Traditions* · *Older, Newer, and Off the Map* · *Side by Side, and the Case Stated* · *What to Do With All of This* · *Apparatus* — followed by the bibliography.

### About the Author — `AboutMe.html`

The profile of the author.

---

## The sourcing standard

The Chronicles distinguishes what the sources say from what later tradition says about them, and says which is which.

- **Evidence is tiered.** Tier 1 is scripture and *ṣaḥīḥ* hadith; Tier 2 the classical documentary sources; Tier 3 modern critical scholarship and weaker transmitted material; Tier 4 contested claims, cited only with the caveat attached.
- **Hadith are cited with their grade**, not merely their collection — *ṣaḥīḥ*, *ḥasan*, *ḍaʿīf* or *mawḍūʿ* — because the grade belongs to the hadith, not the book.
- **Dates are given as ranges where the evidence is a range.** No scripture dates any prophet before Mūsā AS, and the timeline says so rather than inventing precision. Tentative dates are marked as such.
- **Disputes are presented as disputes.** Where Sunni and Shia readings, or Muslim and Christian ones, genuinely differ, both are stated and neither is resolved in the author's favour.

---

## Technical notes

| | Implementation |
|---|---|
| **Stack** | Vanilla HTML, CSS and JavaScript. No framework, no dependencies, no build step. |
| **Hosting** | GitHub Pages, served as static files. |
| **External requests** | Google Fonts only — *Cinzel*, *EB Garamond* and *JetBrains Mono*. |
| **Map data** | Natural Earth 1:110m land and boundaries, embedded directly — the globe works offline. |
| **Rendering** | The overture sky and the globe are drawn on `<canvas>`, with static layers cached so each frame repaints only what moves. |
| **Performance** | The timeline scroll is profiled at a steady 60 fps. Paint containment isolates each scrolling surface, and the timeline is taken out of the paint tree while the overture is showing. |
| **Responsive** | Three layouts — laptop, phone portrait and phone landscape. |
| **Accessibility** | Keyboard control of the introduction, header compass and globe; ARIA labels and states on interactive controls; `prefers-reduced-motion` respected throughout. |
| **Browsers** | Current Chrome, Edge, Safari and Firefox. |

---

## Deploying an update

1. Open the repository on GitHub → **Add file → Upload files**.
2. Drop in the changed file or files, keeping the file names exactly as they are.
3. Commit to `main`.
4. Wait about two minutes for **Actions → pages build and deployment** to show a green tick.
5. Check the live site in a **private / incognito window** — GitHub's CDN and the browser both cache aggressively, and a normal refresh can keep showing the old version.

**`.nojekyll` must stay in the repository root.** It tells GitHub Pages to serve these hand-written files exactly as they are, rather than passing them through Jekyll. Without it, Pages can build the site from `README.md` instead and show this file in place of the timeline. The file is intentionally empty.

**Pages settings:** *Settings → Pages → Build and deployment* should read **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**.

**File names are links.** The pages link to one another by exact file name — `before_adam.html`, `karbala.html`, `comparative_religion.html`, `AboutMe.html`. Renaming any of them breaks the links to it.

---

## Credits

- **Map data** — [Natural Earth](https://www.naturalearthdata.com/), public domain; converted from the [world-atlas](https://github.com/topojson/world-atlas) TopoJSON distribution (ISC licence).
- **Typefaces** — Cinzel, EB Garamond and JetBrains Mono, via [Google Fonts](https://fonts.google.com/) (SIL Open Font Licence).
- **Sources** — the scriptural, hadith, classical and modern works cited are listed within each entry and in the bibliographies of the companion documents.

---

## Author

**Chaudhry Muhammad Rayyan Shahid**

International relations and development professional. MA Global Development, University of East Anglia; BSc International Relations, Bahria University Islamabad.

[About the author](https://rayyan200103.github.io/THE-CHRONICLE/AboutMe.html)

---

*The Chronicles is a never-ending historical platform — to put history into perspective, and the dynamics of the contemporary world into understanding.*

© 2026 Chaudhry Muhammad Rayyan Shahid. All rights reserved.
