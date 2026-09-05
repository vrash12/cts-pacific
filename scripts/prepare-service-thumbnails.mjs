import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json")] }));
const source = path.resolve("public/images/cts");
const destination = path.join(source, "thumbnails");
const names = [
  "fiber-splice-tray-color-coded-fibers",
  "network-racks-and-patch-panel-cabling",
  "fiber-cable-coils-at-underground-handhole",
  "metal-conduit-routing-above-roll-up-door",
  "network-rack-wall-mounted-switch-and-patch-panels",
  "optical-transport-equipment-fiber-patch-connections",
  "broadband-router",
  "vermeer-rtx550-trencher-side-view",
];
await mkdir(destination, { recursive: true });
for (const name of names) {
  const filename = `cts-pacific-${name}.webp`;
  const result = await sharp(path.join(source, filename))
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toFile(path.join(destination, filename));
  console.log(`${filename}: ${Math.round(result.size / 1024)} KB`);
}
