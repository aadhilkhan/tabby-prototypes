interface IVRInfoRowProps {
  icon: React.ReactNode;
  text: string;
}

export default function IVRInfoRow({ icon, text }: IVRInfoRowProps) {
  return (
    <div className="flex items-center gap-[16px] w-full">
      <div className="shrink-0">{icon}</div>
      <span className="text-[15px] leading-[20px] tracking-[-0.1px] text-tui-front-primary font-medium">
        {text}
      </span>
    </div>
  );
}
