import {useEffect, useState} from 'react';
import {getChildren, getChildChores, assignChore, approveChore, addChild} from '../api/parent-api';
import {getUserProfile} from '../api/user-api';
import UserDashboard from '../components/user-dashboard';

export default function ParentHome() {
    const [user, setUser] = useState<any>(null);
    const [children, setChildren] = useState<any[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
    const [chores, setChores] = useState<any[]>([]);
    const [newChore, setNewChore] = useState({
        title: '',
        description: '',
        scheduleType: 'DAILY',
        expiresEndOfPeriod: false,
        rewardType: 'POINTS',
        rewardValue: 0,
        isAdhoc: false,
        dueDate: ''
    });
    const [newChoreReward, setNewChoreReward] = useState(0);
    const token = localStorage.getItem('token') || '';
    const [showChoreForm, setShowChoreForm] = useState(false);


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

        const chorePayload = {
            ...newChore,
            dueDate: newChore.dueDate
                ? new Date(newChore.dueDate + 'T00:00:00Z').toISOString()
                : null
        };

        await assignChore(token, selectedChildId, chorePayload);

        setNewChore({
            title: '',
            description: '',
            scheduleType: 'DAILY',
            expiresEndOfPeriod: false,
            rewardType: 'POINTS',
            rewardValue: 0,
            isAdhoc: false,
            dueDate: ''
        });

        const choresData = await getChildChores(token, selectedChildId);
        setShowChoreForm(prev => !prev)
        setChores(choresData);
    };

    const handleApproveChore = async (choreId: number) => {
        await approveChore(token, choreId);
        if (selectedChildId) {
            const choresData = await getChildChores(token, selectedChildId);
            setChores(choresData);
        }
    };

    const [newChildName, setNewChildName] = useState('');

    const handleAddChild = async () => {
        if (!newChildName.trim()) return;
        try {
            const createdChild = await addChild(token, {displayName: newChildName});
            setChildren(prev => [...prev, createdChild]);
            setNewChildName('');
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{padding: '2rem'}}>
            <h1>Parent Dashboard</h1>
            <p>Welcome, {user.displayName}</p>
            <h2>Your Children</h2>
            <div style={{marginBottom: '1rem'}}>
                <input
                    value={newChildName}
                    onChange={e => setNewChildName(e.target.value)}
                    placeholder="Child's name"
                />
                <button onClick={handleAddChild}>Add Child</button>
            </div>
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
                                {chore.title} ({chore.rewardValue} pts) — {chore.status}
                                {chore.status === 'PENDING_APPROVAL' && (
                                    <button onClick={() => handleApproveChore(chore.id)}>Approve</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowChoreForm(prev => !prev)}>
                        {showChoreForm ? 'Cancel' : 'Assign New Chore'}
                    </button>
                    {showChoreForm && (
                        <div style={{display: 'grid', gap: '0.5rem', maxWidth: '400px'}}>

                            <h4>Assign New Chore</h4>
                            <div style={{display: 'grid', gap: '0.5rem', maxWidth: '400px'}}>
                                <input
                                    value={newChore.title}
                                    onChange={e => setNewChore({...newChore, title: e.target.value})}
                                    placeholder="Title"
                                />
                                <textarea
                                    value={newChore.description}
                                    onChange={e => setNewChore({...newChore, description: e.target.value})}
                                    placeholder="Description"
                                    rows={3}
                                />
                                <select
                                    value={newChore.scheduleType}
                                    onChange={e => setNewChore({...newChore, scheduleType: e.target.value})}
                                >
                                    <option value="DAILY">Daily</option>
                                    <option value="WEEKLY">Weekly</option>
                                    <option value="BI_WEEKLY">Bi-Weekly</option>
                                    <option value="MONTHLY">Monthly</option>
                                </select>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newChore.expiresEndOfPeriod}
                                        onChange={e => setNewChore({...newChore, expiresEndOfPeriod: e.target.checked})}
                                    />
                                    Expires at end of period
                                </label>
                                <select
                                    value={newChore.rewardType}
                                    onChange={e => setNewChore({...newChore, rewardType: e.target.value})}
                                >
                                    <option value="POINTS">Points</option>
                                    <option value="TOKEN">Token</option>
                                    <option value="MONEY">Money</option>
                                </select>
                                <input
                                    type="number"
                                    value={newChore.rewardValue}
                                    onChange={e => setNewChore({...newChore, rewardValue: parseFloat(e.target.value)})}
                                    placeholder="Reward value"
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newChore.isAdhoc}
                                        onChange={e => setNewChore({...newChore, isAdhoc: e.target.checked})}
                                    />
                                    Is Ad-hoc
                                </label>
                                <input
                                    type="date"
                                    value={newChore.dueDate}
                                    onChange={e => setNewChore({...newChore, dueDate: e.target.value})}
                                    placeholder="Due date (optional)"
                                />

                                <button onClick={handleAssignChore}>Assign Chore</button>
                            </div>
                        </div>
                    )}

                </>
            )}
        </div>
    );
}