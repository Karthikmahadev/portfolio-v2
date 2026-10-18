# Portfolio v2 | Karthik Mahadev

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=githubpages)](https://karthikmahadev.github.io/portfolio-v2/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Interactive-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Personal developer portfolio showcasing production systems, end-to-end full-stack architectures, and frontend engineering metrics. Built with a focus on fluid interactive micro-interactions, responsive design, and smooth motion choreography.

---

## ⚡ Tech Stack & Architecture

- **Core:** [React.js](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), PostCSS
- **Motion & Interactions:**
  - **GSAP (GreenSock):** Scroll-triggered narrative reveals, pin sequences, and timeline orchestration.
  - **Framer Motion:** Component-level physics, layout transitions, and interactive hover states.
- **Deployment:** GitHub Pages / Vercel with automated CI deployment workflows.

---

## 🚀 Featured Systems Highlighted

1. **The Relish Jar** *(Aug 2026 – Present)*
   - Full-stack production e-commerce platform built end-to-end using Next.js, Supabase/PostgreSQL, and Razorpay webhook integrations.
2. **BB FleetTracker** *(Dec 2025 – Jul 2026)*
   - Live multi-tenant GPS fleet-tracking SaaS serving drivers, parents, and schools with RBAC, PostgreSQL Row-Level Security, and Google Play Store deployment.
3. **Origa.market** *(Jun 2024 – Sep 2025)*
   - Production B2B e-commerce platform. Implemented 35–40% page load optimizations, PhonePe payment gateways, and Algolia catalog search.
4. **FinSight** *(Personal Project)*
   - Full-stack financial analytics platform tracking transaction patterns, per-user data isolation, and automated statement insights.

---

## 🛠️ Project Structure

```text
portfolio-v2/
├── public/              # Static assets, icons, and PDF resume
├── src/
│   ├── assets/          # Project screenshots and branding SVGs
│   ├── components/      # Modular UI components (Hero, Work, Stats, Contact)
│   ├── data/            # Project metrics and experience configurations
│   ├── styles/          # Tailwind setup and global CSS variables
│   ├── App.jsx          # Motion providers and layout orchestration
│   └── main.jsx         # Application entry point
├── tailwind.config.js   # Custom spacing, colors, and layout extensions
└── vite.config.js       # Asset resolution and fast-refresh build setup
