import { useEffect, useState } from "react";
import ToggleTheme from "../Themes/ToggleTheme";
import ButtonTheme from "../Themes/ButtonTheme";

const ChangeTheme = (props) => {
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

  if (props?.type === "toggle") {
    return <ToggleTheme theme={theme} changeTheme={changeTheme} />;
  } else if (props?.type === "button") {
    return <ButtonTheme theme={theme} changeTheme={changeTheme} />;
  } else return null;
};

export default ChangeTheme;
