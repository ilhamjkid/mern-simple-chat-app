import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import states from "../stores";

const NotFound = (props) => {
  const navigate = useNavigate();
  const [userLogin] = useRecoilState(states.userLoginState);
  useEffect(() => {
    if (userLogin) navigate("/");
    else navigate("/login");
  }, [userLogin, navigate]);
};

export default NotFound;
