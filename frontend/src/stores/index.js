import axios from "axios";
import { atom, selector } from "recoil";
import Cookies from "js-cookie";

const authURL = "http://localhost:5000/api/auth";
const userURL = "http://localhost:5000/api/users";

const userLoginAtom = atom({
  key: "userLoginAtom",
  default: null,
});
export const userLoginState = selector({
  key: "userLoginState",
  get: async ({ get }) => {
    const userLogin = get(userLoginAtom);
    if (userLogin) return userLogin;
    if (!Cookies.get("authenticated")) return null;
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken.data.accessToken;
      const resultUserLogin = await axios.get(userURL, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultUserLogin.data.user;
    } catch (error) {
      return null;
    }
  },
  set: ({ set }, newValue) => {
    set(userLoginAtom, newValue);
  },
});

const usersAtom = atom({
  key: "usersAtom",
  default: null,
});
export const usersState = selector({
  key: "usersState",
  get: async ({ get }) => {
    const users = get(usersAtom);
    if (users) return users;
    if (!Cookies.get("authenticated")) return null;
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken.data.accessToken;
      const resultUsers = await axios.get(`${userURL}/all`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultUsers.data.users;
    } catch (error) {
      return null;
    }
  },
  set: ({ set }, newValue) => {
    set(usersAtom, newValue);
  },
});

export const userChatState = atom({
  key: "userChatState",
  default: null,
});

export const messagesState = atom({
  key: "messagesState",
  default: null,
});

const states = {
  userLoginState,
  usersState,
  userChatState,
  messagesState,
};
export default states;
