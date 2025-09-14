// src/api/chore-api.ts
const API_BASE = import.meta.env.VITE_API_BASE;

export async function getChores(token: string) {
    const res = await fetch(`${API_BASE}/api/chores/my`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch chores');
    return res.json();
}

export async function completeChore(token: string, choreId: number) {
    const res = await fetch(`${API_BASE}/api/chores/${choreId}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to complete chore');
    return res.json();
}