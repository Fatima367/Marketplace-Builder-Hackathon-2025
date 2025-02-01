"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function TopNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-950">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-xl font-bold text-[#3563E9] dark:text-blue-400">
          Morent Admin
        </h1>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="dark:hover:bg-gray-700"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}