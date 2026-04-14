import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "./components/PhoneFrame";
import NavBar from "./components/NavBar";
import StationScreen from "./components/StationScreen";
import AccountScreen from "./components/AccountScreen";
import SuccessScreen from "./components/SuccessScreen";
import TroubleBottomSheet from "./components/TroubleBottomSheet";
import ControlPanel from "./components/ControlPanel";
import PrototypeTabs from "./components/PrototypeTabs";
import type { StationState, PrototypeVersion, Language } from "./types";
import { SPRING, PHONE } from "./constants";
import { playTapSound } from "./sounds";

function getInitialState(): StationState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "sent" || s === "complete") return s;
  return "sending";
}

function useViewportLayout(hideControls: boolean) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function calc() {
      const mobile = window.innerWidth < 960;
      setIsMobile(mobile);
      const pad = 4;
      const tabsH = !hideControls ? 44 : 0;
      if (mobile) {
        const toolbarH = !hideControls ? 100 : 0;
        const s = Math.min(1, (window.innerHeight - pad - toolbarH - tabsH) / PHONE.height, (window.innerWidth - pad) / PHONE.width);
        setScale(Math.round(s * 100) / 100);
      } else {
        const linkHeight = 32;
        const s = Math.min(1, (window.innerHeight - pad - tabsH) / (PHONE.height + linkHeight), (window.innerWidth - pad) / PHONE.width);
        setScale(Math.round(s * 100) / 100);
      }
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [hideControls]);
  return { scale, isMobile };
}

