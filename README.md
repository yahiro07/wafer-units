# wafer-units

Units compatible with [wafer](https://github.com/yahiro07/wafer). This repository includes synthesizers, sequencers, effects, drum machines, and more.

## Screenshot

![screenshot](screenshot.png)

Units loaded in Wireboard app.

## Usage

Built units are published with `r<number>` tags. Use the latest tag when you add units to a host app.

### With the Vite plugin

Pass the URLs of the units you need to the Vite plugin:

```ts
export const unitSourceUrls = [
  "https://github.com/yahiro07/wafer-units/tree/r22/graphite-drum-machine/",
  "https://github.com/yahiro07/wafer-units/tree/r22/tonerio-sequencer/",
  "https://github.com/yahiro07/wafer-units/tree/r22/sunset-delay/",
  ...
];
```

Example Vite config:

```ts
import { defineConfig } from "vite";
import { unitLoaderPlugin } from "wafer-host/vite-plugin";
import { unitSourceUrls } from "./src/unit-source-urls";

export default defineConfig({
  plugins: [unitLoaderPlugin({ unitSourceUrls })],
});
```

The plugin adds those units to the catalog JSON. Point `<UnitFrame>` at the catalog URLs. See the Wafer documentation for details.

### Without the Vite plugin (vanilla JS)

One simple approach is to clone this repository into your host app. Replace `r22` with the latest tag:

```sh
cd assets
git clone -b r22 https://github.com/yahiro07/wafer-units
```

That gives you a layout like this:

```
.
├── index.css
├── index.html
├── index.js
└── assets
    └── wafer-units
        ├── graphite-drum-machine
        ├── sunset-delay
        ├── tonerio-sequencer
        └── ...
```

Load units with `<unit-frame>`. Use `index.html` for iframe-based units and `index.js` for Web Component units:

```html
<unit-frame
  unit-id="drum1"
  url="assets/wafer-units/graphite-drum-machine/index.js"
></unit-frame>
<unit-frame
  unit-id="sequencer1"
  url="assets/wafer-units/tonerio-sequencer/index.html"
></unit-frame>
```

## Tech stack

Units are built with React (Preact), TypeScript, and Vite. Some are iframe-based; others are Web Components.

Styling is still experimental. We have tried Tailwind CSS, Tailwind-compatible libraries, and custom CSS-in-JS, looking for a compact way to write styles. CSS-in-JS often does not work well with Web Component Shadow DOM, so there is no settled approach yet.

## Building locally

From the repository root:

```sh
pnpm install
pnpm build
```

`pnpm build` builds all units.

## Notes

Some units are incomplete. When you add them to a host, pick only the ones you need.

## License

This repository is MIT licensed. Some nested projects include third-party OSS; those licenses are listed separately in those projects.
