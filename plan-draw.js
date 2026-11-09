/* Drawing code shared by the photo tour (index.html) and the floor plan editor (editor.html).
   It turns the data in plan-data.js into SVG. Nothing in here needs editing to change the plan. */
(function (root) {
  "use strict";

  const R = 90;                                   /* street view: the front of the house is at the bottom */
  const toScreen = ([x, y]) => [-y, x];           /* what rotate(90) does to a plan point */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const num = v => Math.round(v * 100) / 100;
  const pts = poly => "M" + poly.map(p => num(p[0]) + "," + num(p[1])).join("L") + "Z";
  const tourIndex = (house, id) => house.tour.findIndex(t => t.id === id);

  function arcPath(h, f, l, r) {
    const cross = (f[0] - h[0]) * (l[1] - h[1]) - (f[1] - h[1]) * (l[0] - h[0]);
    return `M${num(f[0])},${num(f[1])} A${num(r)},${num(r)} 0 0 ${cross > 0 ? 1 : 0} ${num(l[0])},${num(l[1])}`;
  }

  /* which way an opening's "side" points: +1 is toward +x for a wall that runs along y, toward +y for a wall
     that runs along x, and the matching side for an angled wall */
  function sideNormal(o) {
    const dx = o.b[0] - o.a[0], dy = o.b[1] - o.a[1], len = Math.hypot(dx, dy) || 1;
    let nx = -dy / len, ny = dx / len;
    if (nx < -1e-9 || (Math.abs(nx) <= 1e-9 && ny < 0)) { nx = -nx; ny = -ny; }
    return [nx * o.side, ny * o.side];
  }

  /* one door, window or opening; with tag set, it is wrapped in a group the editor can grab */
  function drawOpening(o, i, tag) {
    const [ax, ay] = o.a, [bx, by] = o.b;
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const u = [(bx - ax) / len, (by - ay) / len], n = sideNormal(o), T = 3.5;
    const g = [[ax + n[0] * T, ay + n[1] * T], [bx + n[0] * T, by + n[1] * T], [bx - n[0] * T, by - n[1] * T], [ax - n[0] * T, ay - n[1] * T]];
    let s = `<path class="gap ${o.ext ? "ext" : "int"}" d="${pts(g)}"/>`;
    const add = (p, k) => [p[0] + n[0] * k, p[1] + n[1] * k];
    if (o.type === "window" || o.type === "arched") {
      for (const k of [-1.6, 1.6]) s += `<line class="glass" x1="${num(ax + n[0] * k)}" y1="${num(ay + n[1] * k)}" x2="${num(bx + n[0] * k)}" y2="${num(by + n[1] * k)}"/>`;
      if (o.type === "arched") {
        const m = [(ax + bx) / 2 - n[0] * len * 0.42, (ay + by) / 2 - n[1] * len * 0.42];
        s += `<path class="glass" d="M${num(ax - n[0] * 3.5)},${num(ay - n[1] * 3.5)} Q${num(m[0])},${num(m[1])} ${num(bx - n[0] * 3.5)},${num(by - n[1] * 3.5)}"/>`;
      }
    } else if (o.type === "open") {
      s += `<line class="openline" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}"/>`;
    } else if (o.type === "garage") {
      s += `<line class="gdoor" x1="${num(ax + n[0] * 4)}" y1="${num(ay + n[1] * 4)}" x2="${num(bx + n[0] * 4)}" y2="${num(by + n[1] * 4)}"/>`;
    } else if (o.type === "bifold") {
      const q = len / 4, p1 = add([ax + u[0] * q, ay + u[1] * q], 9), p2 = [ax + u[0] * 2 * q, ay + u[1] * 2 * q], p3 = add([ax + u[0] * 3 * q, ay + u[1] * 3 * q], 9);
      s += `<path class="leaf" d="M${ax},${ay}L${num(p1[0])},${num(p1[1])}L${num(p2[0])},${num(p2[1])}L${num(p3[0])},${num(p3[1])}L${bx},${by}"/>`;
    } else if (o.type === "double" || o.type === "french") {
      const half = len / 2, mid = [(ax + bx) / 2, (ay + by) / 2], cls = o.type === "french" ? "leaf red" : "leaf";
      for (const h of [o.a, o.b]) {
        const l = add(h, half);
        s += `<line class="${cls}" x1="${h[0]}" y1="${h[1]}" x2="${num(l[0])}" y2="${num(l[1])}"/><path class="arc" d="${arcPath(h, mid, l, half)}"/>`;
      }
    } else {
      const h = o.hinge === "b" ? o.b : o.a, f = o.hinge === "b" ? o.a : o.b, l = add(h, len);
      s += `<line class="leaf" x1="${h[0]}" y1="${h[1]}" x2="${num(l[0])}" y2="${num(l[1])}"/><path class="arc" d="${arcPath(h, f, l, len)}"/>`;
    }
    if (tag) s = `<g class="op" data-k="op" data-i="${i}">${s}<line class="hit" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}"/></g>`;
    return s;
  }

  /* small drawn details that say what a fixture is: an X for a shower, an inner tub, a bowl, a sink */
  function fixtureDetail(f) {
    const xs = f.poly.map(p => p[0]), ys = f.poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), w = x1 - x0, h = y1 - y0;
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    if (f.cls === "shower") return `<path class="fxd" d="M${num(x0)},${num(y0)}L${num(x1)},${num(y1)}M${num(x1)},${num(y0)}L${num(x0)},${num(y1)}"/>`;
    if (f.cls === "tub") { const k = Math.min(4, w / 5, h / 5); return `<rect class="fxd" x="${num(x0 + k)}" y="${num(y0 + k)}" width="${num(w - 2 * k)}" height="${num(h - 2 * k)}" rx="${num(Math.min(w, h) / 3)}"/>`; }
    if (f.cls === "toilet") return `<ellipse class="fxd" cx="${num(cx)}" cy="${num(cy)}" rx="${num(w * 0.36)}" ry="${num(h * 0.36)}"/>`;
    if (f.cls === "vanity") { const r = Math.min(w, h) * 0.3; return `<ellipse class="fxd" cx="${num(cx)}" cy="${num(cy)}" rx="${num(w >= h ? r * 1.3 : r)}" ry="${num(w >= h ? r : r * 1.3)}"/>`; }
    return "";
  }

  function labelAngle(axis) {
    let a = (R + axis) % 360;
    if (a >= 90 && a < 270) a -= 180;
    if (a >= 270) a -= 360;
    return a - R;
  }

  /* the front-door arrow and words sit just outside the opening marked "front": true */
  function frontDoor(house) {
    const o = house.openings.find(q => q.front);
    if (!o) return null;
    const horiz = Math.abs(o.a[1] - o.b[1]) < 0.01;
    const out = horiz ? [0, -o.side] : [-o.side, 0];
    const m = [(o.a[0] + o.b[0]) / 2, (o.a[1] + o.b[1]) / 2];
    const at = k => [m[0] + out[0] * k, m[1] + out[1] * k];
    return {from: at(50), to: at(10), label: at(70)};
  }

  function labelsMarkup(house, useShort, tag) {
    let s = "";
    house.rooms.forEach((r, i) => {
      if (!r.label || !r.lines || !r.lines.length) return;
      const lines = useShort && r.short && r.short.length ? r.short : r.lines;
      const axis = useShort && r.shortAxis !== undefined ? r.shortAxis : r.axis;
      const theta = axis !== undefined && axis !== null ? labelAngle(axis) : -R;
      const n = lines.length;
      const t = lines.map((txt, k) => `<text y="${((k - (n - 1) / 2) * 1.08).toFixed(2)}em" dy=".35em" text-anchor="middle">${esc(txt)}</text>`).join("");
      const attrs = tag ? ` data-k="lbl" data-i="${i}"` : "";
      s += `<g class="lbl ${r.kind || "room"}"${attrs} transform="translate(${num(r.label[0])},${num(r.label[1])}) rotate(${theta})">${t}</g>`;
    });
    const fd = frontDoor(house);
    if (fd) s += `<g class="lbl front" transform="translate(${num(fd.label[0])},${num(fd.label[1])}) rotate(${-R})"><text dy=".35em" text-anchor="middle">Front door</text></g>`;
    return s;
  }

  /* the whole drawing, inside one group rotated to street view.
     opts.interactive: rooms with photos become buttons (tour home screen)
     opts.tag: every room, fixture and opening carries data-k / data-i (editor)
     opts.id: suffix that keeps the arrow marker id unique when a page has two plans
     opts.extra: markup added on top, inside the rotated group */
  function planMarkup(house, opts) {
    opts = opts || {};
    const mid = "ah" + (opts.id || "");
    let s = `<defs><marker id="${mid}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="arrowhead" d="M0,0L10,5L0,10Z"/></marker></defs>`;
    s += `<g class="world" transform="rotate(${R})">`;
    house.rooms.forEach((r, i) => {
      const ti = tourIndex(house, r.id);
      const cls = ti >= 0 ? "has" : (r.kind && r.kind !== "room" ? r.kind : "");
      if (opts.interactive && ti >= 0) {
        const t = house.tour[ti];
        const n = t.photos.length;
        s += `<path class="room ${cls}" d="${pts(r.poly)}" data-room="${ti}" tabindex="0" role="button" aria-label="${esc(t.name)}, ${n === 1 ? "1 photo" : n + " photos"}"/>`;
      } else if (opts.tag) {
        s += `<path class="room ${cls}" d="${pts(r.poly)}" data-k="room" data-i="${i}"/>`;
      } else {
        s += `<path class="room ${cls}" d="${pts(r.poly)}"/>`;
      }
    });
    s += `<g${opts.tag ? "" : ' pointer-events="none"'}>`;
    s += house.fixtures.map((f, i) => `<path class="fx ${f.cls || ""}" d="${pts(f.poly)}"${opts.tag ? ` data-k="fx" data-i="${i}"` : ""}/>` + fixtureDetail(f)).join("");
    s += `<path class="walls dashed" pointer-events="none" d="${house.rooms.filter(r => r.kind === "outdoor").map(r => pts(r.poly)).join("")}"/>`;
    s += `<path class="walls" pointer-events="none" d="${house.rooms.filter(r => r.kind !== "outdoor").map(r => pts(r.poly)).join("")}"/>`;
    s += house.openings.map((o, i) => drawOpening(o, i, opts.tag)).join("");
    const fd = frontDoor(house);
    if (fd) s += `<line class="arrow" pointer-events="none" x1="${num(fd.from[0])}" y1="${num(fd.from[1])}" x2="${num(fd.to[0])}" y2="${num(fd.to[1])}" marker-end="url(#${mid})"/>`;
    s += `</g>`;
    s += `<g class="hlg" pointer-events="none"></g>`;
    s += `<g class="labels"></g>`;
    s += opts.extra || "";
    s += `</g>`;
    return s;
  }

  function screenBox(points) {
    const c = points.map(toScreen), xs = c.map(p => p[0]), ys = c.map(p => p[1]);
    return {x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys)};
  }

  /* the whole house in screen terms, with a little padding */
  function houseBox(house, pad) {
    const all = [];
    house.rooms.forEach(r => all.push(...r.poly));
    const b = screenBox(all), p = pad === undefined ? 12 : pad;
    return {x: b.x - p, y: b.y - p, w: b.w + 2 * p, h: b.h + 2 * p};
  }

  /* keep label text a readable size on screen whatever the zoom */
  function setLabelScale(svg, house, vbW, force, tag) {
    const W = svg.clientWidth || svg.getBoundingClientRect().width || 1;
    const scale = W / vbW;
    const px = Math.max(10, Math.min(15, 6.5 + 10 * scale));
    svg.style.setProperty("--fs", (px / scale).toFixed(2) + "px");
    const useShort = scale < 0.55;
    if (force || svg._short !== useShort) {
      svg._short = useShort;
      const g = svg.querySelector(".labels");
      if (g) g.innerHTML = labelsMarkup(house, useShort, tag);
    }
    return scale;
  }

  /* writes plan-data.js: one item per line so changes are easy to spot on GitHub */
  function serialize(house) {
    const J = v => JSON.stringify(v, (k, x) => typeof x === "number" ? num(x) : x).replace(/,"/g, ', "').replace(/(?<!\\)":/g, '": ');
    const list = (items, indent) => items.map(it => indent + J(it)).join(",\n");
    const tour = house.tour.map(t =>
      `    {"id": ${JSON.stringify(t.id)}, "name": ${JSON.stringify(t.name)}, "photos": [\n${list(t.photos, "      ")}\n    ]}`).join(",\n");
    return `/* New house photo tour: the floor plan and the photo spots.
   The easiest way to change this file is the drag-and-drop editor (editor.html).
   To edit by hand: every size is in inches. x runs toward the street (the front of the house);
   y runs from the bedroom wing toward the garage. A photo's "dir" is the way the camera faced:
   0 = toward the street, 90 = toward the garage side, 180 = toward the back, -90 = toward the bedroom wing. */
window.HOUSE = {
  "rooms": [
${list(house.rooms, "    ")}
  ],
  "openings": [
${list(house.openings, "    ")}
  ],
  "fixtures": [
${list(house.fixtures, "    ")}
  ],
  "tour": [
${tour}
  ]
};
`;
  }

  const api = {R, toScreen, esc, num, pts, tourIndex, arcPath, sideNormal, fixtureDetail, drawOpening, labelAngle, frontDoor, labelsMarkup, planMarkup, screenBox, houseBox, setLabelScale, serialize};
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.PlanDraw = api;
})(this);
