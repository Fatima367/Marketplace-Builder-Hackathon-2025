"use client";
import { TopNav } from "@/components/top-nav";
import { SideNav } from "@/components/side-nav";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6 bg-[#F6F7F9] dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}