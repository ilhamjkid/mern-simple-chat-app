import { atom } from "recoil";

const usersState = atom({
  key: "usersState",
  default: [
    { _id: 1, name: "Darso", email: "darso@gmail.com" },
    { _id: 2, name: "Usan", email: "usan@gmail.com" },
    { _id: 3, name: "Rano", email: "rano@gmail.com" },
    { _id: 4, name: "Karno", email: "karno@gmail.com" },
    { _id: 5, name: "John Doe", email: "john.doe@gmail.com" },
  ],
});

const userLoginState = atom({
  key: "userLoginState",
  default: {
    _id: 5,
    name: "John Doe",
    email: "john.doe@gmail.com",
  },
});

const userChatState = atom({
  key: "userChatState",
  default: null,
});

const messagesState = atom({
  key: "messagesState",
  default: [
    {
      _id: 1,
      value: "Lorem ipsum dolor sit amet consectetur assumenda.",
      userId: 1,
    },
    {
      _id: 2,
      value:
        "Lorem ipsum dolor sit sit amet consectetur assumendaamet sit sit amet consectetur consectetur assumenda.",
      userId: 5,
    },
    {
      _id: 3,
      value:
        "Lorem ipsum dolor sit ametsit amet consectetur assumenda consectetur assumenda.",
      userId: 5,
    },
    {
      _id: 4,
      value: "Lorem ipsum dolor sit amet consectetur assumenda.",
      userId: 1,
    },
    {
      _id: 5,
      value:
        "Lorem ipsumsit amet consectetur assumenda dolor sit amet consectetur assumenda.",
      userId: 1,
    },
    {
      _id: 6,
      value: "Lorem ipsum dolor sit amet consectetur assumenda.",
      userId: 5,
    },
    {
      _id: 7,
      value:
        "Lorem ipsumsit amet consectetur assumenda dolor sit amet consectetur assumenda.",
      userId: 1,
    },
    {
      _id: 8,
      value: "Lorem ipsum dolor sit amet consectetur assumenda.",
      userId: 5,
    },
  ],
});

const states = { usersState, userLoginState, userChatState, messagesState };
export { usersState, userLoginState, userChatState, messagesState };
export default states;
