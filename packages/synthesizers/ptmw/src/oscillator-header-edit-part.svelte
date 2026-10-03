<script lang="ts">
  import type {
    OscId,
    OscParameterKey,
    OscParameters,
  } from "./core/definitions";

  type Props = {
    oscId: OscId;
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: boolean) => void;
  };
  let { oscId, parameters, setParameter }: Props = $props();
  const buttonClass = " px-1 [&.active]:(text-#08f) cursor-pointer";

  const toggleParameter = (key: OscParameterKey) => {
    setParameter(key, !parameters[key]);
  };
</script>

<div class="w-full h-40px bg-#444 flex-ha pl-2 text-white gap-1">
  <button
    class={buttonClass}
    class:active={parameters.enabled}
    onclick={() => toggleParameter("enabled")}>on</button
  >
  {oscId.toUpperCase()}
  <div class="grow"></div>
  <button
    class={buttonClass}
    class:active={parameters.phaseRandom}
    onclick={() => toggleParameter("phaseRandom")}>PRND</button
  >
  <button
    class={buttonClass}
    class:active={parameters.spread}
    onclick={() => toggleParameter("spread")}>SPR</button
  >
  <button
    class={buttonClass}
    class:active={parameters.sub}
    onclick={() => toggleParameter("sub")}>SUB</button
  >
  <button
    class={buttonClass}
    class:active={parameters.full}
    onclick={() => toggleParameter("full")}>FULL</button
  >
</div>
