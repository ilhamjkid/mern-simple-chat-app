import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import states from "../stores";
import api from "../utils/api";
import Input from "../components/Forms/Input";
import Button from "../components/Forms/Button";
import Toast from "../components/Alerts/Toast";
import ChangeTheme from "../components/Themes/ChangeTheme";
import BondlikesLogo from "../images/logo/Bondlikes.svg";

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState(location.state);
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [userLogin, setUserLogin] = useRecoilState(states.userLoginState);
  const [, setUsers] = useRecoilState(states.usersState);

  const { email, password } = formLogin;

  useEffect(() => {
    if (userLogin) navigate("/");
  }, [userLogin, navigate]);

  const login = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setResponse({
        message: "Semua kolom wajib diisi.",
        path: "/login",
      });
    }
    const resultLogin = await api.authAPI.login(formLogin);
    if (!resultLogin?.success) {
      return setResponse({
        message: resultLogin?.message,
        path: "/login",
      });
    }
    const resultUsers = await api.userAPI.getUsers();
    setUserLogin(resultLogin?.user);
    setUsers(resultUsers?.users);
    navigate("/");
  };

  const changeEmail = (value) => {
    setFormLogin((prevState) => ({
      ...prevState,
      email: value,
    }));
  };
  const changePassword = (value) => {
    setFormLogin((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  window.history.replaceState({}, "");
  if (!userLogin) {
    return (
      <section className="w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center px-4">
        {response && response?.path === "/login" && (
          <Toast click={setResponse} class="rounded-3xl max-w-sm mb-4" childClass="font-medium">
            {response?.message}
          </Toast>
        )}
        <div className="container flex justify-center items-center">
          <div className="p-4 w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-4" onSubmit={login}>
              <img className="w-20 h-20 block mx-auto" src={BondlikesLogo} alt="Logo Bondlikes" />
              <h5 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                Silahkan masuk
              </h5>
              <div>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  change={changeEmail}
                  placeholder="john.doe@email.com"
                  class="rounded-3xl py-3 px-4"
                />
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  change={changePassword}
                  placeholder="••••••••"
                  class="rounded-3xl py-3 px-4"
                />
              </div>
              <Button type="submit" class="w-full rounded-3xl py-3 px-4">
                Submit
              </Button>
              <div className="text-center text-gray-900 dark:text-white">
                Belum punya akun?{" "}
                <Link className="text-blue-700 hover:underline" to="/register">
                  daftar
                </Link>{" "}
                dulu!
              </div>
              <ChangeTheme type="toggle" />
            </form>
          </div>
        </div>
      </section>
    );
  }
};

export default Login;
