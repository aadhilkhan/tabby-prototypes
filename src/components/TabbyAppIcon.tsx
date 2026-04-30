interface TabbyAppIconProps {
  /** Rendered size in px (icon is square). */
  size?: number;
  /** Extra class names — typically used to round corners (e.g. `rounded-[14px]`). */
  className?: string;
}

/**
 * The classic Tabby app icon — bright Tabby Mint Green (#3BFFC8) square with
 * the dark Tabby Black (#131C26) "t" mark in the middle. Path data lifted
 * directly from Figma node 2166:40158 (Team Icons / Tabby).
 *
 * The mark is intentionally square — wrap with `rounded-*` for iOS app-icon
 * placement, or leave square for control-panel badges.
 */
export default function TabbyAppIcon({ size = 100, className }: TabbyAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Tabby"
    >
      {/* Mint Green background */}
      <rect width="100" height="100" fill="#3BFFC8" />
      {/* "t" mark — centred at inset 21.38% top / 34.38% sides per Figma */}
      <g transform="translate(34.38, 21.38)">
        <path
          d="M18.3457 3.28906C18.3457 8.63446 14.4506 14.0065 7.66113 15.3223L9.86816 15.0322L31.25 11.6973V19.7168L17.6748 21.834V24.4766H17.6914V25.5459L31.25 23.4316V31.0928L17.6748 33.21V41.8057C17.6748 41.9438 17.6914 42.0725 17.6914 42.2041V42.4248C17.9317 45.681 20.2247 46.3389 24.2705 46.3389C26.1438 46.3447 27.9934 45.9177 29.6748 45.0918L29.8193 45.0127V55.0391L29.7637 55.0654C26.9126 56.2898 23.8431 56.9261 20.7402 56.9346C12.0728 56.9345 6.78691 52.1678 6.41504 44.1484V34.9668L0 35.9678V28.3066L6.41504 27.3057V23.5908L0 24.5918V16.5723L6.60059 15.542L7.0498 15.4141V0H18.3457V3.28906Z"
          fill="#131C26"
        />
      </g>
    </svg>
  );
}
