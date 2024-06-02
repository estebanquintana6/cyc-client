import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Main from "../../components/Admin/Main/Main";

import { useAuthContext } from "../../components/contexts/AuthContext";

import authFetch from "../../utils/authFetch";

const AdminPanelPage = () => {
  const { token, unsetToken } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const { status } = await authFetch(
          "http://localhost:4000/auth",
          "GET",
          token,
        );

        if (status === 200) {
          setIsLoading(false);
        } else {
          unsetToken();
          navigate("/");
        }
      } catch {
        unsetToken();
        navigate("/");
      }
    };
    validateAuth();
  }, [token, navigate, unsetToken]);

  return (
    <>
      {!isLoading && (
        <>
          <Sidebar />
          <Main />
        </>
      )}
    </>
  );
};

export default AdminPanelPage;
