# Home-Tour
Home photos and Layout

## About this site

A tap-through photo tour of the new house. You can pick a room on the house plan, or start the tour and use the Next button to go through every room. On each photo, a dot and a wedge on the plan show where the camera stood and which way it was facing.

- The tour: https://good-dog13.github.io/Home-Tour/
- The floor plan editor: https://good-dog13.github.io/Home-Tour/editor.html (the tour doesn't link to it)

## What's in this folder

| Item | What it is |
|---|---|
| `index.html` | The tour page family members see |
| `plan-data.js` | The floor plan, the photo spots and the captions. This is the only file that changes when you edit the plan |
| `plan-draw.js` | Drawing code shared by the tour and the editor. It doesn't need editing |
| `editor.html` | The drag-and-drop floor plan editor |
| `photos/` | 55 room photos, resized for the web with all photo metadata (including location) removed |
| `thumbs/` | Small versions of the same photos for the room lists |
| `fonts/` | The two typefaces the pages use, so nothing loads from other sites |
| `tools/build_single_file.py` | Builds the one-file version of the tour for email, Box or Drive |
| `robots.txt`, `.nojekyll` | Ask search engines not to list the site, and tell GitHub Pages to serve the files as they are |

## Editing the floor plan

1. Open the editor (link above). Click a room, then drag the squares on its walls or the circles on its corners. Doors, windows, counters, room names and photo spots can all be dragged too. Select a photo spot to change its caption.
2. Your changes save in that browser as you go, so you can close the page and come back later. **Preview the tour** shows the tour with your changes, in that browser only.
3. When it looks right, choose **Save to the site** and follow the three steps. They copy the new `plan-data.js`, open it on GitHub, and replace its contents.
4. The site updates within a few minutes. Reload the editor and the label at the top should say **Matches the site**.

Things worth knowing:

- **Move lined-up walls together** (on by default) moves every wall that's in line with the one you drag and touching it. Doors, windows and counters on that wall move with it. Turn it off to move only the selected room's wall.
- To set an exact size, click a wall's square and type the room's size across from it. That wall moves and the opposite wall stays put.
- Editing the plan on a different computer starts from what's on the site. Unsaved changes stay in the browser where you made them.
- Anyone who finds the editor's address can play with it, but nothing they do reaches the site unless they can sign in to this GitHub account.

## Editing by hand

`plan-data.js` is plain text with one item per line. All sizes are in inches. x runs toward the street (the front of the house), and y runs from the bedroom wing toward the garage. A photo spot looks like this:

```
{"f": "kitchen-3", "x": 175, "y": 305, "dir": 95, "cap": "Pantry and fridge on the left, stove ahead, sink on the right"}
```

`dir` is the way the camera faced: 0 = toward the street, 90 = toward the garage side, 180 = toward the back, -90 = toward the bedroom wing. If the tour goes blank after a hand edit, look for a missing comma or bracket, or use the file's **History** on GitHub to go back.

## The one-file version

To rebuild the version that can be emailed (it ends up around 12 MB), run this from the top of the folder:

```
python3 tools/build_single_file.py "dist/New House - Photo Tour.html"
```

## Privacy

- The repository and the site are both public. Anyone who has or guesses the address can see the photos.
- `robots.txt` and the page's `noindex` tag ask search engines not to list the site. Well-behaved search engines follow that request, but it doesn't block anyone. (A `robots.txt` only takes effect at the root of a site, so on a project site the page's `noindex` tag does most of the work.)
- The pages don't show the address of the house, and the photos contain no location data.
- To take the site down, go to **Settings > Pages** and unpublish it, or delete the repository.

## Fonts

Atkinson Hyperlegible (Braille Institute) and Bricolage Grotesque are both used under the SIL Open Font License.

---

*Created in collaboration with Claude AI.*
