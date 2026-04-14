import { motion } from "motion/react";
import { UserIcon, ChevronRightIcon } from "./icons";
import type { Language } from "../types";
import { t } from "../translations";
import { formatPhone } from "../lib/formatPhone";

interface FooterProps {
  phoneNumber: string;
  lang?: Language;
  onChangeAccount?: () => void;
}

export default function Footer({ phoneNumber, lang = "en", onChangeAccount }: FooterProps) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex flex-col items-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Account switcher line */}
      <button
        className="flex items-center justify-center h-[40px] w-full gap-[4px] pb-[16px] cursor-pointer"
        onClick={onChangeAccount}
      >
        <UserIcon size={14} color="var(--color-tui-front-secondary)" />
        <span dir="ltr" className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          {formatPhone(phoneNumber)}
        </span>
        <span className="text-[12px] font-medium text-tui-front-secondary mx-[1px]">
          &bull;
        </span>
        <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-secondary">
          {t("footer.change", lang)}
        </span>
        <span className={lang === "ar" ? "rotate-180" : ""}>
          <ChevronRightIcon size={12} color="var(--color-tui-front-secondary)" />
        </span>
      </button>
    </motion.div>
  );
}
