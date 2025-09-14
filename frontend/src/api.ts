// src/api.ts
const API_BASE = import.meta.env.VITE_API_BASE;

export async function login(username: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json(); // { token: string }
}