import { atom } from "recoil";

export const usersState = atom({
  key: "usersState",
  default: [
    { _id: 1, name: "Darso", email: "darso@gmail.com" },
    { _id: 2, name: "Usan", email: "usan@gmail.com" },
    { _id: 3, name: "Rano", email: "rano@gmail.com" },
    { _id: 4, name: "Karno", email: "karno@gmail.com" },
    { _id: 5, name: "John Doe", email: "john.doe@gmail.com" },
  ],
});

export const userLoginState = atom({
  key: "userLoginState",
  default: {
    _id: 5,
    name: "John Doe",
    email: "john.doe@gmail.com",
  },
});

export const userChatState = atom({
  key: "userChatState",
  default: null,
});

const states = { usersState, userLoginState, userChatState };
export default states;
