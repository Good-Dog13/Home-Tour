"""Build the single-file version of the tour: one .html file with the photos, thumbnails and fonts inside it,
so it can be emailed or dropped in Box or Drive and opened by double-clicking.

Run from the top of the repository:
    python3 tools/build_single_file.py "dist/New House - Photo Tour.html"

It reads index.html, plan-data.js, plan-draw.js, photos/, thumbs/ and fonts/. Nothing here changes the website.
If the file is opened somewhere that won't run it (a phone preview, say), it shows the photos grouped by room instead.
"""
import base64, html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'dist', 'New House - Photo Tour.html')

def read(rel):
    return open(os.path.join(ROOT, rel), encoding='utf-8').read()

def data_uri(rel, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(os.path.join(ROOT, rel), 'rb').read()).decode()

page = read('index.html')
plan_data = read('plan-data.js')
plan_draw = read('plan-draw.js')
house = json.loads(plan_data[plan_data.index('{'):plan_data.rindex('}') + 1])

# 1. scripts and fonts go inside the page
page = page.replace('<script src="plan-data.js"></script>', '<script>\n' + plan_data + '</script>', 1)
page = page.replace('<script src="plan-draw.js"></script>', '<script>\n' + plan_draw.replace('</script', '<\\/script') + '</script>', 1)
page = re.sub(r'url\("(fonts/[^"]+\.woff2)"\)', lambda m: 'url("' + data_uri(m.group(1), 'font/woff2') + '")', page)

# 2. photos come from inside the file instead of the photos/ and thumbs/ folders
old = 'const photoUrl = f => `photos/${f}.jpg`;\nconst thumbUrl = f => `thumbs/${f}.jpg`;'
assert old in page, 'index.html photo lines changed; update this script'
page = page.replace(old, 'const IMG = window.__TOUR_IMG || null;\n'
                         'const photoUrl = f => IMG ? IMG.p[f] : `photos/${f}.jpg`;\n'
                         'const thumbUrl = f => IMG ? IMG.t[f] : `thumbs/${f}.jpg`;', 1)

# 3. a plain fallback that shows the photos by room when scripts can't run
page = page.replace('<main id="home" class="home">', '<main id="home" class="home" hidden>', 1)
css = '''.fallback{max-width:900px;margin:0 auto;padding-block:28px 24px}
.fallback h1{font-size:2rem;font-weight:780;line-height:1.05;margin-bottom:10px}
.fallback .note{background:var(--accent-soft);border-radius:12px;padding:12px 14px;margin:14px 0 24px}
.fallback h2{font-size:1.4rem;margin:28px 0 10px}
.fallback .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.fallback figure{margin:0}
.fallback img{width:100%;height:auto;border-radius:10px;display:block}
.fallback figcaption{font-size:.95rem;color:var(--muted);padding-top:4px}
'''
page = page.replace('*,*::before,*::after{box-sizing:border-box}', css + '*,*::before,*::after{box-sizing:border-box}', 1)
fb = ['<div class="fallback" id="fallback">', '<h1>Welcome to the new house</h1>',
      '<p class="note"><b>You\'re seeing a simple preview.</b> For the full tour with the house plan and big Next buttons, '
      'save this file and open it in a web browser such as Chrome, Safari, Edge or Firefox.</p>']
for t in house['tour']:
    fb.append(f'<h2>{html.escape(t["name"])}</h2><div class="grid">')
    for p in t['photos']:
        fb.append(f'<figure><img data-f="{p["f"]}" src="{data_uri("thumbs/" + p["f"] + ".jpg", "image/jpeg")}" '
                  f'alt="{html.escape(t["name"])}: {html.escape(p["cap"])}" loading="lazy" width="360" height="270">'
                  f'<figcaption>{html.escape(p["cap"])}</figcaption></figure>')
    fb.append('</div>')
fb.append('<p class="foot" style="margin-top:28px">Created in collaboration with Claude AI.</p></div>')
photos = json.dumps({p['f']: data_uri('photos/' + p['f'] + '.jpg', 'image/jpeg') for t in house['tour'] for p in t['photos']}, separators=(',', ':'))
loader = '''<script>
(function(){
  var fb = document.getElementById("fallback"), t = {};
  fb.querySelectorAll("img[data-f]").forEach(function(im){ t[im.getAttribute("data-f")] = im.getAttribute("src"); });
  window.__TOUR_IMG = {p: JSON.parse(document.getElementById("tour-photos").textContent), t: t};
  fb.parentNode.removeChild(fb);
  document.getElementById("tour-photos").textContent = "";
})();
</script>
'''
inject = '\n'.join(fb) + f'\n<script type="application/json" id="tour-photos">{photos}</script>\n' + loader
page = page.replace('<body>\n', '<body>\n' + inject, 1)

os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
open(out_path, 'w', encoding='utf-8').write(page)
print(f'{out_path}: {os.path.getsize(out_path) / 1e6:.1f} MB, {sum(len(t["photos"]) for t in house["tour"])} photos')
