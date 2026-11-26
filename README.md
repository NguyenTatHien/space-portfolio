# hiennguyen.io.vn

Personal portfolio of **Nguyễn Tất Hiển**, full-stack developer (React · Next.js · Laravel · NestJS · practical AI).
Live at https://hiennguyen.io.vn. English and Vietnamese, with a downloadable CV.

## Stack

- Next.js 16 (App Router, standalone output), React 19, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- three.js via @react-three/fiber, drei and postprocessing (planet hero, star field, skill globe)
- framer-motion for reveal, tilt and timeline animations

## Editing content

All personal content (profile, experience, projects, skills, education, UI strings in EN/VI) lives in
[`constants/profile.ts`](constants/profile.ts). Keep it in sync with the CV in `public/Nguyen_Tat_Hien_CV.pdf`.

Project screenshots: drop `public/projects/<slug>.webp` and set `image: "/projects/<slug>.webp"` on the project.
Until then a stylised HUD mock is shown.

## Develop

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Deploy

Pushing to `main` builds `ghcr.io/nguyentathien/space-portfolio:latest` via GitHub Actions; Watchtower on the
VPS pulls the new image and Caddy serves it on hiennguyen.io.vn.

## Credits

Originally forked from [space-portfolio](https://github.com/sanidhyy/space-portfolio) by Sanidhya Kumar Verma (MIT).
Redesigned and rewritten by Nguyễn Tất Hiển. See [LICENSE](LICENSE).
