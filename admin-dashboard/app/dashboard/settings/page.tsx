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
import { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-[#F6F7F9] dark:bg-gray-900 min-h-screen">
      <div className="flex justify-center mx-auto">
        <div className="p-4 bg-white dark:bg-gray-800 h-fit w-full mx-10 my-5 shadow-sm rounded-xl">
          <div className="flex flex-col space-y-4 justify-start">
            <div className="text-xl font-medium flex z-10 text-[#90A3BF] items-center hover:bg-blue-50 hover:rounded-md cursor-pointer p-2">
              <InfoIcon className="ml-3 mr-2 h-6 w-6" />
              <p>Help Center</p>
            </div>

            {/* Dark Mode Toggle */}
            <div className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between hover:bg-blue-50 hover:rounded-md cursor-pointer p-2">
              <div className="flex items-center">
                <Image
                  src="/images/briefcase.png"
                  height={24}
                  width={24}
                  alt="Theme"
                  className="ml-3 mr-2"
                />
                <p>Dark Mode</p>
              </div>
              <div
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-6 bg-[#F6F7F9] dark:bg-gray-700 rounded-full w-[68px] h-[34px] flex items-center justify-center space-x-3 cursor-pointer"
              >
                <div
                  className={`rounded-full ${theme === "light" ? "bg-[#3563E9]" : ""} h-7 w-7 flex items-center justify-center transition-colors`}
                >
                  <Sun
                    className={`h-4 w-4 ${theme === "light" ? "text-white" : "text-gray-400"}`}
                  />
                </div>
                <div
                  className={`rounded-full ${theme === "dark" ? "bg-[#3563E9]" : ""} h-7 w-7 flex items-center justify-center transition-colors`}
                >
                  <Moon
                    className={`h-4 w-4 ${theme === "dark" ? "text-white" : "text-gray-400"}`}
                  />
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between hover:bg-blue-50 hover:rounded-md cursor-pointer p-2 gap-2">
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