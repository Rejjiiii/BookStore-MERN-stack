import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');
        // distpatch logout action
        dispatch({ type: 'LOGOUT' });
        // redirect to login page
        navigate("/login");
    }

    return { logout };
}