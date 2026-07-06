const CURRENCY_SYMBOLS: Record<string, string> = {
  Mx: '$',
  USD: '$',
  EUR: '€',
}

export function formatCurrency(price: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  return `${symbol} ${price.toLocaleString('es-MX')}`
}
