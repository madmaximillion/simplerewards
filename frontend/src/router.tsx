// src/router.tsx
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import ParentHome from './routes/parent-home';
import ChildHome from './routes/child-home';
import RoleProtectedRoute from './routes/role-protected-route';

export default function AppRouter() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected routes */}
            <Route
                path="/parent"
                element={
                    <RoleProtectedRoute allowedRole="PARENT">
                        <ParentHome />
                    </RoleProtectedRoute>
                }
            />
            <Route
                path="/child"
                element={
                    <RoleProtectedRoute allowedRole="CHILD">
                        <ChildHome />
                    </RoleProtectedRoute>
                }
            />
        </Routes>
    );
}