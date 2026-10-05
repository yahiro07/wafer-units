<script lang="ts">
  import { createAppModel } from "./app-model.svelte.ts";
  import { cz } from "@lib/mu2609/utils/cz";

  const appModel = createAppModel();

  const { states } = appModel;

  $effect(() => {
    return () => {
      appModel.cleanup();
    };
  });

  function getRecordingProgressText() {
    if (states.recordingProgress) {
      const rp = states.recordingProgress;
      const pos = rp.currentBarPosition / rp.totalBars;
      return `${(pos * 100).toFixed(0)}%`;
    } else {
      return "0%";
    }
  }
</script>

{#snippet button({
  text,
  active,
  disabled,
  onClick,
  activeColor = "#0af",
}: {
  text: string;
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
  activeColor?: string;
})}
  <button
    class={cz(
      "bg-#aaa text-white px-2.5 py-2",
      !disabled ? "cursor-pointer hover:opacity-90" : "pointer-events-none",
    )}
    style={active ? `background-color: ${activeColor}` : undefined}
    onclick={onClick}>{text}</button
  >
{/snippet}

{#if states.viewActive}
  <div class="h-dvh flex-c overflow-hidden">
    <div class="flex-vc gap-1">
      <div class="flex-c w-full bg-#aaa text-white py-2">
        {getRecordingProgressText()}
      </div>
      <div class="flex-h gap-1">
        {@render button({
          text: "standby",
          active: states.recordingStatus === "reserved",
          disabled:
            states.recordingStatus === "recording" ||
            states.recordingStatus === "done",
          onClick: appModel.reserveRecording,
        })}
        {@render button({
          text: "recording",
          active: states.recordingStatus === "recording",
          disabled: true,
          activeColor: "#f90",
        })}
        {@render button({
          text: "DL",
          active: states.recordingStatus === "done",
          disabled: states.recordingStatus !== "done",
          activeColor: "#4c4",
          onClick: appModel.downloadRecordedAudio,
        })}
        {@render button({
          text: "x",
          active: states.recordingStatus === "done",
          disabled: states.recordingStatus !== "done",
          activeColor: "#4c4",
          onClick: appModel.clearRecordedAudio,
        })}
      </div>
    </div>
  </div>
{/if}
