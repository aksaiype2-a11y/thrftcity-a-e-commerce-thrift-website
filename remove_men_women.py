import os
import glob
import re

html_files = glob.glob('*.html')

patterns = [
    r'\s*<li><a href="men\.html">Men</a></li>',
    r'\s*<li><a href="women\.html">Women</a></li>',
    r'\s*<a href="shop\.html\?category=men"[^>]*>Men</a>',
    r'\s*<a href="shop\.html\?category=women"[^>]*>Women</a>',
    r'\s*<button class="tab-btn\s*(?:active)?" data-category="men"[^>]*>Men</button>',
    r'\s*<button class="tab-btn\s*(?:active)?" data-category="women"[^>]*>Women</button>'
]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern in patterns:
        new_content = re.sub(pattern, '', new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
