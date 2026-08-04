import { useEffect, useRef, useState } from "preact/hooks";
import { PartKey } from "@/model/defs";
import { qu } from "@/ui/common/css-realm";
import { PartActiveButton, PartButton } from "@/ui/components/buttons";
import { PartIndicator } from "@/ui/components/indicators";
import { actions } from "@/ui/store/actions";
import { store } from "@/ui/store/store";

const PartIndicatorContainer = ({ partKey }: { partKey: PartKey }) => {
  const { partHitCounts } = store.useSnapshot();
  const count = partHitCounts[partKey];
  const [active, setActive] = useState(false);
  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (count !== undefined) {
      setActive(true);
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current);
      }
      timerIdRef.current = setTimeout(() => {
        setActive(false);
      }, 100);
    }
  }, [count]);

  return <PartIndicator width={55} height={9} active={active} />;
};

const PartButtonsColumn = ({ partKey }: { partKey: PartKey }) => {
  const { currentPartKey, partItems } = store.useSnapshot();
  const partItem = partItems.find((item) => item.partKey === partKey);
  if (!partItem) return;
  const isBlank = partItem.notes.every((note) => note === null);

  return (
    <div sx={qu.flexVC().gap(2)}>
      <PartIndicatorContainer partKey={partKey} />
      <PartButton
        label={partKey}
        active={partKey === currentPartKey}
        onClick={() => actions.selectPart(partKey)}
      />
      <PartActiveButton
        active={!isBlank && partItem.outputActive}
        disabled={isBlank}
        onClick={() => actions.togglePartOutput(partKey)}
      />
    </div>
  );
};

export const PartButtonsColumns = () => {
  return (
    <div sx={qu.flexHA().gap(2)}>
      <PartButtonsColumn partKey="BD" />
      <PartButtonsColumn partKey="SN" />
      <PartButtonsColumn partKey="HO" />
      <PartButtonsColumn partKey="HC" />
      <PartButtonsColumn partKey="CL" />
      <PartButtonsColumn partKey="RD" />
      <PartButtonsColumn partKey="BS" />
      <PartButtonsColumn partKey="ST" />
      <PartButtonsColumn partKey="PR" />
    </div>
  );
};
