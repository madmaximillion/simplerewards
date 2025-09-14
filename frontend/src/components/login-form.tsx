import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth-api';
import { getUserProfile } from '../api/user-api'; // you'll create this

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

            // 2. Get user profile (or decode JWT)
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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
