import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import states from "../stores";
import api from "../utils/api";
import Navbar from "../components/Partials/Navbar";
import Chat from "../components/ChildPages/Chat";
import Blank from "../components/ChildPages/Blank";

const Home = (props) => {
  const navigate = useNavigate();
  const [userLogin] = useRecoilState(states.userLoginState);
  const [users] = useRecoilState(states.usersState);
  const [userChat, setUserChat] = useRecoilState(states.userChatState);
  const [, setMessages] = useRecoilState(states.messagesState);

  useEffect(() => {
    if (!userLogin || !users) {
      navigate("/login");
    }
  }, [userLogin, users, navigate]);

  const setupMessages = async (user) => {
    const resultMessages = await api.messageAPI.getMessages(user._id);
    if (resultMessages?.success) {
      setUserChat(user);
      setMessages(resultMessages?.messages);
    }
  };

  if (users) {
    return (
      <section className="w-full h-screen">
        <Navbar />
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
                      className="w-full h-auto py-5 px-8 bg-white dark:bg-gray-800 rounded-4xl border border-gray-200 dark:border-gray-600 cursor-pointer"
                      onClick={() => setupMessages(user)}
                    >
                      <h5 className="text-gray-800 dark:text-white text-center text-xl font-medium select-none">
                        {user.name}
                      </h5>
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
  }
};

export default Home;
