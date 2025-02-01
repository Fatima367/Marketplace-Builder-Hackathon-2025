"use client";
import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, InfoIcon, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuInfo } from "react-icons/lu";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };
  return (
    <div className="bg-[#F6F7F9] dark:bg-gray-900 min-h-screen">
      <div className="flex justify-center mx-auto">
        <div className="p-4 bg-white dark:bg-gray-800 h-fit w-full mx-10 my-5 shadow-sm rounded-xl">
          <div className="flex flex-col space-y-4 justify-start">
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center hover:bg-blue-50 
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:rounded-md cursor-pointer p-2"
            >
              <InfoIcon className="ml-3 mr-2 h-6 w-6" />
              <p>Help Center</p>
            </div>

            {/* Dark Mode Toggle */}
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:bg-blue-50 hover:rounded-md cursor-pointer p-2"
            >
              <div className="flex items-center">
                <LuInfo className="ml-3 mr-2 h-6 w-6" />
                <p>Dark Mode</p>
              </div>
              <div
                onClick={toggleTheme}
                className="ml-6 bg-[#F6F7F9] dark:bg-gray-700 rounded-full w-[68px] h-[34px] flex items-center justify-center space-x-3 cursor-pointer"
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
              </div>
            </div>

            {/* Language Switcher */}
            <div
              className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between 
            dark:hover:bg-gray-200 dark:hover:text-gray-950 hover:bg-blue-50 hover:rounded-md cursor-pointer p-2 gap-2"
            >
              <div className="flex items-center">
                <Globe className="ml-3 mr-2 h-6 w-6" />
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