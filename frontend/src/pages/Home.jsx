import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usersState, userLoginState, userChatState } from "../utils/states";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Blank from "../components/Blank";

const Home = (props) => {
  const [users] = useRecoilState(usersState);
  const [userLogin] = useRecoilState(userLoginState);
  const [userChat, setUserChat] = useRecoilState(userChatState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props?.isAuth) navigate("/login");
  }, [props?.isAuth, navigate]);

  return (
    <section className="w-full h-screen">
      <Navbar name={userLogin.name} setIsAuth={props?.setIsAuth} />
      <div className="w-full h-full flex justify-between items-center">
        <div
          className={`w-full lg:w-[25%] h-full bg-gray-100 dark:bg-gray-700 border-r border-transparent lg:border-gray-200 dark:lg:border-gray-600 p-2 pt-17 ${
            userChat && "hidden lg:block"
          }`}
        >
          {users.map((user) => {
            if (user._id !== userLogin._id) {
              return (
                <div key={user._id} className="w-full h-auto p-2">
                  <div
                    className="w-full h-auto py-2 px-8 bg-white dark:bg-gray-800 rounded-4xl border border-gray-200 dark:border-gray-600 cursor-pointer"
                    onClick={() => setUserChat(user)}
                  >
                    <h5 className="text-gray-800 dark:text-white text-lg font-medium select-none">
                      {user.name}
                    </h5>
                    <div className="text-gray-800 dark:text-gray-400 select-none">
                      Lorem ipsum dolor sit amet.
                    </div>
                  </div>
                </div>
              );
            } else return "";
          })}
        </div>
        {userChat ? <Chat /> : <Blank />}
      </div>
    </section>
  );
};

export default Home;
