import { useEffect, useState } from "react";
import { Phone, Lock } from "lucide-react";
import Button from "../Button";
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

  const resendActive = secondsLeft <= TIMER_START - 15;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[16px] px-[16px] pb-[152px]">
        <div className="flex flex-col gap-[22px] items-start w-full">
          {/* Pulsing icon */}
          <div
            className="ivr-ring-pulse w-[88px] h-[88px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-spinner-bg)" }}
          >
            <Phone size={44} color="var(--color-tui-front-accent)" strokeWidth={1.8} />
          </div>

          {/* Pill */}
          <IVRStatusPill
            label="Calling you now"
            color="var(--color-tui-front-accent)"
            bg="var(--color-spinner-bg)"
            pulsing
          />

          {/* Heading */}
          <h1 className="font-heading text-[32px] leading-[34px] tracking-[-0.6px] text-tui-front-primary">
            Pick up and press 1 to verify
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-medium text-tui-front-secondary">
            Answer the call from Tabby. Once you press 1, your order will be confirmed right away.
          </p>

          {/* Timer bar */}
          <div
            className="w-full rounded-[16px] p-[14px] flex items-center gap-[12px]"
            style={{ backgroundColor: "var(--color-surface-muted)" }}
          >
            <div
              className="ivr-spin shrink-0"
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                border: "2px solid var(--color-tui-line-disabled)",
                borderTopColor: "var(--color-tui-front-accent)",
              }}
            />
            <span className="text-[14px] font-medium tracking-[-0.1px] text-tui-front-primary flex-1">
              Waiting for your response
            </span>
            <span
              className="text-[14px] font-bold text-tui-front-primary"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {timeStr}
            </span>
          </div>

          {/* Reassurance */}
          <div className="flex items-center gap-[6px]">
            <Lock size={13} color="var(--color-tui-front-secondary)" strokeWidth={2} />
            <span className="text-[13px] font-medium text-tui-front-secondary">
              Nothing is charged while we wait
            </span>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA + cancel */}
      <div className="absolute bottom-0 left-0 right-0 px-[16px] pt-[16px] pb-[12px] bg-white flex flex-col gap-[8px] items-center">
        <Button
          variant={resendActive ? "primary" : "secondary"}
          disabled={!resendActive}
          onClick={resendActive ? onResend : undefined}
        >
          {resendActive ? "Resend call" : "Didn't get the call?"}
        </Button>
        <button
          onClick={onCancel}
          className="text-[14px] font-semibold text-tui-front-secondary cursor-pointer hover:text-tui-front-primary transition-colors h-[28px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
