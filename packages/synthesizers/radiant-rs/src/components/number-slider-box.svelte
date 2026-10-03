<script lang="ts">
  import KnobFrame from "./knob-frame.svelte";
  import LabeledBox from "./labeled-box.svelte";

  type Props = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onchange?: (value: number) => void;
  };

  let {
    label = "",
    value,
    min = 0,
    max = 1,
    step = 0.01,
    onchange = () => {},
  }: Props = $props();
</script>

{#snippet knobContent()}
  <div class="w-45px h-30px flex-c bg-#ddd8 bd-#2224 border-0.5px text-#347">
    {value}
  </div>
{/snippet}

{#snippet controlContent()}
  <KnobFrame {value} {min} {max} {step} {onchange} content={knobContent}
  ></KnobFrame>
{/snippet}

<LabeledBox content={controlContent} {label}></LabeledBox>
