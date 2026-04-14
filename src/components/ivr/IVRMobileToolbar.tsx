import type { IVRState } from "../../types";
import { MobileToolbar, MobileToolbarButton } from "../MobileToolbar";
import { IVR_STATE_LABELS, IVR_STATE_COLORS } from "./IVRDesktopControls";

interface Props {
  state: IVRState;
  onGoTo: (next: IVRState) => void;
  onRestart: () => void;
}

export default function IVRMobileToolbar({ state, onGoTo, onRestart }: Props) {
  return (
    <MobileToolbar>
      {(Object.keys(IVR_STATE_LABELS) as IVRState[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onGoTo(s)}
          className={`px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0 cursor-pointer
            ${state === s
              ? `${IVR_STATE_COLORS[s]} text-white`
              : "bg-white text-tui-front-primary border border-gray-300"}`}
        >
          {IVR_STATE_LABELS[s].split(" ")[0]}
        </button>
      ))}
      <MobileToolbarButton tone="neutral" onClick={onRestart}>
        Reset
      </MobileToolbarButton>
    </MobileToolbar>
  );
}
