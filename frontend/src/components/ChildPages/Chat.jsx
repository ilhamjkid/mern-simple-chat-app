import { useRecoilState } from "recoil";
import {
  messagesState,
  userLoginState,
  userChatState,
} from "../../stores/states";
import NavbarChild from "../Partials/NavbarChild";
import RightMessage from "../Messages/RightMessage";
import LeftMessage from "../Messages/LeftMessage";
import { useEffect, useState } from "react";
import Textarea from "../Forms/Textarea";

const Chat = (props) => {
  const [userChat, setUserChat] = useRecoilState(userChatState);
  const [userLogin] = useRecoilState(userLoginState);
  const [messages, setMessages] = useRecoilState(messagesState);

  const [formMessage, setFormMessage] = useState({
    userId: userLogin._id,
    value: "",
  });

  useEffect(() => {
    const lastSide = document.getElementById("last-side");
    lastSide.scrollIntoView();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (formMessage.value === "") return;
    const _id = messages.length + 1;
    setMessages((prevState) => [...prevState, { ...formMessage, _id }]);
    setFormMessage((prevState) => ({ ...prevState, value: "" }));
  };

  const changeValue = (value) => {
    setFormMessage((prevState) => ({ ...prevState, value }));
  };

  return (
    <div className="w-full lg:w-[75%] h-full pt-14 flex flex-col justify-start items-center">
      <NavbarChild userChat={userChat} setUserChat={setUserChat} />
      <div className="w-full h-screen py-2 px-4 overflow-x-auto">
        {messages.map((msg) => {
          if (msg.userId === userLogin._id) {
            return <RightMessage key={msg._id}>{msg.value}</RightMessage>;
          } else return <LeftMessage key={msg._id}>{msg.value}</LeftMessage>;
        })}
        <div id="last-side" className="w-full h-17"></div>
      </div>
      <div className="w-full lg:w-[75%] bg-gray-100 dark:bg-gray-700 fixed right-0 bottom-0 border-t border-gray-200 dark:border-gray-600">
        <form onSubmit={sendMessage}>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 py-3 px-4">
            <Textarea
              rows={1}
              placeholder="Ketik pesan..."
              value={formMessage.value}
              change={changeValue}
              class="mr-3 resize-none"
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
