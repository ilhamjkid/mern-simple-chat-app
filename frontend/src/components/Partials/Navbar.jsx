import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import states from "../../stores";
import api from "../../utils/api";
import ChangeTheme from "../Themes/ChangeTheme";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useRecoilState(states.userLoginState);
  const [, setUsers] = useRecoilState(states.usersState);

  const logout = async () => {
    const resultLogout = await api.authAPI.logout();
    if (resultLogout?.success) {
      setUserLogin(null);
      setUsers(null);
      navigate("/login");
    }
  };

  if (userLogin) {
    return (
      <nav className="bg-blue-700 w-full h-auto flex justify-between items-center px-4 fixed top-0 z-[999]">
        <h5 className="text-lg font-medium text-white">{userLogin.name}</h5>
        <div className="flex justify-center items-center py-2">
          <ChangeTheme type="button" />
          <button
            type="button"
            onClick={logout}
            className="text-white bg-blue-600 hover:bg-blue-800 shadow-sm overflow-hidden font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
          >
            Keluar
          </button>
        </div>
      </nav>
    );
  }
};

export default Navbar;
