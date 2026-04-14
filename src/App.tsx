import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "./components/PhoneFrame";
import NavBar from "./components/NavBar";
import StationScreen from "./components/StationScreen";
import AccountScreen from "./components/AccountScreen";
import SuccessScreen from "./components/SuccessScreen";
import TroubleBottomSheet from "./components/TroubleBottomSheet";
import ControlPanel from "./components/ControlPanel";
import VersionToggle from "./components/VersionToggle";
import StationMobileToolbar from "./components/station/StationMobileToolbar";
import PrototypeShell from "./components/PrototypeShell";
import type { StationState, PrototypeVersion, Language } from "./types";
import { SPRING } from "./constants";

const DEFAULT_PHONE = "554446868";

const VIEW_DESIGNS_URL =
  "https://www.figma.com/design/ekQkGLPpsC1RqPEO9mScsv/In-app-Checkout-Flow--Skip-OTP-?node-id=1399-12084&t=wlKdybrQ801DYFqp-11";

function getInitialState(): StationState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "sent" || s === "complete") return s;
  return "sending";
}

/** Box-shadow for a slide-in overlay; direction flips in RTL. */
function overlayShadow(isRtl: boolean): string {
  return isRtl ? "4px 0 16px rgba(0,0,0,0.1)" : "-4px 0 16px rgba(0,0,0,0.1)";
}

function FigmaLink() {
  return (
    <a
      href={VIEW_DESIGNS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-[6px] mt-[12px] text-[13px] text-tui-front-secondary hover:text-tui-front-primary transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
      View designs
    </a>
  );
}

export default function App() {
  const [state, setState] = useState<StationState>(getInitialState);
  const [showAccount, setShowAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTrouble, setShowTrouble] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_PHONE);
  const [version, setVersion] = useState<PrototypeVersion>("v1");
  const [lang, setLang] = useState<Language>("en");

  const hideControls = new URLSearchParams(window.location.search).has("state");
  const isRtl = lang === "ar";
  const baseShifted = showAccount || showSuccess;

  const restart = () => {
    setState("sending");
    setShowAccount(false);
    setShowSuccess(false);
    setShowTrouble(false);
    setNotificationDismissed(false);
    setPhoneNumber(DEFAULT_PHONE);
  };

  const openAccount = () => {
    setShowAccount(true);
    setNotificationDismissed(true);
  };

  const openTrouble = () => {
    setShowTrouble(true);
    setNotificationDismissed(true);
  };

  const onAccountContinue = (newPhone: string) => {
    const numberChanged = newPhone !== phoneNumber;
    setPhoneNumber(newPhone);
    setShowAccount(false);
    if (numberChanged) {
      setState("sending");
      setNotificationDismissed(false);
    }
  };

  return (
    <PrototypeShell
      activeTab="station"
      hideControls={hideControls}
      desktopFooter={<FigmaLink />}
      desktopLeft={
        <ControlPanel
          state={state}
          onSendNotification={() => setState("sent")}
          onFinishPurchase={() => setState("complete")}
          onShowSuccess={() => setShowSuccess(true)}
          showSuccess={showSuccess}
          onRestart={restart}
        />
      }
      desktopRight={
        <VersionToggle value={version} onChange={setVersion} showLabel />
      }
      mobileToolbar={
        <StationMobileToolbar
          state={state}
          version={version}
          showSuccess={showSuccess}
          onVersionChange={setVersion}
          onSendNotification={() => setState("sent")}
          onFinishPurchase={() => setState("complete")}
          onShowSuccess={() => setShowSuccess(true)}
          onRestart={restart}
        />
      }
    >
      {() => (
        <PhoneFrame
          state={state}
          lang={lang}
          hideNotification={showTrouble || showAccount || notificationDismissed}
        >
          <div className="relative h-full bg-white flex flex-col">
            <NavBar lang={lang} onToggleLang={() => setLang(lang === "en" ? "ar" : "en")} />
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ x: baseShifted ? (isRtl ? "30%" : "-30%") : "0%" }}
                transition={SPRING}
              >
                <StationScreen
                  state={state}
                  phoneNumber={phoneNumber}
                  version={version}
                  lang={lang}
                  onChangeAccount={openAccount}
                  onTroubleClick={openTrouble}
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
                    style={{ boxShadow: overlayShadow(isRtl) }}
                  >
                    <AccountScreen
                      initialPhone={phoneNumber}
                      lang={lang}
                      onContinue={onAccountContinue}
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
                    style={{ boxShadow: overlayShadow(isRtl) }}
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

            {/* Trouble bottom sheet - outside overflow-hidden so it covers the full frame */}
            <AnimatePresence>
              {showTrouble && (
                <TroubleBottomSheet
                  key="trouble"
                  lang={lang}
                  phoneNumber={phoneNumber}
                  onClose={() => setShowTrouble(false)}
                  onSendSMS={() => {}}
                  onSendNotification={() => {
                    setShowTrouble(false);
                    setNotificationDismissed(false);
                  }}
                  onChangeAccount={() => {
                    setShowTrouble(false);
                    setShowAccount(true);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </PhoneFrame>
      )}
    </PrototypeShell>
  );
}
