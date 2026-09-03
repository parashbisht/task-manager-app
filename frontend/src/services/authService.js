import api from './api'

export async function login(email, password) {
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)

  const { data } = await api.post('/auth/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data // { access_token, token_type }
}

export async function signup(email, password) {
  const { data } = await api.post('/auth/signup', { email, password })
  return data // { id, email, created_at }
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me')
  return data
}
