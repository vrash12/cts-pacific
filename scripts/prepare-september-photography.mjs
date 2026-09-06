import { createRequire } from "node:module";
import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json")] }));
const source = process.argv[2];
const selectedKeys = process.argv.slice(3);
if (!source) throw new Error("Usage: node scripts/prepare-september-photography.mjs <client-source-folder> [photo-key ...]");
const manifest = JSON.parse(await readFile(new URL("../src/config/september-photography.json", import.meta.url), "utf8"));
const destination = path.resolve("public/images/cts/september-2026");
const thumbnails = path.resolve("public/images/cts/thumbnails/september-2026");
await mkdir(destination, { recursive: true });
await mkdir(thumbnails, { recursive: true });
let total = 0;
const entries = Object.entries(manifest).filter(([key]) => !selectedKeys.length || selectedKeys.includes(key));
for (const key of selectedKeys) {
  if (!(key in manifest)) throw new Error(`Unknown photo key: ${key}`);
}
for (const [, photo] of entries) {
  const filename = `cts-pacific-${photo.filename}.${photo.preserveSource ? "jpeg" : "webp"}`;
  const output = path.join(destination, filename);
  const input = path.join(source, photo.source);
  if (photo.preserveSource) {
    const metadata = await sharp(input).metadata();
    if (metadata.format !== "jpeg" || metadata.exif || metadata.icc || metadata.xmp || metadata.iptc || (metadata.orientation ?? 1) !== 1) {
      throw new Error(`Preserved source must be an upright, metadata-free JPEG: ${photo.source}`);
    }
    // The supplied coastal JPEG is already small; another lossy encode discards detail.
    await copyFile(input, output);
  } else {
    await sharp(input).rotate()
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84, effort: 6 }).toFile(output);
  }
  const thumbnail = sharp(output).resize({ width: 960, height: 960, fit: "inside", withoutEnlargement: true });
  await (photo.preserveSource ? thumbnail.jpeg({ quality: 80 }) : thumbnail.webp({ quality: 80, effort: 4 }))
    .toFile(path.join(thumbnails, filename));
  const metadata = await sharp(output).metadata();
  const { size } = await stat(output);
  total += size;
  console.log(`${filename}: ${metadata.width}x${metadata.height}, ${Math.round(size / 1024)} KB`);
}
console.log(`Prepared ${entries.length} photographs and thumbnails; ${(total / 1024 / 1024).toFixed(2)} MB of full images. Originals unchanged.`);
