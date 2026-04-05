import { SmartphoneIcon, ChevronRightIcon } from "./icons";

interface FooterProps {
  onChangeAccount?: () => void;
}

export default function Footer({ onChangeAccount }: FooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
      {/* Account switcher line */}
      <button
        className="flex items-center justify-center h-[40px] w-full gap-[4px] pb-[16px]"
        onClick={onChangeAccount}
      >
        <SmartphoneIcon size={14} color="#7f8b99" />
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          +971 55 444 6868
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
