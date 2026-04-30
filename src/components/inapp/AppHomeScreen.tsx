import {
  Sparks24,
  Catalogue24,
  Wallet24,
  UserFill24,
  Clock24,
  Search24,
  BagFill24,
  HeartStroke24,
  ChevronForward,
  Close16,
  DealIcon24,
  CouponIcon16,
  CouponStroke,
  Strikethrough,
} from "./InAppFigmaIcons";

/**
 * Tabby app "Discover" home screen. Pixel-matches Figma node 2153:22738 -
 * a long scrollable page with these sections (top to bottom):
 *   1. Top notif (sticky-feeling alert with order timer)
 *   2. Search bar
 *   3. Entry points (All stores / Deals)
 *   4. Tabs (Women / Men / Kids) + Categories rail
 *   5. Smart banner (Tabby+ upgrade)
 *   6. Items collection (2x2 product grid) -- repeats below
 *   7. Merchant carousel
 *   8. Deals
 *   9. Banner
 *   10. Sticky bottom TabBar (Discover / Shop / Money / Profile)
 *
 * Renders inside `PhoneFrame` with `hideSafariBar` + `transparentBg` +
 * `statusBarTheme="dark"` (light grey notification background).
 */
interface AppHomeScreenProps {
  onTopNotifClick?: () => void;
  /** Shared countdown so the top notif + confirm sheet stay in sync. */
  timerSeconds: number;
}

export default function AppHomeScreen({ onTopNotifClick, timerSeconds }: AppHomeScreenProps) {
  return (
    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Scrollable content area - sits above the sticky tab bar (86px tall) */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[86px]">
        <TopNotif onClick={onTopNotifClick} timerSeconds={timerSeconds} />
        <SearchBarRow />
        <EntryPoints />
        <CategoriesSection />
        <SmartBanner />
        <ProductGrid />
        <MerchantCarousel />
        <ProductGrid />
        <DealsSection />
        <ProductGrid />
        <PromoBanner />
        <ProductGrid />
      </div>

      {/* Sticky bottom tab bar */}
      <TabBar />
    </div>
  );
}

/* ── 1. Top notif ────────────────────────────────────────────────── */

