export type StationState = "sending" | "sent" | "complete";

export interface TrackerStepData {
  id: number;
  indicatorType: "icon" | "dot";
  indicatorColor: "gray" | "green" | "tertiary";
  title: string;
  titleBold: boolean;
  trail?: string;
  description?: string;
  action?: string;
  showLine: boolean;
  lineColor: "gray" | "green";
}
