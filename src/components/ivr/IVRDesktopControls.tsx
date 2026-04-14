import type { IVRState } from "../../types";

interface Props {
  state: IVRState;
  onGoTo: (next: IVRState) => void;
  onRestart: () => void;
}

const STATE_LABELS: Record<IVRState, string> = {
  hold_created: "Hold Created",
  ivr_in_progress: "Calling",
  ivr_failed: "Failed / Timeout",
  ivr_success: "Success",
};

const STATE_COLORS: Record<IVRState, string> = {
  hold_created: "bg-tui-line-positive",
  ivr_in_progress: "bg-tui-front-accent",
  ivr_failed: "bg-[color:var(--color-ivr-warning)]",
  ivr_success: "bg-[color:var(--color-ivr-success)]",
};

export { STATE_LABELS as IVR_STATE_LABELS, STATE_COLORS as IVR_STATE_COLORS };

export default function IVRDesktopControls({ state, onGoTo, onRestart }: Props) {
  return (
    <div className="flex flex-col gap-[8px] items-end">
      <img src="/TBadge.png" alt="" className="h-[48px] object-contain mb-[24px]" />
      {(Object.keys(STATE_LABELS) as IVRState[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onGoTo(s)}
          className={`px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
            ${state === s
              ? `${STATE_COLORS[s]} text-white`
              : "bg-white text-tui-front-primary border border-gray-300 hover:bg-gray-50"}
            hover:not-disabled:brightness-110 active:not-disabled:scale-95`}
        >
          {STATE_LABELS[s]}
        </button>
      ))}
      <button
        type="button"
        onClick={onRestart}
        className="mt-[8px] px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
          bg-white text-tui-front-primary border border-gray-300 cursor-pointer
          hover:bg-gray-50 active:scale-95"
      >
        Restart
      </button>
    </div>
  );
}

export function IVRSimulatePanel({ onSuccess, onFailure }: { onSuccess: () => void; onFailure: () => void }) {
  return (
    <div className="flex flex-col gap-[8px] items-start">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-tui-front-secondary mb-[4px]">
        Simulate
      </p>
      <button
        type="button"
        onClick={onSuccess}
        className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
          bg-white border-2 hover:bg-[color:var(--color-ivr-success-light)] active:scale-95"
        style={{ color: "var(--color-ivr-success)", borderColor: "var(--color-ivr-success)" }}
      >
        ▸ Success
      </button>
      <button
        type="button"
        onClick={onFailure}
        className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
          bg-white border-2 hover:bg-[color:var(--color-ivr-warning-light)] active:scale-95"
        style={{ color: "var(--color-ivr-warning)", borderColor: "var(--color-ivr-warning)" }}
      >
        ▸ Failure
      </button>
    </div>
  );
}
