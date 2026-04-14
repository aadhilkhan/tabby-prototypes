interface Row {
  label: string;
  value: string;
  valueColor?: string;
  valueIcon?: React.ReactNode;
}

interface IVRSummaryCardProps {
  rows: Row[];
  bg?: string;
  dividerColor?: string;
}

export default function IVRSummaryCard({
  rows,
  bg = "var(--color-ivr-back-minor)",
  dividerColor = "var(--color-ivr-border)",
}: IVRSummaryCardProps) {
  return (
    <div
      className="w-full rounded-[16px] p-[16px] flex flex-col gap-[12px]"
      style={{ backgroundColor: bg }}
    >
      {rows.map((row, i) => (
        <div key={i}>
          {i > 0 && (
            <div
              className="w-full mb-[12px]"
              style={{ height: 1, backgroundColor: dividerColor }}
            />
          )}
          <div className="flex items-center justify-between">
            <span className="text-[14px] leading-[20px] text-[color:var(--color-ivr-front-minor)] font-medium">
              {row.label}
            </span>
            <span
              className="flex items-center gap-[4px] text-[15px] font-bold tracking-[-0.1px]"
              style={{ color: row.valueColor || "var(--color-ivr-front-major)" }}
            >
              {row.valueIcon}
              {row.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
