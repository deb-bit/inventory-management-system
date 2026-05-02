import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../services/auth.service';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(document.documentElement.getAttribute('data-theme') === 'dark');

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/products', label: 'Products', icon: '📦' },
        { path: '/products/add', label: 'Add Product', icon: '➕' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Inventory Pro</h2>
            </div>
            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={toggleTheme} className="btn-logout" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <span className="icon">{isDark ? '☀️' : '🌙'}</span> 
                    {isDark ? 'Light Mode' : 'Night Mode'}
                </button>
                <button onClick={handleLogout} className="btn-logout">
                    <span className="icon">🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
