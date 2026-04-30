import { Text } from '@tabby.ai/tabby-ui/O25/Text';
import { IconButton } from '@tabby.ai/tabby-ui/O25/Button/IconButton';
import Close24 from '@tabby.ai/tabby-ui/icons/core/Close24';
import TabbyBadge from './TabbyBadge';
import styles from './CheckoutHeader.module.css';

interface CheckoutHeaderProps {
  /** Merchant name shown in the center. Defaults to "Adidas" per Figma 2158:34947. */
  merchantName?: string;
  /** Whether to show the leading close button. Defaults to true. */
  showClose?: boolean;
  /** Whether to show the trailing language switcher. Defaults to true. */
  showLanguage?: boolean;
  /** Visible language label on the right. Flip to "English" when active dir is RTL. */
  languageLabel?: string;
  onClose?: () => void;
  onLanguageToggle?: () => void;
}

/**
 * Shared checkout header — pixel-matches Figma node 2158:34947.
 *
 * Structure (three-column grid, 56 px tall):
 *   LEFT   — close IconButton (plain Close24 X), variant="ghost" — no tile
 *   CENTER — merchant name (body1TightBold) + "Pay with <tabby>" caption
 *   RIGHT  — language switcher rendered as a purple TextLink ("العربية"),
 *            not a globe icon — matches the in-app checkout header used by
 *            the production Adidas redirect flow.
 *
 * The left + right sides use the ghost variant so the only thing visible is
 * the icon/label itself — no rounded-tile background. Never substitute a
 * filled variant without the user asking for it.
 */
export default function CheckoutHeader({
  merchantName = 'Adidas',
  showClose = true,
  showLanguage = true,
  languageLabel = 'العربية',
  onClose,
  onLanguageToggle,
}: CheckoutHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.side}>
        {showClose && (
          <IconButton
            size="s"
            variant="ghost"
            tone="neutral"
            aria-label="Close"
            onClick={onClose}
          >
            <Close24 />
          </IconButton>
        )}
      </div>

      <div className={styles.center}>
        <Text variant="body1TightBold">
          <span className={styles.merchantName}>{merchantName}</span>
        </Text>
        <div className={styles.payWithRow}>
          <Text variant="caption">
            <span className={styles.payWithCaption}>Pay with</span>
          </Text>
          <TabbyBadge className={styles.tabbyBadge} />
        </div>
      </div>

      <div className={`${styles.side} ${styles.sideEnd}`}>
        {showLanguage && (
          <button
            type="button"
            className={styles.langLink}
            onClick={onLanguageToggle}
            lang="ar"
          >
            {languageLabel}
          </button>
        )}
      </div>
    </header>
  );
}
