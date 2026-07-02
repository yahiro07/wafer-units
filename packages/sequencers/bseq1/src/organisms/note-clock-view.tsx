export function NoteClockView(props: { noteNumber: number }) {
  const vm = {
    tickAngel() {
      return props.noteNumber * 30;
    },
  };
  return (
    <div class="border border-[#444] w-[30px] h-[30px] rounded-full bg-[#aaa]">
      <div
        class="w-full h-full flex justify-center"
        style={{
          transform: `rotate(${vm.tickAngel()}deg)`,
        }}
      >
        <div class="w-[1px] h-[15px] bg-[#444]" />
      </div>
    </div>
  );
}
