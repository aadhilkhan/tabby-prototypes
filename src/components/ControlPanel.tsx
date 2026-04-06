import type { StationState } from "../types";
import { playTapSound } from "../sounds";

interface ControlPanelProps {
  state: StationState;
  onSendNotification: () => void;
  onFinishPurchase: () => void;
  onRestart: () => void;
}

export default function ControlPanel({
  state,
  onSendNotification,
  onFinishPurchase,
  onRestart,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-[8px] items-end">
      <img src="/TBadge.png" alt="" className="h-[48px] object-contain mb-[24px]" />
      <button
        onClick={onSendNotification}
                disabled={state !== "sending"}
        className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
          bg-tui-line-positive text-white
          disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
          hover:not-disabled:brightness-90 active:not-disabled:scale-95"
      >
        Send Notification
      </button>
      <button
        onClick={() => { playTapSound(); onFinishPurchase(); }}
                disabled={state !== "sent"}
        className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
          bg-tui-front-primary text-white
          disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
          hover:not-disabled:brightness-125 active:not-disabled:scale-95"
      >
        Finish Purchase
      </button>
      <button
        onClick={() => { playTapSound(); onRestart(); }}
                className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
          bg-white text-tui-front-primary border border-gray-300 cursor-pointer
          hover:bg-gray-50 active:scale-95"
      >
        Restart
      </button>
    </div>
  );
}
