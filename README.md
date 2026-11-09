# Home-Tour
Home photos and Layout

## About this site

A tap-through photo tour of the new house. Open `index.html` to see it. You can pick a room on the house plan, or start the tour and use the Next button to go through every room. On each photo, a dot and a wedge on the plan show where the camera stood and which way it was facing.

## What's in this folder

| Item | What it is |
|---|---|
| `index.html` | The tour page |
| `photos/` | 55 room photos, resized for the web with all photo metadata (including location) removed |
| `thumbs/` | Small versions of the same photos for the room lists |
| `fonts/` | The two typefaces the page uses, so it doesn't load anything from other sites |
| `robots.txt`, `.nojekyll` | Ask search engines not to list the site, and tell GitHub Pages to serve the files as they are |

## Putting it on GitHub Pages

1. On github.com, create a new repository (for example `new-house-tour`). On a free account, a Pages site has to come from a **public** repository.
2. On the new repository's page, choose **uploading an existing file**. Drag in everything inside this folder, including the `photos`, `thumbs` and `fonts` folders, then choose **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose the **main** branch and the **/ (root)** folder, and choose **Save**.
4. Wait a minute or two. The site will be at `https://YOUR-USERNAME.github.io/new-house-tour/`.

## Privacy

- The repository and the site are both public. Anyone who has or guesses the address can see the photos.
- `robots.txt` and the page's `noindex` tag ask search engines not to list the site. Well-behaved search engines follow that request, but it doesn't block anyone. (A `robots.txt` only takes effect at the root of a site, so on a project site the page's `noindex` tag does most of the work.)
- The page doesn't show the address of the house, and the photos contain no location data.
- To take the site down, go to **Settings > Pages** and unpublish it, or delete the repository.

## Changing where a photo was taken

Each photo is one line in `index.html`, inside the `TOUR` list, for example:

```
["kitchen-3", 175,305, 95, "Pantry and fridge on the left, stove ahead, sink on the right"],
```

The numbers are the camera's spot on the plan in inches, then the direction it faced in degrees (0 = toward the front of the house, 90 = toward the garage side, 180 = toward the back, -90 = toward the bedroom wing). The text is the caption.

## Fonts

Atkinson Hyperlegible (Braille Institute) and Bricolage Grotesque are both used under the SIL Open Font License.

---

*Created in collaboration with Claude AI.*
