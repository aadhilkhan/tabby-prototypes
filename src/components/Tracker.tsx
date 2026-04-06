import TrackerStep from "./TrackerStep";
import type { TrackerStepData } from "../types";

interface TrackerProps {
  steps: TrackerStepData[];
  onTroubleClick?: () => void;
}

export default function Tracker({ steps, onTroubleClick }: TrackerProps) {
  return (
    <div className="flex flex-col items-start w-full px-[16px] pb-[8px]">
      <div className="flex flex-col items-start w-full">
        {steps.map((step) => (
          <TrackerStep
            key={step.id}
            step={step}
            onActionClick={step.action ? onTroubleClick : undefined}
          />
        ))}
      </div>
    </div>
  );
}
