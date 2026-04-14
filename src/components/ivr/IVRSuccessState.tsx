import { Check } from "lucide-react";
import IVRStatusPill from "./IVRStatusPill";
import IVRAmountDisplay from "./IVRAmountDisplay";
import IVRSummaryCard from "./IVRSummaryCard";

interface Props {
  amount: string;
  onContinue: () => void;
}

export default function IVRSuccessState({ amount, onContinue }: Props) {
  return (
    <div className="ivr-fade-in-up flex flex-col items-center text-center gap-[20px] w-full">
      {/* Animated checkmark */}
      <div className="ivr-scale-in">
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

      {/* Status pill */}
      <IVRStatusPill
        label="Verified"
        color="var(--color-ivr-success)"
        bg="var(--color-ivr-success-light)"
      />

      {/* Amount */}
      <IVRAmountDisplay amount={amount} />

      {/* Heading + body */}
      <div className="flex flex-col gap-[8px] w-full px-[4px]">
        <h1 className="text-[20px] leading-[26px] tracking-[-0.3px] font-bold text-[color:var(--color-ivr-front-major)]">
          Downpayment confirmed
        </h1>
        <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-normal text-[color:var(--color-ivr-front-minor)]">
          Your number is verified and the payment is confirmed.
        </p>
      </div>

      {/* Summary card */}
      <IVRSummaryCard
        bg="var(--color-ivr-success-light)"
        dividerColor="rgba(0, 179, 101, 0.3)"
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

      {/* Footer CTA */}
      <div className="w-full pt-[4px]">
        <button
          onClick={onContinue}
          className="w-full h-[56px] rounded-[20px] flex items-center justify-center cursor-pointer transition-transform active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-ivr-success)" }}
        >
          <span className="text-white text-[16px] font-bold tracking-[-0.1px]">
            Continue to order
          </span>
        </button>
      </div>
    </div>
  );
}
