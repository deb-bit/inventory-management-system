import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PrivateRoute = () => {
    const user = AuthService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-wrapper">
                <Navbar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateRoute;
