import os
import glob

# 1. Restore the dropdown nav in standard pages
standard_nav = """<nav class="nav-links">
                <div class="dropdown">
                    <button class="dropbtn">Men </button>
                    <div class="dropdown-content">
                        <a href="men.html">All Men</a>
                        <a href="category.html?gender=men&type=clothes">Clothes</a>
                        <a href="category.html?gender=men&type=shoes">Shoes</a>
                        <a href="category.html?gender=men&type=accessories">Accessories</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Women </button>
                    <div class="dropdown-content">
                        <a href="women.html">All Women</a>
                        <a href="category.html?gender=women&type=clothes">Clothes</a>
                        <a href="category.html?gender=women&type=shoes">Shoes</a>
                        <a href="category.html?gender=women&type=accessories">Accessories</a>
                    </div>
                </div>
            </nav>"""

# 2. Restore the category-tabs in index.html and shop.html
index_nav = """<nav class="nav-links category-tabs"
                style="margin: 0; padding: 4px; border-radius: 40px; background: rgba(26,26,26,0.8); backdrop-filter: blur(4px);">
                <a href="shop.html?category=men" class="tab-btn"
                    style="text-decoration: none; padding: 8px 24px; font-size: 1rem; display: inline-block;">Men</a>
                <a href="shop.html?category=women" class="tab-btn"
                    style="text-decoration: none; padding: 8px 24px; font-size: 1rem; display: inline-block;">Women</a>
                <a href="shop.html?category=accessories" class="tab-btn"
                    style="text-decoration: none; padding: 8px 24px; font-size: 1rem; display: inline-block;">Accessories</a>
                <a href="shop.html?category=shoes" class="tab-btn"
                    style="text-decoration: none; padding: 8px 24px; font-size: 1rem; display: inline-block;">Shoes</a>
            </nav>"""

shop_nav = """<nav class="nav-links category-tabs"
                style="margin: 0; padding: 4px; border-radius: 40px; background: rgba(26,26,26,0.8); backdrop-filter: blur(4px);">
                <button class="tab-btn active" data-category="men"
                    style="padding: 8px 24px; font-size: 1rem;">Men</button>
                <button class="tab-btn" data-category="women" style="padding: 8px 24px; font-size: 1rem;">Women</button>
                <button class="tab-btn" data-category="accessories"
                    style="padding: 8px 24px; font-size: 1rem;">Accessories</button>
                <button class="tab-btn" data-category="shoes" style="padding: 8px 24px; font-size: 1rem;">Shoes</button>
            </nav>"""

# 3. Restore the footer links
footer_orig = """<ul>
                    <li><a href="category.html?type=clothes">Clothes</a></li>
                    <li><a href="category.html?type=shoes">Shoes</a></li>
                    <li><a href="category.html?type=accessories">Accessories</a></li>
                </ul>"""

footer_restore = """<ul>
                    <li><a href="men.html">Men</a></li>
                    <li><a href="women.html">Women</a></li>
                    <li><a href="category.html?type=clothes">Clothes</a></li>
                    <li><a href="category.html?type=shoes">Shoes</a></li>
                    <li><a href="category.html?type=accessories">Accessories</a></li>
                </ul>"""

os.chdir(r'C:\Users\Krish\.gemini\antigravity\scratch\ThrftCity-HTML-Deploy')

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Restore footer
    if footer_orig in content:
        content = content.replace(footer_orig, footer_restore)
    elif '<li><a href="category.html?type=clothes">Clothes</a></li>' in content and '<li><a href="men.html">Men</a></li>' not in content:
        content = content.replace('<li><a href="category.html?type=clothes">Clothes</a></li>', '<li><a href="men.html">Men</a></li>\n                    <li><a href="women.html">Women</a></li>\n                    <li><a href="category.html?type=clothes">Clothes</a></li>')

    # Restore nav links
    if file == 'index.html':
        import re
        content = re.sub(r'<nav class="nav-links category-tabs"[\s\S]*?</nav>', index_nav, content)
    elif file == 'shop.html':
        import re
        content = re.sub(r'<nav class="nav-links category-tabs"[\s\S]*?</nav>', shop_nav, content)
    else:
        import re
        content = re.sub(r'<nav class="nav-links">\n            </nav>', standard_nav, content)
        content = content.replace('<nav class="nav-links"></nav>', standard_nav)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Restored {file}")
