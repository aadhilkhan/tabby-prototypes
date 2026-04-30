import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playTapSound } from "../../sounds";

interface PinEntryScreenProps {
  /** Fired once 4 digits are entered. Receives the typed PIN string. */
  onComplete?: (pin: string) => void;
  /** Show a "Forgot?" link in the bottom-left of the keypad. */
  onForgot?: () => void;
}

const PIN_LENGTH = 4;

/**
 * Tabby in-app PIN entry. Matches Figma node 2152:22597.
 * Accepts any 4-digit PIN and fires `onComplete(pin)` once filled.
 * No real validation - this is a prototype, the PIN content is irrelevant.
 */
export default function PinEntryScreen({ onComplete, onForgot }: PinEntryScreenProps) {
  const [pin, setPin] = useState("");

  // Fire onComplete once the PIN reaches full length, with a small delay so the
  // last dot fill animation reads.
  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      const t = setTimeout(() => {
        onComplete?.(pin);
        setPin("");
      }, 350);
      return () => clearTimeout(t);
    }
  }, [pin, onComplete]);

  const pressDigit = (d: string) => {
    if (pin.length >= PIN_LENGTH) return;
    playTapSound();
    setPin((p) => p + d);
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Top reserved area: status bar (~61px) + nav content slack (~66px) ≈ 127px per Figma */}
      <div className="h-[127px] shrink-0" />

      {/* Content - matches Figma `flex flex-col items-center pb-80 px-16` (Figma 32 + 48 extra) */}
      <div className="flex-1 flex flex-col items-center px-[16px] pb-[80px] min-h-0">
        {/* Heading + subhead (12px gap) */}
        <div className="flex flex-col gap-[12px] items-center text-center w-full">
          <h1 className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary font-semibold">
            Welcome back!
          </h1>
          <p className="text-[17px] leading-[22px] tracking-[-0.34px] font-medium text-tui-front-primary">
            Enter your PIN code to access your account
          </p>
        </div>

        {/* Variable padding above dots */}
        <div className="flex-1" />

        {/* PIN dots */}
        <div className="flex items-center gap-[16px]">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => {
            const filled = i < pin.length;
            return (
              <motion.div
                key={i}
                className="size-[16px] rounded-full"
                initial={{ backgroundColor: "#e9eff5", scale: 0.85 }}
                animate={{
                  backgroundColor: filled ? "#1d2329" : "#e9eff5",
                  scale: filled ? 1 : 0.85,
                }}
                transition={{ duration: 0.15 }}
              />
            );
          })}
        </div>

        {/* Fixed 137px padding between dots and keypad (Figma) */}
        <div className="h-[137px] shrink-0" />

        {/* Keypad: 3 cols × 4 rows of 88px keys, 12px gap */}
        <div className="grid grid-cols-3 gap-[12px] justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <PinKey key={n} onPress={() => pressDigit(String(n))}>
              <span className="font-heading text-[25px] leading-[26px] tracking-[-0.25px] font-bold text-tui-front-primary">
                {n}
              </span>
            </PinKey>
          ))}

          {/* Forgot? */}
          <PinKey onPress={() => { playTapSound(); onForgot?.(); }}>
            <span className="text-[15px] leading-[18px] tracking-[-0.15px] font-bold text-tui-front-primary">
              Forgot?
            </span>
          </PinKey>

          {/* 0 */}
          <PinKey onPress={() => pressDigit("0")}>
            <span className="font-heading text-[25px] leading-[26px] tracking-[-0.25px] font-bold text-tui-front-primary">
              0
            </span>
          </PinKey>

          {/* FaceID (decorative - taps clear the pin so the user can retry) */}
          <PinKey onPress={() => { playTapSound(); setPin(""); }}>
            <FaceIDIcon />
          </PinKey>
        </div>
      </div>

      {/* Success flash overlay when pin completes */}
      <AnimatePresence>
        {pin.length === PIN_LENGTH && (
          <motion.div
            key="success-flash"
            className="absolute inset-0 bg-tui-line-positive/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface PinKeyProps {
  onPress: () => void;
  children: React.ReactNode;
}

function PinKey({ onPress, children }: PinKeyProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="size-[88px] rounded-full bg-[#f5f4f2] flex items-center justify-center cursor-pointer
        transition-all active:scale-95 active:bg-[#e9eff5]"
    >
      {children}
    </button>
  );
}

function FaceIDIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Corner brackets */}
      <path d="M2 8V5a3 3 0 0 1 3-3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 8V5a3 3 0 0 0-3-3h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 20v3a3 3 0 0 0 3 3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 20v3a3 3 0 0 1-3 3h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Face features */}
      <path d="M10 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19c1.5 1 2.5 1.4 4 1.4s2.5-.4 4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
