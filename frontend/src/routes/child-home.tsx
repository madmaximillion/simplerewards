import { useEffect, useState } from 'react';
import UserDashboard from '../components/user-dashboard';
import ChoreList from '../components/chore-list';
import RewardShop from '../components/reward-shop';
import { getChores, completeChore } from '../api/chore-api';
import { getRewards, redeemReward } from '../api/reward-api';
import { getUserProfile } from '../api/user-api';

export default function ChildHome() {
    const [user, setUser] = useState<any>(null);
    const [chores, setChores] = useState<any[]>([]);
    const [rewards, setRewards] = useState<any[]>([]);
    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getUserProfile(token);
                setUser(profile);

                const choresData = await getChores(token);
                setChores(choresData);

                const rewardsData = await getRewards(token);
                setRewards(rewardsData);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [token]);

    const handleCompleteChore = async (id: number) => {
        try {
            await completeChore(token, id);
            // Refresh chores and points
            const choresData = await getChores(token);
            setChores(choresData);
            const profile = await getUserProfile(token);
            setUser(profile);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRedeemReward = async (id: number) => {
        try {
            await redeemReward(token, id);
            // Refresh rewards and points
            const rewardsData = await getRewards(token);
            setRewards(rewardsData);
            const profile = await getUserProfile(token);
            setUser(profile);
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Child Dashboard</h1>
            <UserDashboard user={user} />
            <ChoreList chores={chores} onComplete={handleCompleteChore} />
            <RewardShop rewards={rewards} points={user.points} onRedeem={handleRedeemReward} />
        </div>
    );
}