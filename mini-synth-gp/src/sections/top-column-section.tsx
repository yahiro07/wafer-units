import { ProgramSelector } from "@/components/program-selector";

type TopColumnSectionProps = {
  selectedProgramIndex: number;
  programNames: string[];
  midiConnected: boolean;
  onSelectProgram: (index: number) => void;
  onShiftProgram: (step: number) => void;
};

export function TopColumnSection(props: TopColumnSectionProps) {
  return (
    <section class="flex-ha h-14 w-full border border-slate-600 bg-slate-800/55 px-3">
      <div class="flex-ha w-full justify-between gap-3">
        <ProgramSelector
          selectedIndex={props.selectedProgramIndex}
          names={props.programNames}
          onSelectIndex={props.onSelectProgram}
          onShift={props.onShiftProgram}
        />

        <div class="text-[10px] tracking-[0.18em] text-slate-300">
          MIDI {props.midiConnected ? "CONNECTED" : "WAITING"}
        </div>
      </div>
    </section>
  );
}
