import type { LucideIcon } from "lucide-react";

interface IVRInfoRowProps {
  icon: LucideIcon;
  text: string;
}

export default function IVRInfoRow({ icon: Icon, text }: IVRInfoRowProps) {
  return (
    <div className="flex items-center gap-[16px] w-full">
      <div
        className="flex items-center justify-center shrink-0 rounded-full"
        style={{
          width: 40,
          height: 40,
          backgroundColor: "var(--color-surface-muted)",
        }}
      >
        <Icon size={20} color="var(--color-tui-front-primary)" strokeWidth={1.8} />
      </div>
      <span className="text-[15px] leading-[20px] tracking-[-0.1px] text-tui-front-primary font-medium">
        {text}
      </span>
    </div>
  );
}
