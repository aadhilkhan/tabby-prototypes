import { ShieldCheck, Lock, PhoneCall, CheckCircle2 } from "lucide-react";
import IVRStatusPill from "./IVRStatusPill";
import IVRAmountDisplay from "./IVRAmountDisplay";
import IVRInfoRow from "./IVRInfoRow";

interface Props {
  amount: string;
  onVerify: () => void;
}

export default function HoldCreatedState({ amount, onVerify }: Props) {
  return (
    <div className="ivr-fade-in-up flex flex-col items-center text-center gap-[20px] w-full">
      {/* Icon */}
      <div className="ivr-scale-in">
        <ShieldCheck size={48} color="var(--color-ivr-hold-blue)" strokeWidth={1.8} />
      </div>

      {/* Status pill */}
      <IVRStatusPill
        label="Almost there — one quick step"
        color="var(--color-ivr-hold-blue)"
        bg="var(--color-ivr-hold-blue-bg)"
        pulsing
      />

      {/* Amount */}
      <IVRAmountDisplay amount={amount} />

      {/* Heading + body */}
      <div className="flex flex-col gap-[8px] w-full px-[4px]">
        <h1 className="text-[20px] leading-[26px] tracking-[-0.3px] font-bold text-[color:var(--color-ivr-front-major)]">
          We'll confirm this with a quick call
        </h1>
        <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-normal text-[color:var(--color-ivr-front-minor)]">
          We've set aside this amount while we verify your number. It'll only be confirmed once verification is complete.
        </p>
      </div>

      {/* Info card */}
      <div
        className="w-full rounded-[16px] p-[16px] flex flex-col gap-[12px] text-left"
        style={{ backgroundColor: "var(--color-ivr-back-minor)" }}
      >
        <IVRInfoRow icon={Lock} text="This is a temporary hold, not a charge" />
        <IVRInfoRow icon={PhoneCall} text="A short call will confirm your order" />
        <IVRInfoRow icon={CheckCircle2} text="If verification fails, the hold is released automatically" />
      </div>

      {/* Footer CTA */}
      <div className="w-full pt-[4px]">
        <button
          onClick={onVerify}
          className="w-full h-[56px] rounded-[20px] flex items-center justify-center cursor-pointer transition-transform active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-ivr-front-major)" }}
        >
          <span className="text-white text-[16px] font-bold tracking-[-0.1px]">
            Verify now
          </span>
        </button>
      </div>
    </div>
  );
}
