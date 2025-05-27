"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, InfoIcon, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };
  
  return (
    <div className="bg-[#F6F7F9] dark:bg-gray-900 min-h-screen">
      <div className="flex justify-center mx-auto">
        <div className="lg:p-4 md:p-4 p-3 bg-white dark:bg-gray-800 h-fit w-full lg:mx-10 my-5 shadow-sm rounded-xl">
          <div className="flex flex-col space-y-4 justify-start">
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center hover:bg-blue-50 
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:rounded-md cursor-pointer lg:p-2 md:p-2"
            >
              <InfoIcon className="lg:ml-3 md:ml-3 ml-1 mr-2 h-6 w-6" />
              <p>Help Center</p>
            </div>

            {/* Dark Mode Toggle */}
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:bg-blue-50 hover:rounded-md cursor-pointer lg:p-2 md:p-2"
            >
              <div className="flex items-center">
                <HiOutlineBriefcase className="lg:ml-3 md:ml-3 ml-1 mr-2 h-6 w-6" />
                <p>Dark Mode</p>
              </div>
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="lg:ml-6 md:ml-6 bg-[#F6F7F9] dark:bg-gray-700 rounded-full w-[68px] h-[34px] flex items-center justify-center space-x-3 cursor-pointer"
              >
                <div
                  className={`rounded-full ${!isDarkMode ? "bg-[#3563E9]" : ""} h-7 w-7 flex items-center justify-center transition-colors`}
                >
                  <Sun
                    className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-white"}`}
                  />
                </div>
                <div
                  className={`rounded-full ${isDarkMode ? "bg-[#3563E9]" : ""} h-7 w-7 flex items-center justify-center transition-colors`}
                >
                  <Moon
                    className={`h-4 w-4 ${isDarkMode ? "text-white" : "text-gray-400"}`}
                  />
                </div>
              </button>
            </div>

            {/* Language Switcher */}
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between 
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:bg-blue-50 hover:rounded-md cursor-pointer lg:p-2 md:p-2 gap-2"
            >
              <div className="flex items-center">
                <Globe className="lg:ml-3 md:ml-3 ml-1 mr-2 h-6 w-6" />
                <p>Language</p>
              </div>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;