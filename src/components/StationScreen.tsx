import SpinnerIcon from "./SpinnerIcon";
import Tracker from "./Tracker";
import Footer from "./Footer";
import type { StationState, PrototypeVersion, Language } from "../types";
import { getTrackerSteps, getTrackerStepsV2 } from "../constants";
import { t } from "../translations";

interface StationScreenProps {
  state: StationState;
  phoneNumber: string;
  version?: PrototypeVersion;
  lang?: Language;
  onChangeAccount?: () => void;
  onTroubleClick?: () => void;
}

export default function StationScreen({ state, phoneNumber, version = "v1", lang = "en", onChangeAccount, onTroubleClick }: StationScreenProps) {
  const steps = version === "v2" ? getTrackerStepsV2(state, lang, phoneNumber) : getTrackerSteps(state, lang, phoneNumber);

  return (
    <div className="relative h-full flex flex-col">
      {/* Content area */}
      <div className="flex flex-col gap-[16px] items-start pt-[16px] pb-[32px] px-[16px]">
        {/* Spinner + Heading group */}
        <div className="flex flex-col gap-[22px] items-start w-full">
          <SpinnerIcon spinning={version === "v1"} />
          <h1
            className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary"
          >
            {t("station.heading", lang)}
          </h1>
        </div>
      </div>

      {/* Tracker */}
      <Tracker steps={steps} onTroubleClick={onTroubleClick} />

      {/* Footer — only after notification is sent */}
      {state !== "sending" && (
        <Footer phoneNumber={phoneNumber} lang={lang} onChangeAccount={onChangeAccount} />
      )}
    </div>
  );
}
