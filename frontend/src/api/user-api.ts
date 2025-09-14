const API_BASE = import.meta.env.VITE_API_BASE;

export async function getUserProfile(token: string) {
    const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
    }

    return res.json();
}
