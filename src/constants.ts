import type { StationState, TrackerStepData } from "./types";

/** Shared spring transition for slide animations */
export const SPRING = { type: "spring" as const, damping: 30, stiffness: 300 };

/** Softer spring for the notification banner */
export const SPRING_SOFT = { type: "spring" as const, damping: 25, stiffness: 300 };

/** Phone frame dimensions */
export const PHONE = { width: 497, height: 980, bezel: 42, screenWidth: 413, screenHeight: 896 };

/* ── Tracker step configs ─────────────────────────────────────────── */

const step1Sending: TrackerStepData = {
  id: 1,
  indicatorType: "icon",
  indicatorColor: "tertiary",
  title: "Sending push notification...",
  titleBold: true,
  showLine: true,
  lineColor: "gray",
};

const step1Sent: TrackerStepData = {
  id: 1,
  indicatorType: "icon",
  indicatorColor: "green",
  title: "Tap the notification sent to your Tabby app",
  titleBold: true,
  description: "Or download app using the link sent via SMS",
  action: "Having trouble with the notification?",
  showLine: true,
  lineColor: "green",
};

const step1Complete: TrackerStepData = { ...step1Sent, lineColor: "green" };

const step2Base: TrackerStepData = {
  id: 2,
  indicatorType: "dot",
  indicatorColor: "gray",
  title: "Complete purchase in app",
  titleBold: false,
  description: "Adidas \u2022 AED 400.00",
  showLine: true,
  lineColor: "gray",
};

const step2Complete: TrackerStepData = { ...step2Base, indicatorColor: "green", lineColor: "green" };

const step3Base: TrackerStepData = {
  id: 3,
  indicatorType: "dot",
  indicatorColor: "gray",
  title: "Return back here once payment is complete",
  titleBold: false,
  showLine: false,
  lineColor: "gray",
};

const step3Complete: TrackerStepData = { ...step3Base, indicatorColor: "green" };

export function getTrackerSteps(state: StationState): TrackerStepData[] {
  switch (state) {
    case "sending":
      return [step1Sending, step2Base, step3Base];
    case "sent":
      return [step1Sent, step2Base, step3Base];
    case "complete":
      return [step1Complete, step2Complete, step3Complete];
  }
}

export function getTrackerStepsV2(state: StationState): TrackerStepData[] {
  // V2 overrides: step 1 sending uses dot+spinner instead of icon; step 2 sent has spinner
  const step1SendingV2: TrackerStepData = {
    ...step1Sending,
    indicatorType: "dot",
    indicatorSpinning: true,
  };
  const step2Sent: TrackerStepData = {
    ...step2Base,
    indicatorSpinning: true,
    indicatorColor: "tertiary",
  };

  switch (state) {
    case "sending":
      return [step1SendingV2, step2Base, step3Base];
    case "sent":
      return [step1Sent, step2Sent, step3Base];
    case "complete":
      return [step1Complete, step2Complete, step3Complete];
  }
}
