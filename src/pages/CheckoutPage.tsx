import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder, saveCard } from '../services/api'
import type { OrderOut, PlaceOrderRequest } from '../services/api'
import SEOHead from '../components/SEOHead'
import OrderSummary from '../components/OrderSummary'
import PaymentForm from '../components/PaymentForm'
import OrderConfirmation from '../components/OrderConfirmation'

type Step = 'review' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('review')
  const [order, setOrder] = useState<OrderOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { items, cartTotal, refreshCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <>
        <SEOHead title="Checkout" canonicalPath="/checkout" />
        <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8 text-center">
            <h1 className="text-3xl font-semibold text-white mb-4">Empty cart</h1>
            <p className="text-white/50 mb-6">Add items to your cart to continue.</p>
            <button
              onClick={() => navigate('/market')}
              className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity"
            >
              Go to shop
            </button>
          </div>
        </section>
      </>
    )
  }

  async function handlePayment(data: PlaceOrderRequest, shouldSave: boolean) {
    setError('')
    setLoading(true)
    try {
      console.log('CREATE ORDER DATA:', JSON.stringify(data, null, 2))
      const result = await createOrder(data)
      if (shouldSave && data.type === 'new') {
        await saveCard({ card_number: data.card_number!, exp_month: data.exp_month!, exp_year: data.exp_year!, cvv: data.cvv }).catch(() => {})
      }
      setOrder(result)
      setStep('confirmation')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead title="Checkout" canonicalPath="/checkout" />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <div className="flex items-center justify-center gap-3 bg-[#0d1a0d]/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <StepIndicator num={1} label="Summary" active={step === 'review'} done={step === 'payment' || step === 'confirmation'} />
            <div className="w-12 h-px bg-white/30" />
            <StepIndicator num={2} label="Payment" active={step === 'payment'} done={step === 'confirmation'} />
            <div className="w-12 h-px bg-white/30" />
            <StepIndicator num={3} label="Confirmation" active={step === 'confirmation'} done={false} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8">
            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
            )}

            {step === 'review' && (
              <OrderSummary onProceed={() => setStep('payment')} />
            )}

            {step === 'payment' && (
              <div className="flex flex-col gap-6">
                <button
                  onClick={() => setStep('review')}
                  className="self-start text-white/50 hover:text-white text-sm bg-transparent border-none cursor-pointer transition-colors"
                >
                  &larr; Back to summary
                </button>
                <PaymentForm total={cartTotal} onSubmit={handlePayment} loading={loading} />
              </div>
            )}

            {step === 'confirmation' && order && (
              <OrderConfirmation order={order} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function StepIndicator({ num, label, active, done }: { num: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
          done
            ? 'bg-[#55B000] text-white'
            : active
            ? 'bg-white text-[#0d1a0d]'
            : 'bg-white/15 border border-white/20 text-white/60'
        }`}
      >
        {done ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          num
        )}
      </div>
      <span className={`text-sm font-medium hidden sm:inline ${active ? 'text-white' : 'text-white/60'}`}>
        {label}
      </span>
    </div>
  )
}
