import { Check } from "lucide-react";
import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRSummaryCard from "./IVRSummaryCard";
import { CheckCircleIcon } from "../icons";

interface Props {
  amount: string;
  onContinue: () => void;
}

export default function IVRSuccessState({ amount, onContinue }: Props) {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[16px] px-[16px] pb-[104px]">
        <div className="flex flex-col gap-[22px] items-start w-full">
          {/* Success icon (matches station-screen SuccessScreen) */}
          <CheckCircleIcon size={88} />

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

          {/* Summary */}
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
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[16px] pt-[16px] pb-[16px] bg-white">
        <Button variant="primary" onClick={onContinue}>Continue to order</Button>
      </div>
    </div>
  );
}
