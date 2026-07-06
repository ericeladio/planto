import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

interface CartPageProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartPage({ isOpen, onClose }: CartPageProps) {
  const { items, cartTotal, removeItem, updateQuantity } = useCart()
  const navigate = useNavigate()

  function handleCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-[#0d1a0d] border-l border-white/12 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/12">
            <h2 className="text-2xl font-semibold text-white">Shopping Cart</h2>
            <button onClick={onClose} className="text-white/75 hover:text-white text-3xl leading-none cursor-pointer bg-transparent border-none">
              &times;
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white/50 text-lg">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
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
                        <span className="text-white/75 text-sm">{item.price}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-white/20 bg-transparent text-white text-lg cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                          &minus;
                        </button>
                        <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-white/20 bg-transparent text-white text-lg cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-white/50 hover:text-red-400 text-sm cursor-pointer bg-transparent border-none transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/12 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-xl font-semibold">{cartTotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-lg cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
