import type { StationState, PrototypeVersion } from "../../types";
import { playTapSound } from "../../sounds";
import VersionToggle from "../VersionToggle";
import {
  MobileToolbar,
  MobileToolbarButton,
  MobileToolbarDivider,
} from "../MobileToolbar";

interface Props {
  state: StationState;
  version: PrototypeVersion;
  showSuccess: boolean;
  onVersionChange: (v: PrototypeVersion) => void;
  onSendNotification: () => void;
  onFinishPurchase: () => void;
  onShowSuccess: () => void;
  onRestart: () => void;
}

export default function StationMobileToolbar({
  state,
  version,
  showSuccess,
  onVersionChange,
  onSendNotification,
  onFinishPurchase,
  onShowSuccess,
  onRestart,
}: Props) {
  return (
    <MobileToolbar>
      <VersionToggle value={version} onChange={onVersionChange} compact />
      <MobileToolbarDivider />
      <MobileToolbarButton
        tone="positive"
        disabled={state !== "sending"}
        onClick={onSendNotification}
      >
        Notify
      </MobileToolbarButton>
      <MobileToolbarButton
        tone="primary"
        disabled={state !== "sent"}
        onClick={() => {
          playTapSound();
          onFinishPurchase();
        }}
      >
        Complete
      </MobileToolbarButton>
      <MobileToolbarButton
        tone="accent"
        disabled={state !== "complete" || showSuccess}
        onClick={() => {
          playTapSound();
          onShowSuccess();
        }}
      >
        Success
      </MobileToolbarButton>
      <MobileToolbarButton
        tone="neutral"
        onClick={() => {
          playTapSound();
          onRestart();
        }}
      >
        Reset
      </MobileToolbarButton>
    </MobileToolbar>
  );
}
