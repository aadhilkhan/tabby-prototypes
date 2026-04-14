import { useEffect, useState } from "react";
import { Phone, Lock } from "lucide-react";
import IVRStatusPill from "./IVRStatusPill";

interface Props {
  onTimeout: () => void;
  onCancel: () => void;
  onResend: () => void;
  resetKey?: number;
}

const TIMER_START = 45;

export default function IVRInProgressState({ onTimeout, onCancel, onResend, resetKey }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_START);

  useEffect(() => {
    setSecondsLeft(TIMER_START);
  }, [resetKey]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeout();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, onTimeout]);

  const resendActive = secondsLeft <= TIMER_START - 15; // after 15s elapsed => 30 or less left
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="ivr-fade-in-up flex flex-col items-center text-center gap-[20px] w-full">
      {/* Pulsing circle icon */}
      <div className="ivr-scale-in">
        <div
          className="ivr-ring-pulse rounded-full flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            backgroundColor: "rgba(93, 33, 222, 0.08)",
          }}
        >
          <Phone size={44} color="var(--color-ivr-accent)" strokeWidth={1.8} />
        </div>
      </div>

      {/* Status pill */}
      <IVRStatusPill
        label="Calling you now"
        color="var(--color-ivr-accent)"
        bg="var(--color-ivr-accent-light)"
        pulsing
      />

      {/* Heading + body */}
      <div className="flex flex-col gap-[8px] w-full px-[4px]">
        <h1 className="text-[20px] leading-[26px] tracking-[-0.3px] font-bold text-[color:var(--color-ivr-front-major)]">
          Pick up and press 1 to verify
        </h1>
        <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-normal text-[color:var(--color-ivr-front-minor)]">
          Answer the call from Tabby. Once you press 1, your order will be confirmed right away.
        </p>
      </div>

      {/* Timer bar */}
      <div
        className="w-full rounded-[16px] p-[14px] flex items-center gap-[12px]"
        style={{ backgroundColor: "var(--color-ivr-back-minor)" }}
      >
        <div
          className="ivr-spin shrink-0"
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            border: "2px solid var(--color-ivr-border)",
            borderTopColor: "var(--color-ivr-accent)",
          }}
        />
        <span className="text-[14px] font-medium tracking-[-0.1px] text-[color:var(--color-ivr-front-major)] flex-1 text-left">
          Waiting for your response
        </span>
        <span
          className="text-[14px] font-bold text-[color:var(--color-ivr-front-major)]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {timeStr}
        </span>
      </div>

      {/* Reassurance */}
      <div className="flex items-center gap-[6px] mt-[-4px]">
        <Lock size={13} color="var(--color-ivr-front-minor)" strokeWidth={2} />
        <span className="text-[13px] font-medium text-[color:var(--color-ivr-front-minor)]">
          Nothing is charged while we wait
        </span>
      </div>

      {/* Footer CTA */}
      <div className="w-full flex flex-col gap-[12px] pt-[4px]">
        <button
          onClick={resendActive ? onResend : undefined}
          disabled={!resendActive}
          className={`w-full h-[56px] rounded-[20px] flex items-center justify-center transition-all active:scale-[0.98] ${
            resendActive ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          style={{
            backgroundColor: resendActive
              ? "var(--color-ivr-front-major)"
              : "var(--color-ivr-back-minor)",
          }}
        >
          <span
            className="text-[16px] font-bold tracking-[-0.1px]"
            style={{
              color: resendActive ? "#ffffff" : "var(--color-ivr-front-minor)",
            }}
          >
            {resendActive ? "Resend call" : "Didn't get the call?"}
          </span>
        </button>
        <button
          onClick={onCancel}
          className="text-[14px] font-semibold text-[color:var(--color-ivr-front-minor)] cursor-pointer hover:text-[color:var(--color-ivr-front-major)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
