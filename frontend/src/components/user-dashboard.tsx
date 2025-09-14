interface User {
    id: number;
    username: string;
    displayName: string;
    role: 'PARENT' | 'CHILD';
    points: number;
}

interface Props {
    user: User;
}

export default function UserDashboard({ user }: Props) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                backgroundColor: '#f9f9f9'
            }}
        >
            <h2 style={{ marginTop: 0 }}>{user.displayName}</h2>
            <p>
                <strong>Role:</strong> {user.role}
            </p>
            <p>
                <strong>Points:</strong> {user.points}
            </p>
        </div>
    );
}