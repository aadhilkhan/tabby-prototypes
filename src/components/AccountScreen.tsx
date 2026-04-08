import { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { ChevronDownIcon } from "./icons";
import Button from "./Button";
import type { Language } from "../types";
import { t } from "../translations";

function UAEFlag() {
  return (
    <div className="w-[24px] h-[24px] rounded-full overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-[7px] bg-[#EF3340]" />
      <div className="absolute left-[7px] top-0 right-0 h-1/3 bg-[#009639]" />
      <div className="absolute left-[7px] top-1/3 right-0 h-1/3 bg-white" />
      <div className="absolute left-[7px] top-2/3 right-0 h-1/3 bg-black" />
    </div>
  );
}

interface AccountScreenProps {
  initialPhone: string;
  lang?: Language;
  onContinue: (phone: string) => void;
}

export default function AccountScreen({ initialPhone, lang = "en", onContinue }: AccountScreenProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, []);

  function handleContinue() {
    if (!phone || phone.length < 9) {
      setError(t("account.error", lang));
      shakeControls.start({ x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.4 } });
      return;
    }
    setError("");
    onContinue(phone);
  }

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Content */}
      <div className="flex flex-col pt-[24px] px-[16px]">
        {/* Heading + description */}
        <div className="flex flex-col gap-[8px] pb-[24px]">
          <h1
            className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary"
          >
            {t("account.heading", lang)}
          </h1>
          <p className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
            {t("account.description", lang)}
          </p>
        </div>

        {/* Phone input row */}
        <div className="flex gap-[8px] items-center">
          {/* Country code selector */}
          <div dir="ltr" className="flex items-center gap-[8px] h-[56px] w-[132px] border border-tui-front-secondary rounded-[16px] ps-[16px] pe-[12px] shrink-0">
            <UAEFlag />
            <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary flex-1">
              +971
            </span>
            <ChevronDownIcon size={24} color="var(--color-tui-front-primary)" />
          </div>

          {/* Phone number field */}
          <div
            dir="ltr"
            className={`flex items-center flex-1 h-[56px] rounded-[16px] ps-[16px] pe-[12px] cursor-text ${
              error
                ? "border-[1.5px] border-tui-icon-graphics"
                : focused
                  ? "border-[1.5px] border-tui-front-primary"
                  : "border border-tui-front-secondary"
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center flex-1 overflow-hidden">
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={t("account.phonePlaceholder", lang)}
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(digits);
                  if (error) setError("");
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent outline-none text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary caret-tui-front-primary placeholder:text-tui-front-secondary"
              />
            </div>
          </div>
        </div>
        {error && (
          <p className="text-[14px] font-medium leading-[20px] tracking-[-0.16px] text-tui-icon-graphics mt-[8px]">
            {error}
          </p>
        )}
      </div>

      {/* Continue button pinned to bottom */}
      <motion.div className="absolute bottom-0 left-0 right-0 flex flex-col px-[16px] pt-[16px]" animate={shakeControls}>
        <Button onClick={handleContinue}>{t("account.continue", lang)}</Button>
      </motion.div>
    </div>
  );
}
