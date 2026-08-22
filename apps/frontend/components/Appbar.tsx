import Link from "next/link";
import { ChevronDown, Grid2x2X } from "lucide-react";

export default function Appbar() {
    return (
        <nav className="w-full h-14 flex items-center justify-between px-8 text-sm text-black border-b border-zinc-200">
            {/* logo */}

            <ul className="flex justify-center items-center gap-5">
                <div className="">
                    <Link href="/" className="text-black" >
                        <span className="text-[#FF4F00] text-2xl font-extrabold">_</span>
                        <span className="text-2xl font-extrabold">Node-RED</span>
                    </Link>
                </div>

                <List name="Products" />
                <List name="Solutions" />
                <List name="Resources" />
                <List name="Enterprice" />
                <List name="Prising" />
            </ul>

            <ul className="flex justify-center items-center gap-5">
                <ListWithIcon name="Github" icon="fa-github" />
                <ListWithIcon 
                    name="Explore apps" 
                    iconElem={
                        <Grid2x2X className="h-4 w-4 rotate-180 scale-x-[-1]" />
                    } 
                />
                <li>Contact Sales</li>
                <li>Log in</li>
                <button 
                    className="rounded-3xl bg-[#FF4F00] hover:bg-[#D24304] text-white py-2 px-3 font-bold cursor-pointer">
                    Sign up
                </button>
            </ul>
            
        </nav>
    )
}

function List({name}: {name: string}) {
    return (
        <li className="flex gap-1 items-center hover:bg-[#F8F4F0] rounded-sm cursor-pointer py-2 px-2">
            { name } 
            <ChevronDown className="h-4 w-4" /> 
        </li>
    )
}

interface ListWithIconProps {
    name: string, 
    icon?: string,
    iconElem?: React.ReactNode
}

function ListWithIcon({ name, icon, iconElem }: ListWithIconProps) {
    return (
        <li className="flex gap-1 items-center hover:bg-[#F8F4F0] rounded-sm cursor-pointer py-2 px-2">
            { icon && <i className={`fa-brands ${icon} w-4 h-4`}></i> }
            { iconElem }
            {name}
        </li>
    )
}