import Button from "../Button";
import IVRStatusPill from "./IVRStatusPill";
import IVRInfoRow from "./IVRInfoRow";
import RiyalSymbol from "../RiyalSymbol";
import { LockBadge40, HandsetBadge40, CheckCircleBadge40 } from "./icons";

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
          {/* Pill */}
          <IVRStatusPill
            label="Almost there - one quick step"
            color="var(--color-ivr-hold-blue)"
            bg="var(--color-ivr-hold-blue-bg)"
            pulsing
          />

          {/* Heading */}
          <h1 className="font-heading text-[32px] leading-[34px] tracking-[-0.6px] text-tui-front-primary">
            We'll confirm this with a quick call
          </h1>

          {/* Body */}
          <p className="text-[15px] leading-[22px] tracking-[-0.15px] font-medium text-tui-front-secondary">
            We've set aside this amount while we verify your number. It'll only be confirmed once verification is complete.
          </p>

          {/* Amount card - Supercell pattern (Adidas + Downpayment + ﷼ amount) */}
          <div className="w-full">
            <div className="bg-surface-muted rounded-[24px] py-[4px]">
              <div className="flex items-center gap-[16px] px-[16px] min-h-[64px]">
                {/* Merchant logo */}
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 bg-surface-muted">
                  <img src="/adidas-logo.png" alt="Adidas" className="w-full h-full object-cover" />
                </div>
                {/* Merchant info */}
                <div className="flex-1 flex items-center justify-between min-w-0 py-[12px]">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary">
                      Adidas
                    </span>
                    <span className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-tui-front-secondary">
                      Downpayment
                    </span>
                  </div>
                  <span className="flex items-center gap-[6px] text-[16px] font-semibold leading-[20px] tracking-[-0.16px] text-tui-front-primary whitespace-nowrap">
                    <RiyalSymbol size={13} className="text-tui-front-secondary" />
                    {amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info rows - icons match Figma Tabby core icon set */}
          <div className="w-full flex flex-col gap-[16px]">
            <IVRInfoRow icon={<LockBadge40 />} text="This is a temporary hold, not a charge" />
            <IVRInfoRow icon={<HandsetBadge40 />} text="A short call will confirm your order" />
            <IVRInfoRow icon={<CheckCircleBadge40 />} text="If verification fails, this hold is released automatically" />
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
