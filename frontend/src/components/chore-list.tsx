interface Chore {
    id: number;
    name: string;
    reward: number;
    status: 'PENDING' | 'PENDING_APPROVAL' | 'COMPLETED';
}

interface Props {
    chores: Chore[];
    onComplete: (id: number) => void;
}

export default function ChoreList({ chores, onComplete }: Props) {
    if (!chores || chores.length === 0) {
        return <p>No chores assigned right now 🎉</p>;
    }

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff',
                marginBottom: '1.5rem'
            }}
        >
            <h2>Your Chores</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {chores.map(chore => (
                    <li
                        key={chore.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem 0',
                            borderBottom: '1px solid #eee'
                        }}
                    >
                        <div>
                            <strong>{chore.name}</strong> — {chore.reward} pts
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                Status: {chore.status.replace('_', ' ')}
                            </div>
                        </div>
                        {chore.status === 'PENDING' && (
                            <button
                                onClick={() => onComplete(chore.id)}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Complete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}