"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    ChevronRight,
    LucideIcon
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
    children?: React.ReactNode;
    state?: "expanded" | "collapsed"
}

export default function Sidebar({ children, state = "expanded" }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        const res = await fetch("/api/logout", { method: "POST" });
        if(res.ok) {
            router.push("/");
        }
    }

return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
        {/* Sidebar Navigation */}
        <aside className={`bg-white border-r border-slate-200 flex flex-col justify-between items-center shrink-0 select-none ${state === "expanded" ? "w-64" : "w-16"}`}>
            <div className="w-full">
                {/* Logo */}
                <div className={`h-16 flex items-center border-b border-slate-100 gap-2 ${state==="expanded" ? "px-2" : "justify-center"}`}>
                    <Link href="/home" className="flex items-center gap-2 group">
                        <Image src={"/logo.png"} alt="logo" height={35} width={35} className="h-9 w-9" />
                        <span className="font-extrabold text-xl tracking-tight text-slate-800">
                            {state === "expanded"
                                ?
                                <>Node-<span className="text-orange-500">RED</span></>
                                :
                                ""
                            }
                        </span>
                    </Link>
                </div>

                {/* Create Zap Button */}
                <div className={`p-4 ${state==="expanded" ? "" : "flex justify-center"}`}>
                    <Link
                        href="/zap/create"
                        className={`flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold ${state==="expanded" ? "rounded-xl w-full py-2.5 px-4" : "rounded-4xl w-12 h-8"}`}
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        {state==="expanded" ? <span>Create Zap</span> : "" }
                    </Link>
                </div>
            

                {/* Main Menu */}
                <div className={`${state==="expanded" ? "px-3" : "px-2"} py-2 space-y-1`}>
                    <p className={`${state==="expanded" ? "px-3" : "text-center"} text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2`}>
                        Menu
                    </p>
                    <SidebarItem
                        name="Home"
                        href="/home"
                        icon={Home}
                        isActive={pathname === '/home'}
                        state={state}
                    />
                    <SidebarItem
                        name="Zaps"
                        href="/zaps"
                        icon={Zap}
                        isActive={pathname === '/zaps'}
                        state={state}
                    />
                    <SidebarItem
                        name="Apps"
                        href="/apps"
                        icon={Layers}
                        isActive={pathname === '/apps'}
                        state={state}
                    />
                    <SidebarItem
                        name="Zap Runs"
                        href="/runs"
                        icon={History}
                        isActive={pathname === '/runs'}
                        state={state}
                    />
                </div>

                {/* Secondary Menu */}
                <div className={`${state==="expanded" ? "px-3" : "px-2"} py-4 space-y-1 border-t border-slate-100 mt-4`}>
                    <p className={`${state==="expanded" ? "px-3" : "text-center"} text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2`}>
                        {state==="expanded" ? "Organization" : "Org" }
                    </p>

                    <SidebarSeondaryItem
                        name="My Folders"
                        href="/folders"
                        icon={Folder}
                        isActive={pathname === '/folders'}
                        state={state}
                    />
                    <SidebarSeondaryItem
                        name="Settings"
                        href="/settings"
                        icon={Settings}
                        isActive={pathname === '/settings'}
                        state={state}
                    />
                    <SidebarSeondaryItem
                        name="Help & Support"
                        href="/support"
                        icon={HelpCircle}
                        isActive={pathname === '/support'}
                        state={state}
                    />
                </div>
            </div>

            {/* User Account */}
            <div className={`p-4 border-t border-slate-100 ${state==="expanded" ? "" : "flex justify-center"}`}>
                {state==="expanded"
                    ?
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

                        <button onClick={handleLogout} title="Logout" className="text-slate-400 hover:text-red-500 p-1">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                    :
                    <button onClick={handleLogout} title="Logout" className="text-slate-400 hover:text-red-500 p-1">
                        <LogOut className="w-4 h-4" />
                    </button>
                }

            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
            {children}
        </main>
    </div>
);
}


function SidebarItem({
    name,
    href,
    icon,
    isActive,
    state
}: {
    name: string,
    href: string,
    icon: LucideIcon,
    isActive: boolean,
    state?: "expanded" | "collapsed"
}) {
    const Icon = icon;

    return (
        <Link
            key={name}
            href={href}
            className={`flex items-center ${state==="expanded" ? "justify-between px-3" : "justify-center px-2"} py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                ? "bg-orange-50 text-orange-600 font-semibold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
        >
            <div className={`flex items-center ${state==="expanded" ? "gap-3" : ""}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-orange-500" : "text-slate-400"}`} />
                {state==="expanded" ? <span>{name}</span> : ""}

            </div>
            {isActive && state==="expanded" && <ChevronRight className="w-4 h-4 text-orange-500" />}
        </Link>
    );
}

function SidebarSeondaryItem({
    name,
    href,
    icon,
    isActive,
    state
}: {
    name: string,
    href: string,
    icon: LucideIcon,
    isActive: boolean,
    state?: "expanded" | "collapsed"
}) {

    const Icon = icon;
    return (
        <Link
            key={name}
            href={href}
            className={`flex items-center ${state==="expanded" ? "gap-3 px-3" : "justify-center px-2"} py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                ? "bg-orange-50 text-orange-600 font-semibold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
        >
            <Icon className="w-4 h-4 text-slate-400" />
            {state==="expanded" ? <span>{name}</span> : ""}
        </Link>
    )
}