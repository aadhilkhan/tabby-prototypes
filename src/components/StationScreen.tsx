import NavBar from "./NavBar";
import SpinnerIcon from "./SpinnerIcon";
import Tracker from "./Tracker";
import Footer from "./Footer";
import type { StationState } from "../types";
import { getTrackerSteps } from "../constants";

export default function StationScreen({ state }: { state: StationState }) {
  const steps = getTrackerSteps(state);

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* NavBar */}
      <NavBar />

      {/* Content area */}
      <div className="flex flex-col gap-[16px] items-start pt-[16px] pb-[32px] px-[16px]">
        {/* Spinner + Heading group */}
        <div className="flex flex-col gap-[22px] items-start w-full">
          <SpinnerIcon />
          <h1
            className="text-[35px] font-semibold leading-[36px] tracking-[-0.7px] text-tui-front-primary"
            style={{ fontFamily: '"Radial Saudi", "Inter Variable", sans-serif', fontWeight: 500 }}
          >
            Complete purchase in{"\u00A0"} the Tabby app
          </h1>
        </div>
      </div>

      {/* Tracker */}
      <Tracker steps={steps} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
