import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "./components/PhoneFrame";
import NavBar from "./components/NavBar";
import StationScreen from "./components/StationScreen";
import AccountScreen from "./components/AccountScreen";
import SuccessScreen from "./components/SuccessScreen";
import ControlPanel from "./components/ControlPanel";
import type { StationState } from "./types";

function getInitialState(): StationState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "sent" || s === "complete") return s;
  return "sending";
}

function useViewportScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function calc() {
      const phoneH = 980;
      const pad = 4;
      const s = Math.min(1, (window.innerHeight - pad) / phoneH, (window.innerWidth - pad) / 497);
      setScale(Math.round(s * 100) / 100);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return scale;
}

export default function App() {
  const [state, setState] = useState<StationState>(getInitialState);
  const [showAccount, setShowAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("554446868");
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const scale = useViewportScale();

  // Show success screen 2 seconds after payment completes
  useEffect(() => {
    if (state === "complete" && !showSuccess) {
      const timer = setTimeout(() => setShowSuccess(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [state, showSuccess]);

  return (
    <div className="h-screen bg-[#f0f0f0] flex items-center justify-center overflow-hidden relative">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <PhoneFrame state={state}>
          <div className="relative h-full bg-white flex flex-col">
            <NavBar />
            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ x: showAccount ? "-30%" : "0%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <StationScreen
                  state={state}
                  phoneNumber={phoneNumber}
                  onChangeAccount={() => setShowAccount(true)}
                />
              </motion.div>
              <AnimatePresence>
                {showAccount && (
                  <motion.div
                    key="account"
                    className="absolute inset-0 z-10"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    style={{ boxShadow: "-4px 0 16px rgba(0,0,0,0.1)" }}
                  >
                    <AccountScreen
                      initialPhone={phoneNumber}
                      onContinue={(newPhone) => {
                        setPhoneNumber(newPhone);
                        setShowAccount(false);
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
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    style={{ boxShadow: "-4px 0 16px rgba(0,0,0,0.1)" }}
                  >
                    <SuccessScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Home indicator */}
            <div className="w-full flex justify-center pt-[28px] pb-[8px]">
              <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
            </div>
          </div>
        </PhoneFrame>
      </div>
      {!hideControls && (
        <div
          className="absolute flex flex-col gap-[8px] items-end pt-[42px]"
          style={{
            right: `calc(50% + ${(497 / 2) * scale + 32}px)`,
            top: `calc(50% - ${(980 / 2) * scale}px)`,
          }}
        >
          <ControlPanel
            state={state}
            onSendNotification={() => setState("sent")}
            onFinishPurchase={() => setState("complete")}
            onRestart={() => { setState("sending"); setShowAccount(false); setShowSuccess(false); setPhoneNumber("554446868"); }}
          />
        </div>
      )}
    </div>
  );
}
