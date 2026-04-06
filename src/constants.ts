import type { StationState, TrackerStepData } from "./types";

export function getTrackerSteps(state: StationState): TrackerStepData[] {
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

  const step1Complete: TrackerStepData = {
    ...step1Sent,
    lineColor: "green",
  };

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

  const step2Complete: TrackerStepData = {
    ...step2Base,
    indicatorColor: "green",
    lineColor: "green",
  };

  const step3Base: TrackerStepData = {
    id: 3,
    indicatorType: "dot",
    indicatorColor: "gray",
    title: "Return back here once payment is complete",
    titleBold: false,
    showLine: false,
    lineColor: "gray",
  };

  const step3Complete: TrackerStepData = {
    ...step3Base,
    indicatorColor: "green",
  };

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
  const step1Sending: TrackerStepData = {
    id: 1,
    indicatorType: "dot",
    indicatorColor: "tertiary",
    indicatorSpinning: true,
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

  const step1Complete: TrackerStepData = {
    ...step1Sent,
    lineColor: "green",
  };

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

  const step2Sent: TrackerStepData = {
    ...step2Base,
    indicatorSpinning: true,
    indicatorColor: "tertiary",
  };

  const step2Complete: TrackerStepData = {
    ...step2Base,
    indicatorColor: "green",
    lineColor: "green",
  };

  const step3Base: TrackerStepData = {
    id: 3,
    indicatorType: "dot",
    indicatorColor: "gray",
    title: "Return back here once payment is complete",
    titleBold: false,
    showLine: false,
    lineColor: "gray",
  };

  const step3Complete: TrackerStepData = {
    ...step3Base,
    indicatorColor: "green",
  };

  switch (state) {
    case "sending":
      return [step1Sending, step2Base, step3Base];
    case "sent":
      return [step1Sent, step2Sent, step3Base];
    case "complete":
      return [step1Complete, step2Complete, step3Complete];
  }
}
