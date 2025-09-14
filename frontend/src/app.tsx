// src/app.tsx
import Header from './components/header';
import AppRouter from './router';

export default function App() {
    return (
        <div className="app-container">
            <Header />
            <AppRouter />
        </div>
    );
}