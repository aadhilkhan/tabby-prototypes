import type { LucideIcon } from "lucide-react";

interface IVRInfoRowProps {
  icon: LucideIcon;
  text: string;
  iconColor?: string;
}

export default function IVRInfoRow({ icon: Icon, text, iconColor = "var(--color-ivr-front-minor)" }: IVRInfoRowProps) {
  return (
    <div className="flex items-center gap-[12px]">
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: "#fff",
          border: "1px solid var(--color-ivr-border)",
        }}
      >
        <Icon size={16} color={iconColor} strokeWidth={2} />
      </div>
      <span className="text-[14px] leading-[20px] tracking-[-0.1px] text-[color:var(--color-ivr-front-major)] font-medium">
        {text}
      </span>
    </div>
  );
}
