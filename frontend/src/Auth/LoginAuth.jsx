import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function LoginAuth() {
    const user = useSelector((state)=>state.user.user)
    return user.token ? <Outlet /> : <Navigate to='/login' />
}

export default LoginAuth