import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import PrototypeTabs from "./PrototypeTabs";
import { PHONE } from "../constants";
import { useViewportLayout } from "../hooks/useViewportLayout";

interface PrototypeShellProps {
  /** Which tab should appear active in the top chrome. */
  activeTab: "station" | "ivr";
  /** When true, hide every control (used for `?state=` capture mode). */
  hideControls: boolean;
  /** The phone contents (typically a `<PhoneFrame>`). */
  children: (ctx: { scale: number; isMobile: boolean }) => ReactNode;
  /** Optional node rendered below the scaled phone on desktop (e.g. Figma link). */
  desktopFooter?: ReactNode;
  /** Desktop-only control panel positioned to the left of the phone. */
  desktopLeft?: ReactNode;
  /** Desktop-only control panel positioned to the right of the phone. */
  desktopRight?: ReactNode;
  /** Mobile-only sticky bottom toolbar. */
  mobileToolbar?: ReactNode;
}

export default function PrototypeShell({
  activeTab,
  hideControls,
  children,
  desktopFooter,
  desktopLeft,
  desktopRight,
  mobileToolbar,
}: PrototypeShellProps) {
  const { scale, isMobile } = useViewportLayout(hideControls);
  const showMobilePad = isMobile && !hideControls;
  const showDesktopControls = !hideControls && !isMobile;

  const scaledW = PHONE.width * scale;
  const scaledH = PHONE.height * scale;
  // When the desktop footer is visible we reserve 32px under the phone so the
  // outer wrapper flex-centers correctly.
  const outerH = scaledH + (desktopFooter && !isMobile && !hideControls ? 32 : 0);

  const leftOffset = `calc(50% + ${(PHONE.width / 2) * scale + 32}px)`;
  const topOffset = `calc(50% - ${(PHONE.height / 2) * scale}px)`;

  return (
    <div className={`h-screen bg-canvas flex flex-col overflow-hidden relative ${showMobilePad ? "pb-[100px]" : ""}`}>
      {!hideControls && <PrototypeTabs active={activeTab} />}

      <div className={`flex-1 flex justify-center relative ${isMobile ? "items-start" : "items-center"}`}>
        <div style={{ width: scaledW, height: outerH }}>
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: PHONE.width,
              height: PHONE.height,
            }}
          >
            {children({ scale, isMobile })}
            {desktopFooter && !isMobile && !hideControls && desktopFooter}
          </div>
        </div>

        {showDesktopControls && desktopLeft && (
          <div
            className="absolute flex flex-col gap-[8px] items-end pt-[42px]"
            style={{ right: leftOffset, top: topOffset }}
          >
            {desktopLeft}
          </div>
        )}

        {showDesktopControls && desktopRight && (
          <div
            className="absolute flex flex-col gap-[8px] items-start pt-[42px]"
            style={{ left: leftOffset, top: topOffset }}
          >
            {desktopRight}
          </div>
        )}
      </div>

      {showMobilePad && mobileToolbar}

      <Analytics />
    </div>
  );
}
