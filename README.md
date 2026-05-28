[wus](https://github.com/yahiro07/webaudio-unit-system) compatible units.
Here are mainly my own designed apps.

## Setup

Use `pnpm install` at the repository root.

## Build

Use `pnpm build:all` at the repository root to build every workspace package.

Some packages depend on a GitHub repository subpath such as `github:yahiro07/beam#0.1.3&path:/beams`, which npm does not support correctly. Running `npm install` will fail by design and should be replaced with `pnpm install`.
