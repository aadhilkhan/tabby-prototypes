import { ChevronDownIcon } from "./icons";

function UAEFlag() {
  return (
    <div className="w-[24px] h-[24px] rounded-full overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-[7px] bg-[#EF3340]" />
      <div className="absolute left-[7px] top-0 right-0 h-1/3 bg-[#009639]" />
      <div className="absolute left-[7px] top-1/3 right-0 h-1/3 bg-white" />
      <div className="absolute left-[7px] top-2/3 right-0 h-1/3 bg-black" />
    </div>
  );
}

export default function AccountScreen() {
  return (
    <div className="relative h-full bg-white flex flex-col">
      {/* Content */}
      <div className="flex flex-col pt-[24px] px-[16px]">
        {/* Heading + description */}
        <div className="flex flex-col gap-[8px] pb-[24px]">
          <h1
            className="text-[35px] leading-[36px] tracking-[-0.7px] text-tui-front-primary"
            style={{ fontFamily: '"Radial Saudi", "Inter Variable", sans-serif', fontWeight: 500 }}
          >
            Log in or sign up for Tabby
          </h1>
          <p className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-secondary">
            Enter your phone number to get the verification code
          </p>
        </div>

        {/* Phone input row */}
        <div className="flex gap-[8px] items-center">
          {/* Country code selector */}
          <div className="flex items-center gap-[8px] h-[56px] w-[132px] border border-[#7f8b99] rounded-[16px] pl-[16px] pr-[12px] shrink-0">
            <UAEFlag />
            <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-tui-front-primary flex-1">
              +971
            </span>
            <ChevronDownIcon size={24} color="#1d2329" />
          </div>

          {/* Phone number field (focused state) */}
          <div className="flex items-center flex-1 h-[56px] border-[1.5px] border-[#1d2329] rounded-[16px] pl-[16px] pr-[12px]">
            <div className="flex flex-col gap-[2px] flex-1 justify-center overflow-hidden">
              <span className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-tui-front-secondary">
                Phone number
              </span>
              <div className="flex items-center gap-px">
                <div className="w-[2px] h-[18px] bg-tui-front-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col px-[16px] pt-[16px]">
        <button className="w-full h-[64px] bg-[#1d2329] rounded-[20px] flex items-center justify-center">
          <span className="text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-white">
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}
