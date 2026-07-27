---
description: shadcn/ui-only components and folder-first file structure
alwaysApply: true
---

# UI & Project Structure

## shadcn/ui only — no raw UI

- **Always** import from `@/components/ui/*`. Never use raw HTML for UI primitives when a shadcn component exists.
- Use **default shadcn variants and classes** (`variant`, `size`, built-in slots). Do not invent custom Tailwind styling or one-off CSS.
- Merge extra classes only via `cn()` from `@/lib/utils` on shadcn components — never replace default component styles.
- If a shadcn component is missing, add it with the CLI (`npx shadcn@latest add <name>`) — do not hand-roll a substitute.

| Need | Use |
|------|-----|
| Button | `Button` from `@/components/ui/button` |
| Input / form fields | `Input`, `Label`, `Field` from `@/components/ui/*` |
| Layout / content | `Card`, `Separator`, `Tabs`, `Sheet`, etc. |
| Feedback | `Alert`, `Dialog`, `Sonner` toast |

```tsx
// ❌ BAD — raw HTML + custom classes
<button className="rounded bg-blue-500 px-4 py-2">Save</button>
<div className="rounded-lg border p-4 shadow">...</div>

// ✅ GOOD — default shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Button>Save</Button>
<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>...</CardContent></Card>
```

## Folder-first components

Place feature UI under `components/<feature>/`, not loose files at `components/` root.

```
components/
  dashboard/
    stats-card.tsx
    match-list.tsx
  ui/          ← shadcn primitives only (do not put feature code here)
```

- One component per file, kebab-case filename: `components/dashboard/stats-card.tsx`
- Export a named component matching the file purpose
- Pages compose feature components — pages stay thin

## App routes — route groups

Put pages under `app/(<group>)/`, not directly under `app/`.

```
app/
  (home)/
    page.tsx
  (dashboard)/
    page.tsx
    settings/
      page.tsx
  layout.tsx
  globals.css
```

- Route group name in parentheses = layout segment, not a URL path
- `app/(home)/page.tsx` → `/`
- `app/(dashboard)/settings/page.tsx` → `/settings`
- Shared layout logic goes in the nearest `layout.tsx` inside the group
