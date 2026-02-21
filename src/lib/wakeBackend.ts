const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function wakeBackend() {
  if (!API_URL) return
  
  try {
    await fetch(`${API_URL}/api/adminapp/check-auth/`, {
      credentials: 'include'
    })
  } catch {
    // Silently fail - just trying to wake up the backend
  }
}
