import AuthService from '../services/auth.service';

const Navbar = () => {
    const user = AuthService.getCurrentUser();

    return (
        <header className="top-navbar">
            <div className="navbar-left">
                {/* Search bar is moved to Dashboard header */}
            </div>
            <div className="navbar-right">
                <div className="user-profile-header">
                    <div className="user-info-left" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem' }}>Namaste, {user?.username || 'Divya'}!</span>
                        <span style={{ color: '#6b6b6b', fontSize: '0.8rem' }}>{user?.username ? user.username + ' | Admin' : 'Divya Gupta | Admin'}</span>
                    </div>
                    <div className="avatar" style={{ margin: '0 10px', width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, var(--primary-color) 0%, #818cf8 100%)', color: 'white', borderRadius: '50%', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="user-info-right" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#6b6b6b', fontSize: '0.8rem' }}>Welcome back,</span>
                        <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem' }}>{user?.username || 'divya'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
