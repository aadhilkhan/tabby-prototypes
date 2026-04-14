import type { ReactNode } from "react";

/**
 * Thin sticky-bottom shell for the mobile-only toolbar that sits under the
 * scaled phone frame on narrow viewports.
 */
export function MobileToolbar({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))" }}
    >
      <div className="flex items-center justify-center gap-[6px] flex-wrap px-3 pt-3">
        {children}
      </div>
    </div>
  );
}

/** Vertical separator used between toolbar sections. */
export function MobileToolbarDivider() {
  return <div className="w-px h-5 bg-gray-300 shrink-0" />;
}

interface MobileToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  /** Tailwind color class applied to the bg when enabled. */
  tone?: "positive" | "primary" | "accent" | "neutral";
  children: ReactNode;
}

const TONE_CLASSES: Record<NonNullable<MobileToolbarButtonProps["tone"]>, string> = {
  positive: "bg-tui-line-positive text-white",
  primary: "bg-tui-front-primary text-white",
  accent: "bg-tui-front-accent text-white",
  neutral: "bg-white text-tui-front-primary border border-gray-300",
};

export function MobileToolbarButton({
  onClick,
  disabled,
  tone = "primary",
  children,
}: MobileToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-[10px] py-[7px] rounded-[8px] text-[11px] font-semibold transition-all shrink-0 cursor-pointer
        ${TONE_CLASSES[tone]}
        disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