export default function App() {
  const [state, setState] = useState<StationState>(getInitialState);
  const [showAccount, setShowAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTrouble, setShowTrouble] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("554446868");
  const [version, setVersion] = useState<PrototypeVersion>("v1");
  const [lang, setLang] = useState<Language>("en");
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const isRtl = lang === "ar";
  const { scale, isMobile } = useViewportLayout(hideControls);

  return (
    <div className={`h-screen bg-[#f0f0f0] flex flex-col overflow-hidden relative ${isMobile && !hideControls ? "pb-[100px]" : ""}`}>
      {!hideControls && <PrototypeTabs active="station" />}
      <div className="flex-1 flex items-center justify-center relative">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <PhoneFrame state={state} lang={lang} hideNotification={showTrouble || showAccount || notificationDismissed}>
          <div className="relative h-full bg-white flex flex-col">
            <NavBar lang={lang} onToggleLang={() => setLang(lang === "en" ? "ar" : "en")} />
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ x: showAccount || showSuccess ? (isRtl ? "30%" : "-30%") : "0%" }}
                transition={SPRING}
              >
                <StationScreen
                  state={state}
                  phoneNumber={phoneNumber}
                  version={version}
                  lang={lang}
                  onChangeAccount={() => { setShowAccount(true); setNotificationDismissed(true); }}
                  onTroubleClick={() => { setShowTrouble(true); setNotificationDismissed(true); }}
                />
              </motion.div>
              <AnimatePresence>
                {showAccount && (
                  <motion.div
                    key="account"
                    className="absolute inset-0 z-10"
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={SPRING}
                    style={{ boxShadow: isRtl ? "4px 0 16px rgba(0,0,0,0.1)" : "-4px 0 16px rgba(0,0,0,0.1)" }}
                  >
                    <AccountScreen
                      initialPhone={phoneNumber}
                      lang={lang}
                      onContinue={(newPhone) => {
                        const numberChanged = newPhone !== phoneNumber;
                        setPhoneNumber(newPhone);
                        setShowAccount(false);
                        if (numberChanged) {
                          setState("sending");
                          setNotificationDismissed(false);
                        }
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    key="success"
                    className="absolute inset-0 z-20"
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={SPRING}
                    style={{ boxShadow: isRtl ? "4px 0 16px rgba(0,0,0,0.1)" : "-4px 0 16px rgba(0,0,0,0.1)" }}
                  >
                    <SuccessScreen lang={lang} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Home indicator */}
            <div className="w-full flex justify-center pt-[28px] pb-[8px]">
              <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
            </div>
            {/* Trouble bottom sheet — outside overflow-hidden so it covers the full frame */}
            <AnimatePresence>
              {showTrouble && (
                <TroubleBottomSheet
                  key="trouble"
                  lang={lang}
                  phoneNumber={phoneNumber}
                  onClose={() => setShowTrouble(false)}
                  onSendSMS={() => {}}
                  onSendNotification={() => { setShowTrouble(false); setNotificationDismissed(false); }}
                  onChangeAccount={() => { setShowTrouble(false); setShowAccount(true); }}
                />
              )}
            </AnimatePresence>
          </div>
        </PhoneFrame>
        {!hideControls && !isMobile && (
          <a
            href="https://www.figma.com/design/ekQkGLPpsC1RqPEO9mScsv/In-app-Checkout-Flow--Skip-OTP-?node-id=1399-12084&t=wlKdybrQ801DYFqp-11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[6px] mt-[12px] text-[13px] text-tui-front-secondary hover:text-tui-front-primary transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
            </svg>
            View designs
          </a>
        )}
      </div>
      {!hideControls && !isMobile && (
        <>
          <div
            className="absolute flex flex-col gap-[8px] items-end pt-[42px]"
            style={{
              right: `calc(50% + ${(PHONE.width / 2) * scale + 32}px)`,
              top: `calc(50% - ${(PHONE.height / 2) * scale}px)`,
            }}
          >
            <ControlPanel
              state={state}
              onSendNotification={() => setState("sent")}
              onFinishPurchase={() => setState("complete")}
              onShowSuccess={() => setShowSuccess(true)}
              showSuccess={showSuccess}
              onRestart={() => { setState("sending"); setShowAccount(false); setShowSuccess(false); setShowTrouble(false); setNotificationDismissed(false); setPhoneNumber("554446868"); }}
            />
          </div>
          {/* Version toggle */}
          <div
            className="absolute flex items-start pt-[42px]"
            style={{
              left: `calc(50% + ${(PHONE.width / 2) * scale + 32}px)`,
              top: `calc(50% - ${(PHONE.height / 2) * scale}px)`,
            }}
          >
            <div className="flex flex-col gap-[8px]">
              <div className="flex rounded-[12px] overflow-hidden border border-gray-300 bg-white">
                <button
                  onClick={() => { playTapSound(); setVersion("v1"); }}
                  className={`px-[16px] py-[10px] text-[13px] font-semibold transition-all cursor-pointer ${
                    version === "v1"
                      ? "bg-tui-front-primary text-white"
                      : "bg-white text-tui-front-secondary hover:bg-gray-50"
                  }`}
                >
                  V1 ✓
                </button>
                <button
                  onClick={() => { playTapSound(); setVersion("v2"); }}
                  className={`px-[16px] py-[10px] text-[13px] font-semibold transition-all cursor-pointer ${
                    version === "v2"
                      ? "bg-tui-front-primary text-white"
                      : "bg-white text-tui-front-secondary hover:bg-gray-50"
                  }`}
                >
                  V2
                </button>
              </div>
              <p className="text-[12px] text-tui-front-secondary leading-[16px]">
                {version === "v1" ? "Spinner icon" : "Spinner nodes"}
              </p>
            </div>
          </div>
        </>
      )}
      </div>
      {/* Mobile toolbar */}
      {isMobile && !hideControls && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))" }}
        >
          <div className="flex items-center justify-center gap-[6px] flex-wrap px-3 pt-3">
            <div className="flex rounded-[8px] overflow-hidden border border-gray-300 shrink-0">
              <button
                onClick={() => { playTapSound(); setVersion("v1"); }}
                className={`px-[10px] py-[7px] text-[11px] font-semibold transition-all cursor-pointer ${
                  version === "v1"
                    ? "bg-tui-front-primary text-white"
                    : "bg-white text-tui-front-secondary"
                }`}
              >
                V1
              </button>
              <button
                onClick={() => { playTapSound(); setVersion("v2"); }}
                className={`px-[10px] py-[7px] text-[11px] font-semibold transition-all cursor-pointer ${
                  version === "v2"
                    ? "bg-tui-front-primary text-white"
                    : "bg-white text-tui-front-secondary"
                }`}
              >
                V2
              </button>
            </div>
            <div className="w-px h-5 bg-gray-300 shrink-0" />
            <button
              onClick={() => setState("sent")}
              disabled={state !== "sending"}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-tui-line-positive text-white
                disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Notify
            </button>
            <button
              onClick={() => { playTapSound(); setState("complete"); }}
              disabled={state !== "sent"}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-tui-front-primary text-white
                disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Complete
            </button>
            <button
              onClick={() => { playTapSound(); setShowSuccess(true); }}
              disabled={state !== "complete" || showSuccess}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-tui-front-accent text-white
                disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Success
            </button>
            <button
              onClick={() => { playTapSound(); setState("sending"); setShowAccount(false); setShowSuccess(false); setShowTrouble(false); setNotificationDismissed(false); setPhoneNumber("554446868"); }}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-white text-tui-front-primary border border-gray-300 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}
