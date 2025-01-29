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
    <nav className="w-64 min-h-[100rem] bg-white">
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
                  ? "text-[#1A202C] bg-blue-50"
                  : "text-[#90A3BF] hover:text-[#1A202C] hover:bg-blue-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}