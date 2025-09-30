"use client";
import { Globe } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "./theme-toggle-btn";

export default function SettingsComponent() {

  return (
    <div className="flex flex-col space-y-4 justify-start">
      <div className="text-xl font-medium flex z-10 text-[#90A3BF] items-center hover:bg-blue-50 hover:rounded-md cursor-pointer p-2">
        <Image
          src="/images/info.png"
          height={24}
          width={24}
          alt="Help"
          className="ml-3 mr-2"
        />
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
        {/* Theme Toggle Button*/}
        <ThemeToggle />
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
  );
}