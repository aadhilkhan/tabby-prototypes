import { useEffect } from "react";
import { motion } from "motion/react";
import { SPRING_SOFT } from "../constants";
import { playDing } from "../sounds";
import type { Language } from "../types";
import { t } from "../translations";

interface NotificationBannerProps {
  lang?: Language;
}

export default function NotificationBanner({ lang = "en" }: NotificationBannerProps) {
  useEffect(() => {
    playDing();
  }, []);

  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -120, opacity: 0 }}
      transition={SPRING_SOFT}
      className="absolute left-1/2 -translate-x-1/2 top-[60px] w-[382px] rounded-[23px] px-[14px] py-[14px] pe-[18px] z-50"
      style={{
        backgroundColor: "var(--color-notification-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-[10px] w-full">
        <img src="/TBadge.png" alt="Tabby" className="w-[38px] h-[38px] rounded-[10px] shrink-0" />
        <div className="flex flex-col gap-[2px] flex-1 min-w-0 overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <p className="text-[16px] font-semibold leading-[20px] text-white">
              {t("notification.title", lang)}
            </p>
            <span className="text-[13px] font-normal leading-[18px] tracking-[-0.078px] text-white/50 whitespace-nowrap ms-[4px]">
              {t("notification.time", lang)}
            </span>
          </div>
          <div className="text-[13px] font-normal leading-[18px] tracking-[-0.078px] text-white">
            <p className="mb-0">{t("notification.body1", lang)}</p>
            <p>{t("notification.body2", lang)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
