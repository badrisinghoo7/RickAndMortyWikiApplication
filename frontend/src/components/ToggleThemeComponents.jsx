import React, { useEffect, useState } from "react";

const ToggleThemeComponents = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    document.body.className = theme ? "dark" : "";
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);
  return (
    <div>
      <button onClick={() => setTheme(!theme)}>Toggle Theme</button>
    </div>
  );
};

export default ToggleThemeComponents;
