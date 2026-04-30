/**
 * Inline SVG icons for the Tabby app discover screen, sourced from the
 * Figma file `ekQkGLPpsC1RqPEO9mScsv`. The chevron, X, deal sunburst,
 * coupon icon, coupon stroke, and strikethrough vector all use the exact
 * Figma path data. Tab bar icons (Sparks/Catalogue/Wallet/UserFill) are
 * hand-traced to match the Figma master visuals.
 *
 * All icons take `size` (px) and `color` (CSS color) props - color is
 * applied via `currentColor` so parent text-color classes work.
 */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ── Tabby UI · Tab bar (24×24) — exact Figma path data ──────────── */

/** Sparks - "Discover" tab icon. Exact Figma path from node 2155:32761. */
export function Sparks24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9.0957 7.46094C9.32863 10.3726 11.6253 12.6936 14.5342 12.958L15.0215 13.002V13.998L14.5342 14.043C11.6253 14.3074 9.32863 16.6284 9.0957 19.54L8.99805 20.7705H8.00098L7.90234 19.54C7.66942 16.6285 5.37365 14.3075 2.46484 14.043L1.97656 13.998V13.002L2.46484 12.958C5.37366 12.6935 7.66942 10.3725 7.90234 7.46094L8.00098 6.23047H8.99805L9.0957 7.46094ZM19.2744 13.5928C19.3817 14.9944 20.4376 16.1119 21.7754 16.2393L22 16.2607V16.7393L21.7754 16.7607C20.4376 16.8881 19.3817 18.0056 19.2744 19.4072L19.2295 20H18.7705L18.7256 19.4072C18.6183 18.0056 17.5624 16.8881 16.2246 16.7607L16 16.7393V16.2607L16.2246 16.2393C17.5624 16.1119 18.6183 14.9944 18.7256 13.5928L18.7705 13H19.2295L19.2744 13.5928ZM16.3662 2.76172C16.5091 4.56398 17.9173 6.00037 19.7012 6.16406L20 6.19141V6.80859L19.7012 6.83594C17.9173 6.99963 16.5091 8.43602 16.3662 10.2383L16.3057 11H15.6943L15.6338 10.2383C15.4909 8.43602 14.0827 6.99963 12.2988 6.83594L12 6.80859V6.19141L12.2988 6.16406C14.0827 6.00037 15.4909 4.56398 15.6338 2.76172L15.6943 2H16.3057L16.3662 2.76172Z"
        fill={color}
      />
    </svg>
  );
}

/** Catalogue - "Shop" tab icon. Exact Figma path from node 2155:32773. */
export function Catalogue24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 4C18.3137 4 21 6.68629 21 10C21 11.2957 20.587 12.4938 19.8887 13.4746L23.293 16.8789L21.8789 18.2939L18.4746 14.8887C17.4938 15.587 16.2957 16 15 16C11.6863 16 9 13.3137 9 10C9 6.68629 11.6863 4 15 4ZM10 18H3V16H10V18ZM7 14H3V12H7V14ZM15 6C12.7909 6 11 7.79086 11 10C11 12.2091 12.7909 14 15 14C17.2091 14 19 12.2091 19 10C19 7.79086 17.2091 6 15 6ZM7 10H3V8H7V10Z"
        fill={color}
      />
    </svg>
  );
}

/** Wallet - "Money" tab icon. Exact Figma path from node 2155:32782. */
export function Wallet24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M13.7754 0.887695C15.7597 0.000666269 17.9997 1.45249 18 3.62598V4.99902H19C20.6568 4.99902 21.9998 6.34231 22 7.99902V17.999C22 19.6559 20.6569 20.999 19 20.999H5C3.34315 20.999 2 19.6559 2 17.999V9.39355C2 7.42149 3.15959 5.63291 4.95996 4.82812L13.7754 0.887695ZM18 6.99902V12.1055C18 14.0775 16.8404 15.8651 15.04 16.6699L9.83008 18.999H19C19.5523 18.999 20 18.5513 20 17.999V7.99902C19.9998 7.44688 19.5522 6.99902 19 6.99902H18ZM16 3.62598C15.9997 2.90166 15.2532 2.41823 14.5918 2.71387L5.77539 6.6543C4.69529 7.13722 4 8.2104 4 9.39355V17.8721C4 18.5967 4.7467 19.0809 5.4082 18.7852L14.2246 14.8438C15.3046 14.3608 16 13.2885 16 12.1055V3.62598ZM12.5 7.99902C13.3283 7.99902 13.9998 8.67074 14 9.49902C14 10.3274 13.3284 10.999 12.5 10.999C11.6716 10.999 11 10.3274 11 9.49902C11.0002 8.67074 11.6717 7.99902 12.5 7.99902Z"
        fill={color}
      />
    </svg>
  );
}

