import { useState } from 'react';
import { Text } from '@tabby.ai/tabby-ui/O25/Text';
import { Button } from '@tabby.ai/tabby-ui/O25/Button';
import { Chip } from '@tabby.ai/tabby-ui/O25/Chip';
import {
  Supercell,
  SupercellLead,
  SupercellBase,
  SupercellBaseCell,
  SupercellControl,
} from '@tabby.ai/tabby-ui/O25/Supercell';
import ChevronForward24 from '@tabby.ai/tabby-ui/icons/core/ChevronForward24';
import Split24 from '@tabby.ai/tabby-ui/icons/core/Split24';
import NavBar from '../../components/NavBar';
import styles from './PlanSelectionPattern.module.css';

/**
 * Plan selection screen.
 *
 * Canonical Tabby pattern for "pick your BNPL plan". Production uses a
 * segment-pill card, not a list of radio cards. The user picks the number of
 * payments via a horizontal Chip row, and the monthly breakdown updates live.
 *
 * All literal amounts and schedule dates in this file are **demo data**.
 * Replace before handoff — nothing here is a real user value.
 *
 * Structure:
 *   CheckoutHeader           — merchant + "Pay with tabby"
 *   centered amount block    — small "Choose how to pay" label + big h1
 *                             numeric total (strike currency symbol + amount)
 *   plan card                — labelled Chip row for split count, a divider,
 *                             and a drill-in row with the monthly figure.
 *   optional "Other options" — second card with Chip pills like
 *                             "Pay Next Month | Pay in full". Include when
 *                             the user has multiple product families available.
 *   sticky footer            — primary Continue CTA (always enabled here,
 *                             because a plan is pre-selected).
 *
 * Key decisions reflected here:
 *   - One card per plan family, NOT one card per split option. Segment pills
 *     are the interaction, not the container.
 *   - Selected chip uses `isSelected` + `tone="primary"` so it reads solid-
 *     dark against the card's white surface.
 *   - The monthly breakdown row has a left icon, amount + sub-line, and a
 *     chevron at the end — this is a drill-in into the per-month schedule.
 *   - Amount above the card is h1Numeric, not a body line. The total is the
 *     anchor the user is deciding against.
 */

interface PlanOption {
  id: string;
  label: string;
  monthly: string;
  subline: string;
  subTone?: 'neutral' | 'positive';
}

/*
 * Reference monthly figures for an AED 1,600 order.
 * Plans with a monthly fee get a neutral subline ("Includes AED X monthly fee");
 * plans that are no-fee get the positive subline ("No interest. No fees.").
 * These numbers are checked to round-trip against the 1,600 total:
 *   12 × 156.30 = 1875.60  → 275.60 fees → 22.60/mo
 *   10 × 160    = 1600     → no fees
 *    8 × 218    = 1744     → 144 fees    → 18/mo
 *    6 × 280    = 1680     → 80 fees     → 13.33/mo
 *    4 × 400    = 1600     → no fees
 */
const PLANS: PlanOption[] = [
  { id: '12', label: '12', monthly: 'AED 156.30/mo', subline: 'Includes AED 22.60 monthly fee' },
  { id: '10', label: '10', monthly: 'AED 160/mo', subline: 'No interest. No fees.', subTone: 'positive' },
  { id: '8', label: '8', monthly: 'AED 218/mo', subline: 'Includes AED 18 monthly fee' },
  { id: '6', label: '6', monthly: 'AED 280/mo', subline: 'Includes AED 13.33 monthly fee' },
  { id: '4', label: '4', monthly: 'AED 400/mo', subline: 'No interest. No fees.', subTone: 'positive' },
];

interface OtherOption {
  id: string;
  label: string;
  /**
   * Primary line rendered as `{lead}{bold}`. Lead is regular weight, bold is
   * emphasised (matches the body1TightBold weight token). Use an empty lead
   * if the whole line should be bold.
   */
  primaryLead: string;
  primaryBold: string;
  subline: string;
  subTone?: 'neutral' | 'positive';
}

const OTHER_OPTIONS: OtherOption[] = [
  {
    id: 'next-month',
    label: 'Pay Next Month',
    primaryLead: 'One bill ',
    primaryBold: 'due 3 October',
    subline: 'No interest. No fees.',
    subTone: 'positive',
  },
  {
    id: 'full',
    label: 'Pay in full',
    primaryLead: '',
    primaryBold: 'Pay AED 1,600.00 today',
    subline: 'Use your preferred payment method',
  },
];

const ORDER_TOTAL = 1600;

/**
 * Format a money amount: omit the decimal fraction entirely when it rounds
 * to .00, but show two decimals when there's a non-zero fraction. So 1600
 * renders as "1,600", 156.30 renders as "156.30", 156 renders as "156".
 */
function formatAmount(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const hasFraction = rounded % 1 !== 0;
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  });
}

