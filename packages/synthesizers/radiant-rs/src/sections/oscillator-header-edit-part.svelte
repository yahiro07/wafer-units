<script lang="ts">
  import type {
    OscId,
    OscParameterKey,
    OscParameters,
  } from "./core/definitions";
  import { cz } from "@lib/mu2609/utils/cz";

  type Props = {
    oscId: OscId;
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: boolean) => void;
  };
  let { oscId, parameters, setParameter }: Props = $props();

  const styles = {
    powerButton:
      "px-1 flex-ha gap-1 text-#7898 [&.active]:(text-#36f) cursor-pointer",
    button: cz(
      "w-40px h-26px bg-#bbb8 text-#fff8 text-sm cursor-pointer",
      "[&.active]:(bg-#8af text-#fff)",
    ),
  };

  const toggleParameter = (key: OscParameterKey) => {
    setParameter(key, !parameters[key]);
  };
</script>

<div class={cz("w-full h-40px flex-ha pl-1 gap-1.5")}>
  <button
    class={styles.powerButton}
    class:active={parameters.enabled}
    onclick={() => toggleParameter("enabled")}
  >
    <i class="ri-shut-down-line text-lg"></i>
    {oscId.toUpperCase()}
  </button>
  <div class="grow"></div>
  <button
    class={styles.button}
    class:active={parameters.phaseRandom}
    onclick={() => toggleParameter("phaseRandom")}>PRND</button
  >
  <button
    class={styles.button}
    class:active={parameters.spread}
    onclick={() => toggleParameter("spread")}>SPR</button
  >
  <button
    class={styles.button}
    class:active={parameters.sub}
    onclick={() => toggleParameter("sub")}>SUB</button
  >
  <button
    class={styles.button}
    class:active={parameters.full}
    onclick={() => toggleParameter("full")}>FULL</button
  >
</div>
