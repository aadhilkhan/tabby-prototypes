import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { InfoIcon } from "./icons";
import Button from "./Button";
import { SPRING } from "../constants";

interface TroubleBottomSheetProps {
  onClose: () => void;
  onSendSMS: () => void;
  onSendNotification: () => void;
}

export default function TroubleBottomSheet({ onClose, onSendSMS, onSendNotification }: TroubleBottomSheetProps) {
  const [smsTimer, setSmsTimer] = useState(59);

  useEffect(() => {
    if (smsTimer <= 0) return;
    const id = setInterval(() => setSmsTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [smsTimer]);

  const smsReady = smsTimer <= 0;
  const minutes = Math.floor(smsTimer / 60);
  const seconds = smsTimer % 60;
  const timerText = `Resend SMS in ${minutes}:${String(seconds).padStart(2, "0")}`;

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

        {/* Content */}
        <div className="flex flex-col gap-[16px] items-center pt-[48px] pb-[24px] px-[16px]">
          {/* Icon */}
          <div className="w-[56px] h-[56px] rounded-full bg-spinner-bg flex items-center justify-center">
            <InfoIcon size={24} color="var(--color-tui-front-accent)" />
          </div>

          {/* Body */}
          <div className="flex flex-col items-center w-full text-center">
            <div className="flex flex-col gap-[12px] items-center w-full">
              <h2
                className="font-heading text-[22px] leading-[24px] tracking-[-0.22px] text-tui-front-primary w-full"
              >
                Having trouble?
              </h2>
              <div className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary w-full">
                <p className="mb-[12px]">
                  Open the Tabby app, make sure you're logged in with the same phone number you used at checkout, and enable push notifications.
                </p>
                <p>
                  Once that's done, tap{" "}
                  <span className="text-tui-front-primary">Send notification</span>
                  {" "}to continue your purchase in the app.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center pt-[16px] pb-[32px]" style={{ background: "linear-gradient(to top, white 6.6%, rgba(255,255,255,0))" }}>
          <div className="flex flex-col gap-[8px] w-full px-[16px]">
            <Button onClick={onSendNotification}>Send notification</Button>
            <Button variant="secondary" disabled={!smsReady} onClick={smsReady ? onSendSMS : undefined}>
              {smsReady ? "Resend SMS" : timerText}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
