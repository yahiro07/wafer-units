<script lang="ts">
  import { createPreviewWaveProvider } from "./core/waveforms/preview-wave-provider";
  import type { CustomWaveParameters } from "./core/waveforms/waveform-types";

  type Props = {
    waveformParameters: CustomWaveParameters;
  };
  let { waveformParameters }: Props = $props();

  const previewWaveProvider = createPreviewWaveProvider();

  function generateWaveformPath(params: CustomWaveParameters) {
    const points = previewWaveProvider.getPreviewWave(params);
    return [
      "M 0 100",
      ...points.map((point, index) => {
        return `L ${(index / 256) * 400} ${-point * 98 + 100}`;
      }),
      "L 400 100",
    ].join(" ");
  }

  const waveformPath = $derived(generateWaveformPath(waveformParameters));

  const color = "#07f";
</script>

<div class="w-290px h-145px flex-c bg-#111">
  <svg viewBox="0 0 400 200" class="w-full h-full">
    <path
      d={waveformPath}
      stroke={color}
      stroke-width={1.5}
      fill={color}
      fill-opacity={0.2}
    />
  </svg>
</div>
