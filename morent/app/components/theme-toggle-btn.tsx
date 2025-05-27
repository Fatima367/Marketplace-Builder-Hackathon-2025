"use client"
import { useState } from "react";
import { Sun, Moon } from "lucide-react"; // Replace with your icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-[#F6F7F9] dark:bg-gray-700 rounded-full w-[68px] h-[34px] flex items-center justify-center space-x-1 cursor-pointer focus:outline-none"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div
        className={`rounded-full ${
          theme === "light" ? "bg-[#3563E9]" : ""
        } h-7 w-7 flex items-center justify-center transition-colors`}
      >
        <Sun
          className={`h-4 w-4 ${
            theme === "light" ? "text-white" : "text-gray-400"
          }`}
        />
      </div>
      <div
        className={`rounded-full ${
          theme === "dark" ? "bg-[#3563E9]" : ""
        } h-7 w-7 flex items-center justify-center transition-colors`}
      >
        <Moon
          className={`h-4 w-4 ${
            theme === "dark" ? "text-white" : "text-gray-400"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
