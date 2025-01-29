import { TopNav } from "@/components/top-nav";
import { SideNav } from "@/components/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6 bg-[#F6F7F9]">{children}</main>
      </div>
    </div>
  );
}