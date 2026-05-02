import AuthService from '../services/auth.service';

const Navbar = () => {
    const user = AuthService.getCurrentUser();

    return (
        <header className="top-navbar">
            <div className="navbar-left">
                {/* We can add a search bar or breadcrumbs here in the future */}
            </div>
            <div className="navbar-right">
                <div className="user-profile">
                    <div className="avatar">
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="user-info">
                        <span className="welcome-text">Welcome back,</span>
                        <span className="username">{user?.username || 'User'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
