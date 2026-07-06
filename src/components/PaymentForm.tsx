import { useState, useEffect } from 'react'
import { paymentSchema, savedCardCvvSchema } from '../lib/validations'
import { getSavedCards, deleteCard } from '../services/api'
import type { SavedCardOut, PlaceOrderRequest } from '../services/api'

interface PaymentFormProps {
  total: string
  onSubmit: (data: PlaceOrderRequest, saveCard: boolean) => void
  loading: boolean
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }
  return digits
}

function detectCardType(number: string): string {
  const digits = number.replace(/\D/g, '')
  if (/^4/.test(digits)) return 'visa'
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard'
  if (/^3[47]/.test(digits)) return 'amex'
  return ''
}

function brandIcon(brand: string) {
  const b = brand.toLowerCase()
  if (b === 'visa') return 'VISA'
  if (b === 'mastercard') return 'MC'
  if (b === 'amex') return 'AMEX'
  return brand.toUpperCase()
}

export default function PaymentForm({ total, onSubmit, loading }: PaymentFormProps) {
  const [savedCards, setSavedCards] = useState<SavedCardOut[]>([])
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const [savedCvv, setSavedCvv] = useState('')
  const [saveNewCard, setSaveNewCard] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [loadingCards, setLoadingCards] = useState(true)

  const isNewCard = selectedCardId === null
  const cardType = detectCardType(cardNumber)

  useEffect(() => {
    getSavedCards()
      .then((cards) => {
        setSavedCards(cards)
        if (cards.length > 0) setSelectedCardId(cards[0].id)
      })
      .catch(() => setSavedCards([]))
      .finally(() => setLoadingCards(false))
  }, [])

  async function handleDeleteCard(cardId: number) {
    try {
      await deleteCard(cardId)
      setSavedCards((prev) => prev.filter((c) => c.id !== cardId))
      if (selectedCardId === cardId) {
        setSelectedCardId(null)
      }
    } catch {
      // ignore
    }
  }

  function handleCardChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardNumber(formatCardNumber(e.target.value))
    setFieldErrors((prev) => ({ ...prev, card_number: [] }))
  }

  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '')
    if (raw.length <= 4) {
      setExpiry(formatExpiry(e.target.value))
      setFieldErrors((prev) => ({ ...prev, exp_month: [] }))
    }
  }

  function handleCvvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setCvv(value)
    setFieldErrors((prev) => ({ ...prev, cvv: [] }))
  }

  function handleSavedCvvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setSavedCvv(value)
    setFieldErrors((prev) => ({ ...prev, cvv: [] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFieldErrors({})

    if (selectedCardId !== null) {
      const result = savedCardCvvSchema.safeParse({ cvv: savedCvv })
      if (!result.success) {
        setFieldErrors(result.error.flatten().fieldErrors)
        return
      }
      onSubmit({ type: 'saved', card_id: selectedCardId, cvv: result.data.cvv }, false)
      return
    }

    const [month, year] = expiry.split('/')
    const result = paymentSchema.safeParse({
      card_number: cardNumber,
      exp_month: month,
      exp_year: year ? `20${year}` : undefined,
      cvv,
    })

    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors)
      return
    }

    const payload = { type: 'new' as const, ...result.data }
    console.log('PAYLOAD ENVIADO:', JSON.stringify(payload, null, 2))
    console.log('card_number length:', payload.card_number?.length)
    onSubmit(payload, saveNewCard)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">Datos de pago</h2>
        <p className="text-white/50 text-sm">Selecciona una tarjeta o ingresa una nueva</p>
      </div>

      {!loadingCards && savedCards.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-white/60 text-sm">Tarjetas guardadas</span>
          {savedCards.map((card) => (
            <label
              key={card.id}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                selectedCardId === card.id
                  ? 'border-[#55B000] bg-[#55B000]/10'
                  : 'border-white/20 bg-white/5 hover:border-white/30'
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                checked={selectedCardId === card.id}
                onChange={() => {
                  setSelectedCardId(card.id)
                  setSavedCvv('')
                  setFieldErrors({})
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedCardId === card.id ? 'border-[#55B000]' : 'border-white/30'
                }`}
              >
                {selectedCardId === card.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#55B000]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    &bull;&bull;&bull;&bull; {card.last_four}
                  </span>
                  <span className="text-white/40 text-xs font-semibold uppercase bg-white/10 px-2 py-0.5 rounded">
                    {brandIcon(card.brand)}
                  </span>
                </div>
                <span className="text-white/50 text-xs">
                  Exp: {String(card.exp_month).padStart(2, '0')}/{String(card.exp_year).slice(-2)}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteCard(card.id)
                }}
                className="text-white/40 hover:text-red-400 text-xs bg-transparent border-none cursor-pointer transition-colors"
              >
                Eliminar
              </button>
            </label>
          ))}
        </div>
      )}

      {!loadingCards && savedCards.length > 0 && (
        <label className="flex items-center gap-3 p-4 rounded-xl border border-white/20 bg-white/5 cursor-pointer transition-colors hover:border-white/30">
          <input
            type="radio"
            name="payment-method"
            checked={selectedCardId === null}
            onChange={() => {
              setSelectedCardId(null)
              setFieldErrors({})
            }}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selectedCardId === null ? 'border-[#55B000]' : 'border-white/30'
            }`}
          >
            {selectedCardId === null && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#55B000]" />
            )}
          </div>
          <span className="text-white font-medium">Nueva tarjeta</span>
        </label>
      )}

      {selectedCardId !== null && (
        <div className="flex flex-col gap-2">
          <label htmlFor="saved-cvv" className="text-white/60 text-sm">CVV</label>
          <input
            id="saved-cvv"
            type="text"
            inputMode="numeric"
            value={savedCvv}
            onChange={handleSavedCvvChange}
            placeholder="123"
            autoComplete="cc-csc"
            className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
          />
          {fieldErrors.cvv && (
            <p className="text-red-400 text-xs">{fieldErrors.cvv[0]}</p>
          )}
        </div>
      )}

      {isNewCard && (
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="card_number" className="text-white/60 text-sm">Número de tarjeta</label>
            <div className="relative">
              <input
                id="card_number"
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={handleCardChange}
                placeholder="4242 4242 4242 4242"
                autoComplete="cc-number"
                className="h-12 px-4 pr-16 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit] w-full"
              />
              {cardType && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xs font-semibold uppercase">
                  {cardType}
                </span>
              )}
            </div>
            {fieldErrors.card_number && (
              <p className="text-red-400 text-xs">{fieldErrors.card_number[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="expiry" className="text-white/60 text-sm">Expiración</label>
              <input
                id="expiry"
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                autoComplete="cc-exp"
                className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
              />
              {fieldErrors.exp_month && (
                <p className="text-red-400 text-xs">{fieldErrors.exp_month[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cvv" className="text-white/60 text-sm">CVV</label>
              <input
                id="cvv"
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                autoComplete="cc-csc"
                className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
              />
              {fieldErrors.cvv && (
                <p className="text-red-400 text-xs">{fieldErrors.cvv[0]}</p>
              )}
            </div>
          </div>

          <label className="flex items-center gap-3 text-white/60 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={saveNewCard}
              onChange={(e) => setSaveNewCard(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#55B000]"
            />
            Guardar esta tarjeta para futuras compras
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : `Pagar ${total}`}
      </button>

      <p className="text-white/30 text-xs text-center">
        Tu información de pago está protegida y encriptada
      </p>
    </form>
  )
}
