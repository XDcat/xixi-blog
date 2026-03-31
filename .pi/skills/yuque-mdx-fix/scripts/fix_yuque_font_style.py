#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path('/home/xdcat/code/xixi-blog/docs/AI-技术分享')
STYLE_RE = re.compile(r'style\s*=\s*("([^"]*)"|\'([^\']*)\')')


def fix_style_value(style: str) -> str:
    parts = []
    for chunk in style.split(';'):
        chunk = chunk.strip()
        if not chunk:
            continue
        if ':' not in chunk:
            parts.append(chunk)
            continue
        key, value = chunk.split(':', 1)
        key = key.strip()
        value = value.strip()
        camel_key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
        parts.append(f'{camel_key}: {value!r}')
    return '{{ ' + ', '.join(parts) + ' }}'


def repl(match: re.Match[str]) -> str:
    style_value = match.group(2) or match.group(3) or ''
    return 'style=' + fix_style_value(style_value)


def process(path: Path) -> bool:
    original = path.read_text(encoding='utf-8')
    updated = STYLE_RE.sub(repl, original)
    if updated == original:
        return False
    path.write_text(updated, encoding='utf-8')
    print(f'fixed: {path}')
    return True


def main() -> int:
    changed = 0
    for path in sorted(ROOT.rglob('*.md*')):
        if process(path):
            changed += 1
    print(f'changed {changed} file(s)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())