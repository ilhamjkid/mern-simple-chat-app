import ChangeTheme from "./ChangeTheme";

const Navbar = (props) => {
  return (
    <nav className="bg-blue-700 w-full h-auto flex justify-between items-center px-4 fixed top-0 z-[999]">
      <h5 className="text-lg font-medium text-white">{props?.name}</h5>
      <div className="flex justify-center items-center py-2">
        <ChangeTheme type="button" />
        <button
          type="button"
          onClick={() => props?.setIsAuth(false)}
          className="text-white bg-blue-600 hover:bg-blue-800 shadow-sm overflow-hidden font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Keluar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
