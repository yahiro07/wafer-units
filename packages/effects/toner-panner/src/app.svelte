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
    <div class="w-100px h-100px bg-#ccc flex-c pt-4 pb-1 px-6">
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
