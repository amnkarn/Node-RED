"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Zap,
  Plus,
  Folder,
  History,
  Settings,
  HelpCircle,
  LogOut,
  Layers,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Zaps", href: "/zaps", icon: Zap },
    { name: "Apps", href: "/apps", icon: Layers },
    { name: "Zap Runs", href: "/runs", icon: History },
  ];

  const secondaryItems = [
    { name: "My Folders", href: "/folders", icon: Folder },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/support", icon: HelpCircle },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Brand Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2">
            <Link href="/home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:bg-orange-600 transition-colors">
                ⚡
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-800">
                Node-<span className="text-orange-500">RED</span>
              </span>
            </Link>
          </div>

          {/* Create Zap Button */}
          <div className="p-4">
            <Link
              href="/zap/create"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 text-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Zap</span>
            </Link>
          </div>

          {/* Main Navigation Menu */}
          <div className="px-3 py-2 space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/zaps" && pathname.startsWith("/zap"));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-orange-500" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-orange-500" />}
                </Link>
              );
            })}
          </div>

          {/* Secondary Menu */}
          <div className="px-3 py-4 space-y-1 border-t border-slate-100 mt-4">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Organization
            </p>
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Account / Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                U
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-slate-800 truncate">Workspace User</span>
                <span className="text-[11px] text-slate-400 truncate">Free Plan</span>
              </div>
            </div>
            <Link href="/login" title="Logout" className="text-slate-400 hover:text-red-500 p-1">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}