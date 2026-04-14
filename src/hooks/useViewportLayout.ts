import { useEffect, useState } from "react";
import { PHONE } from "../constants";

/** Below this viewport width we switch to the mobile toolbar layout. */
const MOBILE_BREAKPOINT_PX = 960;

/** Height reserved at the bottom of the viewport for the mobile control toolbar. */
const MOBILE_TOOLBAR_HEIGHT_PX = 100;

/** Height reserved at the top of the viewport for the PrototypeTabs bar. */
const TABS_HEIGHT_PX = 40;

/**
 * Extra desktop vertical space reserved below the phone for the "View designs"
 * link. Treated as part of the scaled content box (so we add it to the height
 * denominator rather than subtracting it from the budget).
 */
const DESKTOP_LINK_HEIGHT_PX = 32;

/** Outer safety padding around the phone frame. */
const VIEWPORT_PADDING_PX = 4;

interface ViewportLayout {
  scale: number;
  isMobile: boolean;
}

/**
 * Fits the fixed-size phone frame into the available viewport, returning a
 * uniform scale factor and a mobile flag.
 *
 * When `hideControls` is true (the `?state=` capture mode) we drop the tabs
 * bar and mobile toolbar from the calculation so the phone can use the full
 * height.
 */
export function useViewportLayout(hideControls: boolean): ViewportLayout {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function calc() {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT_PX;
      setIsMobile(mobile);

      const tabsH = hideControls ? 0 : TABS_HEIGHT_PX;
      const widthBudget = window.innerWidth - VIEWPORT_PADDING_PX;
      const widthScale = widthBudget / PHONE.width;

      let heightScale: number;
      if (mobile) {
        const toolbarH = hideControls ? 0 : MOBILE_TOOLBAR_HEIGHT_PX;
        const heightBudget = window.innerHeight - VIEWPORT_PADDING_PX - toolbarH - tabsH;
        heightScale = heightBudget / PHONE.height;
      } else {
        const heightBudget = window.innerHeight - VIEWPORT_PADDING_PX - tabsH;
        heightScale = heightBudget / (PHONE.height + DESKTOP_LINK_HEIGHT_PX);
      }

      // Round to 2 decimals so we're not shipping a new transform matrix every pixel.
      setScale(Math.round(Math.min(1, heightScale, widthScale) * 100) / 100);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [hideControls]);

  return { scale, isMobile };
}

export const VIEWPORT_LAYOUT = {
  MOBILE_BREAKPOINT_PX,
  MOBILE_TOOLBAR_HEIGHT_PX,
  TABS_HEIGHT_PX,
  DESKTOP_LINK_HEIGHT_PX,
} as const;
