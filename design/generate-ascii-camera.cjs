// Original code-drawn X100VI-inspired illustration, rendered as ASCII glyphs.
// Rebuild with node design/generate-ascii-camera.cjs (uses existing sharp).
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const source = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="760" viewBox="0 -240 900 760">
    <rect y="-240" width="900" height="760" fill="white"/>
    <g stroke="#444" stroke-width="5">
      <!-- Compact Godox iT30Pro front housing and hot-shoe mount. -->
      <rect x="397" y="22" width="84" height="52" rx="7" fill="#555"/>
      <rect x="372" y="50" width="133" height="20" rx="6" fill="#333"/>
      <rect x="243" y="-207" width="394" height="236" rx="25" fill="#bcbcbc"/>
      <rect x="260" y="-190" width="360" height="147" rx="16" fill="#333"/>
      <rect x="277" y="-175" width="326" height="115" rx="8" fill="#e8e8e8"/>
      <path d="M285 -159H595M285 -140H595M285 -121H595M285 -102H595M285 -83H595" stroke="#aaa" stroke-width="6"/>
      <rect x="535" y="-24" width="60" height="32" rx="8" fill="#222"/>
      <rect x="136" y="59" width="104" height="29" rx="6" fill="#999"/>
      <rect x="647" y="49" width="107" height="41" rx="8" fill="#aaa"/>
      <rect x="762" y="62" width="47" height="29" rx="8" fill="#999"/>
      <rect x="384" y="71" width="110" height="14" fill="#aaa"/>
      <rect x="53" y="86" width="797" height="360" rx="32" fill="#333"/>
      <path d="M85 86H818Q850 86 850 119V206H53V119Q53 86 85 86Z" fill="#cecece"/>
      <path d="M53 419H850Q850 446 818 446H85Q53 446 53 419Z" fill="#bcbcbc"/>
      <rect x="91" y="113" width="139" height="75" rx="8" fill="#555"/>
      <rect x="105" y="125" width="108" height="49" rx="4" fill="#222"/>
      <path d="M111 131H203L120 166Z" fill="#777" stroke="none"/>
      <rect x="284" y="128" width="66" height="36" rx="4" fill="#eee"/>
      <circle cx="389" cy="147" r="13" fill="#303030"/>
      <rect x="759" y="229" width="45" height="166" rx="21" fill="#242424"/>
      <circle cx="508" cy="289" r="165" fill="#999"/>
      <circle cx="508" cy="289" r="153" fill="#333" stroke="#ccc"/>
      <circle cx="508" cy="289" r="136" fill="#8a8a8a"/>
      <circle cx="508" cy="289" r="120" fill="#222" stroke="#ddd"/>
      <circle cx="508" cy="289" r="96" fill="#686868"/>
      <circle cx="508" cy="289" r="83" fill="#202020" stroke="#888"/>
      <circle cx="508" cy="289" r="60" fill="#393939" stroke="#555"/>
      <path d="M460 250Q500 216 545 246L487 307Z" fill="#797979" stroke="none"/>
      <circle cx="526" cy="314" r="20" fill="#111" stroke="none"/>
      <circle cx="303" cy="243" r="15" fill="#aaa"/>
      <path d="M298 239L278 222" stroke="#aaa" stroke-width="12"/>
    </g>
  </svg>`;
  const columns = 144, rows = 70;
  const { data } = await sharp(Buffer.from(source)).resize(columns, rows, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const groups = new Map();
  const ramp = ' .:-=+*#%@';
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const light = data[(y * columns + x) * 3];
    if (light > 244) continue;
    const glyph = ramp[Math.max(1, Math.round((1 - light / 255) * 9))];
    const color = light < 70 ? '#353535' : light < 150 ? '#737373' : '#999999';
    if (!groups.has(color)) groups.set(color, []);
    groups.get(color).push(`<text x="${x * 6}" y="${y * 10 + 9}">${glyph}</text>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 864 700"><title>Fujifilm X100VI with Godox iT30Pro flash, ASCII illustration</title><g font-family="Courier New,monospace" font-size="10" font-weight="700">${[...groups].map(([fill, glyphs]) => `<g fill="${fill}">${glyphs.join('')}</g>`).join('')}</g><g font-family="Courier New,monospace" fill="#333" font-size="22" font-weight="700"><rect x="96" y="434" width="146" height="27" fill="#fafafa"/><text x="100" y="455">FUJIFILM</text></g></svg>`;
  await fs.mkdir(path.resolve(__dirname, '../public/illustrations'), { recursive: true });
  await fs.writeFile(path.resolve(__dirname, '../public/illustrations/x100vi-ascii.svg'), svg);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
