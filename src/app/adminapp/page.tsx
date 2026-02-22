'use client'

import { useState, useEffect } from 'react'
import AdminLayout from './layouts/AdminLayout'
import UserForm from './components/UserForm'
import { API_URL } from '@/lib/api'

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  telephone: string
  department: string
  electronic_signature: string
}

export default function AdminApp() {
  const [showForm, setShowForm] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/adminapp/users/`)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSuccess = () => {
    fetchUsers()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      await fetch(`${API_URL}/api/adminapp/users/${id}/`, { method: 'DELETE' })
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <AdminLayout>
      {!showForm ? (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 text-sm flex items-center gap-1">
              <span className="text-lg">+</span>
              <span>New</span>
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Username</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Name</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Email</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Telephone</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Department</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">E-Signature</th>
                  <th className="px-3 py-2 border text-left text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border text-sm">{user.username}</td>
                    <td className="px-3 py-2 border text-sm">{user.first_name} {user.last_name}</td>
                    <td className="px-3 py-2 border text-sm">{user.email}</td>
                    <td className="px-3 py-2 border text-sm">{user.telephone}</td>
                    <td className="px-3 py-2 border text-sm capitalize">{user.department}</td>
                    <td className="px-3 py-2 border text-sm font-mono text-xs">{user.electronic_signature}</td>
                    <td className="px-3 py-2 border text-sm">
                      <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <UserForm onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
      )}
    </AdminLayout>
  )
}
