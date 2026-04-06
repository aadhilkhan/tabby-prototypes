interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

export function UserIcon({ size = 24, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function InfoIcon({ size = 24, className, color = "#5d21de" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
      <line x1="12" y1="11" x2="12" y2="17" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx="12" cy="8" r="1.2" fill={color} />
    </svg>
  );
}

export function CloseIcon({ size = 24, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SmartphoneIcon({ size = 24, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth={2} />
      <line x1="12" y1="18" x2="12" y2="18.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 24, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 17L17 7M17 7H7M17 7v10" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SignalIcon({ className }: IconProps) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className={className}>
      <rect x="0" y="9" width="3.2" height="3" rx="0.8" fill="black" />
      <rect x="4.8" y="6" width="3.2" height="6" rx="0.8" fill="black" />
      <rect x="9.6" y="3" width="3.2" height="9" rx="0.8" fill="black" />
      <rect x="14.4" y="0" width="3.2" height="12" rx="0.8" fill="black" />
    </svg>
  );
}

export function WifiIcon({ className }: IconProps) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className={className}>
      <path d="M1.2 3.6C4 1.2 12 1.2 14.8 3.6" stroke="black" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M3.6 6.4C5.6 4.8 10.4 4.8 12.4 6.4" stroke="black" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M6 9.2C7.2 8.4 8.8 8.4 10 9.2" stroke="black" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="1" fill="black" />
    </svg>
  );
}

export function BatteryIcon({ className }: IconProps) {
  return (
    <svg width="28" height="13" viewBox="0 0 28 13" fill="none" className={className}>
      <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="black" strokeOpacity="0.35" />
      <rect x="2" y="2" width="20" height="9" rx="1.5" fill="black" />
      <path d="M25 4.5V8.5C25.8 8.1 25.8 4.9 25 4.5Z" fill="black" fillOpacity="0.4" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 24, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M6 3l5 5-5 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 80, className }: IconProps) {
  return (
    <div className={`relative ${className || ""}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, #d4f5e4 0%, #e8faf0 60%, rgba(232,250,240,0) 100%)" }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        className="relative z-10"
      >
        <circle cx="40" cy="40" r="40" fill="#d4f5e4" />
        <path
          d="M26 40L35 49L54 30"
          stroke="#00865a"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function CheckIcon({ size = 12, className, color = "white" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M13.5 8a5.5 5.5 0 11-1.1-3.3" stroke="#7f8b99" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M13.5 2.5v3h-3" stroke="#7f8b99" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AAIcon({ className }: IconProps) {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className={className}>
      <text x="0" y="14" fill="#7f8b99" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="400">A</text>
      <text x="10" y="14" fill="#7f8b99" fontSize="14" fontFamily="Inter Variable, sans-serif" fontWeight="400">A</text>
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className={className}>
      <rect x="0.5" y="4.5" width="9" height="7" rx="1.5" stroke="#1d2329" strokeWidth={1} />
      <path d="M2.5 4.5V3a2.5 2.5 0 015 0v1.5" stroke="#1d2329" strokeWidth={1} />
    </svg>
  );
}

export function TabbyTBadge({ className }: IconProps) {
  return (
    <div className={`w-[38px] h-[38px] rounded-[10px] bg-[#292929] flex items-center justify-center ${className || ""}`}>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M2 4h14v2H10v12H8V6H2V4z" fill="#3EEDB1" />
      </svg>
    </div>
  );
}
