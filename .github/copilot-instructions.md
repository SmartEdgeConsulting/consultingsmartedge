## Purpose

This file gives concise, actionable guidance to AI coding agents working on the SmartEdge Next.js app so they can be productive immediately.

## Quick summary / big picture

- Framework: Next.js (app directory) — project uses the app/ router and server/client components pattern.
- React 19 + TypeScript (strict true). Tailwind CSS (v4) is used for styling; UI bits scaffolded by shadcn (`components.json`).
- Key folders: `app/` (pages/layouts), `lib/` (utilities, e.g. `lib/utils.ts` contains `cn()`), `public/` (static assets), `components/` (shadcn components alias).

## Important files to check first

- `package.json` — dev scripts: `npm run dev` (runs `next dev --webpack`), `build` and `start`.
- `tsconfig.json` — path aliases: `@/*` => `./*`.
- `components.json` — shadcn UI config and aliases (e.g. `"components": "@/components"`, `"lib": "@/lib"`).
- `app/page.tsx`, `app/layout.tsx`, `app/globals.css` — entry UI and global styles.
- `lib/utils.ts` — helper `cn(...inputs)` uses `clsx` + `tailwind-merge`; prefer it for merging Tailwind classes.

## Developer workflows / commands

- Local dev: `npm run dev` (starts Next dev server on :3000). The scripts include `--webpack` flags — keep them unless there's an intentional migration away from the legacy webpack behavior.
- Build: `npm run build` then `npm run start` for production.
- Linting: `npm run lint` (uses `eslint`). Check `eslint.config.mjs` for project rules.

## Project-specific patterns and conventions

- Tailwind-first styling. Use `lib/utils.ts`'s `cn()` to combine classes instead of raw string concatenation. Example:

  import { cn } from "@/lib/utils";
  <div className={cn("p-4", isActive && "bg-blue-500")}>...

- Component aliases and imports use `@/` path (set in `tsconfig.json`). Prefer absolute `@/...` imports for shared code.
- UI components are scaffolded with shadcn; check `components.json` and `components/` for patterns and naming.
- Images use `next/image` and live in `public/` (e.g. `src="/next.svg"` in `app/page.tsx`).

## Integration & dependencies to be aware of

- `next` v16, `react` 19. Tailwind v4 and `@tailwindcss/postcss` present. `lucide-react` is used for icons.
- class-variance-authority and `tailwind-merge` are present — follow these libraries' patterns when writing reusable component APIs that accept className.

## Editing & PR guidance for agents

- Keep changes small and self-contained. When editing layout/routes, update `app/layout.tsx` and `app/page.tsx` together if necessary.
- Respect TypeScript `strict` settings and `paths` aliases. Run `npm run build` locally after non-trivial TS or config changes.

## Where tests and CI would live

- There are no tests or CI configs detected. If you add tests, prefer a lightweight runner and add scripts to `package.json`.

## If you need to modify build config

- `next.config.ts` is currently minimal — only change it when you understand Vercel/Next build implications. Verify `npm run build` succeeds after edits.

---

If anything above is unclear or you'd like this file to include examples of common refactors (e.g. adding a new shadcn component or wiring a new API route), tell me which area and I'll expand with step-by-step snippets.
