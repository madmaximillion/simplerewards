interface Reward {
    id: number;
    name: string;
    cost: number;
}

interface Props {
    rewards: Reward[];
    points: number;
    onRedeem: (id: number) => void;
}

export default function RewardShop({ rewards, points, onRedeem }: Props) {
    if (!rewards || rewards.length === 0) {
        return <p>No rewards available right now — check back later!</p>;
    }

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff'
            }}
        >
            <h2>Reward Shop</h2>
            <p>
                You have <strong>{points}</strong> points
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {rewards.map(reward => {
                    const canAfford = points >= reward.cost;
                    return (
                        <li
                            key={reward.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            <div>
                                <strong>{reward.name}</strong> — {reward.cost} pts
                            </div>
                            <button
                                onClick={() => onRedeem(reward.id)}
                                disabled={!canAfford}
                                style={{
                                    backgroundColor: canAfford ? '#2196F3' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '4px',
                                    cursor: canAfford ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Redeem
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}