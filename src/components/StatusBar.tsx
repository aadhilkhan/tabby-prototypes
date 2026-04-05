import { SignalIcon, WifiIcon, BatteryIcon } from "./icons";

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[32px] pt-[14px] pb-[10px] w-full bg-browser-header relative">
      <span className="text-[17px] font-semibold tracking-[-0.4px] text-black w-[54px]">
        9:41
      </span>
      {/* Dynamic Island space — the actual notch comes from the frame image */}
      <div className="w-[126px] h-[37px]" />
      <div className="flex items-center gap-[6px] w-[78px] justify-end">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
