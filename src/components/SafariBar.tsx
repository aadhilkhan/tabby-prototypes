import { AAIcon, LockIcon, RefreshIcon } from "./icons";
import type { Language } from "../types";

interface SafariBarProps {
  lang?: Language;
}

export default function SafariBar({ lang = "en" }: SafariBarProps) {
  const isRTL = lang === "ar";

  return (
    <div className={`flex items-center gap-[8px] px-[16px] h-[44px] w-full bg-browser-header pb-[8px] ${isRTL ? "flex-row-reverse" : ""}`}>
      <AAIcon className="shrink-0" />
      <div className="flex items-center justify-center gap-[4px] bg-[#ececec] rounded-[10px] px-[12px] py-[6px] flex-1">
        <LockIcon />
        <span className="text-[14px] font-normal text-tui-front-primary tracking-[-0.3px]">
          tabby.ai
        </span>
      </div>
      <RefreshIcon className="shrink-0" />
    </div>
  );
}
