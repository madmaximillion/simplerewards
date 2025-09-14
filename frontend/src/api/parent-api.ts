// src/api/parent-api.ts
const API_BASE = import.meta.env.VITE_API_BASE;

export async function getChildren(token: string) {
    const res = await fetch(`${API_BASE}/api/parent/children`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch children');
    return res.json();
}

export async function getChildChores(token: string, childId: number) {
    const res = await fetch(`${API_BASE}/api/parent/children/${childId}/chores`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch child chores');
    return res.json();
}

export async function assignChore(token: string, childId: number, chore: { name: string; reward: number }) {
    const res = await fetch(`${API_BASE}/api/parent/children/${childId}/chores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(chore)
    });
    if (!res.ok) throw new Error('Failed to assign chore');
    return res.json();
}

export async function approveChore(token: string, choreId: number) {
    const res = await fetch(`${API_BASE}/api/parent/chores/${choreId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to approve chore');
    return res.json();
}