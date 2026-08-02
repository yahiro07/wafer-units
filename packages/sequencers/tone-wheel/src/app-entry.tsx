import { useEffect } from "preact/hooks";
import { createStore } from "snap-store";
import {
  onIframeUnitUnloading,
  queryUnitInterface,
} from "wafer-host/unit-types";
import { DragHandlerEvent, startDragSession } from "@/utils/drag-session";
import { SvgCircleButton, SvgPieButton } from "@/svg-pie-button";
import { radToDeg, npx, seqNumbers } from "@/utils/helpers";
import { createNoteVoicingGateDriveAdapter } from "@/utils/note-voicing-gate-drive-adapter";
import { createTestSynthesizer } from "@/utils/test-synthesizer";
import { render } from "preact";

type SlideBehavior = "keep_tone" | "change_pitch" | "note_off";

const configs = {
  slideBehavior: "change_pitch" as SlideBehavior, //SPV (slide to pitch variance)
};
if (0) {
  // configs.slideBehavior = "keep_tone"; //SPLK (slide pitch lock)
  // configs.slideBehavior = "note_off";  //SNF (slide note off)
}

const unitInterface = queryUnitInterface("wafer-v01");

function createTargetSynthesizer() {
  if (unitInterface) {
    const noteOutput = unitInterface.createNoteOutputPort();
    return {
      resumeIfNeed() {},
      noteOn(noteNumber: number) {
        noteOutput.noteOn(noteNumber, 1);
      },
      noteOff(noteNumber: number) {
        noteOutput.noteOff(noteNumber);
      },
    };
  } else {
    return createTestSynthesizer();
  }
}

const testSynth = createTargetSynthesizer();
const adaptedSynth = createNoteVoicingGateDriveAdapter(testSynth);

const store = createStore<{
  totalAngle: number; //An angle that includes information on rotations exceeding 360 degrees; default is 0; can be positive or negative
}>({
  totalAngle: 0,
});

const voiceActions = {
  sendPitch(noteNumber: number) {
    if (!Number.isFinite(noteNumber)) {
      return;
    }
    adaptedSynth.setNoteNumber(noteNumber);
  },
  sendGate(gate: boolean) {
    testSynth.resumeIfNeed();
    adaptedSynth.setGate(gate);
  },
};

const subNotes = [0, 2, 4, 5, 7, 9, 11];

type RadialPos = "core" | "ring" | "outer";

function mapTotalAngleToNoteNumber(totalAngle: number) {
  const step = 360 / 7;
  const totalStep = totalAngle / step;
  const stepIndex = Math.round(totalStep);

  const octave = Math.floor(stepIndex / 7);
  const subIndex = ((stepIndex % 7) + 7) % 7;
  return 48 + octave * 12 + subNotes[subIndex];
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function getAngleDiffInCloserPath(angleTo: number, angleFrom: number) {
  let diff = angleTo - angleFrom;
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }
  return diff;
}

function createWheelLogic() {
  const state = {
    isVoicing: false,
    totalAngle: 0,
    initialNote: 0,
    latestNote: 0,
    isMouseRightButton: false,
  };

  const internal = {
    updateTotalAngle(angle: number) {
      state.totalAngle = angle;
      store.setTotalAngle(angle);
    },
    updateVoicing(isVoicing: boolean) {
      if (!state.isVoicing && isVoicing) {
        voiceActions.sendGate(true);
      } else if (state.isVoicing && !isVoicing) {
        voiceActions.sendGate(false);
      }
      state.isVoicing = isVoicing;
    },
  };

  return {
    applyDragInput(
      e:
        | {
            type: "down";
            radialPos: RadialPos;
            dragStartAngle: number;
            isMouseRightButton: boolean;
          } // dragStartAngle: 0-360, 0 is up, 90 is right, 180 is down, 270 is left
        | { type: "move"; radialPos: RadialPos; dragAngleDiff: number } //dragAngleDiff: in degree from previous angle
        | { type: "up"; radialPos: RadialPos },
    ) {
      if (e.type === "down") {
        const currentAngle = normalizeAngle(state.totalAngle);
        const angleDiffToStart = getAngleDiffInCloserPath(
          e.dragStartAngle,
          currentAngle,
        );
        const newTotalAngle = state.totalAngle + angleDiffToStart;
        internal.updateTotalAngle(newTotalAngle);
        const noteNumber = mapTotalAngleToNoteNumber(newTotalAngle);
        voiceActions.sendPitch(noteNumber);
        state.initialNote = noteNumber;
        state.latestNote = noteNumber;
        state.isMouseRightButton = e.isMouseRightButton;
      } else if (e.type === "move") {
        const newTotalAngle = store.state.totalAngle + e.dragAngleDiff;
        internal.updateTotalAngle(newTotalAngle);

        const noteNumber = mapTotalAngleToNoteNumber(newTotalAngle);
        if (configs.slideBehavior === "change_pitch") {
          voiceActions.sendPitch(noteNumber);
        }
        state.latestNote = noteNumber;
      } else if (e.type === "up") {
        internal.updateVoicing(false);
        return;
      }

      const isPrimaryButton = !state.isMouseRightButton;
      const inRing = e.radialPos === "ring";
      if (configs.slideBehavior === "note_off") {
        const isInitialNote = state.initialNote === state.latestNote;
        internal.updateVoicing(inRing && isInitialNote && isPrimaryButton);
      } else {
        internal.updateVoicing(inRing && isPrimaryButton);
      }
    },
  };
}
const wheelLogic = createWheelLogic();

