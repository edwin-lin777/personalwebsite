// Keep the browser fallback and Apple icon in sync with the vector master.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src/app/icon.svg');

(async () => {
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header[entry] = sizes[index];
    header[entry + 1] = sizes[index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  fs.writeFileSync(path.join(root, 'src/app/favicon.ico'), Buffer.concat([header, ...images]));
  await sharp(source).resize(180, 180).png().toFile(path.join(root, 'src/app/apple-icon.png'));
  console.log('Generated favicon.ico (16/32/48px) and apple-icon.png (180px).');
})();
