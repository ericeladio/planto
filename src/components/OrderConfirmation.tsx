import { Link } from 'react-router-dom'
import type { OrderOut } from '../services/api'
import { formatCurrency } from '../utils/formatCurrency'

interface OrderConfirmationProps {
  order: OrderOut
}

const DEFAULT_CURRENCY = 'Mx'

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-[#55B000]/20 flex items-center justify-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#55B000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">Pedido confirmado</h2>
        <p className="text-white/50">
          Gracias por tu compra. Tu pedido está siendo procesado.
        </p>
      </div>

      <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex justify-between text-white/75 text-sm">
          <span>Número de pedido</span>
          <span className="text-white font-semibold">#{order.id}</span>
        </div>
        <div className="flex justify-between text-white/75 text-sm">
          <span>Fecha</span>
          <span className="text-white">
            {new Date(order.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="flex justify-between text-white/75 text-sm">
          <span>Estado</span>
          <span className="text-[#55B000] font-semibold capitalize">{order.status}</span>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between text-white text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.total, DEFAULT_CURRENCY)}</span>
        </div>
      </div>

      <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-white font-semibold mb-3">Artículos</h3>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.plant_image}
                alt={item.plant_name}
                className="w-12 h-12 object-contain rounded-lg bg-white/5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{item.plant_name}</p>
                <p className="text-white/50 text-xs">Cantidad: {item.quantity}</p>
              </div>
              <span className="text-white text-sm font-medium">
                {formatCurrency(item.plant_price * item.quantity, DEFAULT_CURRENCY)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/market"
        className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base text-center border-none hover:opacity-90 transition-opacity no-underline"
      >
        Seguir comprando
      </Link>
    </div>
  )
}
