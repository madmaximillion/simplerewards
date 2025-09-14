// src/routes/role-protected-route.tsx
import { Navigate } from 'react-router-dom';

interface Props {
    children: JSX.Element;
    allowedRole: 'PARENT' | 'CHILD';
}

export default function RoleProtectedRoute({ children, allowedRole }: Props) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // store role after login

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (role !== allowedRole) {
        // Optionally redirect to their own dashboard
        return <Navigate to={`/${role.toLowerCase()}`} replace />;
    }

    return children;
}