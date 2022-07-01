import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <RecoilRoot>
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route
          path="login"
          element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route
          path="register"
          element={<Register isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path="*" isAuth={isAuth} element={<NotFound />} />
      </Routes>
    </RecoilRoot>
  );
};

export default App;
