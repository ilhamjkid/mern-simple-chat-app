import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props?.isAuth) navigate("/login");
  }, [props?.isAuth, navigate]);
  return <div>Chat</div>;
};

export default Chat;
