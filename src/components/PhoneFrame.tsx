import { AnimatePresence } from "motion/react";
import StatusBar from "./StatusBar";
import SafariBar from "./SafariBar";
import NotificationBanner from "./NotificationBanner";
import type { StationState } from "../types";
import { PHONE } from "../constants";

interface PhoneFrameProps {
  state: StationState;
  hideNotification?: boolean;
  children: React.ReactNode;
}

export default function PhoneFrame({ state, hideNotification, children }: PhoneFrameProps) {
  return (
    <div className="relative" style={{ width: PHONE.width, height: PHONE.height, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))" }}>
      {/* Screen content area — positioned inside the bezel */}
      <div
        className="absolute bg-white overflow-hidden rounded-[50px]"
        style={{ top: PHONE.bezel, left: PHONE.bezel, width: PHONE.screenWidth, height: PHONE.screenHeight }}
      >
        <StatusBar />
        <SafariBar />
        <div className="relative overflow-hidden" style={{ height: "calc(100% - 105px)" }}>
          {children}
        </div>

        {/* Notification banner */}
        <AnimatePresence>
          {state === "sent" && !hideNotification && <NotificationBanner />}
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
