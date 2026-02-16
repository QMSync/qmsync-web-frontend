'use client'

import { useState } from 'react'
import GoodsLayout from './layouts/GoodsLayout'

interface GRNFormProps {
  onClose: () => void
  onSuccess: () => void
}

function GRNForm({ onClose, onSuccess }: GRNFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    department: 'Main Store',
    batch_number: '',
    grn_no: '',
    vendor_name: '',
    material_code: '',
    material_name: '',
    no_of_containers: '',
    total_qty_received: '',
    manufacturing_date: '',
    expiry_date: '',
    ar_number: '',
    sample_quantity: '',
    sampled_by: '',
    usage_decision: '',
    retest_date: '',
    ud_given_by: '',
    reference_details: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/goods/grn/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        onSuccess()
        onClose()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">GOODS RECEIVED NOTE</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Date</label><input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Department</label><input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Batch Number</label><input type="text" required value={formData.batch_number} onChange={(e) => setFormData({...formData, batch_number: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-gray-700 mb-1">GRN NO</label><input type="text" required value={formData.grn_no} onChange={(e) => setFormData({...formData, grn_no: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Vendor Name</label><input type="text" required value={formData.vendor_name} onChange={(e) => setFormData({...formData, vendor_name: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Material Code</label><input type="text" required value={formData.material_code} onChange={(e) => setFormData({...formData, material_code: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">Material Name</label><input type="text" required value={formData.material_name} onChange={(e) => setFormData({...formData, material_name: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
        </div>
        <div className="border-t pt-3"><h3 className="font-semibold text-gray-900 mb-2 text-sm">Other Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-700 mb-1">No of Containers</label><input type="number" required value={formData.no_of_containers} onChange={(e) => setFormData({...formData, no_of_containers: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Total Qty Received</label><input type="text" required value={formData.total_qty_received} onChange={(e) => setFormData({...formData, total_qty_received: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Manufacturing Date</label><input type="date" required value={formData.manufacturing_date} onChange={(e) => setFormData({...formData, manufacturing_date: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label><input type="date" required value={formData.expiry_date} onChange={(e) => setFormData({...formData, expiry_date: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          </div>
        </div>
        <div className="border-t pt-3"><h3 className="font-semibold text-gray-900 mb-2 text-sm">Quality Control</h3>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-xs font-medium text-gray-700 mb-1">AR Number</label><input type="text" value={formData.ar_number} onChange={(e) => setFormData({...formData, ar_number: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Sample Quantity</label><input type="text" value={formData.sample_quantity} onChange={(e) => setFormData({...formData, sample_quantity: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Sampled By / Date</label><input type="text" value={formData.sampled_by} onChange={(e) => setFormData({...formData, sampled_by: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          </div>
        </div>
        <div className="border-t pt-3"><h3 className="font-semibold text-gray-900 mb-2 text-sm">Quality Assurance</h3>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Usage Decision</label><input type="text" value={formData.usage_decision} onChange={(e) => setFormData({...formData, usage_decision: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Retest Date</label><input type="date" value={formData.retest_date} onChange={(e) => setFormData({...formData, retest_date: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">UD Given By / Date</label><input type="text" value={formData.ud_given_by} onChange={(e) => setFormData({...formData, ud_given_by: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" /></div>
          </div>
        </div>
        <div><label className="block text-xs font-medium text-gray-700 mb-1">Reference Details</label><textarea value={formData.reference_details} onChange={(e) => setFormData({...formData, reference_details: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" rows={2} /></div>
        <div className="flex gap-2 justify-end pt-3">
          <button type="button" onClick={onClose} className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">Save GRN</button>
        </div>
      </form>
    </div>
  )
}

export default function Goods() {
  const [showForm, setShowForm] = useState(false)

  return (
    <GoodsLayout>
      {!showForm ? (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 text-sm flex items-center gap-1">
              <span className="text-lg">+</span><span>New</span>
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Goods Receipt</h2>
          <p className="text-gray-600">Goods receipt records will appear here</p>
        </div>
      ) : (
        <GRNForm onClose={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />
      )}
    </GoodsLayout>
  )
}
