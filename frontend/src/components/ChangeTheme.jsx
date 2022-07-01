import { useEffect, useState } from "react";

const ChangeTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    if (!theme || theme === "light") {
      document.querySelector("html").classList.add("light");
      document.querySelector("html").classList.remove("dark");
    } else if (theme && theme === "dark") {
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    }
  }, [theme]);

  const changeTheme = () => {
    if (!theme || theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else if (theme && theme === "dark") {
      localStorage.removeItem("theme");
      setTheme("light");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <label
        htmlFor="theme"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="theme"
          className="sr-only peer"
          onChange={changeTheme}
          checked={theme === "dark" ? true : false}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Tema gelap
        </span>
      </label>
    </div>
  );
};

export default ChangeTheme;
