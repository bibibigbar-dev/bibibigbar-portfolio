# Living in Dallas

Community hub for people settling into Dallas–Fort Worth life. Browse topic boards, write posts, and manage content from separate member and admin workspaces.

## Features

- Main landing page branded as **Living in Dallas**
- Multiple topic boards (Free Talk, Living Tips, Housing, Food, Jobs, Marketplace, Q&A)
- Member area (`/my`) for writing and managing your own posts
- Admin console (`/admin`) for boards, moderation, and user roles
- Cookie-based auth with demo accounts

## Demo accounts

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@dallas.local  | admin1234 |
| User  | user@dallas.local   | user1234  |

## Tech stack

- Next.js 15 App Router + React + TypeScript
- Tailwind CSS + custom design tokens
- Server Actions + JSON file store (`data/store.json`)
- JWT session cookies (`jose` + `bcryptjs`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- The first run seeds `data/store.json` automatically.
- This store is intended for local / demo use. For production, swap it for a real database (e.g. Supabase / Postgres).
- GitHub Pages static export was removed because writing posts requires a Node server.
