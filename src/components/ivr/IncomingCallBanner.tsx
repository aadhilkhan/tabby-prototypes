/**
 * iOS-style "Tabby — incoming call" notification banner.
 * Renders `assets/incoming-call.png` (served from `/incoming-call.png`).
 * Drop a PNG into `assets/` with that name to replace the placeholder.
 */
export default function IncomingCallBanner() {
  return (
    <div className="w-full flex justify-center">
      <img
        src="/incoming-call.png"
        alt="Tabby incoming call"
        className="w-full h-auto block"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}
