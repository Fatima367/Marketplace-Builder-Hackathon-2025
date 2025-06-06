"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  CalendarRange,
  Users,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Cars",
    href: "/dashboard/cars",
    icon: Car,
  },
  {
    name: "Rentals",
    href: "/dashboard/rentals",
    icon: CalendarRange,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:w-64 md:w-36 min-h-[100rem] bg-white dark:bg-gray-950">
      <div className="space-y-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-[#1A202C] bg-blue-50 dark:bg-gray-200"
                  : "text-[#90A3BF] hover:text-[#1A202C] hover:bg-blue-50 dark:hover:bg-gray-200"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}