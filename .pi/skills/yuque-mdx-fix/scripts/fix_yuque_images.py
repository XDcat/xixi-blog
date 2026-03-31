#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path('/home/xdcat/code/xixi-blog')
DOC_ROOT = ROOT / 'docs/AI-技术分享'
ASSET_ROOT = ROOT / 'static' / 'images' / 'yuque'
IMAGE_RE = re.compile(r'!\[([^\]]*)\]\((https?://[^)\s]+)\)')


def slug_for_url(url: str) -> str:
    parsed = urlparse(url)
    ext = Path(parsed.path).suffix or '.png'
    digest = hashlib.sha1(url.encode('utf-8')).hexdigest()[:12]
    return f'{digest}{ext}'


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=30) as resp, dest.open('wb') as f:
        shutil.copyfileobj(resp, f)


def repl(match: re.Match[str]) -> str:
    alt, url = match.group(1), match.group(2)
    filename = slug_for_url(url)
    dest = ASSET_ROOT / filename
    try:
        download(url, dest)
    except Exception as e:
        print(f'warn: failed to download {url}: {e}', file=sys.stderr)
        return match.group(0)
    return f'![{alt}](/images/yuque/{filename})'


def process(path: Path) -> bool:
    original = path.read_text(encoding='utf-8')
    updated = IMAGE_RE.sub(repl, original)
    if updated == original:
        return False
    path.write_text(updated, encoding='utf-8')
    print(f'fixed: {path}')
    return True


def main() -> int:
    changed = 0
    for path in sorted(DOC_ROOT.rglob('*.md*')):
        if process(path):
            changed += 1
    print(f'changed {changed} file(s)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
