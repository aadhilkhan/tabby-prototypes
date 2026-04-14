interface IVRStatusPillProps {
  label: string;
  color: string;
  bg: string;
  pulsing?: boolean;
}

export default function IVRStatusPill({ label, color, bg, pulsing }: IVRStatusPillProps) {
  return (
    <div
      className="inline-flex items-center gap-[8px] px-[12px] py-[6px] rounded-full"
      style={{ backgroundColor: bg }}
    >
      <span
        className={pulsing ? "ivr-pulse-dot" : ""}
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      <span
        className="text-[13px] font-semibold tracking-[-0.1px] leading-[16px]"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
