"use client"
import AuthNav from "@/components/auth/NavBar";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { Ref, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import AlertBanner from "@/components/AlertBanner";


export default function Login() {
    return (
        <div className="w-full flex flex-col items-center bg-white text-black pb-10">
            <AuthNav type="Login" />
            <Body />
        </div>
    )
}

function Body() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    function clearInputs() {
        setEmail('');
        setPassword('');
    }

    async function handleLogin() {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setError('');

        try {
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if(!response.ok) {
                let msg = "Invalid credentials";
                try {
                    const data = await response.json();
                    if (data && typeof data.message === "string") {
                        msg = data.message;
                    }
                } catch {
                    // JSON parsing failed
                }
                setError(msg);
                clearInputs();
                return;
            }

            router.push("/home");

        } catch (err: unknown) {
            console.log(err);

            if (err instanceof Error) {
                setError(err.message);
            } else setError("Something went wrong");

            clearInputs();
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <Loader />
    }


    return (
        <div className="pt-20 pb-10 w-[75%] flex items-center justify-center">
            <div className="w-[60%] bg-[#F8F4F0] px-7 py-10 flex flex-col items-start gap-8">
                <Image 
                    src={"https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1769615779/enterprise_illustration_izoxxo.png"} 
                    alt="Image"
                    height={40}
                    width={80}
                    className="w-80 h-40"
                />
                <h3 className="text-xl font-bold text-start">Automate across your teams</h3>
                <p className="text-[16px] tracking-wide">
                    Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.
                </p>
                
                <Link href={"#"} className="flex gap-1 items-center hover:bg-[#F8F4F0] rounded-sm cursor-pointer py-2 px-2 border border-zinc-800 font-semibold">
                    Explore Node-RED Enterprise
                </Link>
                
            </div>

            <div className="w-[40%] px-4 flex flex-col items-center gap-5">
                <h1 className="text-2xl font-bold">Log in to your account</h1>
                <div className="w-full border border-zinc-300 rounded-lg py-10 px-7 flex flex-col gap-4 relative">
                    {/* show error message */}
                    <AlertBanner message={error} onClose={() => setError('')} type="error" />

                    <InputBox 
                        lable="Email" 
                        type="email" 
                        placeholder="test@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputBox 
                        lable="Password" 
                        type="password" 
                        placeholder="" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="px-4 py-3 rounded-md bg-[#FF4F00] font-semibold text-white cursor-pointer" onClick={handleLogin} >
                        Continue
                    </button>

                    <Link href={"/signup"} className="text-[15px] text-zinc-600 place-self-center">
                        Don&apos;t have a Zapier account yet?&nbsp; 
                        <span className="underline hover:no-underline cursor-pointer">Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}


function InputBox({
    lable, 
    type, 
    placeholder, 
    value,
    onChange
}: {
    lable: string, 
    type: string, 
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="flex flex-col items-start w-full">
            <label className="font-medium!" >{`${lable} *`}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                required={true}
                className="w-full py-3 pl-3 border border-zinc-300 rounded-md"
            />
        </div>
    )
}