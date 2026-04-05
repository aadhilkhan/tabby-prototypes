import { useState } from "react";
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

export default function App() {
  const [state, setState] = useState<StationState>(getInitialState);
  const hideControls = new URLSearchParams(window.location.search).has("state");

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center pb-[40px]">
      <PhoneFrame state={state}>
        <StationScreen state={state} />
      </PhoneFrame>
      {!hideControls && (
        <ControlPanel
          state={state}
          onSendNotification={() => setState("sent")}
          onFinishPurchase={() => setState("complete")}
          onRestart={() => setState("sending")}
        />
      )}
    </div>
  );
}
