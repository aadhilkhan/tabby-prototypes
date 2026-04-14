import type { StationState, TrackerStepData, Language } from "./types";
import { t } from "./translations";

/** Shared spring transition for slide animations */
export const SPRING = { type: "spring" as const, damping: 30, stiffness: 300 };

/** Softer spring for the notification banner */
export const SPRING_SOFT = { type: "spring" as const, damping: 25, stiffness: 300 };

/** Phone frame dimensions */
export const PHONE = { width: 497, height: 980, bezel: 42, screenWidth: 413, screenHeight: 896 };

/* ── Tracker step configs ─────────────────────────────────────────── */

/* Structural bases - text is applied per-language at build time */

const s1Sending = {
  id: 1, indicatorType: "icon" as const, indicatorColor: "tertiary" as const,
  titleBold: true, showLine: true, lineColor: "gray" as const,
};

const s1Sent = {
  id: 1, indicatorType: "icon" as const, indicatorColor: "green" as const,
  titleBold: true, showLine: true, lineColor: "green" as const,
};

const s2Base = {
  id: 2, indicatorType: "dot" as const, indicatorColor: "gray" as const,
  titleBold: false, showLine: true, lineColor: "gray" as const,
};

const s3Base = {
  id: 3, indicatorType: "dot" as const, indicatorColor: "gray" as const,
  titleBold: false, showLine: false, lineColor: "gray" as const,
};

function formatPhoneForStep1(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length <= 2) return `+971 ${d}`;
  if (d.length <= 5) return `+971 ${d.slice(0, 2)} ${d.slice(2)}`;
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}

function buildSteps(state: StationState, lang: Language, phoneNumber: string): TrackerStepData[] {
  const step1Sending: TrackerStepData = {
    ...s1Sending, title: t("tracker.step1.sending.title", lang),
  };
  const step1Sent: TrackerStepData = {
    ...s1Sent,
    title: t("tracker.step1.sent.title", lang),
    description: `${t("tracker.step1.sent.description", lang)} ${formatPhoneForStep1(phoneNumber)}`,
    action: t("tracker.step1.sent.action", lang),
  };
  const step2: TrackerStepData = {
    ...s2Base,
    title: t("tracker.step2.title", lang),
    description: t("tracker.step2.description", lang),
  };
  const step3: TrackerStepData = {
    ...s3Base,
    title: t("tracker.step3.title", lang),
  };

  switch (state) {
    case "sending":
      return [step1Sending, step2, step3];
    case "sent":
      return [step1Sent, step2, step3];
    case "complete":
      return [
        { ...step1Sent, lineColor: "green" },
        { ...step2, indicatorColor: "green", lineColor: "green" },
        { ...step3, indicatorColor: "green" },
      ];
  }
}

export function getTrackerSteps(state: StationState, lang: Language = "en", phoneNumber: string = "554446868"): TrackerStepData[] {
  return buildSteps(state, lang, phoneNumber);
}

export function getTrackerStepsV2(state: StationState, lang: Language = "en", phoneNumber: string = "554446868"): TrackerStepData[] {
  const steps = buildSteps(state, lang, phoneNumber);

  if (state === "sending") {
    steps[0] = { ...steps[0], indicatorType: "dot", indicatorSpinning: true };
  } else if (state === "sent") {
    steps[1] = { ...steps[1], indicatorSpinning: true, indicatorColor: "tertiary" };
  }

  return steps;
}
