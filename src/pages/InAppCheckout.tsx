import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "../components/PhoneFrame";
import NavBar from "../components/NavBar";
import StationScreen from "../components/StationScreen";
import AccountScreen from "../components/AccountScreen";
import SuccessScreen from "../components/SuccessScreen";
import TroubleBottomSheet from "../components/TroubleBottomSheet";
import ControlPanel from "../components/ControlPanel";
import PrototypeTabs from "../components/PrototypeTabs";
import HomeScreen from "../components/inapp/HomeScreen";
import SplashScreen from "../components/inapp/SplashScreen";
import PinEntryScreen from "../components/inapp/PinEntryScreen";
import AppHomeScreen from "../components/inapp/AppHomeScreen";
import ConfirmPurchaseSheet from "../components/inapp/ConfirmPurchaseSheet";
import SelectPlanScreen from "../inapp-checkout/SelectPlanScreen";
import type { StationState, Language } from "../types";

type InAppScreen = "home" | "splash" | "pin" | "app_home" | "select_plan";
const SPLASH_DURATION_MS = 1100;
const CONFIRM_DELAY_MS = 700;
import { SPRING, PHONE } from "../constants";
import { playTapSound } from "../sounds";

const PHONE_GAP = 32;

function getInitialState(): StationState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "sent" || s === "complete") return s;
  return "sending";
}

/**
 * Two-phone viewport scaling: enough horizontal room for both phones plus a gap,
 * with the desktop control panel reserved on the left. On narrow viewports we
 * stack the phones vertically and the math switches to single-phone width.
 */
function useDualPhoneLayout(hideControls: boolean) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function calc() {
      // Stack vertically below ~1100px - two side-by-side phones don't fit usefully.
      const mobile = window.innerWidth < 1100;
      setIsMobile(mobile);
      const pad = 8;
      const tabsH = !hideControls ? 40 : 0;
      if (mobile) {
        const toolbarH = !hideControls ? 100 : 0;
        // Stacked: both phones share vertical space, scale must fit 2x height.
        const stackedH = PHONE.height * 2 + PHONE_GAP;
        const s = Math.min(
          1,
          (window.innerHeight - pad - toolbarH - tabsH) / stackedH,
          (window.innerWidth - pad) / PHONE.width
        );
        setScale(Math.round(s * 100) / 100);
      } else {
        const linkHeight = 32;
        const s = Math.min(
          1,
          (window.innerHeight - pad - tabsH) / (PHONE.height + linkHeight),
          (window.innerWidth - pad) / (PHONE.width * 2 + PHONE_GAP)
        );
        setScale(Math.round(s * 100) / 100);
      }
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [hideControls]);
  return { scale, isMobile };
}

