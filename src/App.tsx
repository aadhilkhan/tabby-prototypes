import { useState, useEffect } from "react";
import PhoneFrame from "./components/PhoneFrame";
import StationScreen from "./components/StationScreen";
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
  const hideControls = new URLSearchParams(window.location.search).has("state");
  const scale = useViewportScale();

  return (
    <div className="h-screen bg-[#f0f0f0] flex items-center justify-center overflow-hidden relative">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <PhoneFrame state={state}>
          <StationScreen state={state} />
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
            onRestart={() => setState("sending")}
          />
        </div>
      )}
    </div>
  );
}
