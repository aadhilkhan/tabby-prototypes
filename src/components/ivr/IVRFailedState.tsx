import { Check } from "lucide-react";
import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRSummaryCard from "./IVRSummaryCard";
import RiyalSymbol from "../RiyalSymbol";
import { PhoneOffIcon } from "./icons";

interface Props {
  amount: string;
  onTryAgain: () => void;
}

export default function IVRFailedState({ amount, onTryAgain }: Props) {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[16px] px-[16px] pb-[104px]">
        <div className="flex flex-col gap-[22px] items-start w-full">
          {/* Icon */}
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-ivr-warning-light)" }}
          >
            <PhoneOffIcon size={44} color="var(--color-ivr-warning)" />
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
            No money was taken. The temporary hold of{" "}
            <span className="inline-flex items-baseline gap-[3px] text-tui-front-primary">
              <RiyalSymbol size={11} />
              {amount}
            </span>{" "}
            has been released back to your account.
          </p>

          {/* Summary */}
          <IVRSummaryCard
            rows={[
              {
                label: "Downpayment",
                value: amount,
                valueIcon: <RiyalSymbol size={12} className="text-[color:var(--color-ivr-front-minor)]" />,
              },
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

      {/* Sticky bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[16px] pt-[16px] pb-[16px] bg-white">
        <Button variant="primary" onClick={onTryAgain}>Try again</Button>
      </div>
    </div>
  );
}
