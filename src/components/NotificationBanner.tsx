import { motion } from "motion/react";

export default function NotificationBanner() {
  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -120, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute left-1/2 -translate-x-1/2 top-[60px] w-[382px] rounded-[23px] px-[14px] py-[14px] pr-[18px] z-50"
      style={{ backgroundColor: "rgba(80, 79, 79, 0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-[10px] w-full">
        <img src="/TBadge.png" alt="Tabby" className="w-[38px] h-[38px] rounded-[10px] shrink-0" />
        <div className="flex flex-col gap-[2px] flex-1 min-w-0 overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <p className="text-[16px] font-semibold leading-[20px] text-white">
              Tap to complete your purchase
            </p>
            <span className="text-[13px] font-normal leading-[18px] tracking-[-0.078px] text-white/50 whitespace-nowrap ml-[4px]">
              2m ago
            </span>
          </div>
          <div className="text-[13px] font-normal leading-[18px] tracking-[-0.078px] text-white">
            <p className="mb-0">Confirm your purchase at Adidas for</p>
            <p>AED 400.00</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
