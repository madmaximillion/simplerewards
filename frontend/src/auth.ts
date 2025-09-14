import { jwtDecode } from 'jwt-decode'
import { api, setToken } from './api'

type LoginRes = { token: string }
type Claims = { role: 'PARENT'|'CHILD'; uid: number; name: string }

export async function login(username: string, password: string) {
    const { data } = await api.post<LoginRes>('${import.meta.env.VITE_API_BASE}/auth/login', { username, password })
    setToken(data.token)
    const claims = jwtDecode<Claims>(data.token)
    localStorage.setItem('token', data.token)
    return claims
}

export function loadToken() {
    const t = localStorage.getItem('token') || undefined
    setToken(t)
    return t
}

export function logout() {
    localStorage.removeItem('token')
    setToken(undefined)
}