/** UserFill - "Profile" tab icon. Exact Figma path from node 2155:32797. */
export function UserFill24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C6.47724 22 2.00009 17.5228 2.00009 12C2.00009 6.47715 6.47724 2 12.0001 2ZM12.0001 16C9.76247 16 7.71611 16.5453 6.14169 17.4463C7.6024 19.0168 9.68611 20 12.0001 20C14.3138 20 16.3968 19.0165 17.8575 17.4463C16.2832 16.5456 14.2374 16 12.0001 16ZM12.0001 5C9.51481 5 7.50009 7.01472 7.50009 9.5C7.50009 11.9853 9.51481 14 12.0001 14C14.4854 14 16.5001 11.9853 16.5001 9.5C16.5001 7.01472 14.4854 5 12.0001 5Z"
        fill={color}
      />
    </svg>
  );
}

/* ── Tabby UI · Misc (24×24) ─────────────────────────────────────── */

/** Clock - on the merchant logo badge in TopNotif. */
export function Clock24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" fill="white" />
      <path d="M12 7v5l3 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Search - magnifying glass for the search bar placeholder. */
export function Search24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth="1.8" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Bag fill - on the "All stores" entry point card. */
export function BagFill24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 8h14l-1 11.5a2 2 0 0 1-2 1.8H8a2 2 0 0 1-2-1.8L5 8z"
        fill={color}
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 10V7.5a3 3 0 0 1 6 0V10"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Heart stroke - on the product snippet favourite button. */
export function HeartStroke24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 6.5-7 11-7 11z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Close (24×24) - same shape as Close16 scaled up. */
export function Close24({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        fill={color}
      />
    </svg>
  );
}

/** BagStroke (48×48) - exact Figma path data from Tabby's "🍒 Graphics" library. */
export function BagStroke48({ size = 48, color = "currentColor", className }: IconProps) {
  // Source viewBox is 34.605x37; scaling to a 48px square keeps the visual ratio
  // matched to Figma's `Icons / 48 x 48 / Shopping / BagStroke` master.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34.605 37"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <path
        d="M34.3235 23.2881C34.6639 28.0534 34.8335 30.436 34.011 32.2715C33.2881 33.8844 32.0517 35.2129 30.4944 36.0488C28.7222 37.0001 26.3334 37 21.5559 37H13.0491C8.27168 37 5.88274 37.0001 4.11059 36.0488C2.55332 35.2129 1.31682 33.8844 0.593989 32.2715C-0.228484 30.4361 -0.058886 28.0533 0.281489 23.2881L1.30297 9H33.303L34.3235 23.2881ZM3.27465 23.502C3.10083 25.9355 2.98546 27.5754 3.00122 28.8408C3.01659 30.0735 3.15958 30.6617 3.33129 31.0449C3.78305 32.0529 4.55628 32.8828 5.52954 33.4053C5.8995 33.6039 6.47579 33.7884 7.70434 33.8916C8.96545 33.9975 10.6093 34 13.0491 34H21.5559C23.9956 34 25.6395 33.9975 26.9006 33.8916C28.1292 33.7884 28.7055 33.6039 29.0754 33.4053C30.0487 32.8828 30.8219 32.053 31.2737 31.0449C31.4454 30.6618 31.5884 30.0736 31.6038 28.8408C31.6195 27.5754 31.5041 25.9355 31.3303 23.502L30.509 12H4.09594L3.27465 23.502ZM12.302 14C12.302 16.7613 14.5408 18.9998 17.302 19C20.0634 19 22.302 16.7614 22.302 14H25.302C25.302 18.4183 21.7203 22 17.302 22C12.8839 21.9998 9.302 18.4181 9.302 14H12.302ZM17.302 0C21.168 0 24.302 3.13401 24.302 7H21.302C21.302 4.79086 19.5111 3 17.302 3C15.0931 3.00025 13.302 4.79101 13.302 7H10.302C10.302 3.13416 13.4362 0.000245324 17.302 0Z"
        fill={color}
      />
    </svg>
  );
}

