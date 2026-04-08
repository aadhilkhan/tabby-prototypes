export type Language = "en" | "ar";

const translations = {
  // NavBar
  "nav.payWith": { en: "Pay with", ar: "الدفع عبر" },
  "nav.langSwitch": { en: "العربية", ar: "English" },

  // StationScreen heading
  "station.heading": {
    en: "Complete purchase in\u00A0 the Tabby app",
    ar: "أكمل عملية الشراء في\u00A0 تطبيق تابي",
  },

  // Tracker steps
  "tracker.step1.sending.title": {
    en: "Sending push notification...",
    ar: "جارٍ إرسال الإشعار...",
  },
  "tracker.step1.sent.title": {
    en: "Tap the notification sent to your Tabby app",
    ar: "اضغط على الإشعار المرسل إلى تطبيق تابي",
  },
  "tracker.step1.sent.description": {
    en: "Or download app using the link sent via SMS",
    ar: "أو حمّل التطبيق عبر الرابط المرسل في الرسالة النصية",
  },
  "tracker.step1.sent.action": {
    en: "Having trouble with the notification?",
    ar: "هل تواجه مشكلة مع الإشعار؟",
  },
  "tracker.step2.title": {
    en: "Complete purchase in app",
    ar: "أكمل عملية الشراء في التطبيق",
  },
  "tracker.step2.description": {
    en: "Adidas \u2022 AED 400.00",
    ar: "Adidas \u2022 400.00 د.إ",
  },
  "tracker.step3.title": {
    en: "Return back here once payment is complete",
    ar: "عُد إلى هنا بعد اكتمال الدفع",
  },

  // Footer
  "footer.change": { en: "Change", ar: "تغيير" },
  "footer.consent": { en: "By continuing, you", ar: "بالمتابعة، أنت" },
  "footer.consentBold": { en: "consent to sharing", ar: "توافق على مشاركة" },
  "footer.consentEnd": { en: "your data with AECB", ar: "بياناتك مع الاتحاد" },

  // AccountScreen
  "account.heading": {
    en: "Log in or sign up for Tabby",
    ar: "سجّل الدخول أو أنشئ حساباً في تابي",
  },
  "account.description": {
    en: "Enter your phone number to get the verification code",
    ar: "أدخل رقم هاتفك للحصول على رمز التحقق",
  },
  "account.phonePlaceholder": { en: "Phone number", ar: "رقم الهاتف" },
  "account.error": {
    en: "Please enter a valid phone number",
    ar: "يرجى إدخال رقم هاتف صحيح",
  },
  "account.continue": { en: "Continue", ar: "متابعة" },

  // SuccessScreen
  "success.heading": { en: "Payment successful", ar: "تمت عملية الدفع بنجاح" },
  "success.subtext": {
    en: "You're now being redirected to Adidas page",
    ar: "جارٍ إعادة توجيهك إلى صفحة Adidas",
  },
  "success.plan": { en: "Pay in 4", ar: "قسّمها على 4" },
  "success.amount": { en: "AED 100.00/mo", ar: "100.00 د.إ/شهر" },

  // TroubleBottomSheet
  "trouble.heading": { en: "Having trouble?", ar: "هل تواجه مشكلة؟" },
  "trouble.body1": {
    en: "Open the Tabby app, make sure you're logged in with the same phone number you used at checkout, and enable push notifications.",
    ar: "افتح تطبيق تابي، وتأكد من تسجيل الدخول بنفس رقم الهاتف المستخدم عند الدفع، وفعّل الإشعارات.",
  },
  "trouble.body2prefix": { en: "Once that's done, tap", ar: "بعد ذلك، اضغط على" },
  "trouble.body2bold": { en: "Send notification", ar: "إرسال إشعار" },
  "trouble.body2suffix": {
    en: "to continue your purchase in the app.",
    ar: "لمتابعة عملية الشراء في التطبيق.",
  },
  "trouble.sendNotification": { en: "Send notification", ar: "إرسال إشعار" },
  "trouble.resendSms": { en: "Resend SMS", ar: "إعادة إرسال رسالة نصية" },
  "trouble.resendSmsIn": {
    en: "Resend SMS in",
    ar: "إعادة إرسال خلال",
  },

  // NotificationBanner
  "notification.title": {
    en: "Tap to complete your purchase",
    ar: "اضغط لإتمام عملية الشراء",
  },
  "notification.time": { en: "2m ago", ar: "منذ 2 د" },
  "notification.body1": {
    en: "Confirm your purchase at Adidas for",
    ar: "أكّد عملية الشراء من Adidas بقيمة",
  },
  "notification.body2": { en: "AED 400.00", ar: "400.00 د.إ" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  return translations[key][lang];
}