function toClockAngle(dx: number, dy: number) {
  const rawAngle = radToDeg(Math.atan2(dy, dx));
  return (rawAngle + 90 + 360) % 360;
}

const wheelGeometry = {
  coreRadius: 15,
  ringInnerRadius: 50,
  ringOuterRadius: 110,
};

function classifyRadialPos(distance: number): RadialPos {
  if (distance < wheelGeometry.ringInnerRadius) {
    return "core";
  }
  if (distance <= wheelGeometry.ringOuterRadius) {
    return "ring";
  }
  return "outer";
}

type WheelPointerInfo = {
  radialPos: RadialPos;
  angle: number;
};

function getPointerInfo(
  position: { x: number; y: number },
  centerX: number,
  centerY: number,
): WheelPointerInfo {
  const dx = position.x - centerX;
  const dy = position.y - centerY;
  const distance = Math.hypot(dx, dy);
  return {
    radialPos: classifyRadialPos(distance),
    angle: toClockAngle(dx, dy),
  };
}

function handleWheelPointerDown(e0: PointerEvent) {
  const svgRect = (e0.currentTarget as SVGSVGElement).getBoundingClientRect();
  const centerX = svgRect.left + svgRect.width / 2;
  const centerY = svgRect.top + svgRect.height / 2;

  function wrapGetPointerInfo(e: DragHandlerEvent) {
    return getPointerInfo(e.position, centerX, centerY);
  }

  let prevAngle = 0;

  const coreHandlers = {
    handleDown(e: DragHandlerEvent) {
      const downInfo = wrapGetPointerInfo(e);
      wheelLogic.applyDragInput({
        type: "down",
        radialPos: downInfo.radialPos,
        dragStartAngle: downInfo.angle,
        isMouseRightButton: e0.button === 2,
      });
      prevAngle = downInfo.angle;
    },
    handleMove(e: DragHandlerEvent) {
      const moveInfo = wrapGetPointerInfo(e);
      const dragAngleDiff = getAngleDiffInCloserPath(moveInfo.angle, prevAngle);

      wheelLogic.applyDragInput({
        type: "move",
        radialPos: moveInfo.radialPos,
        dragAngleDiff,
      });
      prevAngle = moveInfo.angle;
    },
    handleEnd(e: DragHandlerEvent) {
      const upInfo = wrapGetPointerInfo(e);
      wheelLogic.applyDragInput({ type: "up", radialPos: upInfo.radialPos });
    },
  };

  startDragSession(
    e0,
    {
      onDown: coreHandlers.handleDown,
      onMove: coreHandlers.handleMove,
      onUp: coreHandlers.handleEnd,
      onCancel: coreHandlers.handleEnd,
    },
    { coordinate: "page" },
  );
}

const WheelSegmentButton = ({ index }: { index: number }) => {
  const step = 360 / 7;
  const centerAngle = index * step;
  return (
    <SvgPieButton
      key={index}
      centerX={0}
      centerY={0}
      innerRadius={wheelGeometry.ringInnerRadius}
      outerRadius={wheelGeometry.ringOuterRadius}
      centerAngle={centerAngle - 90}
      angleHalfRange={step / 2}
      fill="#ddd"
      stroke="#666"
    />
  );
};

const ToneWheelView = () => {
  const { totalAngle } = store.useSnapshot();

  const hsz = 140;
  const viewBox = [-hsz, -hsz, hsz * 2, hsz * 2].join(" ");

  const markerInnerRadius = 114;
  const markerThickness = 20;
  return (
    <svg
      className="border border-[#888]"
      viewBox={viewBox}
      style={{ width: npx(hsz * 2), height: npx(hsz * 2) }}
      onPointerDown={handleWheelPointerDown}
    >
      <g>
        {seqNumbers(7).map((_, index) => {
          return <WheelSegmentButton key={index} index={index} />;
        })}
      </g>

      <SvgPieButton
        centerX={0}
        centerY={0}
        innerRadius={markerInnerRadius}
        outerRadius={markerInnerRadius + markerThickness}
        centerAngle={-90 + totalAngle}
        angleHalfRange={12}
        fill="#4cd"
      />
      <SvgCircleButton
        centerX={0}
        centerY={0}
        radius={wheelGeometry.coreRadius}
        fill="#ddd"
        stroke="#666"
      />
    </svg>
  );
};

const PageRoot = () => {
  const state = store.useSnapshot();
  return (
    <div className="w-dvw h-dvh flex-vc bg-gray-200">
      <div>{state.totalAngle.toFixed(0)}</div>
      <ToneWheelView />
    </div>
  );
};

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      categoryHint: "keyboard",
      viewSize: [350, 350],
      preferJustSize: true,
    },
  });
}

const App = () => {
  useEffect(setupUnit, []);
  return <PageRoot />;
};

window.addEventListener("contextmenu", (e) => e.preventDefault());

const rootDiv = document.getElementById("app")!;
render(<App />, rootDiv);

onIframeUnitUnloading(() => {
  render(null, rootDiv);
});
