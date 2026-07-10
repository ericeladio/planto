import { useCart } from '../context/CartContext'

interface OrderSummaryProps {
  onProceed: () => void
}

export default function OrderSummary({ onProceed }: OrderSummaryProps) {
  const { items, cartTotal } = useCart()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">Order summary</h2>
        <p className="text-white/50 text-sm">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-contain shrink-0 rounded-xl bg-white/5"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-medium truncate">{item.name}</h3>
                <span className="text-white/50 text-sm">Quantity: {item.quantity}</span>
              </div>
              <span className="text-white font-semibold">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between text-white/75 text-sm">
          <span>Subtotal</span>
          <span>{cartTotal}</span>
        </div>
        <div className="flex justify-between text-white/75 text-sm">
          <span>Shipping</span>
          <span className="text-[#55B000]">Free</span>
        </div>
        <div className="flex justify-between text-white text-lg font-semibold pt-2 border-t border-white/10">
          <span>Total</span>
          <span>{cartTotal}</span>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </div>
  )
}
