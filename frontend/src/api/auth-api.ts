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

export interface RegisterPayload {
    username: string;
    displayName: string;
    password: string;
    role: 'PARENT' | 'CHILD';
}

export async function register(payload: RegisterPayload) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Registration failed');
    }
    return res.text(); // or res.json() if your backend returns JSON
}