export default function InAppCheckout() {
  const [state, setState] = useState<StationState>(getInitialState);
  const [showAccount, setShowAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTrouble, setShowTrouble] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("554446868");
  const [lang, setLang] = useState<Language>("en");
  const [inAppScreen, setInAppScreen] = useState<InAppScreen>("home");
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  // Shared "merchant order timer" - drives both the AppHome top notif and the
  // ConfirmPurchaseSheet so they stay in lockstep. Starts at 19m 40s (per Figma).
  const [timerSeconds, setTimerSeconds] = useState(19 * 60 + 40);
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const isRtl = lang === "ar";
  const { scale, isMobile } = useDualPhoneLayout(hideControls);

  // Auto-advance from splash to pin after a brief moment.
  useEffect(() => {
    if (inAppScreen !== "splash") return;
    const t = setTimeout(() => setInAppScreen("pin"), SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [inAppScreen]);

  // Auto-open the "Confirm your purchase" sheet a moment after the app home loads.
  useEffect(() => {
    if (inAppScreen !== "app_home") {
      setShowConfirmSheet(false);
      return;
    }
    const t = setTimeout(() => setShowConfirmSheet(true), CONFIRM_DELAY_MS);
    return () => clearTimeout(t);
  }, [inAppScreen]);

  // Tick the shared timer once we land on the app home screen.
  useEffect(() => {
    if (inAppScreen !== "app_home") return;
    if (timerSeconds <= 0) return;
    const t = setTimeout(() => setTimerSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearTimeout(t);
  }, [inAppScreen, timerSeconds]);

  // Left phone (merchant station screen) restart - leaves the right phone alone.
  const restartLeft = () => {
    playTapSound();
    setState("sending");
    setShowAccount(false);
    setShowSuccess(false);
    setShowTrouble(false);
    setNotificationDismissed(false);
    setPhoneNumber("554446868");
  };

  // Right phone (in-app) restart - returns to the iOS home screen so the user
  // can re-tap the Tabby app and replay the splash → PIN flow.
  const restartRight = () => {
    playTapSound();
    setInAppScreen("home");
    setShowConfirmSheet(false);
    setTimerSeconds(19 * 60 + 40);
  };

  // Scaled outer-box dimensions for each phone.
  const phoneW = PHONE.width * scale;
  const phoneH = PHONE.height * scale;

  // Left phone - the merchant station screen (existing /).
  const leftPhone = (
    <div style={{ width: phoneW, height: phoneH }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: PHONE.width, height: PHONE.height }}>
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
                  version="v1"
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
      </div>
    </div>
  );

  // Right phone - the in-app (Tabby) view. Internal state machine drives:
  // home → tap Tabby → splash → (auto) → PIN entry → (any 4 digits) → app_home.
  // Status bar tone follows the bg of the current screen:
  //  - home: dark wallpaper → light (white) icons
  //  - splash: bright Tabby green → dark (black) icons (per Figma)
  //  - pin: white bg → dark (black) icons
  //  - app_home: light grey notif strip → dark (black) icons
  const inAppStatusBarTheme = inAppScreen === "home" ? "light" : "dark";
  const rightPhone = (
    <div style={{ width: phoneW, height: phoneH }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: PHONE.width, height: PHONE.height }}>
        <PhoneFrame state="sending" lang={lang} hideNotification hideSafariBar transparentBg statusBarTheme={inAppStatusBarTheme}>
          <div key={inAppScreen} className="relative w-full h-full" style={{ animation: "ivr-fade-in-up 0.25s ease both" }}>
            {inAppScreen === "home" && (
              <HomeScreen onTabbyTap={() => setInAppScreen("splash")} />
            )}
            {inAppScreen === "splash" && <SplashScreen />}
            {inAppScreen === "pin" && (
              <PinEntryScreen
                onComplete={() => setInAppScreen("app_home")}
                onForgot={() => { /* TODO: open Forgot PIN flow */ }}
              />
            )}
            {inAppScreen === "app_home" && (
              <>
                <AppHomeScreen
                  timerSeconds={timerSeconds}
                  onTopNotifClick={() => setShowConfirmSheet(true)}
                />
                <AnimatePresence>
                  {showConfirmSheet && (
                    <ConfirmPurchaseSheet
                      timerSeconds={timerSeconds}
                      onClose={() => setShowConfirmSheet(false)}
                      onContinue={() => {
                        setShowConfirmSheet(false);
                        setInAppScreen("select_plan");
                      }}
                      onReject={() => setShowConfirmSheet(false)}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
            {inAppScreen === "select_plan" && <SelectPlanScreen />}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );

  return (
    <div className={`h-screen bg-canvas flex flex-col overflow-hidden relative ${isMobile && !hideControls ? "pb-[100px]" : ""}`}>
      {!hideControls && <PrototypeTabs active="in-app" />}

      <div className={`flex-1 flex justify-center relative ${isMobile ? "items-start pt-[12px]" : "items-center"}`}>
        {isMobile ? (
          <div className="flex flex-col items-center" style={{ gap: PHONE_GAP * scale }}>
            {leftPhone}
            {rightPhone}
          </div>
        ) : (
          <div className="flex items-center" style={{ gap: PHONE_GAP }}>
            {leftPhone}
            {rightPhone}
          </div>
        )}

        {/* Desktop control panel (LEFT) - sits to the left of the left phone */}
        {!hideControls && !isMobile && (
          <div
            className="absolute flex flex-col gap-[8px] items-end pt-[42px]"
            style={{
              right: `calc(50% + ${phoneW + PHONE_GAP / 2 + 32}px)`,
              top: `calc(50% - ${phoneH / 2}px)`,
            }}
          >
            <ControlPanel
              state={state}
              onSendNotification={() => setState("sent")}
              onFinishPurchase={() => setState("complete")}
              onShowSuccess={() => setShowSuccess(true)}
              showSuccess={showSuccess}
              onRestart={restartLeft}
            />
          </div>
        )}

        {/* Desktop control panel (RIGHT) - sits to the right of the right phone */}
        {!hideControls && !isMobile && (
          <div
            className="absolute flex flex-col gap-[8px] items-start pt-[42px]"
            style={{
              left: `calc(50% + ${phoneW + PHONE_GAP / 2 + 32}px)`,
              top: `calc(50% - ${phoneH / 2}px)`,
            }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-wider text-tui-front-secondary mb-[4px]">
              In-app
            </p>
            <button
              onClick={restartRight}
              className="px-[20px] py-[12px] rounded-[12px] text-[14px] font-semibold transition-all
                bg-white text-tui-front-primary border border-gray-300 cursor-pointer
                hover:bg-gray-50 active:scale-95"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Mobile toolbar - state controls only (no V1/V2 switcher in this prototype). */}
      {isMobile && !hideControls && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))" }}
        >
          <div className="flex items-center justify-center gap-[6px] flex-wrap px-3 pt-3">
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
              onClick={restartLeft}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-white text-tui-front-primary border border-gray-300 cursor-pointer"
            >
              Reset
            </button>
            <div className="w-px h-5 bg-gray-300 shrink-0" />
            <button
              onClick={restartRight}
              className="px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0
                bg-white text-tui-front-primary border border-gray-300 cursor-pointer"
            >
              Reset app
            </button>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
}
