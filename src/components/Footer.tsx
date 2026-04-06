import { UserIcon, ChevronRightIcon } from "./icons";

function formatPhone(digits: string): string {
  // Format as "+971 XX XXX XXXX"
  const d = digits.replace(/\D/g, "");
  if (d.length <= 2) return `+971 ${d}`;
  if (d.length <= 5) return `+971 ${d.slice(0, 2)} ${d.slice(2)}`;
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

interface FooterProps {
  phoneNumber: string;
  onChangeAccount?: () => void;
}

export default function Footer({ phoneNumber, onChangeAccount }: FooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
      {/* Account switcher line */}
      <button
        className="flex items-center justify-center h-[40px] w-full gap-[4px] pb-[16px] cursor-pointer"
        onClick={onChangeAccount}
      >
        <UserIcon size={14} color="#7f8b99" />
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          {formatPhone(phoneNumber)}
        </span>
        <span className="text-[12px] font-medium text-tui-front-secondary mx-[1px]">
          &bull;
        </span>
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          Change
        </span>
        <ChevronRightIcon size={12} color="#7f8b99" />
      </button>

      {/* Consent text */}
      <div className="flex items-center justify-center h-[40px] w-full px-[20px] pb-[16px]">
        <p className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary text-center whitespace-nowrap">
          By continuing, you{" "}
          <span className="text-tui-front-primary font-medium">consent to sharing</span>
          {" "}your data with AECB
        </p>
      </div>

    </div>
  );
}