/** CheckS (24×24) - small checkmark for the legals checkbox. */
export function CheckS24({ size = 16, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12.5L10 17.5L19 7.5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** LoaderCircular - spinning arc next to the timer text. */
export function LoaderCircular({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`ivr-spin ${className ?? ""}`}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeOpacity="0.2" strokeWidth="2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Direct Figma exports (exact path data) ──────────────────────── */

/** ChevronForward - exact path from Figma node 1:487. */
export function ChevronForward({ size = 16, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 11.31) / 7.07}
      viewBox="0 0 7.07129 11.3135"
      fill="none"
      className={className}
    >
      <path
        d="M7.07129 1.41406L2.82812 5.65625L7.07129 9.89941L5.65723 11.3135L0 5.65723L1.41406 4.24219L5.65723 0L7.07129 1.41406Z"
        fill={color}
        transform="scale(-1, 1) translate(-7.07129, 0)"
      />
    </svg>
  );
}

/** Close (16×16) - exact path from Figma node 1:25504. */
export function Close16({ size = 10, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10.4297 10.4297" fill="none" className={className}>
      <path
        d="M10.4297 1.2373L6.45215 5.21484L10.4297 9.19238L9.19238 10.4297L5.21484 6.45215L1.2373 10.4297L0 9.19238L3.97754 5.21484L0 1.2373L1.2373 0L5.21484 3.97754L9.19238 0L10.4297 1.2373Z"
        fill={color}
      />
    </svg>
  );
}

/** Deal sunburst with % - exact path from Figma node 1:26349 (Shopping/Deal). */
export function DealIcon24({ size = 24, color = "#E81E40", className }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 22) / 20.92}
      viewBox="0 0 20.9229 22"
      fill="none"
      className={className}
    >
      <path
        d="M13.1807 2.63086L16.9277 2.10059L17.5811 5.82715L20.9229 7.60059L19.2617 11L20.9229 14.3994L17.5811 16.1729L16.9277 19.8994L13.1807 19.3691L10.4619 22L7.74219 19.3691L3.99609 19.8994L3.3418 16.1729L0 14.3994L1.66211 11L0 7.60059L3.3418 5.82715L3.99609 2.10059L7.74219 2.63086L10.4619 0L13.1807 2.63086ZM5.75488 14.293L7.16895 15.707L15.1689 7.70703L13.7549 6.29297L5.75488 14.293ZM13.4619 12.5C12.6336 12.5 11.962 13.1717 11.9619 14C11.962 14.8283 12.6336 15.5 13.4619 15.5C14.2901 15.4998 14.9618 14.8282 14.9619 14C14.9618 13.1718 14.2901 12.5002 13.4619 12.5ZM7.46191 6.5C6.63356 6.50004 5.96198 7.17165 5.96191 8C5.96198 8.82835 6.63356 9.49996 7.46191 9.5C8.29013 9.4998 8.96185 8.82825 8.96191 8C8.96185 7.17175 8.29013 6.5002 7.46191 6.5Z"
        fill={color}
      />
    </svg>
  );
}

/** Coupon - exact path from Figma node 623:170 (16×16 Shopping/Coupon). */
export function CouponIcon16({ size = 16, color = "#179958", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.1717 12.1716" fill="none" className={className}>
      <path
        d="M10.1717 0C11.2762 0.00011235 12.1717 0.8955 12.1717 2V5.17188C12.1716 5.7022 11.9608 6.21094 11.5858 6.58594L6.58579 11.5859C5.80482 12.3669 4.53872 12.3667 3.75766 11.5859L0.585786 8.41406C-0.195263 7.63302 -0.195261 6.36699 0.585786 5.58594L5.58579 0.585938C5.96084 0.210892 6.46945 2.22241e-05 6.99985 0H10.1717ZM1.64633 6.64648C1.45107 6.84175 1.45107 7.15826 1.64633 7.35352L4.81821 10.5254C5.01348 10.7204 5.33006 10.7205 5.52524 10.5254L6.40512 9.64453L2.52622 5.76562L1.64633 6.64648ZM6.99985 1.5C6.86727 1.50002 6.74008 1.55274 6.64633 1.64648L3.58676 4.70508L7.46567 8.58398L10.5252 5.52539C10.6189 5.43169 10.6716 5.30437 10.6717 5.17188V2C10.6717 1.72393 10.4478 1.50011 10.1717 1.5H6.99985ZM8.67172 2.5C9.2239 2.50013 9.67172 2.9478 9.67172 3.5C9.67172 4.0522 9.2239 4.49987 8.67172 4.5C8.11944 4.5 7.67172 4.05228 7.67172 3.5C7.67172 2.94772 8.11944 2.5 8.67172 2.5Z"
        fill={color}
      />
    </svg>
  );
}