function formatTimer(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function TopNotif({ onClick, timerSeconds }: { onClick?: () => void; timerSeconds: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex flex-col gap-[10px] pt-[71px] pb-[24px] px-[16px] text-left cursor-pointer transition-all active:brightness-95"
      style={{ backgroundColor: "#d8e0eb" }}
    >
      <div className="flex gap-[8px] items-start">
        {/* Adidas logo + clock badge */}
        <div className="relative h-[44px] pr-[8px]">
          <div
            className="size-[40px] rounded-full overflow-hidden"
            style={{ backgroundColor: "#f2f5f7" }}
          >
            <img src="/adidas-logo.png" alt="Adidas" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute top-[-6px] right-[2px] flex items-center justify-center p-[2px] rounded-full z-[3]"
            style={{ backgroundColor: "#d8e0eb" }}
          >
            <Clock24 size={20} />
          </div>
        </div>
        {/* Body */}
        <div className="flex-1 flex flex-col gap-[2px] h-[44px] justify-center min-w-0">
          <p className="text-[16px] leading-[20px] font-bold tracking-[-0.16px] text-tui-front-primary truncate">
            Complete purchase for AED 400
          </p>
          <div className="flex items-center gap-[4px]">
            <span className="text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-tui-front-primary">Adidas</span>
            <span className="text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-tui-front-primary">·</span>
            <span className="text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-tui-front-primary tabular-nums">
              {formatTimer(timerSeconds)}
            </span>
          </div>
        </div>
        <div className="h-[44px] flex items-center w-[24px] justify-center">
          <ChevronForward size={10} color="#7F8B99" />
        </div>
      </div>
    </button>
  );
}

/* ── 2. Search bar ───────────────────────────────────────────────── */

function SearchBarRow() {
  return (
    <div className="px-[16px] pt-[24px] pb-[24px]">
      <div
        className="flex items-center gap-[8px] h-[48px] px-[16px] rounded-[16px]"
        style={{ backgroundColor: "#f2f5f7" }}
      >
        <Search24 size={20} color="#8698ad" />
        <span className="text-[16px] tracking-[-0.16px] text-tui-front-secondary font-medium">
          Stores or products
        </span>
      </div>
    </div>
  );
}

/* ── 3. Entry points ─────────────────────────────────────────────── */

function EntryPoints() {
  return (
    <div className="px-[16px] pb-[24px] flex gap-[8px]">
      <EntryPointCard
        title="All stores"
        subtitle="Pay in 4 shopping"
        icon={<BagFill24 size={24} color="#00b365" />}
      />
      <EntryPointCard
        title="Deals"
        subtitle={(
          <>
            Discounts<br />up to 30%
          </>
        )}
        icon={<DealIcon24 size={22} />}
      />
    </div>
  );
}

interface EntryPointCardProps {
  title: string;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
}

function EntryPointCard({ title, subtitle, icon }: EntryPointCardProps) {
  // Matches Figma: bg #f2f5f7, p-18, rounded-24, gap-15. Icon = 40px white circle with shadow.
  return (
    <div
      className="flex-1 rounded-[24px] p-[18px] flex flex-col gap-[15px]"
      style={{ backgroundColor: "#f2f5f7" }}
    >
      <p className="text-[17px] leading-[22px] font-bold tracking-[-0.34px] text-tui-front-primary">{title}</p>
      <div className="flex items-center gap-[10px]">
        <div
          className="size-[40px] rounded-full bg-white flex items-center justify-center shrink-0"
          style={{ filter: "drop-shadow(0 4px 6px rgba(24,36,48,0.06))" }}
        >
          {icon}
        </div>
        <p className="flex-1 text-[14px] leading-[18px] font-medium tracking-[-0.14px] text-tui-front-secondary">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ── 4. Categories ───────────────────────────────────────────────── */

function CategoriesSection() {
  return (
    <div className="pb-[24px]">
      {/* Tabs */}
      <div className="px-[16px] flex items-end border-b border-[#e9eff5] mb-[16px]">
        <div className="flex gap-[24px] pb-[10px]">
          <Tab label="WOMEN" active />
          <Tab label="MEN" />
          <Tab label="KIDS" />
        </div>
      </div>

      {/* Categories rail - horizontal scroll, exact per-category placement from Figma */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-[8px] px-[16px] w-max">
          <CategoryCard label="Clothing" image="/inapp/cat-clothing.png" imgStyle={{ left: 14, top: 14, width: 70, height: 65 }} />
          <CategoryCard label="Shoes" image="/inapp/cat-shoes.png" imgStyle={{ left: -12, top: 2, width: 124, height: 93 }} />
          <CategoryCard label="Bags" image="/inapp/cat-bags.png" imgStyle={{ left: 14, top: 12, width: 66, height: 60 }} />
          <CategoryCard label="Accessories" image="/inapp/cat-accessories.png" imgStyle={{ left: 15, top: 13, width: 71, height: 36 }} />
          <CategoryCard label="Clothing" image="/inapp/cat-clothing.png" imgStyle={{ left: 14, top: 14, width: 70, height: 65 }} />
          <CategoryCard label="Bags" image="/inapp/cat-bags.png" imgStyle={{ left: 14, top: 12, width: 66, height: 60 }} />
        </div>
      </div>
    </div>
  );
}

interface TabProps {
  label: string;
  active?: boolean;
}

function Tab({ label, active }: TabProps) {
  return (
    <div className="relative">
      <p
        className={`text-[13px] font-bold tracking-[1px] ${
          active ? "text-tui-front-primary" : "text-tui-front-secondary"
        }`}
      >
        {label}
      </p>
      {active && (
        <div
          className="absolute -bottom-[10px] left-0 right-0 h-[2px]"
          style={{ backgroundColor: "#1d2329" }}
        />
      )}
    </div>
  );
}

interface CategoryCardProps {
  label: string;
  image: string;
  imgStyle?: React.CSSProperties;
}

function CategoryCard({ label, image, imgStyle }: CategoryCardProps) {
  // Matches Figma: 121x120 rounded-22, tinted backdrop, product photo with
  // per-category positioning (each category has its own placement in Figma).
  return (
    <div className="w-[121px] h-[120px] rounded-[22px] relative overflow-hidden shrink-0 bg-white">
      <div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: "rgba(54,106,146,0.07)" }} />
      <img
        src={image}
        alt=""
        className="absolute object-contain object-bottom"
        style={{ left: 14, top: 12, width: 93, height: 76, ...imgStyle }}
      />
      <p
        className="absolute text-[14px] leading-[16px] font-bold tracking-[-0.14px] text-tui-front-primary"
        style={{ left: 16, top: 88 }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── 5. Smart banner ─────────────────────────────────────────────── */

function SmartBanner() {
  // Matches Figma node 2153:22802 — backdrop-blur tint, 92x90 image area on left,
  // body in middle, close X in top-right.
  return (
    <div className="px-[16px] pb-[24px]">
      <div
        className="relative rounded-[24px] flex items-stretch overflow-hidden"
        style={{
          backgroundColor: "rgba(54,106,146,0.07)",
          backdropFilter: "blur(35px)",
        }}
      >
        {/* Orb image (Tabby+ branded gradient) */}
        <div className="w-[92px] h-[90px] relative shrink-0">
          <img
            src="/inapp/tabby-plus-orb-b.png"
            alt=""
            className="absolute"
            style={{ left: 8, top: 8, width: 75, height: 75 }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-[8px] py-[20px] pr-[8px] min-w-0">
          <p className="text-[17px] leading-[22px] font-medium tracking-[-0.34px] text-tui-front-primary">
            Get 5% cashback and split in 4 anywhere for free
          </p>
          <p className="text-[17px] leading-[22px] font-bold tracking-[-0.34px] text-tui-front-primary">
            Upgrade to Tabby+
          </p>
        </div>

        {/* Close X */}
        <div className="pl-[14px] pr-[12px] pt-[12px] shrink-0">
          <button
            type="button"
            aria-label="Dismiss"
            className="size-[28px] rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              filter: "drop-shadow(0 8px 8px rgba(24,36,48,0.08))",
            }}
          >
            <Close16 size={10} color="#8698AD" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 6/7/9. Product grid (2x2) ───────────────────────────────────── */

const PRODUCT_IMAGES = [
  "/inapp/product-image-1.png",
  "/inapp/product-image-2.png",
  "/inapp/product-image-3.png",
  "/inapp/product-image-1.png",
];

const PRODUCT_DATA = [
  { name: "Crystal knot sandals", price: "AED 99,000", oldPrice: "99,000", discount: "−50%" },
  { name: "Long sleeve dress", price: "AED 1,899", oldPrice: "2,499", discount: "−24%" },
  { name: "Mini shoulder bag", price: "AED 749", oldPrice: "999", discount: "−25%" },
  { name: "Pleated midi skirt", price: "AED 549", oldPrice: "699", discount: "−21%" },
];

function ProductGrid({ offset = 0 }: { offset?: number }) {
  return (
    <div className="px-[16px] pt-[8px] pb-[32px] grid grid-cols-2 gap-[8px]">
      {Array.from({ length: 4 }).map((_, i) => {
        const idx = (i + offset) % PRODUCT_DATA.length;
        return <ProductSnippet key={i} image={PRODUCT_IMAGES[idx]} {...PRODUCT_DATA[idx]} />;
      })}
    </div>
  );
}

interface ProductSnippetProps {
  image: string;
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
}

function ProductSnippet({ image, name, price, oldPrice, discount }: ProductSnippetProps) {
  // Matches Figma node 2153:22806 - 220px image area + meta row.
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="relative h-[220px] rounded-[24px] overflow-hidden bg-[#f2f5f7]">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Subtle dark overlay (Figma 5% opacity) */}
        <div className="absolute inset-0 bg-black/5" />
        {/* Heart favourite button */}
        <button
          type="button"
          aria-label="Add to favourites"
          className="absolute right-[8px] top-[176px] size-[36px] rounded-full backdrop-blur-md flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <HeartStroke24 size={20} color="#1d2329" />
        </button>
      </div>
      <div className="flex flex-col gap-[2px] pl-[4px]">
        <p className="text-[14px] leading-[18px] font-medium tracking-[-0.14px] text-tui-front-secondary truncate">
          {name}
        </p>
        <div className="flex items-center gap-[4px] flex-wrap">
          <span className="text-[14px] leading-[18px] font-medium tracking-[-0.14px] text-tui-front-primary">
            {price}
          </span>
          <span className="relative text-[14px] leading-[18px] font-medium tracking-[-0.14px] text-tui-front-secondary">
            {oldPrice}
            <Strikethrough
              color="#8698ad"
              className="absolute -left-[1px] top-[8px] w-full pointer-events-none"
            />
          </span>
          <span className="text-[14px] leading-[18px] font-medium tracking-[-0.14px]" style={{ color: "#e81e40" }}>
            {discount}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 7. Merchant carousel ────────────────────────────────────────── */

function MerchantCarousel() {
  return (
    <div className="px-[16px] pb-[32px] pt-[8px]">
      <h2 className="font-heading text-[24px] leading-[28px] tracking-[-0.36px] font-semibold text-tui-front-primary mb-[16px]">
        Featured stores
      </h2>
      <div className="flex flex-col gap-[16px]">
        <MerchantRow names={["Adidas", "Nike", "H&M"]} />
        <MerchantRow names={["Zara", "Uniqlo", "Apple"]} />
      </div>
    </div>
  );
}

function MerchantRow({ names }: { names: string[] }) {
  return (
    <div className="flex gap-[8px] overflow-x-auto no-scrollbar">
      {names.map((n, i) => (
        <div
          key={i}
          className="shrink-0 w-[120px] h-[120px] rounded-[16px] flex items-center justify-center font-heading text-[18px] font-semibold text-tui-front-primary"
          style={{ backgroundColor: "#f2f5f7" }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}

/* ── 8. Deals ────────────────────────────────────────────────────── */

const DEAL_DATA = [
  { merchant: "IKEA", logoBg: "#0057a4", coupon: "TRYALM", percent: "65%" },
  { merchant: "Adidas", logoBg: "#000", coupon: "BLKFRI", percent: "30%" },
  { merchant: "Nike", logoBg: "#fff", coupon: "JUSTDO", percent: "25%" },
  { merchant: "Zara", logoBg: "#000", coupon: "LATEST", percent: "40%" },
  { merchant: "H&M", logoBg: "#e2231a", coupon: "SUMMER", percent: "50%" },
  { merchant: "Uniqlo", logoBg: "#bf0000", coupon: "BASICS", percent: "20%" },
];

function DealsSection() {
  return (
    <div className="pb-[32px]">
      <h2 className="font-heading text-[24px] leading-[28px] tracking-[-0.36px] font-semibold text-tui-front-primary mb-[16px] px-[16px]">
        Deals
      </h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-[8px] px-[16px] w-max">
          {DEAL_DATA.map((d, i) => (
            <DealCard key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DealCardProps {
  merchant: string;
  logoBg: string;
  coupon: string;
  percent: string;
}

function DealCard({ merchant, logoBg, coupon, percent }: DealCardProps) {
  // Matches Figma node 2153:22828 - 185x185 with merchant logo, coupon code,
  // and big percent number, with a perforated coupon stroke separator.
  return (
    <div
      className="relative w-[185px] h-[185px] rounded-[32px] overflow-hidden shrink-0"
      style={{ backgroundColor: "#f2f5f7" }}
    >
      {/* Store row */}
      <div className="absolute top-0 left-0 right-0 h-[80px] flex items-center gap-[8px] px-[20px]">
        <div
          className="size-[40px] rounded-full overflow-hidden flex items-center justify-center shrink-0"
          style={{ backgroundColor: logoBg }}
        >
          {merchant === "IKEA" ? (
            <img src="/inapp/deal-ikea.png" alt="" className="w-[32px] h-[32px] object-contain" />
          ) : (
            <span className="text-white text-[10px] font-bold tracking-tight">{merchant.slice(0, 4).toUpperCase()}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-[2px] min-w-0">
          <p className="text-[12px] leading-[16px] font-bold tracking-[-0.12px] text-tui-front-primary truncate">
            {merchant}
          </p>
          <div className="flex items-center gap-[2px]">
            <span className="text-[12px] leading-[16px] font-bold tracking-[-0.12px]" style={{ color: "#179958" }}>
              {coupon}
            </span>
            <CouponIcon16 size={14} color="#179958" />
          </div>
        </div>
      </div>

      {/* Coupon perforated stroke - exact Figma path */}
      <div className="absolute top-[65px] left-0 right-0 h-[24px]">
        <CouponStroke width={185} height={24} color="white" className="w-full h-full" />
      </div>

      {/* "Up to" + percent */}
      <p
        className="absolute left-[22px] top-[106px] text-[12px] leading-[16px] font-bold tracking-[-0.12px] text-tui-front-primary"
      >
        Up to
      </p>
      <p
        className="absolute font-heading left-[20px] top-[122px] font-bold leading-[48px] text-[48px] tracking-[-0.96px] text-tui-front-primary"
      >
        {percent}
      </p>
    </div>
  );
}

/* ── 9. Promo banner ─────────────────────────────────────────────── */

function PromoBanner() {
  // Matches Figma node 2153:22843 - rounded-24 background image, gradient
  // overlay (dark to top), merchant chip + caption + "Shop now" button.
  return (
    <div className="px-[16px] pb-[32px] pt-[8px]">
      <div
        className="relative rounded-[24px] h-[320px] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#f2f5f7" }}
      >
        {/* Background photo (the Figma export uses a layered image) */}
        <img
          src="/inapp/banner-bg-1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay (multiply blend, dark at top per Figma) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.05) 14%, rgba(0,0,0,0.26) 35%, rgba(0,0,0,0.6) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Merchant chip (LC Waikiki) - sits above the CTA section */}
        <div className="absolute left-0 right-0 bottom-[64px] flex items-center px-[8px]">
          <div className="flex items-center gap-[2px] pr-[8px]">
            <div className="flex items-center justify-center px-[8px] size-[64px] shrink-0">
              <div className="size-[40px] rounded-full bg-white border border-white overflow-hidden flex items-center justify-center">
                <img src="/inapp/merchant-lcwaikiki.png" alt="" className="w-[34px] h-[34px] object-contain" />
              </div>
            </div>
            <p className="text-[15px] leading-[18px] font-bold tracking-[-0.15px] text-white">LC Waikiki</p>
          </div>
        </div>

        {/* Bottom CTA section: caption + Shop now button */}
        <div className="absolute bottom-0 left-0 right-0 flex items-stretch px-[16px] py-[12px]">
          <p className="flex-1 self-center text-[15px] leading-[20px] font-medium tracking-[-0.15px] text-tui-front-primary line-clamp-1">
            Save miles with our special offer and convert them
          </p>
          <button
            type="button"
            className="ml-[8px] h-[32px] px-[12px] rounded-[10px] bg-tui-front-primary text-white text-[14px] leading-[18px] font-bold tracking-[-0.14px]"
          >
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 10. Sticky bottom TabBar ────────────────────────────────────── */

function TabBar() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/85 border-t border-[#e9eff5]"
      style={{ height: 86 }}
    >
      <div className="flex items-start justify-center px-[12px]">
        <TabBarItem icon={<Sparks24 size={24} />} label="Discover" active />
        <TabBarItem icon={<Catalogue24 size={24} />} label="Shop" />
        <TabBarItem icon={<Wallet24 size={24} />} label="Money" />
        <TabBarItem icon={<UserFill24 size={24} />} label="Profile" />
      </div>
      {/* Home indicator is drawn by PhoneFrame in hideSafariBar mode - the
          TabBar just reserves its visual height (86 px). */}
    </div>
  );
}

interface TabBarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function TabBarItem({ icon, label, active }: TabBarItemProps) {
  const color = active ? "text-tui-front-primary" : "text-tui-front-secondary";
  const fontWeight = active ? "font-bold" : "font-medium";
  return (
    <div className={`flex-1 flex flex-col items-center justify-center gap-[2px] pt-[10px] px-[2px] ${color}`}>
      <div className="size-[24px] flex items-center justify-center">{icon}</div>
      <p className={`text-[12px] leading-[16px] tracking-[-0.13px] ${fontWeight}`}>{label}</p>
    </div>
  );
}
