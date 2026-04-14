/**
 * iOS-style "Tabby — incoming call" notification banner.
 * Replaces the loader icon at the top of the IVR calling screen.
 */
export default function IncomingCallBanner() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative w-full rounded-[22px] flex items-center justify-between px-[16px] py-[12px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2b1e5c 0%, #3b2e7a 55%, #312566 100%)",
          boxShadow: "0 8px 24px rgba(24, 16, 64, 0.18)",
        }}
      >
        {/* Caller info */}
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="text-white text-[16px] font-bold leading-[20px] tracking-[-0.1px]">
            Tabby
          </span>
          <span className="text-white/60 text-[13px] font-medium leading-[16px] tracking-[-0.1px]">
            incoming call
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-[10px] shrink-0">
          {/* Decline — red */}
          <button
            type="button"
            aria-label="Decline"
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#FF3B30",
              boxShadow: "0 1px 4px rgba(255, 59, 48, 0.35)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <g transform="rotate(135 12 12)">
                <path
                  d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.29 18.75 15.48 20 15.48C20.55 15.48 21 15.93 21 16.48V19.92C21 20.47 20.55 20.92 20 20.92C10.61 20.92 3 13.31 3 3.92C3 3.37 3.45 2.92 4 2.92H7.5C8.05 2.92 8.5 3.37 8.5 3.92C8.5 5.18 8.7 6.38 9.06 7.5C9.17 7.85 9.08 8.24 8.8 8.52L6.62 10.79Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>

          {/* Answer — green */}
          <button
            type="button"
            aria-label="Answer"
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#30C950",
              boxShadow: "0 1px 4px rgba(48, 201, 80, 0.35)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.29 18.75 15.48 20 15.48C20.55 15.48 21 15.93 21 16.48V19.92C21 20.47 20.55 20.92 20 20.92C10.61 20.92 3 13.31 3 3.92C3 3.37 3.45 2.92 4 2.92H7.5C8.05 2.92 8.5 3.37 8.5 3.92C8.5 5.18 8.7 6.38 9.06 7.5C9.17 7.85 9.08 8.24 8.8 8.52L6.62 10.79Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
