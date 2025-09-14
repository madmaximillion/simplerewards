// src/components/header.tsx
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/'); // back to login
    };

    const handleLogin = () => {
        navigate('/'); // go to login page
    };

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',backgroundColor: '#333', // dark background
                color: '#fff',           // white text
                marginBottom: '1rem'
            }}
        >
            <h1>SimpleRewards</h1>
            {token ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </header>
    );
}