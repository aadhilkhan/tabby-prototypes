import { useState, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import { X } from "lucide-react";
import HoldCreatedState from "../components/ivr/HoldCreatedState";
import IVRInProgressState from "../components/ivr/IVRInProgressState";
import IVRFailedState from "../components/ivr/IVRFailedState";
import IVRSuccessState from "../components/ivr/IVRSuccessState";

type IVRState = "hold_created" | "ivr_in_progress" | "ivr_failed" | "ivr_success";

const AMOUNT = "49.75";

const stateLabels: Record<IVRState, string> = {
  hold_created: "Hold",
  ivr_in_progress: "Calling",
  ivr_failed: "Failed",
  ivr_success: "Success",
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

export default function IVRVerification() {
  const [state, setState] = useState<IVRState>(getInitialState);
  // resetKey forces timer to reset when re-entering in_progress
  const [callKey, setCallKey] = useState(0);
  const hideControls = new URLSearchParams(window.location.search).has("state");

  const goTo = useCallback((next: IVRState) => {
    if (next === "ivr_in_progress") setCallKey((k) => k + 1);
    setState(next);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f5f6f8] flex flex-col">
      {/* Demo controls */}
      {!hideControls && (
        <div className="w-full bg-white border-b border-[color:var(--color-ivr-border)]">
          <div className="max-w-[900px] mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[color:var(--color-ivr-front-minor)] mr-2">
              Demo
            </span>
            {(Object.keys(stateLabels) as IVRState[]).map((s) => (
              <button
                key={s}
                onClick={() => goTo(s)}
                className={`px-[12px] py-[6px] rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  state === s
                    ? "bg-[color:var(--color-ivr-front-major)] text-white"
                    : "bg-[color:var(--color-ivr-back-minor)] text-[color:var(--color-ivr-front-major)] hover:bg-[color:var(--color-ivr-border)]"
                }`}
              >
                {stateLabels[s]}
              </button>
            ))}
            {state === "ivr_in_progress" && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => goTo("ivr_success")}
                  className="px-[12px] py-[6px] rounded-full text-[12px] font-semibold cursor-pointer border-2"
                  style={{
                    color: "var(--color-ivr-success)",
                    borderColor: "var(--color-ivr-success)",
                    backgroundColor: "transparent",
                  }}
                >
                  ▸ Simulate Success
                </button>
                <button
                  onClick={() => goTo("ivr_failed")}
                  className="px-[12px] py-[6px] rounded-full text-[12px] font-semibold cursor-pointer border-2"
                  style={{
                    color: "var(--color-ivr-warning)",
                    borderColor: "var(--color-ivr-warning)",
                    backgroundColor: "transparent",
                  }}
                >
                  ▸ Simulate Failure
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Centered frame */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="w-full max-w-[420px] bg-white rounded-[28px] overflow-hidden flex flex-col"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            minHeight: "min(720px, calc(100vh - 120px))",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-[color:var(--color-ivr-border)]">
            <button className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer">
              <X size={22} color="var(--color-ivr-front-major)" strokeWidth={2} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[15px] font-semibold tracking-[-0.1px] text-[color:var(--color-ivr-front-major)] leading-[18px]">
                DemoStore
              </span>
              <div className="flex items-center gap-[4px] mt-[1px]">
                <span className="text-[12px] font-medium text-[color:var(--color-ivr-front-minor)] leading-[14px]">
                  Pay with
                </span>
                <img src="/wordmark.png" alt="tabby" className="h-[12px] object-contain" />
              </div>
            </div>
            <button className="h-[32px] flex items-center px-[6px] cursor-pointer">
              <span className="text-[13px] font-semibold text-[color:var(--color-ivr-accent)]">
                العربية
              </span>
            </button>
          </div>

          {/* Content area (crossfade on state change) */}
          <div className="flex-1 px-[20px] py-[28px] flex flex-col items-center justify-start">
            <div key={state} className="w-full" style={{ animation: "ivr-fade-in-up 0.35s ease both" }}>
              {state === "hold_created" && (
                <HoldCreatedState
                  amount={AMOUNT}
                  onVerify={() => goTo("ivr_in_progress")}
                />
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
                <IVRSuccessState
                  amount={AMOUNT}
                  onContinue={() => goTo("hold_created")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  );
}
