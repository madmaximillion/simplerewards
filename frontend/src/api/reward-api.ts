// src/api/reward-api.ts
const API_BASE = import.meta.env.VITE_API_BASE;

export async function getRewards(token: string) {
    const res = await fetch(`${API_BASE}/api/rewards`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch rewards');
    return res.json();
}

export async function redeemReward(token: string, rewardId: number) {
    const res = await fetch(`${API_BASE}/api/rewards/${rewardId}/redeem`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to redeem reward');
    return res.json();
}