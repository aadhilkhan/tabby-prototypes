import { playTapSound } from "../../sounds";
import TabbyAppIcon from "../TabbyAppIcon";

interface HomeScreenProps {
  onTabbyTap?: () => void;
}

/**
 * iOS home-screen with Tabby brand wallpaper. Most apps in the dock are dimmed
 * so the Tabby app stands out as the next tap target. Renders inside `PhoneFrame`
 * with `hideSafariBar` + `transparentBg` so the wallpaper bleeds to the edges.
 *
 * Mirrors Figma node 2150:22553 (In-app Checkout Flow).
 */
export default function HomeScreen({ onTabbyTap }: HomeScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Wallpaper - full bleed */}
      <img
        src="/tabby-wallpaper.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle bottom darkening so the dock glass has something to refract */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-b from-transparent to-black/15 pointer-events-none" />

      {/* Dock - 3 dimmed apps + Tabby */}
      <div className="absolute bottom-[28px] left-[20px] right-[20px]">
        <div className="relative flex items-center justify-between gap-[14px] px-[18px] py-[18px] rounded-[34px] backdrop-blur-xl bg-white/15 border border-white/15">
          {/* Dimmed placeholder apps */}
          <DimmedAppIcon />
          <DimmedAppIcon />
          <DimmedAppIcon />

          {/* Tabby app icon - tappable */}
          <button
            type="button"
            aria-label="Open Tabby"
            onClick={() => {
              playTapSound();
              onTabbyTap?.();
            }}
            className="relative size-[60px] cursor-pointer transition-transform active:scale-95 shadow-md rounded-[14px] overflow-hidden"
          >
            <TabbyAppIcon size={60} className="absolute inset-0 w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DimmedAppIcon() {
  return <div className="size-[60px] rounded-[14px] bg-white/20 backdrop-blur-md" />;
}
