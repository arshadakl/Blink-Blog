import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function LogoutAth() {
    const user = useSelector((state)=>state.user.user)
    return user.token ?  <Navigate to='/' /> : <Outlet /> 
}

export default LogoutAth