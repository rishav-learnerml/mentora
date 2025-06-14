# 🚀 Mentora – Mentorship Redefined

A powerful mentorship platform designed to bridge the gap between **mentees** seeking career guidance and **mentors** ready to share their journey.  
Whether you're cracking your first job, making a career switch, or climbing the next step — **Mentora is where careers take shape.**

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Authentication**: [Clerk](https://clerk.dev)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **ORM**: [Prisma](https://www.prisma.io)
- **Database**: PostgreSQL / NeonDB (or any Prisma-supported DB)
- **Deployment**: [Vercel](https://vercel.com)
- **Fonts**: [Geist](https://vercel.com/font) via `next/font`

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mentora.git
cd mentora
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Open your browser and go to:
👉 http://localhost:3000

### 📁 Project Structure
```bash

/app            → App router pages (Next.js)
/components     → Reusable UI components
/lib            → Utility functions and helpers
/styles         → Global styles and Tailwind config
/prisma         → Prisma schema and migrations
/public         → Static assets
Modify your homepage from:
app/page.tsx
```
### 🔒 Environment Variables
Create a .env file in the root directory and add the following:

```bash
env

DATABASE_URL=your_database_url
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
🧪 Migrations (if using Prisma)
```
```bash
npx prisma migrate dev --name init
```

### 🌍 Live Demo

Hosted with ❤️ on Vercel

👉 mentora.vercel.app (soon to be replaced with actual URL 🚀)

📚 Learn More
📘 Next.js Documentation

🎨 Tailwind CSS Docs

🔐 Clerk Authentication

🧠 Prisma ORM Docs

🎯 Lucide Icons

🙌 Contributing

We welcome contributions from developers, mentors, mentees, and anyone passionate about creating better access to career guidance.
Pull requests, issues, and feedback are always appreciated.

To contribute:

Fork the repo

Create a feature branch

Submit a pull request 🚀

### 🧾 License
MIT © Rishav Chatterjee

Built with 💡 by mentors, for the future makers.