/** Coupon perforated stroke - exact Figma path used between deal card sections. */
export function CouponStroke({ width = 185, height = 24, color = "white", className }: { width?: number; height?: number; color?: string; className?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 185 24" fill="none" preserveAspectRatio="none" className={className}>
      <path
        d="M0.00390625 0.00195312C0.0204685 3.35019 0.13196 5.22574 0.900391 6.70508C1.65939 8.16622 2.85135 9.35721 4.3125 10.1162C4.92201 10.4328 5.59871 10.6377 6.41797 10.7705C7.30053 10.9136 8 11.6333 8 12.5273C8 13.4214 7.30049 14.1408 6.41797 14.2842C5.59869 14.4173 4.92202 14.6229 4.3125 14.9395C2.85136 15.6985 1.6594 16.8895 0.900391 18.3506C0.217113 19.666 0.0525074 21.2946 0.0126953 23.9932C0.012646 23.9965 0.0101265 23.9998 0.00683594 24C0.00330452 24 0 23.9967 0 23.9932V0.00195312C2.82503e-06 0.000875799 0.000875746 2.59676e-06 0.00195312 0C0.00302333 0 0.00388917 0.000885412 0.00390625 0.00195312ZM185 0.00195312V23.9932C185 23.9967 184.997 24 184.993 24C184.99 23.9998 184.987 23.9965 184.987 23.9932C184.947 21.2946 184.783 19.666 184.1 18.3506C183.341 16.8895 182.149 15.6985 180.688 14.9395C180.078 14.6229 179.401 14.4173 178.582 14.2842C177.7 14.1408 177 13.4214 177 12.5273C177 11.6333 177.699 10.9136 178.582 10.7705C179.401 10.6377 180.078 10.4328 180.688 10.1162C182.149 9.35721 183.341 8.16622 184.1 6.70508C184.868 5.22574 184.98 3.35019 184.996 0.00195312C184.996 0.000885412 184.997 0 184.998 0C184.999 2.59676e-06 185 0.000875799 185 0.00195312ZM22.5 11C23.3284 11 24 11.6716 24 12.5C24 13.3284 23.3284 14 22.5 14H17.5C16.6716 14 16 13.3284 16 12.5C16 11.6716 16.6716 11 17.5 11H22.5ZM38.5 11C39.3284 11 40 11.6716 40 12.5C40 13.3284 39.3284 14 38.5 14H33.5C32.6716 14 32 13.3284 32 12.5C32 11.6716 32.6716 11 33.5 11H38.5ZM54.5 11C55.3284 11 56 11.6716 56 12.5C56 13.3284 55.3284 14 54.5 14H49.5C48.6716 14 48 13.3284 48 12.5C48 11.6716 48.6716 11 49.5 11H54.5ZM70.5 11C71.3284 11 72 11.6716 72 12.5C72 13.3284 71.3284 14 70.5 14H65.5C64.6716 14 64 13.3284 64 12.5C64 11.6716 64.6716 11 65.5 11H70.5ZM86.5 11C87.3284 11 88 11.6716 88 12.5C88 13.3284 87.3284 14 86.5 14H81.5C80.6716 14 80 13.3284 80 12.5C80 11.6716 80.6716 11 81.5 11H86.5ZM102.5 11C103.328 11 104 11.6716 104 12.5C104 13.3284 103.328 14 102.5 14H97.5C96.6716 14 96 13.3284 96 12.5C96 11.6716 96.6716 11 97.5 11H102.5ZM118.5 11C119.328 11 120 11.6716 120 12.5C120 13.3284 119.328 14 118.5 14H113.5C112.672 14 112 13.3284 112 12.5C112 11.6716 112.672 11 113.5 11H118.5ZM134.5 11C135.328 11 136 11.6716 136 12.5C136 13.3284 135.328 14 134.5 14H129.5C128.672 14 128 13.3284 128 12.5C128 11.6716 128.672 11 129.5 11H134.5ZM151.5 11C152.328 11 153 11.6716 153 12.5C153 13.3284 152.328 14 151.5 14H146.5C145.672 14 145 13.3284 145 12.5C145 11.6716 145.672 11 146.5 11H151.5ZM167.5 11C168.328 11 169 11.6716 169 12.5C169 13.3284 168.328 14 167.5 14H162.5C161.672 14 161 13.3284 161 12.5C161 11.6716 161.672 11 162.5 11H167.5Z"
        fill={color}
      />
    </svg>
  );
}

/** Strikethrough vector - exact path from Figma (drawn over old price). */
export function Strikethrough({ width = 50, color = "currentColor", className }: { width?: number; color?: string; className?: string }) {
  return (
    <svg
      width={width}
      height={(width * 10.48) / 50.83}
      viewBox="0 0 50.8324 10.4842"
      fill="none"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M0.500116 9.98411C6.74576 6.98913 25.4561 0.899332 50.3324 0.500001"
        stroke={color}
        strokeLinecap="round"
      />
    </svg>
  );
}
