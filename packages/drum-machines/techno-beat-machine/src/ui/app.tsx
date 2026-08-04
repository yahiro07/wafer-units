import { colors } from "@/ui/common/colors";
import { useSetupDrivers } from "@/ui/drivers";
import { MasterControlArea } from "@/ui/organisms/master-control-area";
import { PartButtonsColumns } from "@/ui/organisms/part-control-area";
import { PartEditAttributesArea } from "@/ui/organisms/part-edit-attributes-area";
import { PartEditStepsArea } from "@/ui/organisms/part-edit-steps-erea";
import { qu } from "./common/css-realm";

const PageRoot = () => {
  return (
    <div sx={qu.h("dvh").flexC()}>
      <div sx={qu.wh(900, 500).bg(colors.panelBg).flexC()}>
        <div sx={qu.flexV().gap(16)}>
          <div sx={qu.flexV().gap(6)}>
            <MasterControlArea />
            <PartButtonsColumns />
          </div>
          <div sx={qu.flexV().gap(3)}>
            <PartEditAttributesArea />
            <PartEditStepsArea />
          </div>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
