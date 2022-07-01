import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props?.isAuth) navigate("/login");
  }, [props?.isAuth, navigate]);
  return <div>Home</div>;
};

export default Home;
