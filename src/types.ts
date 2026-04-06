export type StationState = "sending" | "sent" | "complete";

export type PrototypeVersion = "v1" | "v2";

export interface TrackerStepData {
  id: number;
  indicatorType: "icon" | "dot";
  indicatorColor: "gray" | "green" | "tertiary";
  indicatorSpinning?: boolean;
  title: string;
  titleBold: boolean;
  trail?: string;
  description?: string;
  action?: string;
  showLine: boolean;
  lineColor: "gray" | "green";
}
