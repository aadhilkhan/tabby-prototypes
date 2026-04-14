import { PhoneOff, Check } from "lucide-react";
import IVRStatusPill from "./IVRStatusPill";
import IVRSummaryCard from "./IVRSummaryCard";

interface Props {
  amount: string;
  onTryAgain: () => void;
  onExit: () => void;
}

export default function IVRFailedState({ amount, onTryAgain, onExit }: Props) {
  return (
    <div className="ivr-fade-in-up flex flex-col items-center text-center gap-[20px] w-full">
      {/* Icon */}
      <div className="ivr-scale-in">
        <PhoneOff size={48} color="var(--color-ivr-warning)" strokeWidth={1.8} />
      </div>

      {/* Status pill */}
      <IVRStatusPill
        label="Hold released"
        color="var(--color-ivr-warning)"
        bg="var(--color-ivr-warning-light)"
      />

      {/* Heading + body */}
      <div className="flex flex-col gap-[8px] w-full px-[4px]">
        <h1 className="text-[20px] leading-[26px] tracking-[-0.3px] font-bold text-[color:var(--color-ivr-front-major)]">
          We couldn't reach you
        </h1>
        <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-normal text-[color:var(--color-ivr-front-minor)]">
          No money was taken. The temporary hold of {amount} SAR has been released back to your account.
        </p>
      </div>

      {/* Summary card */}
      <IVRSummaryCard
        rows={[
          { label: "Downpayment", value: `${amount} SAR` },
          {
            label: "Status",
            value: "Released",
            valueColor: "var(--color-ivr-success)",
            valueIcon: <Check size={14} strokeWidth={3} color="var(--color-ivr-success)" />,
          },
        ]}
      />

      {/* Bank note */}
      <p className="text-[13px] leading-[18px] font-medium text-[color:var(--color-ivr-front-minor)]">
        Your bank may take a moment to reflect this
      </p>

      {/* Footer CTA */}
      <div className="w-full flex flex-col gap-[12px] pt-[4px]">
        <button
          onClick={onTryAgain}
          className="w-full h-[56px] rounded-[20px] flex items-center justify-center cursor-pointer transition-transform active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-ivr-front-major)" }}
        >
          <span className="text-white text-[16px] font-bold tracking-[-0.1px]">
            Try again
          </span>
        </button>
        <button
          onClick={onExit}
          className="text-[14px] font-semibold text-[color:var(--color-ivr-front-minor)] cursor-pointer hover:text-[color:var(--color-ivr-front-major)] transition-colors"
        >
          Exit checkout
        </button>
      </div>
    </div>
  );
}
