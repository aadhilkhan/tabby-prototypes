/**
 * Tabby app launch splash. Pixel-matches Figma node 2152:22704 - solid Tabby
 * green (#00ff95) with the centered tabby wordmark, exported from Figma as
 * `assets/tabby-splash.png`. Renders inside `PhoneFrame` with `hideSafariBar`
 * + `transparentBg` and `statusBarTheme="dark"` (black icons, since the bg is
 * a light green).
 */
export default function SplashScreen() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#00ff95" }}>
      <img
        src="/tabby-splash.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
