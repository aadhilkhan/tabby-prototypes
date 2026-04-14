import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import PhoneFrame from "../components/PhoneFrame";
import NavBar from "../components/NavBar";
import HoldCreatedState from "../components/ivr/HoldCreatedState";
import IVRInProgressState from "../components/ivr/IVRInProgressState";
import IVRFailedState from "../components/ivr/IVRFailedState";
import IVRSuccessState from "../components/ivr/IVRSuccessState";
import { PHONE } from "../constants";
import { playTapSound } from "../sounds";
import type { Language } from "../types";

type IVRState = "hold_created" | "ivr_in_progress" | "ivr_failed" | "ivr_success";

const AMOUNT = "49.75";

const stateLabels: Record<IVRState, string> = {
  hold_created: "Hold Created",
  ivr_in_progress: "Calling",
  ivr_failed: "Failed / Timeout",
  ivr_success: "Success",
};

const stateColors: Record<IVRState, string> = {
  hold_created: "bg-tui-line-positive",
  ivr_in_progress: "bg-tui-front-accent",
  ivr_failed: "bg-[color:var(--color-ivr-warning)]",
  ivr_success: "bg-[color:var(--color-ivr-success)]",
};

function getInitialState(): IVRState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "hold" || s === "hold_created") return "hold_created";
  if (s === "calling" || s === "ivr_in_progress") return "ivr_in_progress";
  if (s === "failed" || s === "ivr_failed") return "ivr_failed";
  if (s === "success" || s === "ivr_success") return "ivr_success";
  return "hold_created";
}

// Required for PhoneFrame — IVR isn't a station state, always "sending" means no notification banner.
const FAKE_STATION_STATE = "sending" as const;

function useViewportLayout(hideControls: boolean) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function calc() {
      const mobile = window.innerWidth < 960;
      setIsMobile(mobile);
      const pad = 4;
      if (mobile) {
        const toolbarH = !hideControls ? 100 : 0;
        const s = Math.min(1, (window.innerHeight - pad - toolbarH) / PHONE.height, (window.innerWidth - pad) / PHONE.width);
        setScale(Math.round(s * 100) / 100);
      } else {
        const linkHeight = 32;
        const s = Math.min(1, (window.innerHeight - pad) / (PHONE.height + linkHeight), (window.innerWidth - pad) / PHONE.width);
        setScale(Math.round(s * 100) / 100);
      }
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [hideControls]);
  return { scale, isMobile };
}

