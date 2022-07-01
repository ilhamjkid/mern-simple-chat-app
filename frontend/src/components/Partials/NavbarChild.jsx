const NavbarChild = (props) => {
  const { setUserChat, userChat } = props;
  return (
    <nav className="bg-blue-700 w-full h-auto flex justify-between items-center py-1 lg:px-4 fixed top-0 left-0 z-[9999]">
      <button
        type="button"
        onClick={() => setUserChat(null)}
        className="p-2 flex justify-center items-center"
      >
        <svg
          className="w-8 h-8 fill-white"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M623.095 400C623.095 417.7 609.695 432 591.995 432H285.295L390.695 537.4C403.195 549.9 403.195 570.15 390.695 582.65C384.395 588.9 376.195 592 367.995 592C359.795 592 351.615 588.875 345.375 582.625L185.375 422.625C172.875 410.125 172.875 389.875 185.375 377.375L345.375 217.375C357.875 204.875 378.125 204.875 390.625 217.375C403.125 229.875 403.125 250.125 390.625 262.625L285.295 368H591.995C609.695 368 623.095 382.3 623.095 400Z" />
        </svg>
      </button>
      <h5 className="text-lg font-medium text-white pr-4">{userChat.name}</h5>
    </nav>
  );
};

export default NavbarChild;
