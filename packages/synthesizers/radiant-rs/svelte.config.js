/** @type {import('svelte').Config} */
export default {
  compilerOptions: {
    warningFilter: (warning) => {
      return !(
        warning.code === "a11y_consider_explicit_label" ||
        warning.code === "a11y_no_static_element_interactions" ||
        warning.code === "a11y_click_events_have_key_events"
      );
    },
  },
};
