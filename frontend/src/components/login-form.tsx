import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth-api';
import { getUserProfile } from '../api/user-api';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Authenticate
            const { token } = await login(username, password);
            localStorage.setItem('token', token);

            // 2. Get user profile
            const user = await getUserProfile(token);
            localStorage.setItem('role', user.role);

            // 3. Redirect based on role
            if (user.role === 'PARENT') {
                navigate('/parent');
            } else if (user.role === 'CHILD') {
                navigate('/child');
            } else {
                setError('Unknown role');
            }
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '4rem auto',
                padding: '2rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem' }}>Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                {error && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        type="submit"
                        style={{
                            flex: 1,
                            marginRight: '0.5rem',
                            padding: '0.5rem',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        style={{
                            flex: 1,
                            marginLeft: '0.5rem',
                            padding: '0.5rem',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
