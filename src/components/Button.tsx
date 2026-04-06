interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ variant = "primary", disabled, onClick, children }: ButtonProps) {
  const base = "w-full h-[64px] min-w-[128px] rounded-[20px] flex items-center justify-center";
  const styles = variant === "primary"
    ? `${base} bg-tui-front-primary cursor-pointer`
    : `${base} ${disabled ? "bg-surface-muted cursor-not-allowed" : "bg-tui-line-disabled cursor-pointer"}`;

  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} className={styles}>
      <span
        className={`text-[16px] leading-[20px] tracking-[-0.16px] ${
          variant === "primary"
            ? "font-bold text-white"
            : `font-medium ${disabled ? "text-tui-front-tertiary" : "text-tui-front-primary"}`
        }`}
      >
        {children}
      </span>
    </button>
  );
}
