import { CloseIcon } from "./icons";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between px-[16px] py-[10px] w-full">
      <button className="w-[40px] h-[40px] flex items-center justify-center">
        <CloseIcon size={24} color="#1d2329" />
      </button>
      <div className="flex flex-col items-center gap-[0px]">
        <span className="text-[16px] font-semibold text-tui-front-primary tracking-[-0.16px] leading-[20px]">
          Adidas
        </span>
        <div className="flex items-center gap-[4px]">
          <span className="text-[13px] font-medium text-tui-front-secondary tracking-[-0.13px] leading-[16px]">
            Pay with
          </span>
          <img src="/wordmark.png" alt="tabby" className="h-[14px] object-contain" />
        </div>
      </div>
      <button className="w-[40px] h-[40px] flex items-center justify-center">
        <span className="text-[14px] font-medium text-[#5d21de]">
          العربية
        </span>
      </button>
    </div>
  );
}
