import type { PrototypeVersion } from "../types";
import { playTapSound } from "../sounds";

interface VersionToggleProps {
  value: PrototypeVersion;
  onChange: (v: PrototypeVersion) => void;
  /** Renders a smaller, unpadded variant for the mobile toolbar. */
  compact?: boolean;
  /** Shown below the toggle on desktop to explain the current variant. */
  showLabel?: boolean;
}

const OPTIONS: Array<{ value: PrototypeVersion; label: string }> = [
  { value: "v1", label: "V1" },
  { value: "v2", label: "V2" },
];

const VARIANT_DESCRIPTION: Record<PrototypeVersion, string> = {
  v1: "Spinner icon",
  v2: "Spinner nodes",
};

export default function VersionToggle({ value, onChange, compact, showLabel }: VersionToggleProps) {
  const sizeClass = compact
    ? "px-[10px] py-[7px] text-[11px]"
    : "px-[16px] py-[10px] text-[13px]";
  const radius = compact ? "rounded-[8px]" : "rounded-[12px]";

  return (
    <div className="flex flex-col gap-[8px]">
      <div className={`flex ${radius} overflow-hidden border border-gray-300 bg-white`} role="group" aria-label="Prototype version">
        {OPTIONS.map(({ value: v, label }) => {
          const active = v === value;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={active}
              onClick={() => {
                playTapSound();
                onChange(v);
              }}
              className={`${sizeClass} font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-tui-front-primary text-white"
                  : "bg-white text-tui-front-secondary hover:bg-gray-50"
              }`}
            >
              {label}
              {active && !compact ? " ✓" : ""}
            </button>
          );
        })}
      </div>
      {showLabel && !compact && (
        <p className="text-[12px] text-tui-front-secondary leading-[16px]">
          {VARIANT_DESCRIPTION[value]}
        </p>
      )}
    </div>
  );
}
