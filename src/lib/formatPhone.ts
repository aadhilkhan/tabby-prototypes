/**
 * Formats a raw digit string as a UAE phone number: "+971 XX XXX XXXX".
 * Accepts any string and strips non-digit characters before formatting.
 */
export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length <= 2) return `+971 ${d}`;
  if (d.length <= 5) return `+971 ${d.slice(0, 2)} ${d.slice(2)}`;
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
}
