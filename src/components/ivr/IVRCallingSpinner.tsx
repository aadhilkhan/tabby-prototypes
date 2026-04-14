import { PhoneCallIcon } from "./icons";

/**
 * 88x88 spinner matching the station-screen SpinnerIcon, but with the
 * custom PhoneCall icon at the center instead of the Tabby mark.
 */
export default function IVRCallingSpinner() {
  const circumference = 2 * Math.PI * 40;
  const arcLength = circumference * 0.25;

  return (
    <div className="relative w-[88px] h-[88px] flex items-center justify-center">
      {/* Inner background circle with icon */}
      <div className="absolute rounded-full bg-spinner-bg flex items-center justify-center z-10 w-[74px] h-[74px]">
        <PhoneCallIcon size={40} color="var(--color-tui-front-accent)" />
      </div>

      {/* Background ring track */}
      <svg className="absolute inset-0" width="88" height="88" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r="40"
          fill="none"
          stroke="var(--color-spinner-bg)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Spinning progress arc */}
      <div className="absolute inset-0" style={{ animation: "spin-progress 1.5s linear infinite" }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r="40"
            fill="none"
            stroke="var(--color-tui-line-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset="0"
            transform="rotate(-90 44 44)"
          />
        </svg>
      </div>
    </div>
  );
}
