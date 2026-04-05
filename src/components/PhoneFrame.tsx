import { AnimatePresence } from "motion/react";
import StatusBar from "./StatusBar";
import SafariBar from "./SafariBar";
import NotificationBanner from "./NotificationBanner";
import type { StationState } from "../types";

interface PhoneFrameProps {
  state: StationState;
  children: React.ReactNode;
}

export default function PhoneFrame({ state, children }: PhoneFrameProps) {
  return (
    <div className="relative" style={{ width: 497, height: 980 }}>
      {/* Screen content area — positioned inside the bezel */}
      <div
        className="absolute bg-white overflow-hidden rounded-[50px]"
        style={{ top: 42, left: 42, width: 413, height: 896 }}
      >
        <StatusBar />
        <SafariBar />
        <div className="relative overflow-hidden" style={{ height: "calc(100% - 105px)" }}>
          {children}
        </div>

        {/* Notification banner */}
        <AnimatePresence>
          {state === "sent" && <NotificationBanner />}
        </AnimatePresence>
      </div>

      {/* iPhone frame overlay */}
      <img
        src="/iphone-frame.png"
        alt=""
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />
    </div>
  );
}
