import { PixelButton } from "@/components/pixel-button";

export function ToggleParameter(props: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div class="flex-ha h-8 text-[10px] tracking-[0.12em] text-[#d7dfeb] gap-2">
      <div class="w-[72px] text-[#a8b4c0]">{props.label}</div>
      <PixelButton
        text={props.active ? "ON" : "OFF"}
        active={props.active}
        onClick={props.onToggle}
        class="w-[80px]"
      />
    </div>
  );
}
