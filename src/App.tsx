import { useState } from "react";
import PhoneFrame from "./components/PhoneFrame";
import StationScreen from "./components/StationScreen";
import ControlPanel from "./components/ControlPanel";
import type { StationState } from "./types";

export default function App() {
  const [state, setState] = useState<StationState>("sending");

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center py-[40px]">
      <PhoneFrame state={state}>
        <StationScreen state={state} />
      </PhoneFrame>
      <ControlPanel
        state={state}
        onSendNotification={() => setState("sent")}
        onFinishPurchase={() => setState("complete")}
        onRestart={() => setState("sending")}
      />
    </div>
  );
}
