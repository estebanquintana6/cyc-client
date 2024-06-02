import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Main from "../../components/Admin/Main/Main";

import { useAuthContext } from "../../components/contexts/AuthContext";

const AdminPanelPage = () => {
    const { token, unsetToken } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const validateAuth = async () => {
            const { status } = await fetch('http://localhost:4000/auth', { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            });
    
            if (status !== 200) {
                unsetToken();
                navigate('/');
            }
        }
        validateAuth();
    }, [token]);

    return (
        <>
            <Sidebar />
            <Main />
        </>
    )
}

export default AdminPanelPage;