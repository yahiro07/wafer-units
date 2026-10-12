<script lang="ts">
  import { createAppModel } from "./app-model.svelte.ts";
  import type { SynthParameterKey } from "./core/definitions";
  import LabeledKnob from "./components/labeled-knob.svelte";

  const appModel = createAppModel();

  const { states } = appModel;
  const parameters = states.parameters;
</script>

{#if states.viewActive}
  <div class="h-dvh flex-c">
    <div class="w-98px h-94px bg-#ccc flex-c pt-3">
      <LabeledKnob
        label="PAN"
        value={parameters.pan}
        min={-1}
        max={1}
        onchange={(v) => appModel.setParameter("pan", v)}
      />
    </div>
  </div>
{/if}
