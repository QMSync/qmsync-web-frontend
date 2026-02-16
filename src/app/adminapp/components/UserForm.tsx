'use client'

import { useState } from 'react'

interface UserFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function UserForm({ onClose, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country_code: '+256',
    telephone: '',
    department: 'store'
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const fullTelephone = `${formData.country_code}${formData.telephone}`
    
    try {
      const response = await fetch('http://localhost:8000/api/adminapp/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          telephone: fullTelephone,
          department: formData.department
        })
      })
      
      if (response.ok) {
        alert('User created successfully! Email sent to ' + formData.email)
        onSuccess()
        onClose()
      } else {
        const data = await response.json()
        setError(JSON.stringify(data))
      }
    } catch (error) {
      setError('Network error: ' + error)
      console.error('Error creating user:', error)
    }
  }

  const departmentRights = {
    store: ['Goods'],
    production: ['Training', 'Equipment'],
    qc: ['Deviation', 'Equipment'],
    qa: ['Change Requests', 'Deviation', 'Doc Tool']
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Add New User</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" required value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" required value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Country Code</label>
            <select value={formData.country_code} onChange={(e) => setFormData({...formData, country_code: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded">
              <option value="+256">+256 (Uganda)</option>
              <option value="+254">+254 (Kenya)</option>
              <option value="+255">+255 (Tanzania)</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Telephone Number</label>
            <input type="tel" required pattern="[0-9]{9,10}" value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded" placeholder="7XXXXXXXX" />
          </div>
        </div>

        <div className="border-t pt-3">
          <h3 className="font-semibold text-gray-900 mb-2">Department & Access Rights</h3>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
            <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-2 py-1.5 border border-gray-300 rounded">
              <option value="store">Store</option>
              <option value="production">Production</option>
              <option value="qc">QC</option>
              <option value="qa">QA</option>
            </select>
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <p className="text-xs font-medium text-gray-700 mb-0.5">Access Rights:</p>
            <p className="text-xs text-gray-600">{departmentRights[formData.department as keyof typeof departmentRights].join(', ')}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <p className="text-xs text-gray-700">
            <strong>Default Password:</strong> Wellcome@123 (User must change on first login)
          </p>
        </div>

        <div className="flex gap-2 justify-end pt-3">
          <button type="button" onClick={onClose} className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">Create User</button>
        </div>
      </form>
    </div>
  )
}
