import { BaseThemeProvider } from "@tabby.ai/tabby-ui/core/BaseThemeProvider";
import { getKitThemeOptions } from "@tabby.ai/tabby-ui/theme";
import "@tabby.ai/tabby-ui/theme/fonts.css";
import "./tokens.css";
import PlanSelectionPattern from "./patterns/PlanSelectionPattern";
import styles from "./SelectPlanScreen.module.css";

/**
 * Bridge that lets the in-app checkout flow render the plan-selection screen
 * exactly as it ships in `aadhilkhan/checkout-tabbyui`. We mount a minimal
 * tabby-ui theme provider here (rather than at the app root) so the rest of
 * the prototypes - station screen, IVR, splash, PIN, etc. - keep their own
 * styling untouched. Default direction is LTR; flip via `dir="rtl"` on a
 * parent if/when an Arabic variant of this screen is added.
 */
export default function SelectPlanScreen() {
  return (
    <div className={`${styles.host} no-scrollbar`}>
      <BaseThemeProvider themeOptions={getKitThemeOptions("ltr")} dir="ltr">
        <PlanSelectionPattern />
      </BaseThemeProvider>
    </div>
  );
}