export default function IVRVerification() {
  const [state, setState] = useState<IVRState>(getInitialState);
  const [callKey, setCallKey] = useState(0);
  const [lang, setLang] = useState<Language>("en");
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const { scale, isMobile } = useViewportLayout(hideControls);

  const goTo = useCallback((next: IVRState) => {
    playTapSound();
    if (next === "ivr_in_progress") setCallKey((k) => k + 1);
    setState(next);
  }, []);

  const restart = useCallback(() => {
    playTapSound();
    setState("hold_created");
    setCallKey((k) => k + 1);
  }, []);

  return (
    <div className={`h-screen bg-[#f0f0f0] flex items-center justify-center overflow-hidden relative ${isMobile && !hideControls ? "pb-[100px]" : ""}`}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <PhoneFrame state={FAKE_STATION_STATE} lang={lang} hideNotification>
          <div className="relative h-full bg-white flex flex-col">
            <NavBar lang={lang} onToggleLang={() => setLang(lang === "en" ? "ar" : "en")} />
            <div className="relative flex-1 overflow-hidden">
              {/* Content area — key triggers fade on state change */}
              <div
                key={`${state}-${callKey}`}
                className="absolute inset-0 overflow-y-auto"
                style={{ animation: "ivr-fade-in-up 0.35s ease both" }}
              >
                <div className="flex flex-col gap-[20px] items-start pt-[16px] pb-[24px] px-[16px]">
                  {state === "hold_created" && (
                    <HoldCreatedState amount={AMOUNT} onVerify={() => goTo("ivr_in_progress")} />
                  )}
                  {state === "ivr_in_progress" && (
                    <IVRInProgressState
                      resetKey={callKey}
                      onTimeout={() => goTo("ivr_failed")}
                      onCancel={() => goTo("ivr_failed")}
                      onResend={() => setCallKey((k) => k + 1)}
                    />
                  )}
                  {state === "ivr_failed" && (
                    <IVRFailedState
                      amount={AMOUNT}
                      onTryAgain={() => goTo("hold_created")}
                      onExit={() => goTo("hold_created")}
                    />
                  )}
                  {state === "ivr_success" && (
                    <IVRSuccessState amount={AMOUNT} onContinue={() => goTo("hold_created")} />
                  )}
                </div>
              </div>
            </div>
            {/* Home indicator */}
            <div className="w-full flex justify-center pt-[28px] pb-[8px]">
              <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
            </div>
          </div>
        </PhoneFrame>
        {!hideControls && !isMobile && (
          <a
            href="/"
            className="flex items-center justify-center gap-[6px] mt-[12px] text-[13px] text-tui-front-secondary hover:text-tui-front-primary transition-colors"
          >
            ← Back to station screen
          </a>
        )}
      </div>

      {/* Left control panel — desktop */}
      {!hideControls && !isMobile && (
        <div
          className="absolute flex flex-col gap-[8px] items-end pt-[42px]"
          style={{
            right: `calc(50% + ${(PHONE.width / 2) * scale + 32}px)`,
            top: `calc(50% - ${(PHONE.height / 2) * scale}px)`,
          }}
        >
          <img src="/TBadge.png" alt="" className="h-[48px] object-contain mb-[24px]" />
          {(Object.keys(stateLabels) as IVRState[]).map((s) => (
            <button
              key={s}
              onClick={() => goTo(s)}
              className={`px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
                ${state === s
                  ? `${stateColors[s]} text-white`
                  : "bg-white text-tui-front-primary border border-gray-300 hover:bg-gray-50"}
                hover:not-disabled:brightness-110 active:not-disabled:scale-95`}
            >
              {stateLabels[s]}
            </button>
          ))}
          <button
            onClick={restart}
            className="mt-[8px] px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
              bg-white text-tui-front-primary border border-gray-300 cursor-pointer
              hover:bg-gray-50 active:scale-95"
          >
            Restart
          </button>
        </div>
      )}

      {/* Right panel — simulate buttons during calling */}
      {!hideControls && !isMobile && state === "ivr_in_progress" && (
        <div
          className="absolute flex flex-col gap-[8px] items-start pt-[42px]"
          style={{
            left: `calc(50% + ${(PHONE.width / 2) * scale + 32}px)`,
            top: `calc(50% - ${(PHONE.height / 2) * scale}px)`,
          }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-wider text-tui-front-secondary mb-[4px]">
            Simulate
          </p>
          <button
            onClick={() => goTo("ivr_success")}
            className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
              bg-white border-2 hover:bg-[color:var(--color-ivr-success-light)] active:scale-95"
            style={{ color: "var(--color-ivr-success)", borderColor: "var(--color-ivr-success)" }}
          >
            ▸ Success
          </button>
          <button
            onClick={() => goTo("ivr_failed")}
            className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all cursor-pointer
              bg-white border-2 hover:bg-[color:var(--color-ivr-warning-light)] active:scale-95"
            style={{ color: "var(--color-ivr-warning)", borderColor: "var(--color-ivr-warning)" }}
          >
            ▸ Failure
          </button>
        </div>
      )}

      {/* Mobile toolbar */}
      {isMobile && !hideControls && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))" }}
        >
          <div className="flex items-center justify-center gap-[6px] flex-wrap px-3 pt-3">
            {(Object.keys(stateLabels) as IVRState[]).map((s) => (
              <button
                key={s}
                onClick={() => goTo(s)}
                className={`px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0 cursor-pointer
                  ${state === s
                    ? `${stateColors[s]} text-white`
                    : "bg-white text-tui-front-primary border border-gray-300"}`}
              >
                {stateLabels[s].split(" ")[0]}
              </button>
            ))}
            <button
              onClick={restart}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-white text-tui-front-primary border border-gray-300 cursor-pointer"
            >
              Reset
            </button>
            <a
              href="/"
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-tui-front-primary text-white cursor-pointer"
            >
              ← Station
            </a>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
}
