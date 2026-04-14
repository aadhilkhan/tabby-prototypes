import RiyalSymbol from "../RiyalSymbol";

interface IVRAmountDisplayProps {
  amount: string;
}

export default function IVRAmountDisplay({ amount }: IVRAmountDisplayProps) {
  return (
    <div className="flex items-baseline gap-[8px]">
      <RiyalSymbol size={22} className="text-[color:var(--color-ivr-front-minor)]" />
      <span className="font-heading text-[32px] leading-[36px] tracking-[-0.6px] font-bold text-[color:var(--color-ivr-front-major)]">
        {amount}
      </span>
    </div>
  );
}
