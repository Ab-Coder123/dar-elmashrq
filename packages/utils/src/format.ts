/**
 * Format a year or year range for display.
 * e.g., formatYearRange(2019, 2021) => "2019–2021"
 * e.g., formatYearRange(2021) => "2021"
 */
export function formatYearRange(start: number, end?: number): string {
  if (end === undefined || end === start) return String(start)
  return `${start}\u20132021`.replace('2021', String(end))
}

/**
 * Format a contract value for display using Intl.NumberFormat.
 * e.g., formatContractValue(60000000, 'EGP') => "EGP 60M"
 */
export function formatContractValue(
  amount: number,
  currency: string,
  locale = 'en'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}
