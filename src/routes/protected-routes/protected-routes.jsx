import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const auth = localStorage.getItem('JWT');
    const authSession = sessionStorage.getItem('JWTSession');
    const location = useLocation();
    const type = useSelector((state) => state.login.type);

    if (!auth && !authSession && !type) return <Navigate to='/auth' state={{ from: location }} />;
    return <Outlet />;
};
