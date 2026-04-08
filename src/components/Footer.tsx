import { motion } from "motion/react";
import { UserIcon, ChevronRightIcon, ChevronLeftIcon } from "./icons";
import type { Language } from "../types";
import { t } from "../translations";

function formatPhone(digits: string): string {
  // Format as "+971 XX XXX XXXX"
  const d = digits.replace(/\D/g, "");
  if (d.length <= 2) return `+971 ${d}`;
  if (d.length <= 5) return `+971 ${d.slice(0, 2)} ${d.slice(2)}`;
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

interface FooterProps {
  phoneNumber: string;
  lang?: Language;
  onChangeAccount?: () => void;
}

export default function Footer({ phoneNumber, lang = "en", onChangeAccount }: FooterProps) {
  const isRTL = lang === "ar";

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex flex-col items-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Account switcher line */}
      <button
        className={`flex items-center justify-center h-[40px] w-full gap-[4px] pb-[16px] cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
        onClick={onChangeAccount}
      >
        <UserIcon size={14} color="var(--color-tui-front-secondary)" />
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary" dir="ltr">
          {formatPhone(phoneNumber)}
        </span>
        <span className="text-[12px] font-medium text-tui-front-secondary mx-[1px]">
          &bull;
        </span>
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          {t("footer.change", lang)}
        </span>
        {isRTL ? (
          <ChevronLeftIcon size={12} color="var(--color-tui-front-secondary)" />
        ) : (
          <ChevronRightIcon size={12} color="var(--color-tui-front-secondary)" />
        )}
      </button>

      {/* Consent text */}
      <div className="flex items-center justify-center h-[40px] w-full px-[20px] pb-[16px]">
        <p className={`text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary text-center whitespace-nowrap ${isRTL ? "font-arabic-body" : ""}`}>
          {t("footer.consent", lang)}
          <span className="text-tui-front-primary font-medium">{t("footer.consentBold", lang)}</span>
          {t("footer.consentEnd", lang)}
        </p>
      </div>

    </motion.div>
  );
}
