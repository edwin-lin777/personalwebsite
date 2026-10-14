// Rebuild the static, text-based SVG with: node design/generate-ascii-car.cjs
// Uses Next's existing sharp dependency; no browser rendering loop is needed.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

// Outline in the original 1280 x 631 photograph, excluding the show scenery.
const outline = [[43,342],[112,273],[252,207],[253,178],[286,169],[301,194],
  [387,206],[507,127],[590,104],[739,100],[862,115],[991,144],[1197,153],
  [1255,173],[1251,215],[1237,240],[1257,282],[1252,347],[1220,395],
  [1178,411],[1111,411],[735,496],[657,525],[583,526],[530,511],
  [344,530],[178,509],[70,471],[47,440],[89,406]];
function inside(x, y) {
  let hit = false;
  for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
    const [ax, ay] = outline[i], [bx, by] = outline[j];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) hit = !hit;
  }
  return hit;
}
async function main() {
  const columns = 240, rows = 66;
  const { data, info } = await sharp(path.join(root, 'public/backgrounds/daytona-sp3.jpg'))
    .resize(columns, rows, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const ramp = '.:-=+*#%@';
  const groups = new Map();
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    if (!inside((x + .5) * 1280 / columns, (y + .5) * 631 / rows)) continue;
    const i = (y * columns + x) * info.channels;
    const [r, g, b] = data.subarray(i, i + 3);
    const luminance = .2126 * r + .7152 * g + .0722 * b;
    const density = Math.min(ramp.length - 1, Math.floor((1 - luminance / 285) * ramp.length));
    const red = r > g * 1.3 && r > b * 1.2;
    const quantize = value => Math.max(16, Math.min(224, Math.round(value / 16) * 16));
    const color = red ? `rgb(${quantize(r * 1.08)},${quantize(g * .65)},${quantize(b * .65)})`
      : `rgb(${quantize(luminance * .76)},${quantize(luminance * .79)},${quantize(luminance * .8)})`;
    if (!groups.has(color)) groups.set(color, []);
    groups.get(color).push(`<text x="${x * 6}" y="${y * 11 + 9}">${ramp[density]}</text>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 726"><title>Ferrari Daytona SP3 in ASCII</title><metadata>ASCII adaptation of Prova MO's photograph, cropped by GaryJAllen. CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Ferrari_Daytona_SP3_front_side_at_CF_2022_(cropped).jpg</metadata><g font-family="Courier New,monospace" font-size="11" font-weight="700">${[...groups].map(([color, glyphs]) => `<g fill="${color}">${glyphs.join('')}</g>`).join('')}</g></svg>`;
  await fs.writeFile(path.join(root, 'public/backgrounds/daytona-sp3-ascii.svg'), svg);
  console.log(`Generated ${[...groups.values()].reduce((n, glyphs) => n + glyphs.length, 0)} ASCII characters.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });

