import { useState, useEffect } from 'react'
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '../services/api'
import type { AddressOut, AddressCreate } from '../services/api'
import AddressForm from './AddressForm'

export default function AddressManager() {
  const [addresses, setAddresses] = useState<AddressOut[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAddresses()
  }, [])

  async function loadAddresses() {
    setLoading(true)
    try {
      const addrs = await getAddresses()
      setAddresses(addrs)
    } catch {
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data: AddressCreate) {
    setSaving(true)
    try {
      const newAddr = await createAddress(data)
      setAddresses((prev) => [newAddr, ...prev])
      setShowForm(false)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(data: AddressCreate) {
    if (editingId === null) return
    setSaving(true)
    try {
      const updated = await updateAddress(editingId, data)
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? updated : a)))
      setEditingId(null)
      setShowForm(false)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteAddress(id)
      setAddresses((prev) => prev.filter((a) => a.id !== id))
    } catch {
      // ignore
    }
  }

  async function handleSetDefault(id: number) {
    try {
      const updated = await setDefaultAddress(id)
      setAddresses((prev) =>
        prev.map((a) => (a.id === id ? updated : { ...a, is_default: false }))
      )
    } catch {
      // ignore
    }
  }

  function handleEdit(addr: AddressOut) {
    setEditingId(addr.id)
    setShowForm(true)
  }

  function handleCancel() {
    setEditingId(null)
    setShowForm(false)
  }

  if (showForm) {
    const editData = editingId ? addresses.find((a) => a.id === editingId) : undefined
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8">
        <AddressForm
          initialData={editData}
          onSubmit={editingId ? handleUpdate : handleCreate}
          onCancel={handleCancel}
          loading={saving}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">My addresses</h2>
          <p className="text-white/50 text-sm">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-xl bg-white text-[#0d1a0d] text-sm font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
        >
          Add address
        </button>
      </div>

      {loading ? (
        <p className="text-white/50 text-sm">Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8 text-center">
          <p className="text-white/50 mb-4">You have no saved addresses.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity"
          >
            Add your first address
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-medium">{addr.label}</span>
                    {addr.is_default && (
                      <span className="text-[#55B000] text-xs font-semibold bg-[#55B000]/10 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-white/75 text-sm">
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
                <div className="flex flex-col gap-2">
                  {!addr.is_default && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-white/40 hover:text-[#55B000] text-xs bg-transparent border-none cursor-pointer transition-colors"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-white/40 hover:text-white text-xs bg-transparent border-none cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-white/40 hover:text-red-400 text-xs bg-transparent border-none cursor-pointer transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
