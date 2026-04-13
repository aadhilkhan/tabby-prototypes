import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronRightIcon } from "./icons";
import Button from "./Button";
import { SPRING } from "../constants";
import type { Language } from "../types";
import { t } from "../translations";

const MAX_ATTEMPTS = 3;
const RESEND_TIMER_SECONDS = 59;

function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length <= 2) return `+971 ${d}`;
  if (d.length <= 5) return `+971 ${d.slice(0, 2)} ${d.slice(2)}`;
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

interface TroubleBottomSheetProps {
  lang?: Language;
  phoneNumber: string;
  onClose: () => void;
  onSendSMS: () => void;
  onSendNotification: () => void;
  onChangeAccount: () => void;
}

export default function TroubleBottomSheet({
  lang = "en",
  phoneNumber,
  onClose,
  onSendSMS,
  onSendNotification,
  onChangeAccount,
}: TroubleBottomSheetProps) {
  const [smsTimer, setSmsTimer] = useState(RESEND_TIMER_SECONDS);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    if (smsTimer <= 0) return;
    const id = setInterval(() => setSmsTimer((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [smsTimer]);

  const noAttemptsLeft = attemptsLeft <= 0;
  const smsReady = smsTimer <= 0 && !noAttemptsLeft;

  const minutes = Math.floor(smsTimer / 60);
  const seconds = smsTimer % 60;
  const timerText = `${t("trouble.resendSmsIn", lang)} ${minutes}:${String(seconds).padStart(2, "0")}`;

  const handleResendSms = () => {
    if (!smsReady) return;
    const next = attemptsLeft - 1;
    setAttemptsLeft(next);
    if (next > 0) setSmsTimer(RESEND_TIMER_SECONDS);
    onSendSMS();
  };

  // Secondary button label: timer while counting, otherwise "Resend SMS"
  const secondaryLabel = !noAttemptsLeft && smsTimer > 0 ? timerText : t("trouble.resendSms", lang);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-[32px] flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={SPRING}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose();
          }
        }}
      >
        {/* Handlebar */}
        <div className="flex items-center justify-center py-[8px]">
          <div className="w-[40px] h-[5px] rounded-[128px] bg-[rgba(24,36,48,0.15)]" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-[8px] pb-[16px] pt-[8px] px-[16px]">
          <h2 className="font-heading text-[30px] leading-[32px] tracking-[-0.3px] text-tui-front-primary w-full">
            {t("trouble.heading", lang)}
          </h2>
        </div>

        {/* Body content */}
        <div className="flex flex-col items-start px-[16px]">
          <div className="flex flex-col items-start w-full">
            <div className="pb-[16px] w-full text-[16px] font-medium leading-[24px] tracking-[-0.16px] text-tui-front-secondary">
              <p className="mb-[14px]">
                {t("trouble.body1", lang)}
              </p>
              <p>
                <span>{t("trouble.body2prefix", lang)} </span>
                <span className="font-bold">{t("trouble.body2bold", lang)}</span>
                <span> {t("trouble.body2suffix", lang)}</span>
              </p>
            </div>
          </div>

          {/* Phone row */}
          <button
            onClick={onChangeAccount}
            className="flex items-center gap-[6px] py-[8px] cursor-pointer"
          >
            <span dir="ltr" className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
              {formatPhone(phoneNumber)}
            </span>
            <span className="text-[16px] font-medium leading-[20px] text-tui-front-secondary">
              &bull;
            </span>
            <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
              {t("footer.change", lang)}
            </span>
            <span className={lang === "ar" ? "rotate-180" : ""}>
              <ChevronRightIcon size={16} color="var(--color-tui-front-secondary)" />
            </span>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-start pt-[16px] px-[16px]">
          <div className="flex flex-col gap-[8px] items-end w-full">
            <Button onClick={onSendNotification}>{t("trouble.sendNotification", lang)}</Button>
            <Button variant="secondary" disabled={!smsReady} onClick={handleResendSms}>
              {secondaryLabel}
            </Button>
          </div>
        </div>

        {/* Attempts counter */}
        <div className="flex flex-col items-start pb-[24px] px-[16px]">
          <div className="flex items-center justify-center pt-[16px] w-full">
            <p className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-tui-front-tertiary text-center w-full">
              {attemptsLeft} {t("trouble.attemptsRemaining", lang)}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
