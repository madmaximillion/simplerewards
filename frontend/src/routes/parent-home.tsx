import { useEffect, useState } from 'react';
import { getChildren, getChildChores, assignChore, approveChore } from '../api/parent-api';
import { getUserProfile } from '../api/user-api';
import UserDashboard from '../components/user-dashboard';

export default function ParentHome() {
    const [user, setUser] = useState<any>(null);
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
    const [chores, setChores] = useState<any[]>([]);
    const [newChoreName, setNewChoreName] = useState('');
    const [newChoreReward, setNewChoreReward] = useState(0);
    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getUserProfile(token);
                setUser(profile);

                const kids = await getChildren(token);
                setChildren(kids);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [token]);

    const handleSelectChild = async (childId: number) => {
        setSelectedChildId(childId);
        const choresData = await getChildChores(token, childId);
        setChores(choresData);
    };

    const handleAssignChore = async () => {
        if (!selectedChildId) return;
        await assignChore(token, selectedChildId, { name: newChoreName, reward: newChoreReward });
        setNewChoreName('');
        setNewChoreReward(0);
        const choresData = await getChildChores(token, selectedChildId);
        setChores(choresData);
    };

    const handleApproveChore = async (choreId: number) => {
        await approveChore(token, choreId);
        if (selectedChildId) {
            const choresData = await getChildChores(token, selectedChildId);
            setChores(choresData);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Parent Dashboard</h1>
            <p>Welcome, {user.displayName}</p>
            {user && <UserDashboard user={user} />}

            <h2>Your Children</h2>
            <ul>
                {children.map(child => (
                    <li key={child.id}>
                        {child.displayName} — {child.points} pts
                        <button onClick={() => handleSelectChild(child.id)}>View Chores</button>
                    </li>
                ))}
            </ul>

            {selectedChildId && (
                <>
                    <h3>Chores for {children.find(c => c.id === selectedChildId)?.displayName}</h3>
                    <ul>
                        {chores.map(chore => (
                            <li key={chore.id}>
                                {chore.name} ({chore.reward} pts) — {chore.status}
                                {chore.status === 'PENDING_APPROVAL' && (
                                    <button onClick={() => handleApproveChore(chore.id)}>Approve</button>
                                )}
                            </li>
                        ))}
                    </ul>

                    <h4>Assign New Chore</h4>
                    <input
                        value={newChoreName}
                        onChange={e => setNewChoreName(e.target.value)}
                        placeholder="Chore name"
                    />
                    <input
                        type="number"
                        value={newChoreReward}
                        onChange={e => setNewChoreReward(Number(e.target.value))}
                        placeholder="Reward points"
                    />
                    <button onClick={handleAssignChore}>Assign</button>
                </>
            )}
        </div>
    );
}