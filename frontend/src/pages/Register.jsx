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

const Register = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState(location.state);
  const [formRegister, setFormRegister] = useState({
    name: "", email: "", password: "",
  });
  const [userLogin] = useRecoilState(states.userLoginState);

  const { name, email, password } = formRegister;

  useEffect(() => {
    if (userLogin) navigate("/");
  }, [userLogin, navigate]);

  const register = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      return setResponse({
        message: "Semua kolom wajib diisi.",
        path: "/register",
      });
    }
    const result = await api.authAPI.register(formRegister);
    if (!result?.success) {
      return setResponse({
        message: result?.message,
        path: "/register",
      });
    }
    navigate("/login", {
      state: {
        message: result?.message,
        path: "/login",
      },
    });
  };

  const changeName = (value) => {
    setFormRegister((prevState) => ({
      ...prevState,
      name: value,
    }));
  };
  const changeEmail = (value) => {
    setFormRegister((prevState) => ({
      ...prevState,
      email: value,
    }));
  };
  const changePassword = (value) => {
    setFormRegister((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  window.history.replaceState({}, "");
  if (!userLogin) {
    return (
      <section className="w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center px-4">
        {response && response?.path === "/register" && (
          <Toast click={setResponse} class="rounded-3xl max-w-sm mb-4" childClass="font-medium">
            {response?.message}
          </Toast>
        )}
        <div className="container flex justify-center items-center">
          <div className="p-4 w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-4" onSubmit={register}>
              <img className="w-20 h-20 block mx-auto" src={BondlikesLogo} alt="Logo Bondlikes" />
              <h5 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                Silahkan daftar
              </h5>
              <div>
                <Input
                  type="text"
                  value={name}
                  change={changeName}
                  placeholder="John Doe"
                  class="rounded-3xl py-3 px-4"
                />
              </div>
              <div>
                <Input
                  type="email"
                  value={email}
                  change={changeEmail}
                  placeholder="john.doe@email.com"
                  class="rounded-3xl py-3 px-4"
                />
              </div>
              <div>
                <Input
                  type="password"
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
                Sudah punya akun? silahkan{" "}
                <Link className="text-blue-700 hover:underline" to="/login">
                  masuk!
                </Link>
              </div>
              <ChangeTheme type="toggle" />
            </form>
          </div>
        </div>
      </section>
    );
  }
};

export default Register;