/**
 * Chip row layout rules for the split-count pills:
 *   - 1–3 plans: hug contents, min 72px per chip (pills stay tap-friendly).
 *   - 4–5 plans: stretch edge-to-edge, each chip takes an equal share.
 *   - 6+ plans: 4-column grid. Orphans on row 2 are acceptable
 *     (7 → 4+3, 8 → 4+4, 9 → 4+4+1) — only 6 would naturally orphan to 5+1,
 *     which the grid already prevents by forcing 4 per row.
 */
function getPlanChipRowStyle(count: number, styles: Record<string, string>): string {
  if (count >= 6) return styles.chipRowGrid;
  if (count >= 4) return styles.chipRowStretch;
  return styles.chipRowHug;
}

export default function PlanSelectionPattern() {
  // Selection is mutually exclusive: at most one of selectedPlan or
  // selectedOther is non-null. Initial selection is the first plan.
  const [selectedPlan, setSelectedPlan] = useState<string | null>(PLANS[0].id);
  const [selectedOther, setSelectedOther] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const plan = PLANS.find((p) => p.id === selectedPlan) ?? null;
  const otherOption = OTHER_OPTIONS.find((o) => o.id === selectedOther) ?? null;

  function handleSubmit() {
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 900);
  }

  function handlePickPlan(id: string) {
    setSelectedPlan(id);
    setSelectedOther(null);
  }

  function handlePickOther(id: string) {
    setSelectedOther(id);
    setSelectedPlan(null);
  }

  return (
    <div className={styles.screen}>
      <NavBar />

      <div className={styles.amountBlock}>
        <Text variant="body2Tight">
          <span className={styles.amountLabel}>Choose how to pay</span>
        </Text>
        <Text variant="h1">
          <span className={styles.amountValue}>AED {formatAmount(ORDER_TOTAL)}</span>
        </Text>
      </div>

      <div className={`${styles.card}${plan ? ` ${styles.cardTightBottom}` : ''}`}>
        <Text variant="body2Tight">
          <span className={styles.cardLabel}>Number of payments</span>
        </Text>
        <div className={`${styles.chipRow} ${getPlanChipRowStyle(PLANS.length, styles)}`} role="radiogroup" aria-label="Number of payments">
          {PLANS.map((p) => (
            <Chip
              key={p.id}
              size="md"
              tone={p.id === selectedPlan ? 'inverted' : 'neutral'}
              isSelected={p.id === selectedPlan}
              onClick={() => handlePickPlan(p.id)}
              role="radio"
              aria-checked={p.id === selectedPlan}
            >
              {PLANS.length === 1 ? `${p.label} payments` : p.label}
            </Chip>
          ))}
        </div>

        {plan && (
          <div className={styles.drillInGroup}>
            <div className={styles.cardDivider} aria-hidden />
            <Supercell
              onClick={() => { /* demo — would open schedule drawer */ }}
              aria-label={`See payment schedule for ${plan.label} payments`}
            >
              <SupercellLead>
                <span className={styles.detailIcon} aria-hidden>
                  <Split24 />
                </span>
              </SupercellLead>
              <SupercellBase>
                <SupercellBaseCell>
                  <Text variant="body1TightBold">{plan.monthly}</Text>
                  <Text variant="body2Tight">
                    <span
                      className={
                        plan.subTone === 'positive' ? styles.detailSublinePositive : styles.detailSubline
                      }
                    >
                      {plan.subline}
                    </span>
                  </Text>
                </SupercellBaseCell>
              </SupercellBase>
              <SupercellControl contentType="chevron">
                <ChevronForward24 />
              </SupercellControl>
            </Supercell>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <Text variant="body2Tight">
          <span className={styles.cardLabel}>Other options</span>
        </Text>
        <div className={`${styles.chipRow} ${styles.chipRowOther}`} role="radiogroup" aria-label="Other payment options">
          {OTHER_OPTIONS.map((o) => (
            <Chip
              key={o.id}
              size="md"
              tone={o.id === selectedOther ? 'inverted' : 'neutral'}
              isSelected={o.id === selectedOther}
              onClick={() => handlePickOther(o.id)}
              role="radio"
              aria-checked={o.id === selectedOther}
            >
              {o.label}
            </Chip>
          ))}
        </div>

        {otherOption && (
          <>
            <div className={styles.cardDivider} aria-hidden />
            <button
              type="button"
              className={styles.detailRow}
              onClick={() => { /* demo — would open details drawer */ }}
              aria-label={`See details for ${otherOption.label}`}
            >
              <div className={styles.detailText}>
                <Text variant="body1Tight">
                  {otherOption.primaryLead}
                  <span className={styles.detailEmphasis}>{otherOption.primaryBold}</span>
                </Text>
                <Text variant="body2Tight">
                  <span
                    className={
                      otherOption.subTone === 'positive'
                        ? styles.detailSublinePositive
                        : styles.detailSubline
                    }
                  >
                    {otherOption.subline}
                  </span>
                </Text>
              </div>
              <span className={styles.detailChevron} aria-hidden>
                <ChevronForward24 />
              </span>
            </button>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <Button
          type="button"
          size="xl"
          variant="primary"
          tone="neutral"
          isLoading={submitting}
          onClick={handleSubmit}
          className={styles.footerButton}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
