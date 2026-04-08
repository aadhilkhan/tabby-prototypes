import type { Language } from "./types";

const translations = {
  // StationScreen
  "station.heading": {
    en: "Complete purchase in\u00A0 the Tabby app",
    ar: "\u0623\u0643\u0645\u0644 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u062A\u0627\u0628\u064A",
  },

  // Tracker steps
  "tracker.step1.sending": {
    en: "Sending push notification...",
    ar: "\u062C\u0627\u0631\u064D \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631...",
  },
  "tracker.step1.sent": {
    en: "Tap the notification sent to your Tabby app",
    ar: "\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0645\u064F\u0631\u0633\u064E\u0644 \u0625\u0644\u0649 \u062A\u0637\u0628\u064A\u0642 \u062A\u0627\u0628\u064A",
  },
  "tracker.step1.description": {
    en: "Or download app using the link sent via SMS",
    ar: "\u0623\u0648 \u062D\u0645\u0651\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u064F\u0631\u0633\u064E\u0644 \u0639\u0628\u0631 \u0631\u0633\u0627\u0644\u0629 \u0646\u0635\u064A\u0629",
  },
  "tracker.step1.action": {
    en: "Having trouble with the notification?",
    ar: "\u0647\u0644 \u062A\u0648\u0627\u062C\u0647 \u0645\u0634\u0643\u0644\u0629 \u0645\u0639 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u061F",
  },
  "tracker.step2.title": {
    en: "Complete purchase in app",
    ar: "\u0623\u0643\u0645\u0644 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
  },
  "tracker.step2.description": {
    en: "Adidas \u2022 AED 400.00",
    ar: "Adidas \u2022 400.00 \u062F.\u0625",
  },
  "tracker.step3.title": {
    en: "Return back here once payment is complete",
    ar: "\u0639\u064F\u062F \u0625\u0644\u0649 \u0647\u0646\u0627 \u0628\u0639\u062F \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062F\u0641\u0639",
  },

  // Footer
  "footer.change": {
    en: "Change",
    ar: "\u062A\u063A\u064A\u064A\u0631",
  },
  "footer.consent": {
    en: "By continuing, you ",
    ar: "\u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u060C \u0641\u0625\u0646\u0643 ",
  },
  "footer.consentBold": {
    en: "consent to sharing",
    ar: "\u062A\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0645\u0634\u0627\u0631\u0643\u0629",
  },
  "footer.consentEnd": {
    en: " your data with AECB",
    ar: " \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0645\u0639 AECB",
  },

  // AccountScreen
  "account.heading": {
    en: "Log in or sign up for Tabby",
    ar: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0623\u0648 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0641\u064A \u062A\u0627\u0628\u064A",
  },
  "account.description": {
    en: "Enter your phone number to get the verification code",
    ar: "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0631\u0645\u0632 \u0627\u0644\u062A\u062D\u0642\u0642",
  },
  "account.placeholder": {
    en: "Phone number",
    ar: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641",
  },
  "account.continue": {
    en: "Continue",
    ar: "\u0645\u062A\u0627\u0628\u0639\u0629",
  },
  "account.error": {
    en: "Please enter a valid phone number",
    ar: "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0635\u062D\u064A\u062D",
  },

  // SuccessScreen
  "success.heading": {
    en: "Payment successful",
    ar: "\u062A\u0645\u062A \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062F\u0641\u0639 \u0628\u0646\u062C\u0627\u062D",
  },
  "success.subtext": {
    en: "You\u2019re now being redirected to Adidas page",
    ar: "\u062C\u0627\u0631\u064D \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647\u0643 \u0625\u0644\u0649 \u0635\u0641\u062D\u0629 Adidas",
  },
  "success.merchant": {
    en: "Adidas",
    ar: "Adidas",
  },
  "success.plan": {
    en: "Pay in 4",
    ar: "\u0642\u0633\u0651\u0645\u0647\u0627 \u0639\u0644\u0649 4",
  },
  "success.amount": {
    en: "AED 100.00/mo",
    ar: "100.00 \u062F.\u0625/\u0634\u0647\u0631",
  },

  // TroubleBottomSheet
  "trouble.heading": {
    en: "Having trouble?",
    ar: "\u0647\u0644 \u062A\u0648\u0627\u062C\u0647 \u0645\u0634\u0643\u0644\u0629\u061F",
  },
  "trouble.body1": {
    en: "Open the Tabby app, make sure you\u2019re logged in with the same phone number you used at checkout, and enable push notifications.",
    ar: "\u0627\u0641\u062A\u062D \u062A\u0637\u0628\u064A\u0642 \u062A\u0627\u0628\u064A\u060C \u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0646\u0641\u0633 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u062F \u0627\u0644\u062F\u0641\u0639\u060C \u0648\u0641\u0639\u0651\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A.",
  },
  "trouble.body2prefix": {
    en: "Once that\u2019s done, tap ",
    ar: "\u0628\u0639\u062F \u0630\u0644\u0643\u060C \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 ",
  },
  "trouble.body2bold": {
    en: "Send notification",
    ar: "\u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631",
  },
  "trouble.body2suffix": {
    en: " to continue your purchase in the app.",
    ar: " \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642.",
  },
  "trouble.sendNotification": {
    en: "Send notification",
    ar: "\u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631",
  },
  "trouble.resendSMS": {
    en: "Resend SMS",
    ar: "\u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u0646\u0635\u064A\u0629",
  },
  "trouble.resendSMSTimer": {
    en: "Resend SMS in",
    ar: "\u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u0646\u0635\u064A\u0629 \u062E\u0644\u0627\u0644",
  },

  // NotificationBanner
  "notification.title": {
    en: "Tap to complete your purchase",
    ar: "\u0627\u0636\u063A\u0637 \u0644\u0625\u0643\u0645\u0627\u0644 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621",
  },
  "notification.body1": {
    en: "Confirm your purchase at Adidas for",
    ar: "\u0623\u0643\u062F \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0645\u0646 Adidas \u0628\u0642\u064A\u0645\u0629",
  },
  "notification.body2": {
    en: "AED 400.00",
    ar: "400.00 \u062F.\u0625",
  },

  // NavBar
  "nav.merchant": {
    en: "Adidas",
    ar: "Adidas",
  },
  "nav.payWith": {
    en: "Pay with",
    ar: "\u0627\u062F\u0641\u0639 \u0639\u0628\u0631",
  },
  "nav.langSwitch": {
    en: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    ar: "English",
  },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  return translations[key][lang];
}
