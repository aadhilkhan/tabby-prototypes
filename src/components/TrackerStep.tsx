import { motion, AnimatePresence } from "motion/react";
import { SmartphoneIcon } from "./icons";
import type { TrackerStepData } from "../types";

const indicatorColorMap = {
  gray: "#e9eff5",
  green: "#31cc7e",
  tertiary: "#b8c3d1",
};

const lineColorMap = {
  gray: "#e9eff5",
  green: "#31cc7e",
};

interface TrackerStepProps {
  step: TrackerStepData;
  onActionClick?: () => void;
}

export default function TrackerStep({ step, onActionClick }: TrackerStepProps) {
  const bgColor = indicatorColorMap[step.indicatorColor];
  const lineColor = lineColorMap[step.lineColor];

  return (
    <div className="flex items-start w-full">
      {/* Indicator column */}
      <div className="flex flex-col items-center gap-[4px] w-[32px] pr-[12px] pb-[2px] self-stretch shrink-0">
        {/* Indicator */}
        {step.indicatorType === "icon" ? (
          <motion.div
            className="w-[20px] h-[20px] rounded-full flex items-center justify-center overflow-hidden shrink-0"
            animate={{ backgroundColor: bgColor }}
            transition={{ duration: 0.4 }}
          >
            <SmartphoneIcon size={12} color="white" />
          </motion.div>
        ) : (
          <div className="flex items-center pt-[4px] pb-[2px] px-[2px] shrink-0">
            <motion.div
              className="w-[12px] h-[12px] rounded-full shrink-0"
              animate={{ backgroundColor: bgColor }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        {/* Connector line with fill-down animation */}
        {step.showLine && (
          <div className="flex-1 w-[2px] rounded-full min-h-[1px] bg-tui-line-disabled relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-tui-line-positive rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: step.lineColor === "green" ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-[8px] items-start flex-1 min-w-0 ${step.showLine ? "pb-[24px]" : ""}`}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-[6px] w-full">
          <div className="flex-1 min-w-0">
            <p
              className={`text-[16px] leading-[20px] tracking-[-0.16px] text-tui-front-primary ${
                step.titleBold ? "font-bold" : "font-medium"
              }`}
            >
              {step.title}
            </p>
          </div>
          {step.trail && (
            <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary whitespace-nowrap shrink-0">
              {step.trail}
            </span>
          )}
        </div>

        {/* Description — for step 2/3 (always visible) */}
        {step.description && step.id !== 1 && (
          <p className="text-[14px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
            {step.description}
          </p>
        )}

        {/* Animated description + action for step 1 */}
        <AnimatePresence>
          {step.id === 1 && step.description && (
            <motion.div
              key="step1-extra"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden w-full flex flex-col gap-[8px]"
            >
              <p className="text-[14px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
                {step.description}
              </p>
              {step.action && (
                <button
                  onClick={onActionClick}
                  className="text-[14px] font-medium leading-[20px] tracking-[-0.16px] text-[#6236FF] text-left"
                >
                  {step.action}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
