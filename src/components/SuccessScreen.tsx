import { CheckCircleIcon } from "./icons";

export default function SuccessScreen() {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Spacer matching nav bar height */}
      <div className="h-[64px] w-full" />

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-[32px] px-[16px] -mt-[80px]">
        {/* Icon + text */}
        <div className="flex flex-col items-center gap-[24px] px-[16px] w-full">
          <CheckCircleIcon size={80} />
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h1
              className="text-[30px] leading-[32px] tracking-[-0.3px] text-tui-front-primary"
              style={{
                fontFamily: '"Radial Saudi", "Inter Variable", sans-serif',
                fontWeight: 500,
              }}
            >
              Payment successful
            </h1>
            <p className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary">
              You're now being redirected to Adidas page
            </p>
          </div>
        </div>

        {/* Merchant card */}
        <div className="w-full px-0">
          <div className="bg-[#f2f5f7] rounded-[24px] py-[4px]">
            <div className="flex items-center gap-[16px] px-[16px] min-h-[64px]">
              {/* Merchant logo */}
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 bg-[#f2f5f7]">
                <img
                  src="/adidas-logo.png"
                  alt="Adidas"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Merchant info */}
              <div className="flex-1 flex items-center justify-between min-w-0 py-[12px]">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary">
                    Adidas
                  </span>
                  <span className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-tui-front-secondary">
                    Pay in 4
                  </span>
                </div>
                <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary whitespace-nowrap">
                  AED 100.00/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
