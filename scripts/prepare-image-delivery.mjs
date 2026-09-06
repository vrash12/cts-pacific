import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json")] }));
const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDirectory = path.join(root, "public/images");
const destination = path.join(sourceDirectory, "delivery");
const manifestPath = path.join(root, "src/config/image-delivery.json");
const widths = [256, 384, 640, 768, 960, 1280, 1600, 1920];
// Include the encoder and recipe in the URL hash so changed output never reuses an immutable URL.
const recipe = JSON.stringify({ version: 1, widths, quality: 88, sharp: sharp.versions });
const manifest = {};
const expectedFiles = new Set();
let generated = 0;

async function exists(filename) {
  try {
    await stat(filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function collect(directory) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    const filename = path.join(directory, entry.name);
    if (filename === destination) continue;
    if (entry.isDirectory()) files.push(...await collect(filename));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) files.push(filename);
  }
  return files;
}

await mkdir(destination, { recursive: true });
for (const filename of await collect(sourceDirectory)) {
  const bytes = await readFile(filename);
  const metadata = await sharp(bytes).metadata();
  if (!metadata.width || !metadata.height || (metadata.pages ?? 1) > 1) continue;
  const rotated = [5, 6, 7, 8].includes(metadata.orientation);
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  const hash = createHash("sha256").update(recipe).update(bytes).digest("hex").slice(0, 16);
  const extension = path.extname(filename).slice(1).toLowerCase();
  const name = path.basename(filename, path.extname(filename)).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const base = `/images/delivery/${name}-${hash}`;
  const original = `${base}-original.${extension}`;
  const originalDestination = path.join(root, "public", original);
  expectedFiles.add(path.basename(originalDestination));
  if (!await exists(originalDestination)) {
    await copyFile(filename, originalDestination);
    generated++;
  }
  const variants = widths.filter(candidate => candidate < width);
  // Keep memory use bounded when building on small CI/hosting machines.
  for (const variant of variants) {
    const output = path.join(root, "public", `${base}-${variant}.webp`);
    expectedFiles.add(path.basename(output));
    if (await exists(output)) continue;
    await sharp(bytes).rotate().resize({ width: variant, withoutEnlargement: true })
      .webp({ quality: 88, effort: 4 }).toFile(output);
    generated++;
  }
  const src = `/images/${path.relative(sourceDirectory, filename).split(path.sep).join("/")}`;
  manifest[src] = { base, original, width, height, widths: variants };
}

// This generated directory is flat and dedicated to this script. Remove only
// obsolete generated filenames so replaced sources are not redeployed forever.
for (const entry of await readdir(destination, { withFileTypes: true })) {
  if (!entry.isFile() || expectedFiles.has(entry.name) || !/-[a-f0-9]{16}-(original\.(jpe?g|png|webp|avif)|\d+\.webp)$/.test(entry.name)) continue;
  const obsolete = path.resolve(destination, entry.name);
  if (path.dirname(obsolete) !== destination) throw new Error("Image output escaped its directory");
  await unlink(obsolete);
}

const output = `${JSON.stringify(manifest, null, 2)}\n`;
const previous = await readFile(manifestPath, "utf8").catch(error => {
  if (error.code === "ENOENT") return "";
  throw error;
});
if (previous !== output) await writeFile(manifestPath, output);
console.log(`Image delivery ready: ${Object.keys(manifest).length} sources, ${generated} files prepared. Originals unchanged.`);
