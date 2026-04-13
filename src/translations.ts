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
    en: "Tap the Tabby push notification or SMS link",
    ar: "اضغط على إشعار تابي أو رابط الرسالة النصية",
  },
  "tracker.step1.sent.description": {
    en: "You can download the app via the link in the SMS sent to",
    ar: "يمكنك تحميل التطبيق عبر الرابط في الرسالة النصية المرسلة إلى",
  },
  "tracker.step1.sent.action": {
    en: "Having trouble?",
    ar: "هل تواجه مشكلة؟",
  },
  "tracker.step2.title": {
    en: "Complete your purchase in the app",
    ar: "أكمل عملية الشراء في التطبيق",
  },
  "tracker.step2.description": {
    en: "Adidas \u2022 AED 400.00",
    ar: "Adidas \u2022 400.00 د.إ",
  },
  "tracker.step2.trail": {
    en: "AED 400.00",
    ar: "400.00 د.إ",
  },
  "tracker.step3.title": {
    en: "Return here once your payment is complete",
    ar: "عُد إلى هنا بعد اكتمال الدفع",
  },
  "tracker.step3.trail": {
    en: "AED 400.00",
    ar: "400.00 د.إ",
  },

  // Footer
  "footer.change": { en: "Change", ar: "تغيير" },

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
    en: "Enable push notifications in the Tabby app. Be sure you\u2019re logged in with the same phone number you used at checkout.",
    ar: "فعّل الإشعارات في تطبيق تابي. وتأكد من تسجيل الدخول بنفس رقم الهاتف المستخدم عند الدفع.",
  },
  "trouble.body2prefix": { en: "Then return here and tap", ar: "ثم عُد إلى هنا واضغط على" },
  "trouble.body2bold": { en: "Send notification", ar: "إرسال إشعار" },
  "trouble.body2suffix": {
    en: "to continue your purchase in the app.",
    ar: "لمتابعة عملية الشراء في التطبيق.",
  },
  "trouble.sendNotification": { en: "Send notification", ar: "إرسال إشعار" },
  "trouble.resendSms": { en: "Resend SMS", ar: "إعادة إرسال الرسالة" },
  "trouble.resendSmsIn": {
    en: "Resend SMS in",
    ar: "إعادة إرسال خلال",
  },
  "trouble.attemptsRemaining": {
    en: "of 3 attempts remaining",
    ar: "من 3 محاولات متبقية",
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
