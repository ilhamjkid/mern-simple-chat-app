import axios from "axios";

const authURL = "http://localhost:5000/api/auth";
const userURL = "http://localhost:5000/api/users";
const msgURL = "http://localhost:5000/api/messages";

// Auth API
export const authAPI = {
  // Register => POST => /api/auth/register
  register: async (data) => {
    try {
      const resultRegister = await axios.post(`${authURL}/register`, data);
      return resultRegister?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // Login => POST => /api/auth/login
  login: async (data) => {
    try {
      const resultLogin = await axios.post(`${authURL}/login`, data);
      return resultLogin?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // Logout => DELETE => /api/auth/logout
  logout: async () => {
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken?.data?.accessToken;
      const resultLogout = await axios.delete(`${authURL}/logout`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultLogout?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

// User API
const userAPI = {
  // Get User Login => GET => /api/users
  getUserLogin: async () => {
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken?.data?.accessToken;
      const resultUserLogin = await axios.get(userURL, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultUserLogin?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // Get Users => GET => /api/users/all
  getUsers: async () => {
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken?.data?.accessToken;
      const resultUsers = await axios.get(`${userURL}/all`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultUsers?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

// Message API
const messageAPI = {
  // Send Message => POST => /api/messages
  sendMessage: async (data) => {
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken?.data?.accessToken;
      const resultMessage = await axios.post(msgURL, data, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultMessage?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // Get Messages => GET => /api/messages/:receivedId
  getMessages: async (receivedId) => {
    try {
      const resultToken = await axios.get(`${authURL}/refresh`);
      const token = resultToken?.data?.accessToken;
      const resultMessages = await axios.get(`${msgURL}/${receivedId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return resultMessages?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

const api = { authAPI, userAPI, messageAPI };
export default api;
