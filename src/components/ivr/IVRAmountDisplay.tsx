interface IVRAmountDisplayProps {
  amount: string;
  currency?: string;
}

export default function IVRAmountDisplay({ amount, currency = "SAR" }: IVRAmountDisplayProps) {
  return (
    <div className="flex items-baseline gap-[8px]">
      <span className="font-heading text-[32px] leading-[36px] tracking-[-0.6px] font-bold text-[color:var(--color-ivr-front-major)]">
        {amount}
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.1px] text-[color:var(--color-ivr-front-minor)]">
        {currency}
      </span>
    </div>
  );
}
