import { PhoneOff, Check } from "lucide-react";
import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRSummaryCard from "./IVRSummaryCard";

interface Props {
  amount: string;
  onTryAgain: () => void;
  onExit: () => void;
}

export default function IVRFailedState({ amount, onTryAgain, onExit }: Props) {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[16px] px-[16px] pb-[152px]">
        <div className="flex flex-col gap-[22px] items-start w-full">
          {/* Icon */}
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-ivr-warning-light)" }}
          >
            <PhoneOff size={44} color="var(--color-ivr-warning)" strokeWidth={1.8} />
          </div>

          {/* Pill */}
          <IVRStatusPill
            label="Hold released"
            color="var(--color-ivr-warning)"
            bg="var(--color-ivr-warning-light)"
          />

          {/* Heading */}
          <h1 className="font-heading text-[32px] leading-[34px] tracking-[-0.6px] text-tui-front-primary">
            We couldn't reach you
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-medium text-tui-front-secondary">
            No money was taken. The temporary hold of {amount} SAR has been released back to your account.
          </p>

          {/* Summary */}
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

          <p className="text-[13px] leading-[18px] font-medium text-tui-front-secondary">
            Your bank may take a moment to reflect this
          </p>
        </div>
      </div>

      {/* Sticky bottom CTA + exit */}
      <div className="absolute bottom-0 left-0 right-0 px-[16px] pt-[16px] pb-[12px] bg-white flex flex-col gap-[8px] items-center">
        <Button variant="primary" onClick={onTryAgain}>Try again</Button>
        <button
          onClick={onExit}
          className="text-[14px] font-semibold text-tui-front-secondary cursor-pointer hover:text-tui-front-primary transition-colors h-[28px]"
        >
          Exit checkout
        </button>
      </div>
    </div>
  );
}
