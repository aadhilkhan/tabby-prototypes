import { AnimatePresence } from "motion/react";
import StatusBar, { type StatusBarTheme } from "./StatusBar";
import SafariBar from "./SafariBar";
import NotificationBanner from "./NotificationBanner";
import type { StationState, Language } from "../types";
import { PHONE } from "../constants";

interface PhoneFrameProps {
  state: StationState;
  lang?: Language;
  hideNotification?: boolean;
  /** Hide the Safari bar (e.g. when rendering an iOS home screen instead of a webview). */
  hideSafariBar?: boolean;
  /** Use a transparent screen background (e.g. for full-bleed wallpapers). Defaults to white. */
  transparentBg?: boolean;
  /**
   * Status bar theme. Defaults to "browser" when the Safari bar is shown, "light"
   * when it's hidden (matches the iOS home screen / wallpaper case). Override per
   * screen for white-bg in-app screens (e.g. PIN entry → "dark").
   */
  statusBarTheme?: StatusBarTheme;
  /**
   * When `hideSafariBar` is true, render an iOS-style home indicator pill at the
   * bottom of the screen. Color tracks `statusBarTheme` (white for "light", black
   * for "dark"). Browser-mode screens manage their own home indicator inside
   * children, so this only applies to native-app mode. Defaults to true.
   */
  showHomeIndicator?: boolean;
  children: React.ReactNode;
}

export default function PhoneFrame({
  state,
  lang = "en",
  hideNotification,
  hideSafariBar,
  transparentBg,
  statusBarTheme,
  showHomeIndicator = true,
  children,
}: PhoneFrameProps) {
  const isRtl = lang === "ar";
  const resolvedTheme: StatusBarTheme = statusBarTheme ?? (hideSafariBar ? "light" : "browser");
  const indicatorColor = resolvedTheme === "light" ? "#ffffff" : "#000000";

  return (
    <div className="relative" style={{ width: PHONE.width, height: PHONE.height, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))" }}>
      {/* Screen content area - positioned inside the bezel */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className={`absolute overflow-hidden rounded-[50px] ${transparentBg ? "" : "bg-white"} ${isRtl ? "lang-ar" : ""}`}
        style={{ top: PHONE.bezel, left: PHONE.bezel, width: PHONE.screenWidth, height: PHONE.screenHeight }}
      >
        {hideSafariBar ? (
          // iOS home-screen / native-app mode: children fill the whole screen, status bar floats on top.
          <>
            <div className="absolute inset-0">{children}</div>
            <div dir="ltr" className="absolute top-0 left-0 right-0 z-10">
              <StatusBar theme={resolvedTheme} />
            </div>
            {showHomeIndicator && (
              <div className="absolute bottom-[8px] left-0 right-0 flex justify-center pointer-events-none z-10">
                <div className="w-[134px] h-[5px] rounded-[100px]" style={{ backgroundColor: indicatorColor }} />
              </div>
            )}
          </>
        ) : (
          // Default browser-webview mode: status bar + safari URL bar at top, children below.
          <>
            <div dir="ltr">
              <StatusBar theme={resolvedTheme} />
              <SafariBar />
            </div>
            <div className="relative overflow-hidden" style={{ height: "calc(100% - 105px)" }}>
              {children}
            </div>
          </>
        )}

        {/* Notification banner */}
        <AnimatePresence>
          {state === "sent" && !hideNotification && <NotificationBanner lang={lang} />}
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
