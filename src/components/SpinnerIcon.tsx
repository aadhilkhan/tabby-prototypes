export default function SpinnerIcon() {
  const circumference = 2 * Math.PI * 40;
  const arcLength = circumference * 0.25;

  return (
    <div className="relative w-[88px] h-[88px] flex items-center justify-center">
      {/* Accent muted purple background circle */}
      <div className="absolute w-[74px] h-[74px] rounded-full bg-spinner-bg flex items-center justify-center z-10">
        <img src="/icon.png" alt="" className="w-[36px] h-[36px] object-contain" />
      </div>

      {/* Background ring track */}
      <svg className="absolute inset-0" width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="40" fill="none" stroke="#f2e8ff" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Spinning progress arc */}
      <div className="absolute inset-0" style={{ animation: "spin-progress 1.5s linear infinite" }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r="40" fill="none"
            stroke="#ccb1fa" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset="0"
            transform="rotate(-90 44 44)"
          />
        </svg>
      </div>
    </div>
  );
}
