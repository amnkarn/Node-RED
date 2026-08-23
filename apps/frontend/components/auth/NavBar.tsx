import Link from "next/link";
import { ChevronDown, Grid2x2X, CircleQuestionMark } from "lucide-react";


export default function AuthNav({type}: {type: "Signup" | "Login"}) {
    return (
        <nav className="w-full h-14 flex items-center justify-between px-8 text-sm text-black border-b border-zinc-200">
            <ul className="flex justify-center items-center gap-5">
                {/* logo */}
                <div className="">
                    <Link href="/" className="text-black" >
                        <span className="text-[#FF4F00] text-2xl font-extrabold">_</span>
                        <span className="text-2xl font-extrabold">Node-RED</span>
                    </Link>
                </div>
            </ul>

            <ul className="flex justify-center items-center gap-5 pr-2">
                <ListElemWithIcon 
                    name="Help" 
                    iconElem={
                        <CircleQuestionMark className="h-5 w-5" />
                    }
                />
                <ListElemWithIcon 
                    name="Explore apps" 
                    iconElem={
                        <Grid2x2X className="h-4 w-4 rotate-180 scale-x-[-1]" />
                    } 
                />
                <ListElem name="Contact Sales" border={true} />
                { type === "Signup" ?
                    <ListElem href="/login" name="Log in" /> :
                    <Link 
                        className="rounded-3xl bg-[#FF4F00] hover:bg-[#D24304] text-white py-2 px-3 font-bold cursor-pointer"
                        href={"/signup"} >
                        Sign up
                    </Link>
                }
            </ul>
            
        </nav>
    )
}

function ListElem({name, href, scrollIcon, border}: {
    name: string, 
    href?: string, 
    scrollIcon?: boolean, 
    border?: boolean
}) {
    return (
        <Link href={href || "#"} className={`flex gap-1 items-center hover:bg-[#F8F4F0] rounded-sm cursor-pointer py-2 px-2 ${border && "border border-zinc-300"}`}>
            { name } 
            {scrollIcon && <ChevronDown className="h-4 w-4" />}
        </Link>
    )
}

interface ListWithIconProps {
    name: string, 
    icon?: string,
    iconElem?: React.ReactNode
}

function ListElemWithIcon({ name, icon, iconElem }: ListWithIconProps) {
    return (
        <li className="flex gap-1 items-center hover:bg-[#F8F4F0] rounded-sm cursor-pointer py-2 px-2">
            { icon && <i className={`fa-brands ${icon} w-4 h-4`}></i> }
            { iconElem }
            {name}
        </li>
    )
}