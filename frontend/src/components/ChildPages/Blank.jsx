import { useState, useEffect } from "react";

const Blank = (props) => {
  const [emoticon, setEmoticon] = useState("😀");
  const [emoticons] = useState([
    "😀",
    "😁",
    "😉",
    "🙂",
    "😗",
    "😙",
    "😋",
    "😍",
  ]);

  const setEmoValues = () => {
    const number = Math.ceil(Math.random() * 7);
    setEmoticon(emoticons[number]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEmoValues();
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div className="hidden lg:flex lg:justify-center lg:items-center w-[75%] h-screen">
      <div className="text-9xl text-center">{emoticon}</div>
    </div>
  );
};

export default Blank;
