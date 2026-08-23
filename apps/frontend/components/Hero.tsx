import { ShieldPlus, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="w-full flex flex-col items-center ">
            <div className="w-3xl">
                <div className="flex flex-col items-center pt-24">
                    <p className="text-xs text-zinc-600 uppercase">AI automation, governed</p>
                    <h1 className="text-5xl text-black font-medium py-5">Your tools. Your rules. Any AI.</h1>
                    <p className="text-[15px] text-zinc-800 px-15 text-center">
                        Zapier gives teams one place to set guardrails, manage model access, and see everything — so everyone can build with AI confidently, on any model, without waiting for permission.
                    </p>

                    <div className="flex items-center gap-10 py-8">
                        <Link href={"/signup"} className="bg-[#FF4F00] hover:bg-[#D24304] py-2 px-3 rounded-sm font-bold cursor-pointer">
                            Start free with email
                        </Link>

                        <Link href={"/login"} className="border border-zinc-950 hover:border-zinc-300 transition-transform py-2 px-3 rounded-sm text-black font-bold cursor-pointer">
                            Login
                        </Link>
                    </div>

                    <div className="flex items-center  gap-5">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl text-[#FF4F00]">450K+</h2>
                            <p className="text-[13px] text-zinc-900 max-w-35 text-center">Agents built</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl text-[#FF4F00]">9,000+</h2>
                            <p className="text-[13px] text-zinc-900 max-w-35 text-center">App integrations with governed access</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl text-[#FF4F00]">3.39M+</h2>
                            <p className="text-[13px] text-zinc-900 max-w-35 text-center">MCP tool calls completed</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-black gap-8 py-8">
                        <p className="flex items-center justify-between gap-1">
                            <ShieldPlus className="h-3 w-3 "/>
                            SOC 2 (Type II)
                        </p>
                        <p className="flex items-center justify-between gap-1">
                            <Globe className="h-3 w-3"/>
                            GDPR + CCPA compliant
                        </p>
                    </div>
                </div>

                <div className="bg-[#F8F4F0] my-5 flex flex-col items-center py-8 mb-15">
                    <p className="text-sm text-zinc-700">For builders</p>
                    <p className="text-xl font-bold text-black">Get started in seconds</p>

                    {/* MCP */}
                    <div className="flex items-center justify-between gap-4 pt-10" >
                        <McpModal img="/claud.png" name="Claud" to="/home" />
                        <McpModal img="/claudcode.png" name="Claud Code" to="/home" />
                        <McpModal img="/chatgpt.png" name="ChatGPT" to="/home" />
                        <McpModal img="/cursor.png" name="Cursor" to="/home" />
                        <McpModal img="/claw.png" name="Claw" size={50} to="/home" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function McpModal({img, name, size, to}: {img: string, name: string, size?: number, to: string}) {
    return (
        <Link href={to} className="flex flex-col items-center justify-center gap-1 bg-white border border-zinc-200 hover:border-zinc-600 cursor-pointer w-25 h-25" >
            <Image src={img} alt="#claud" width={size ? size : 40} height={size ? size : 40} />
            <p className="text-black" >{name}</p>
        </Link>
    )
}