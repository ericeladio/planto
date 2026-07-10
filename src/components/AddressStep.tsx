import { useState, useEffect } from 'react'
import { getAddresses, createAddress } from '../services/api'
import type { AddressOut, AddressCreate } from '../services/api'
import AddressForm from './AddressForm'

interface AddressStepProps {
  onProceed: (addressId: number) => void
}

export default function AddressStep({ onProceed }: AddressStepProps) {
  const [addresses, setAddresses] = useState<AddressOut[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAddresses()
      .then((addrs) => {
        setAddresses(addrs)
        const def = addrs.find((a) => a.is_default)
        if (def) setSelectedId(def.id)
        else if (addrs.length > 0) setSelectedId(addrs[0].id)
      })
      .catch(() => setAddresses([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreateAddress(data: AddressCreate) {
    setSaving(true)
    try {
      const newAddr = await createAddress(data)
      setAddresses((prev) => [newAddr, ...prev])
      setSelectedId(newAddr.id)
      setShowForm(false)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  function handleProceed() {
    if (selectedId !== null) {
      onProceed(selectedId)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Delivery address</h2>
          <p className="text-white/50 text-sm">Loading addresses...</p>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setShowForm(false)}
          className="self-start text-white/50 hover:text-white text-sm bg-transparent border-none cursor-pointer transition-colors"
        >
          &larr; Back to addresses
        </button>
        <AddressForm
          onSubmit={handleCreateAddress}
          onCancel={() => setShowForm(false)}
          loading={saving}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">Delivery address</h2>
        <p className="text-white/50 text-sm">Select where to deliver your order</p>
      </div>

      {addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                selectedId === addr.id
                  ? 'border-[#55B000] bg-[#55B000]/10'
                  : 'border-white/20 bg-white/5 hover:border-white/30'
              }`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedId === addr.id ? 'border-[#55B000]' : 'border-white/30'
                }`}
              >
                {selectedId === addr.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#55B000]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{addr.label}</span>
                  {addr.is_default && (
                    <span className="text-[#55B000] text-xs font-semibold bg-[#55B000]/10 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-sm">
                  {addr.street} {addr.number}, {addr.colony}
                </p>
                <p className="text-white/50 text-sm">
                  {addr.city}, {addr.state} {addr.zip_code}
                </p>
                <p className="text-white/50 text-sm">{addr.country}</p>
                {addr.reference && (
                  <p className="text-white/40 text-xs mt-1">Ref: {addr.reference}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/20 bg-white/5 text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-sm font-medium"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add new address
      </button>

      <button
        onClick={handleProceed}
        disabled={selectedId === null}
        className="w-full py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to payment
      </button>
    </div>
  )
}
