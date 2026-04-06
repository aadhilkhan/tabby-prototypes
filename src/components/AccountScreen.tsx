import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "./icons";
import Button from "./Button";

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
  onContinue: (phone: string) => void;
}

export default function AccountScreen({ initialPhone, onContinue }: AccountScreenProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus when the screen appears
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Content */}
      <div className="flex flex-col pt-[24px] px-[16px]">
        {/* Heading + description */}
        <div className="flex flex-col gap-[8px] pb-[24px]">
          <h1
            className="font-heading text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary"
          >
            Log in or sign up for Tabby
          </h1>
          <p className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
            Enter your phone number to get the verification code
          </p>
        </div>

        {/* Phone input row */}
        <div className="flex gap-[8px] items-center">
          {/* Country code selector */}
          <div className="flex items-center gap-[8px] h-[56px] w-[132px] border border-tui-front-secondary rounded-[16px] pl-[16px] pr-[12px] shrink-0">
            <UAEFlag />
            <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary flex-1">
              +971
            </span>
            <ChevronDownIcon size={24} color="var(--color-tui-front-primary)" />
          </div>

          {/* Phone number field */}
          <div
            className={`flex items-center flex-1 h-[56px] rounded-[16px] pl-[16px] pr-[12px] cursor-text ${
              focused
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
                placeholder="Phone number"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(digits);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent outline-none text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary caret-tui-front-primary placeholder:text-tui-front-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue button pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col px-[16px] pt-[16px]">
        <Button onClick={() => onContinue(phone)}>Continue</Button>
      </div>
    </div>
  );
}
