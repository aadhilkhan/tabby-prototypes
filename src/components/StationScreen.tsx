import SpinnerIcon from "./SpinnerIcon";
import Tracker from "./Tracker";
import Footer from "./Footer";
import type { StationState, PrototypeVersion } from "../types";
import { getTrackerSteps, getTrackerStepsV2 } from "../constants";

interface StationScreenProps {
  state: StationState;
  phoneNumber: string;
  version?: PrototypeVersion;
  onChangeAccount?: () => void;
  onTroubleClick?: () => void;
}

export default function StationScreen({ state, phoneNumber, version = "v1", onChangeAccount, onTroubleClick }: StationScreenProps) {
  const steps = version === "v2" ? getTrackerStepsV2(state) : getTrackerSteps(state);

  return (
    <div className="relative h-full flex flex-col">
      {/* Content area */}
      <div className="flex flex-col gap-[16px] items-start pt-[16px] pb-[32px] px-[16px]">
        {/* Spinner + Heading group */}
        <div className="flex flex-col gap-[22px] items-start w-full">
          <SpinnerIcon spinning={version === "v1"} />
          <h1
            className="text-[35px] font-semibold leading-[36px] tracking-[-0.7px] text-tui-front-primary"
            style={{ fontFamily: '"Radial Saudi", "Inter Variable", sans-serif', fontWeight: 500 }}
          >
            Complete purchase in{"\u00A0"} the Tabby app
          </h1>
        </div>
      </div>

      {/* Tracker */}
      <Tracker steps={steps} onTroubleClick={onTroubleClick} />

      {/* Footer — only after notification is sent */}
      {state !== "sending" && (
        <Footer phoneNumber={phoneNumber} onChangeAccount={onChangeAccount} />
      )}
    </div>
  );
}
