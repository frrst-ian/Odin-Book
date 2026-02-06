import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const useOAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      handleOAuthCallback(token)
      navigate("/users")
    } else {
      navigate("/login");
    }
  }, [location, navigate, handleOAuthCallback]);

  return (<p>loading...</p>)

};

export default useOAuthCallback;
