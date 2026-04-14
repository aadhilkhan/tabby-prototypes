import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "../components/PhoneFrame";
import NavBar from "../components/NavBar";
import PrototypeShell from "../components/PrototypeShell";
import HoldCreatedState from "../components/ivr/HoldCreatedState";
import IVRInProgressState from "../components/ivr/IVRInProgressState";
import IVRFailedState from "../components/ivr/IVRFailedState";
import IVRSuccessState from "../components/ivr/IVRSuccessState";
import IVRDesktopControls, { IVRSimulatePanel } from "../components/ivr/IVRDesktopControls";
import IVRMobileToolbar from "../components/ivr/IVRMobileToolbar";
import { SPRING } from "../constants";
import { playTapSound } from "../sounds";
import type { Language, StationState, IVRState } from "../types";

const AMOUNT = "49.75";

/** PhoneFrame requires a StationState; "sending" means no notification banner. */
const PHONE_FRAME_STATE: StationState = "sending";

type BaseIVRState = Exclude<IVRState, "ivr_in_progress" | "ivr_success">;

function getInitialState(): IVRState {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("state");
  if (s === "hold" || s === "hold_created") return "hold_created";
  if (s === "calling" || s === "ivr_in_progress") return "ivr_in_progress";
  if (s === "failed" || s === "ivr_failed") return "ivr_failed";
  if (s === "success" || s === "ivr_success") return "ivr_success";
  return "hold_created";
}

function overlayShadow(isRtl: boolean): string {
  return isRtl ? "4px 0 16px rgba(0,0,0,0.1)" : "-4px 0 16px rgba(0,0,0,0.1)";
}

function isBaseState(s: IVRState): s is BaseIVRState {
  return s === "hold_created" || s === "ivr_failed";
}

export default function IVRVerification() {
  const [state, setState] = useState<IVRState>(getInitialState);
  const [callKey, setCallKey] = useState(0);
  const [lang, setLang] = useState<Language>("en");
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const isRtl = lang === "ar";

  const isCalling = state === "ivr_in_progress";
  const showSuccess = state === "ivr_success";
  const overlayOpen = isCalling || showSuccess;

  // Keep the last base (hold / failed) state rendered behind the calling / success overlays.
  const baseStateRef = useRef<BaseIVRState>(isBaseState(state) ? state : "hold_created");
  if (isBaseState(state)) {
    baseStateRef.current = state;
  }
  const baseState = baseStateRef.current;

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
    <PrototypeShell
      activeTab="ivr"
      hideControls={hideControls}
      desktopLeft={<IVRDesktopControls state={state} onGoTo={goTo} onRestart={restart} />}
      desktopRight={
        isCalling ? (
          <IVRSimulatePanel
            onSuccess={() => goTo("ivr_success")}
            onFailure={() => goTo("ivr_failed")}
          />
        ) : undefined
      }
      mobileToolbar={<IVRMobileToolbar state={state} onGoTo={goTo} onRestart={restart} />}
    >
      {() => (
        <PhoneFrame state={PHONE_FRAME_STATE} lang={lang} hideNotification>
          <div className="relative h-full bg-white flex flex-col">
            <NavBar lang={lang} onToggleLang={() => setLang(lang === "en" ? "ar" : "en")} />
            <div className="relative flex-1 overflow-hidden">
              {/* Base states (hold / failed) - push 30% when an overlay is open */}
              <motion.div
                className="absolute inset-0"
                animate={{ x: overlayOpen ? (isRtl ? "30%" : "-30%") : "0%" }}
                transition={SPRING}
              >
                <div
                  key={`${baseState}-${callKey}`}
                  className="absolute inset-0"
                  style={{ animation: "ivr-fade-in-up 0.35s ease both" }}
                >
                  {baseState === "hold_created" && (
                    <HoldCreatedState amount={AMOUNT} onVerify={() => goTo("ivr_in_progress")} />
                  )}
                  {baseState === "ivr_failed" && (
                    <IVRFailedState amount={AMOUNT} onTryAgain={() => goTo("hold_created")} />
                  )}
                </div>
              </motion.div>

              {/* Calling overlay - slides in from right over base, then pushes 30% back when success opens */}
              <AnimatePresence>
                {(isCalling || showSuccess) && (
                  <motion.div
                    key="ivr-calling"
                    className="absolute inset-0 z-10"
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: showSuccess ? (isRtl ? "30%" : "-30%") : 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={SPRING}
                    style={{ boxShadow: overlayShadow(isRtl) }}
                  >
                    <IVRInProgressState
                      resetKey={callKey}
                      onTimeout={() => goTo("ivr_failed")}
                      onCancel={() => goTo("ivr_failed")}
                      onResend={() => setCallKey((k) => k + 1)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success overlay - slides in from right (or left in RTL), sits above calling */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    key="ivr-success"
                    className="absolute inset-0 z-20"
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={SPRING}
                    style={{ boxShadow: overlayShadow(isRtl) }}
                  >
                    <IVRSuccessState amount={AMOUNT} />
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
      )}
    </PrototypeShell>
  );
}
