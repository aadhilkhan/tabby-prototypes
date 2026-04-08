import type { StationState, TrackerStepData, Language } from "./types";
import { t } from "./translations";

/** Shared spring transition for slide animations */
export const SPRING = { type: "spring" as const, damping: 30, stiffness: 300 };

/** Softer spring for the notification banner */
export const SPRING_SOFT = { type: "spring" as const, damping: 25, stiffness: 300 };

/** Phone frame dimensions */
export const PHONE = { width: 497, height: 980, bezel: 42, screenWidth: 413, screenHeight: 896 };

/* ── Tracker step configs ─────────────────────────────────────────── */

function makeSteps(lang: Language) {
  const step1Sending: TrackerStepData = {
    id: 1,
    indicatorType: "icon",
    indicatorColor: "tertiary",
    title: t("tracker.step1.sending", lang),
    titleBold: true,
    showLine: true,
    lineColor: "gray",
  };

  const step1Sent: TrackerStepData = {
    id: 1,
    indicatorType: "icon",
    indicatorColor: "green",
    title: t("tracker.step1.sent", lang),
    titleBold: true,
    description: t("tracker.step1.description", lang),
    action: t("tracker.step1.action", lang),
    showLine: true,
    lineColor: "green",
  };

  const step1Complete: TrackerStepData = { ...step1Sent, lineColor: "green" };

  const step2Base: TrackerStepData = {
    id: 2,
    indicatorType: "dot",
    indicatorColor: "gray",
    title: t("tracker.step2.title", lang),
    titleBold: false,
    description: t("tracker.step2.description", lang),
    showLine: true,
    lineColor: "gray",
  };

  const step2Complete: TrackerStepData = { ...step2Base, indicatorColor: "green", lineColor: "green" };

  const step3Base: TrackerStepData = {
    id: 3,
    indicatorType: "dot",
    indicatorColor: "gray",
    title: t("tracker.step3.title", lang),
    titleBold: false,
    showLine: false,
    lineColor: "gray",
  };

  const step3Complete: TrackerStepData = { ...step3Base, indicatorColor: "green" };

  return { step1Sending, step1Sent, step1Complete, step2Base, step2Complete, step3Base, step3Complete };
}

export function getTrackerSteps(state: StationState, lang: Language = "en"): TrackerStepData[] {
  const s = makeSteps(lang);
  switch (state) {
    case "sending":
      return [s.step1Sending, s.step2Base, s.step3Base];
    case "sent":
      return [s.step1Sent, s.step2Base, s.step3Base];
    case "complete":
      return [s.step1Complete, s.step2Complete, s.step3Complete];
  }
}

export function getTrackerStepsV2(state: StationState, lang: Language = "en"): TrackerStepData[] {
  const s = makeSteps(lang);

  const step1SendingV2: TrackerStepData = {
    ...s.step1Sending,
    indicatorType: "dot",
    indicatorSpinning: true,
  };
  const step2Sent: TrackerStepData = {
    ...s.step2Base,
    indicatorSpinning: true,
    indicatorColor: "tertiary",
  };

  switch (state) {
    case "sending":
      return [step1SendingV2, s.step2Base, s.step3Base];
    case "sent":
      return [s.step1Sent, step2Sent, s.step3Base];
    case "complete":
      return [s.step1Complete, s.step2Complete, s.step3Complete];
  }
}
