import { CloseIcon } from "./icons";
import type { Language } from "../types";
import { t } from "../translations";

interface NavBarProps {
  lang?: Language;
}

export default function NavBar({ lang = "en" }: NavBarProps) {
  const isRTL = lang === "ar";

  return (
    <div className={`flex items-center justify-between px-[16px] py-[10px] w-full ${isRTL ? "flex-row-reverse" : ""}`}>
      <button className="w-[40px] h-[40px] flex items-center justify-center">
        <CloseIcon size={24} color="var(--color-tui-front-primary)" />
      </button>
      <div className="flex flex-col items-center gap-[0px]">
        <span className="text-[16px] font-semibold text-tui-front-primary tracking-[-0.16px] leading-[20px]">
          {t("nav.merchant", lang)}
        </span>
        <div className={`flex items-center gap-[4px] ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className="text-[13px] font-medium text-tui-front-secondary tracking-[-0.13px] leading-[16px]">
            {t("nav.payWith", lang)}
          </span>
          <img src="/wordmark.png" alt="tabby" className="h-[14px] object-contain" />
        </div>
      </div>
      <button className="h-[40px] flex items-center px-[8px]">
        <span className="text-[14px] font-medium text-tui-front-accent">
          {t("nav.langSwitch", lang)}
        </span>
      </button>
    </div>
  );
}
