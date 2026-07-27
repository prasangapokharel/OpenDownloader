---
name: shadcn-typeset
description: Use whenever working with Markdown, MDX, blog posts, documentation, changelogs, articles, AI chat messages, release notes, knowledge bases, rendered HTML, or any rich text that should follow the official shadcn/typeset styling system.
---

# shadcn/typeset

Typeset is a lightweight CSS styling system for rendered HTML and Markdown. This project uses it for blog posts content.

## Files

- `frontend/app/typeset.css` — the CSS layer with all typeset styles
- `frontend/app/globals.css` — imports `typeset.css`
- `frontend/components/blog/blog-content.tsx` — wraps rendered markdown in `typeset typeset-reading`
- `frontend/components/blog/blog-detail.tsx` — wraps metadata in `typeset typeset-reading`

## Usage

Wrap rendered HTML content:

```tsx
<div className="typeset typeset-reading">
  {content}
</div>
```

For page metadata (title, meta, featured image) inside the same article, wrap them too:

```tsx
<article className="mx-auto max-w-3xl">
  <div className="typeset typeset-reading">
    <h1>Title</h1>
    <p>Excerpt</p>
    <img ... />
  </div>
  <div className="typeset typeset-reading">
    <BlogContent content={content} />
  </div>
</article>
```

## Presets used

| Preset | Purpose |
|---|---|
| `typeset` | Base — font, leading, flow |
| `typeset-reading` | Blog reading – same as base currently, can be tuned separately |

## Preset variables

Available CSS custom properties:

```css
--typeset-size       /* base font size */
--typeset-leading    /* line-height */
--typeset-flow       /* spacing between block elements */
--typeset-font-body  /* body font family */
--typeset-font-heading /* heading font family */
--typeset-font-mono  /* monospace font family */
```

## Opt out

For interactive widgets inside a typeset container:

```tsx
<div className="not-typeset">
  <Button>Click</Button>
</div>
```

## Table scrolling

Tables are wrapped in `typeset-scroll` for responsive overflow:

```tsx
<div className="typeset-scroll">
  <table>...</table>
</div>
```
