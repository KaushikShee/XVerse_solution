# XVerse Solutions — Modern Software Development Agency

A fully functional, modern, responsive software development agency website with a **custom-built admin panel** to manage all website content dynamically.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🌐 Public Website
- **Homepage** — Hero section with animations, stats counter, services grid, project showcase, testimonials, CTA
- **About** — Company info, mission/vision, team members grid
- **Services** — Full service offerings with hover effects
- **Portfolio** — Project cards with gradient backgrounds
- **Blog** — Dynamic blog with individual post pages
- **Contact** — Functional contact form with submission storage

### 🔐 Admin Panel
- **Dashboard** — Stats overview and quick actions
- **Homepage Editor** — Edit ALL website text content from one place
- **Services CRUD** — Add, edit, delete services
- **Projects CRUD** — Manage portfolio with color pickers & tags
- **Team CRUD** — Manage team members with avatar customization
- **Testimonials CRUD** — Manage client reviews with star ratings
- **Blog CRUD** — Create/edit posts with draft/published status
- **Messages** — View contact form submissions

### 🎨 Design
- Dark theme with indigo-violet-cyan gradient palette
- Scroll-reveal animations & floating elements
- Glassmorphism effects
- Fully responsive (mobile, tablet, desktop)
- Manrope typography from Google Fonts

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + Custom CSS
- **Authentication:** JWT (bcryptjs + jsonwebtoken)
- **Database:** JSON file-based (local) / In-memory (serverless)
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/KaushikShee/XVerse_solution.git
cd XVerse_solution
npm install
```

### Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Admin Access
- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@xverse.com`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Complete design system
│   ├── sections/                   # Homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/page.tsx & [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── admin/
│   │   ├── page.tsx                # Login page
│   │   └── (dashboard)/           # Protected admin routes
│   │       ├── layout.tsx
│   │       ├── dashboard/
│   │       ├── homepage/
│   │       ├── services/
│   │       ├── projects/
│   │       ├── team/
│   │       ├── testimonials/
│   │       ├── blog/
│   │       └── messages/
│   └── api/                        # API routes
│       ├── auth/ (login, logout, me)
│       ├── services/
│       ├── projects/
│       ├── team/
│       ├── testimonials/
│       ├── homepage/
│       ├── blog/
│       └── contact/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RevealOnScroll.tsx
│   └── AnimatedCounter.tsx
└── lib/
    ├── db.ts                       # Database layer
    └── auth.ts                     # JWT authentication
```

## 🌍 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `JWT_SECRET` — Your secret key
   - `ADMIN_EMAIL` — Admin email
   - `ADMIN_PASSWORD` — Admin password
4. Deploy!

> **Note:** On Vercel, the database runs in-memory mode with seed data. For persistent data, integrate Firebase Firestore by updating `src/lib/db.ts`.

## 📄 License

MIT License — feel free to use for your own projects.

---

Built with ❤️ by XVerse Solutions
