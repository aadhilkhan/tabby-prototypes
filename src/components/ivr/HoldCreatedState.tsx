import { Lock, PhoneCall, CheckCircle2 } from "lucide-react";
import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRInfoRow from "./IVRInfoRow";
import { ShieldCheckedIcon } from "./icons";

interface Props {
  amount: string;
  onVerify: () => void;
}

export default function HoldCreatedState({ amount, onVerify }: Props) {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[16px] px-[16px] pb-[104px]">
        <div className="flex flex-col gap-[22px] items-start w-full">
          {/* Icon */}
          <div
            className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-ivr-hold-blue-bg)" }}
          >
            <ShieldCheckedIcon size={48} color="var(--color-ivr-hold-blue)" />
          </div>

          {/* Pill + amount */}
          <div className="flex flex-col gap-[12px] items-start w-full">
            <IVRStatusPill
              label="Almost there — one quick step"
              color="var(--color-ivr-hold-blue)"
              bg="var(--color-ivr-hold-blue-bg)"
              pulsing
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
            We'll confirm this with a quick call
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-medium text-tui-front-secondary">
            We've set aside this amount while we verify your number. It'll only be confirmed once verification is complete.
          </p>

          {/* Info rows */}
          <div className="w-full flex flex-col gap-[16px]">
            <IVRInfoRow icon={Lock} text="This is a temporary hold, not a charge" />
            <IVRInfoRow icon={PhoneCall} text="A short call will confirm your order" />
            <IVRInfoRow icon={CheckCircle2} text="If verification fails, this hold is released automatically" />
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[16px] pt-[16px] pb-[16px] bg-white">
        <Button variant="primary" onClick={onVerify}>Verify now</Button>
      </div>
    </div>
  );
}
