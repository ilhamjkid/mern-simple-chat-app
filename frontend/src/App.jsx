import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="chat"
        element={<Chat isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="login"
        element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="register"
        element={<Register isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
