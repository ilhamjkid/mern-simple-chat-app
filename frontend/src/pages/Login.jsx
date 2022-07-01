import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import ChangeTheme from "../components/ChangeTheme";
import BondlikesLogo from "../images/logo/Bondlikes.svg";

const Login = (props) => {
  const [error, setError] = useState(null);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (props?.isAuth) navigate("/");
  }, [props?.isAuth, navigate]);

  const login = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setError("Semua kolom wajib diisi.");
    } else props?.setIsAuth(true);
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

  return (
    <section className="w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center px-4">
      {error && (
        <Toast
          click={setError}
          class="rounded-3xl max-w-sm mb-4"
          childClass="font-medium"
        >
          {error}
        </Toast>
      )}
      <div className="container flex justify-center items-center">
        <div className="p-4 w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-4" onSubmit={login}>
            <img
              className="w-20 h-20 block mx-auto"
              src={BondlikesLogo}
              alt="Logo Bondlikes"
            />
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
};

export default Login;
