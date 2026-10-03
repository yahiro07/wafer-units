/** @type {import('svelte').Config} */
export default {
  compilerOptions: {
    warningFilter: (warning) => warning.code !== "a11y_consider_explicit_label",
  },
};
