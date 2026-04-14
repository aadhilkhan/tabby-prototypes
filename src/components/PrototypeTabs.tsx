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
      className="w-full flex items-end px-[8px] pt-[6px] shrink-0"
      style={{ height: 40, background: "#ffffff" }}
    >
      <div className="flex items-end gap-[2px]">
        {TABS.map((tab) => {
          const isActive = tab.href === activeHref;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-[8px] px-[14px] text-[13px] font-medium transition-all
                ${isActive
                  ? "text-tui-front-primary cursor-default"
                  : "text-tui-front-secondary hover:text-tui-front-primary cursor-pointer"}`}
              style={{
                height: 32,
                maxWidth: 200,
                letterSpacing: "-0.1px",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                position: "relative",
                marginBottom: -1,
                backgroundColor: isActive ? "#f0f0f0" : "#ffffff",
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
              <span className="truncate">{tab.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
