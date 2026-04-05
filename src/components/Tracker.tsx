import TrackerStep from "./TrackerStep";
import type { TrackerStepData } from "../types";

export default function Tracker({ steps }: { steps: TrackerStepData[] }) {
  return (
    <div className="flex flex-col items-start w-full px-[16px] pb-[8px]">
      <div className="flex flex-col items-start w-full">
        {steps.map((step) => (
          <TrackerStep key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
