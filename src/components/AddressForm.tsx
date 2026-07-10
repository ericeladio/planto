import { useState } from 'react'
import type { AddressOut, AddressCreate } from '../services/api'

interface AddressFormProps {
  initialData?: AddressOut
  onSubmit: (data: AddressCreate) => Promise<void>
  onCancel?: () => void
  loading?: boolean
}

const LABELS = ['Casa', 'Oficina', 'Otro']

export default function AddressForm({ initialData, onSubmit, onCancel, loading }: AddressFormProps) {
  const [label, setLabel] = useState(initialData?.label || LABELS[0])
  const [street, setStreet] = useState(initialData?.street || '')
  const [number, setNumber] = useState(initialData?.number || '')
  const [colony, setColony] = useState(initialData?.colony || '')
  const [city, setCity] = useState(initialData?.city || '')
  const [state, setState] = useState(initialData?.state || '')
  const [zipCode, setZipCode] = useState(initialData?.zip_code || '')
  const [country, setCountry] = useState(initialData?.country || 'Mexico')
  const [reference, setReference] = useState(initialData?.reference || '')
  const [isDefault, setIsDefault] = useState(initialData?.is_default || false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!street.trim()) errs.street = 'Requerido'
    if (!number.trim()) errs.number = 'Requerido'
    if (!colony.trim()) errs.colony = 'Requerido'
    if (!city.trim()) errs.city = 'Requerido'
    if (!state.trim()) errs.state = 'Requerido'
    if (!zipCode.trim()) errs.zip_code = 'Requerido'
    if (!country.trim()) errs.country = 'Requerido'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    await onSubmit({
      label,
      street: street.trim(),
      number: number.trim(),
      colony: colony.trim(),
      city: city.trim(),
      state: state.trim(),
      zip_code: zipCode.trim(),
      country: country.trim(),
      reference: reference.trim() || undefined,
      is_default: isDefault,
    })
  }

  const inputClass = 'h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit] w-full'
  const labelClass = 'text-white/60 text-sm'
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">
          {initialData ? 'Edit address' : 'Add address'}
        </h2>
        <p className="text-white/50 text-sm">Delivery address</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>Label</label>
        <div className="flex gap-2">
          {LABELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLabel(l)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                label === l
                  ? 'border-[#55B000] bg-[#55B000]/10 text-[#55B000]'
                  : 'border-white/20 bg-white/5 text-white/60 hover:border-white/30'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="street" className={labelClass}>Calle</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Av. Insurgentes"
            className={inputClass}
          />
          {errors.street && <p className={errorClass}>{errors.street}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="number" className={labelClass}>Numero</label>
          <input
            id="number"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="123"
            className={inputClass}
          />
          {errors.number && <p className={errorClass}>{errors.number}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="colony" className={labelClass}>Colonia</label>
        <input
          id="colony"
          type="text"
          value={colony}
          onChange={(e) => setColony(e.target.value)}
          placeholder="Del Valle"
          className={inputClass}
        />
        {errors.colony && <p className={errorClass}>{errors.colony}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className={labelClass}>Ciudad</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ciudad de Mexico"
            className={inputClass}
          />
          {errors.city && <p className={errorClass}>{errors.city}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="state" className={labelClass}>Estado</label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="CDMX"
            className={inputClass}
          />
          {errors.state && <p className={errorClass}>{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="zip_code" className={labelClass}>Codigo Postal</label>
          <input
            id="zip_code"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="03100"
            className={inputClass}
          />
          {errors.zip_code && <p className={errorClass}>{errors.zip_code}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className={labelClass}>Pais</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Mexico"
            className={inputClass}
          />
          {errors.country && <p className={errorClass}>{errors.country}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="reference" className={labelClass}>Referencia (opcional)</label>
        <input
          id="reference"
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Departamento 5B, edificio azul"
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-3 text-white/60 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#55B000]"
        />
        Use as default address
      </label>

      <div className="flex gap-3 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold text-base cursor-pointer border border-white/20 hover:bg-white/15 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  )
}
