# Ahmad Raza — Portfolio

Soft neumorphic one-page portfolio: light/dark toggle styled after the reference
switch, and an admin panel with real persistent storage so you can add/edit/delete
projects, experience, research, stats, and view contact form submissions — **without
ever touching code.**

---

## 🎨 Design system

| Token | Light | Dark |
|---|---|---|
| Background | `#F4F5F8` | `#3E4256` |
| Track (toggle) | `#D8DCE8` | `#31364A` |
| Accent (Lime — Control Systems) | `#C8F000` | `#C8F000` |
| Ink (text) | `#2D3142` | `#F4F5FA` |

Every surface — cards, buttons, inputs, the nav — is carved from the same
background color using dual soft shadows (light top-left, dark bottom-right),
never a different fill color. That's what makes it "neumorphic." All of this
lives in `app/globals.css` as CSS custom properties + utility classes
(`.neu`, `.neu-sm`, `.neu-lg`, `.neu-inset`, `.neu-btn`, `.neu-field`, `.neu-chip`…),
so retheming is a find-and-replace in one file.

**To swap the accent color** (e.g. to Royal Blue or Teal from your theme doc),
edit `--accent`, `--accent-hover`, `--accent-light`, `--accent-text` in both the
`:root` and `.dark` blocks at the top of `app/globals.css`.

Fonts: **Space Grotesk** (display/headings) + **Inter** (body), loaded via Google
Fonts in `app/layout.tsx`.

---

## 🧠 How the admin panel works

Click the shield icon in the nav. Default password is `AhmadRaza@2025` — **change
it** via the `ADMIN_PASSWORD` environment variable (see setup below).

Once logged in, five tabs:

- **Projects** — add / edit / delete. Fields: title, category, description, link,
  optional image URL, tags, accent color, featured toggle.
- **Experience** — add / edit / delete. Fields: company, role, **period, duration**
  (so bumping "10 months" → "1 year" next year is a text edit, not a redeploy),
  location, type, description, highlights, color.
- **Research** — same pattern, for papers.
- **Stats** — the four hero numbers (Projects Completed, Client Satisfaction, etc).
- **Messages** — every contact-form submission lands here, with a one-click
  "reply by email" button and delete.

Data is fetched server-side on every page load (`app/page.tsx` is marked
`force-dynamic`), so anything you add in the admin panel appears for **every
visitor immediately** — no redeploy needed.

### Before storage is configured

The site works immediately after deploy even with zero setup — it reads from the
seed data in `lib/data.ts`. The admin panel will say so and disable Add/Edit/Delete
until you connect storage (takes about 2 minutes, below).

---

## 🚀 Deploy to Vercel

### 1. Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Ahmad Raza portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Import into Vercel

[vercel.com](https://vercel.com) → **New Project** → import the repo → **Deploy**.
The site will go live right away, running on seed data.

### 3. Add persistent storage (2 minutes)

This is what makes the admin panel actually save changes.

**Easiest — Vercel's own dashboard:**
1. Open your project in Vercel → **Storage** tab → **Create Database** → **Redis**
   (Upstash-backed, free tier).
2. Click **Connect to Project**. Vercel automatically injects the right
   environment variables — you don't need to copy anything.
3. Go to **Deployments** → redeploy (or just push any commit).

**Alternative — Upstash directly:**
1. Create a free database at [console.upstash.com](https://console.upstash.com).
2. Copy the **REST URL** and **REST Token**.
3. In Vercel: **Settings → Environment Variables**, add
   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
4. Redeploy.

### 4. Set your own admin password + session secret

In Vercel: **Settings → Environment Variables**:

```
ADMIN_PASSWORD=<pick something only you know>
SESSION_SECRET=<random string — generate with: openssl rand -hex 32>
```

Redeploy after adding these.

---

## 🛠️ Local development

```bash
npm install
cp .env.example .env.local   # fill in values if you want storage working locally
npm run dev
```

Open `http://localhost:3000`.

---

## 📁 Structure

```
app/
  layout.tsx, page.tsx        Server component — fetches all content, passes to PortfolioApp
  globals.css                 The entire neumorphic design system
  api/
    auth/login|logout|me      Password check, HMAC-signed session cookie
    content/[collection]      Generic CRUD for projects / experience / research
    content/[collection]/[id] Update / delete a single item
    stats                     Site stats singleton
    messages                  Contact form inbox
components/
  Navbar, Hero, About, Skills, Experience, Projects, Research, Contact, Footer
  NeuToggle.tsx                The light/dark switch, pixel-matched to your reference
  AdminPanel.tsx                Login shell + tabs
  admin/
    CollectionManager.tsx       Generic list+form CRUD UI (used by Projects/Experience/Research)
    StatsPanel.tsx, MessagesPanel.tsx
lib/
  data.ts                      Seed/fallback content + TypeScript types
  db.ts                        Redis read/write helpers, falls back gracefully if unset
  session.ts                   Stateless signed-cookie auth (no DB dependency for login itself)
```

---

## ✏️ Editing content without the admin panel

Everything in the admin panel is also just editing `lib/data.ts` by hand if you
ever prefer that — it's the same shape the API falls back to.

## 🔒 Notes on the admin auth

Sessions are a signed cookie (HMAC-SHA256, 7-day expiry), not stored server-side —
so login works even before you've set up Redis. Once `SESSION_SECRET` is set in
production, old sessions signed with the dev fallback secret are invalidated
(expected — just log in again).
