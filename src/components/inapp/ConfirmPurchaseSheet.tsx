import { useState } from "react";
import { motion } from "motion/react";
import { Close24, BagStroke48, CheckS24, LoaderCircular } from "./InAppFigmaIcons";
import { SPRING } from "../../constants";

interface ConfirmPurchaseSheetProps {
  onClose: () => void;
  onContinue: () => void;
  onReject: () => void;
  /** Shared countdown driven from InAppCheckout (matches the top notif timer). */
  timerSeconds: number;
}

function formatTimer(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

/**
 * "Confirm your purchase" full-screen modal that slides up over the Tabby app
 * home screen. Mirrors Figma node 2155:23750 - status-bar spacer, top-right
 * close, centered shopping bag icon in a purple-tint circle, H1, Adidas
 * Supercell card, legals checkbox, ticking 14m 59s timer with loader, and
 * Reject / Continue toolbar buttons above the home indicator.
 */
export default function ConfirmPurchaseSheet({ onClose, onContinue, onReject, timerSeconds }: ConfirmPurchaseSheetProps) {
  const [agreed, setAgreed] = useState(true);

  return (
    <motion.div
      key="confirm-sheet"
      className="absolute inset-0 z-30 bg-white flex flex-col"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={SPRING}
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.12)" }}
    >
      {/* Status-bar spacer (status bar is rendered by PhoneFrame above this layer) */}
      <div className="h-[55px] shrink-0" />

      {/* Close button (top-right) */}
      <div className="flex items-center justify-end px-[12px] pb-[8px] pt-[8px] shrink-0">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="size-[48px] rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-95 active:bg-[#f2f5f7]"
        >
          <Close24 size={24} color="#1d2329" />
        </button>
      </div>

      {/* Body content */}
      <div className="flex-1 flex flex-col items-center px-[16px] gap-[20px] min-h-0">
        {/* 80px purple-tint circle with shopping bag icon */}
        <div
          className="size-[80px] rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#ece4fb" }}
        >
          <BagStroke48 size={44} color="#5d21de" />
        </div>

        {/* Heading */}
        <h1 className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] font-semibold text-tui-front-primary text-center">
          Confirm your purchase
        </h1>

        {/* Adidas merchant Supercell card */}
        <div
          className="w-full rounded-[24px] py-[4px]"
          style={{ backgroundColor: "#f2f5f7" }}
        >
          <div className="flex items-center gap-[16px] px-[16px] min-h-[64px]">
            <div className="size-[40px] rounded-full overflow-hidden shrink-0 bg-black flex items-center justify-center">
              <img src="/adidas-logo.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex items-center justify-between min-w-0 py-[12px] gap-[8px]">
              <div className="flex flex-col gap-[2px] min-w-0">
                <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary">
                  Adidas
                </span>
                <span className="text-[14px] font-medium leading-[18px] tracking-[-0.14px] text-tui-front-secondary">
                  adidas.ae
                </span>
              </div>
              <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary whitespace-nowrap">
                AED 400.00
              </span>
            </div>
          </div>
        </div>

        {/* Legals checkbox - vertically centered with text */}
        <div className="w-full flex items-center gap-[12px] px-[4px]">
          <button
            type="button"
            aria-label={agreed ? "Uncheck consent" : "Check consent"}
            aria-pressed={agreed}
            onClick={() => setAgreed((a) => !a)}
            className={`size-[20px] rounded-[6px] flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              agreed ? "" : "border border-[#b8c3d1]"
            }`}
            style={{ backgroundColor: agreed ? "#1d2329" : "transparent" }}
          >
            {agreed && <CheckS24 size={14} color="#ffffff" />}
          </button>
          <p className="flex-1 text-[12px] leading-[16px] font-medium tracking-[-0.13px] text-tui-front-secondary">
            I agree to the <span className="text-tui-front-primary font-medium">sharing</span>{" "}
            and collection of my data from AECB
          </p>
        </div>
      </div>

      {/* Timer row */}
      <div className="flex items-center justify-center gap-[8px] py-[16px] shrink-0">
        <LoaderCircular size={20} color="#7f8b99" />
        <p className="text-[15px] leading-[18px] font-medium text-tui-front-secondary tabular-nums">
          Confirm in {formatTimer(timerSeconds)}
        </p>
      </div>

      {/* Footer toolbar */}
      <div
        className="px-[16px] pt-[16px] shrink-0"
        style={{
          background: "linear-gradient(to top, white 6.6%, rgba(255,255,255,0))",
        }}
      >
        <div className="flex gap-[8px]">
          <button
            type="button"
            onClick={onReject}
            className="flex-1 h-[64px] rounded-[20px] text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-tui-front-primary cursor-pointer transition-all active:scale-[0.98]"
            style={{ backgroundColor: "#e9eff5" }}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!agreed}
            className="flex-1 h-[64px] rounded-[20px] text-[16px] leading-[20px] font-bold tracking-[-0.16px] text-white cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#1d2329" }}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="h-[34px] flex items-center justify-center shrink-0">
        <div className="w-[134px] h-[5px] rounded-full bg-black" />
      </div>
    </motion.div>
  );
}
