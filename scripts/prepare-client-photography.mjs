import { createRequire } from "node:module";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json")] }));
const [source, sanitizedRouter, destination] = process.argv.slice(2);
if (!source || !sanitizedRouter || !destination) {
  throw new Error("Usage: node scripts/prepare-client-photography.mjs <source-folder> <sanitized-router> <output-folder>");
}
await stat(sanitizedRouter);
const names = (await readdir(source)).filter((name) => name.endsWith(".jpeg"));
if (names.length !== 25) throw new Error("Expected the 25 reviewed client photographs.");
await mkdir(destination, { recursive: true });
let totalBytes = 0;
for (const name of names) {
  const isRouter = name === "cts-pacific-broadband-router-with-visible-credential-label.jpeg";
  const isDocument = name.includes("business-license");
  const input = isRouter ? sanitizedRouter : path.join(source, name);
  const outputName = isRouter ? "cts-pacific-broadband-router.webp" : name.replace(/\.jpeg$/, ".webp");
  const result = await sharp(input)
    .rotate()
    .resize({ width: isDocument ? 2400 : 1800, height: isDocument ? 2400 : 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: isDocument ? 94 : 84, effort: 6 })
    .toFile(path.join(destination, outputName));
  totalBytes += result.size;
  console.log(`${outputName}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)} KB`);
}
console.log(`Prepared ${names.length} web images: ${(totalBytes / 1024 / 1024).toFixed(2)} MB. Originals unchanged.`);
