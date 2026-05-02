import api from './api';

const register = (username, password) => {
    return api.post('/auth/register', {
        username,
        password,
    });
};

const login = async (username, password) => {
    const response = await api.post('/auth/login', {
        username,
        password,
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
