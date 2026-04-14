import { Check } from "lucide-react";
import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRSummaryCard from "./IVRSummaryCard";

interface Props {
  amount: string;
  onContinue: () => void;
}

export default function IVRSuccessState({ amount, onContinue }: Props) {
  return (
    <div className="flex flex-col gap-[22px] items-start w-full">
      {/* Large animated checkmark */}
      <div
        className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-ivr-success-light)" }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="var(--color-ivr-success)"
            strokeWidth="3"
            strokeDasharray="176"
            style={{
              strokeDashoffset: 176,
              animation: "ivr-circle-draw 0.6s ease forwards 0.1s",
            }}
          />
          <path
            d="M17 29l8 8 14-16"
            fill="none"
            stroke="var(--color-ivr-success)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="40"
            style={{
              strokeDashoffset: 40,
              animation: "ivr-check-draw 0.4s ease forwards 0.6s",
            }}
          />
        </svg>
      </div>

      {/* Pill + amount */}
      <div className="flex flex-col gap-[12px] items-start w-full">
        <IVRStatusPill
          label="Verified"
          color="var(--color-ivr-success)"
          bg="var(--color-ivr-success-light)"
        />
        <div className="flex items-baseline gap-[8px]">
          <span className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary">
            {amount}
          </span>
          <span className="text-[16px] font-semibold text-tui-front-secondary">SAR</span>
        </div>
      </div>

      {/* Heading */}
      <h1 className="font-heading text-[32px] leading-[34px] tracking-[-0.6px] text-tui-front-primary">
        Downpayment confirmed
      </h1>

      {/* Body */}
      <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-medium text-tui-front-secondary">
        Your number is verified and the payment is confirmed.
      </p>

      {/* Summary (green tint) */}
      <IVRSummaryCard
        bg="var(--color-ivr-success-light)"
        dividerColor="rgba(0, 179, 101, 0.2)"
        rows={[
          { label: "Downpayment", value: `${amount} SAR` },
          {
            label: "Status",
            value: "Confirmed",
            valueColor: "var(--color-ivr-success)",
            valueIcon: <Check size={14} strokeWidth={3} color="var(--color-ivr-success)" />,
          },
        ]}
      />

      {/* Green CTA — override Button with inline style since our Button has no success variant */}
      <div className="w-full pt-[4px]">
        <button
          onClick={onContinue}
          className="w-full h-[64px] rounded-[20px] flex items-center justify-center cursor-pointer active:scale-[0.99] transition-transform"
          style={{ backgroundColor: "var(--color-ivr-success)" }}
        >
          <span className="text-white text-[16px] font-bold leading-[20px] tracking-[-0.16px]">
            Continue to order
          </span>
        </button>
      </div>
    </div>
  );
}
