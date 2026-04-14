interface Tab {
  href: string;
  label: string;
  color: string;
}

const TABS: Tab[] = [
  { href: "/", label: "Station screen", color: "var(--color-tui-line-positive)" },
  { href: "/ivr", label: "IVR flow", color: "var(--color-tui-front-accent)" },
];

interface PrototypeTabsProps {
  active: "station" | "ivr";
}

export default function PrototypeTabs({ active }: PrototypeTabsProps) {
  const activeHref = active === "station" ? "/" : "/ivr";
  return (
    <div
      className="w-full flex items-end justify-center px-[12px] pt-[8px] shrink-0"
      style={{ height: 44, background: "#f0f0f0" }}
    >
      <div className="flex items-end gap-[2px]">
        {TABS.map((tab) => {
          const isActive = tab.href === activeHref;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-[8px] px-[16px] rounded-t-[10px] text-[13px] font-semibold transition-all
                ${isActive
                  ? "bg-white text-tui-front-primary cursor-default"
                  : "bg-[#e0e0e0] text-tui-front-secondary hover:bg-[#e8e8e8] hover:text-tui-front-primary cursor-pointer"}`}
              style={{
                height: 34,
                minWidth: 140,
                boxShadow: isActive ? "0 -1px 3px rgba(0,0,0,0.04)" : "none",
                letterSpacing: "-0.1px",
              }}
            >
              <span
                className="inline-block rounded-full shrink-0"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: isActive ? tab.color : "#b8c3d1",
                }}
              />
              {tab.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
