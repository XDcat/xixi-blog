---
name: yuque-mdx-fix
description: Repair Markdown/MDX exported from Yuque or similar editors when Docusaurus build fails due to JSX/style/HTML compatibility issues. Use when imported docs need style-string conversion, batch fixes, or repeatable build/debug workflows for site content.
---

# Yuque MDX Fix

## Purpose

Repair exported Markdown/MDX so Docusaurus can build it reliably.

## Workflow

1. Run `npm run build` to confirm the failure is real.
2. If the problem is common or repeated, create or update a script under `scripts/` and use it to batch-fix the docs.
3. If the problem is isolated or small, edit the affected file directly.
4. Use `git` to roll back risky changes when an attempt goes wrong.
5. Re-run `npm run build` after each fix until the build passes.
6. Record the issue and the fix in `README.md`.

## What this skill handles

- Yuque-exported content that breaks Docusaurus/MDX parsing
- `style="..."` or `style='...'` values that must become JSX object syntax
- External image links in exported docs that need to be downloaded into the project and rewritten to local paths
- Repeated fixes across `docs/AI-技术分享/`
- Creating new scripts or modifying existing scripts when no safe reusable script exists yet

## Bundled scripts

- `scripts/fix_yuque_font_style.py`
- `scripts/fix_yuque_images.py`

### `scripts/fix_yuque_font_style.py`

Solve the common Yuque export problem where inline `style="..."` or `style='...'` values break Docusaurus/MDX parsing. Run it manually from the repo root:

```bash
python3 .skill/yuque-mdx-fix/scripts/fix_yuque_font_style.py
```

It scans `docs/AI-技术分享/` and rewrites matching `style` strings into JSX object syntax in place so the next `npm run build` can validate the result.

### `scripts/fix_yuque_images.py`

Solve the Yuque export problem where remote image URLs may not render reliably in Docusaurus because of cross-origin or external asset issues. Run it manually from the repo root:

```bash
python3 .skill/yuque-mdx-fix/scripts/fix_yuque_images.py
```

It scans `docs/AI-技术分享/`, downloads remote images into `static/images/yuque/`, and rewrites the Markdown image links to local paths so the next `npm run build` can validate the result.

Use these scripts as reusable examples and starting points for future Yuque/MDX repair scripts, but do not treat them as the only allowed fix path.

## Notes

- Do not use this skill as a general blog-writing rule set.
- Prefer the smallest safe change when only one file is affected.
