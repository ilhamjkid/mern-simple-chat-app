import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props?.isAuth) navigate("/");
    else navigate("/login");
  }, [props?.isAuth, navigate]);
};

export default NotFound;
