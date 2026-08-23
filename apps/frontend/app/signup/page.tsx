"use client";
import AuthNav from "@/components/auth/NavBar";
import Loader from "@/components/Loader";
import { AlertCircle, Check } from "lucide-react";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import OtpBox from "@/components/OtpBox";
import FooterLoop from "@/components/auth/FooterLoop";


export default function Signup() {
    return (
        <div className="w-full flex flex-col items-center bg-white text-black pb-10">
            <AuthNav type="Signup" />
            <Body />
            <FooterLoop />
        </div>
    )
}

function Body() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });
    const [otp, setOtp] = useState<string | null>(null);
    const [error, setError] = useState<string | ''>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [otpState, setOtpState] = useState<boolean>(false);
    const router = useRouter();

    const handleInputChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    async function sendOtp() {
        if (!formData.email || !formData.name || !formData.password) {
            setError('Please fill in all required fields (Email, Name, Password)');
            return;
        }
        setError('');

        try {
            setLoading(true);
            const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: formData.email })
            })

            if (!res.ok) {
                let msg = "User already registered or invalid email";
                try {
                    const data = await res.json();
                    if (data && typeof data.message === "string") {
                        msg = data.message;
                    }
                } catch {
                    // JSON parse failed
                }
                setError(msg);
                return;
            }

            // switch to OTP view
            setOtpState(true);

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                setError(error.message);
            } else setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!formData.email || !formData.name || !formData.password) {
            setError('Missing required registration data. Please refresh and try again.');
            return;
        }
        if (!otp) {
            setError('Please enter the 6-digit verification OTP code.');
            return;
        }
        setError('');

        try {
            setLoading(true);
            const registerRes = await fetch(`${BACKEND_URL}/api/v1/auth/verify-otp`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name, 
                    email: formData.email, 
                    password: formData.password, 
                    otp
                }),
            })

            if (!registerRes.ok) {
                let msg = "Invalid OTP code or user exists";
                try {
                    const data = await registerRes.json();
                    if (data && typeof data.message === "string") {
                        msg = data.message;
                    }
                } catch {
                    // Json parse failed
                }
                setError(msg);
                return;
            }

            router.push("/home");

        } catch (error: unknown) {
            console.log(error);

            if (error instanceof Error) {
                setError(error.message);
            } else setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="pt-20 pb-10 w-[75%] flex items-center justify-center">
            <div className="w-[60%] px-7 flex flex-col items-start gap-8">
                <h1 className="text-6xl font-medium text-start">AI Automation starts and scales with Zapier</h1>
                <p className="text-[19px] tracking-wide">
                    Orchestrate AI across your teams, tools, and processes. Turn ideas into automated action today, and power tomorrow’s business growth.
                </p>

                <div className="flex flex-col items-start">
                    <BodyPoint para="Integrate 9,000+ apps and 300+ AI tools without code" />
                    <BodyPoint para="Build AI-powered workflows in minutes, not weeks" />
                    <BodyPoint para="14-day trial of all premium features and apps" />
                </div>
            </div>

            <div className="w-[40%] px-4">

                <div className="border border-zinc-300 rounded-lg py-5 px-7 flex flex-col gap-4 relative">
                    {/* show error message */}
                    {error && (
                        <div className="w-full flex items-center gap-2.5 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                            <span className="font-medium text-xs sm:text-sm">{error}</span>
                        </div>
                    )}

                    { otpState ? <OtpBox onChange={(otp) => setOtp(otp)} /> : 
                        (
                            <>
                                <InputBox 
                                    lable="Work email" 
                                    type="email" 
                                    placeholder="test@gmail.com" 
                                    value={formData.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange('email', e.target.value)
                                    }}
                                />
                                <InputBox 
                                    lable="Full name" 
                                    type="text" 
                                    placeholder="Alex Kent" 
                                    value={formData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange('name', e.target.value)
                                    }}
                                />
                                <InputBox 
                                    lable="Password" 
                                    type="password" 
                                    placeholder="" 
                                    value={formData.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange('password', e.target.value)
                                    }}
                                />
                            </>
                        )
                    }

                    <p className="text-[15px] text-zinc-600">
                        By signing up, you agree to Zapier&apos;s <span className="underline hover:no-underline">terms of service</span> and <span className="underline hover:no-underline">privacy policy</span>.
                    </p>

                    { otpState ? 
                        <button className="px-4 py-3 rounded-md bg-[#FF4F00] font-semibold text-white cursor-pointer" onClick={handleSubmit} >
                            Submit Otp
                        </button> :  
                        <button className="px-4 py-3 rounded-md bg-[#FF4F00] font-semibold text-white cursor-pointer" onClick={sendOtp} >
                            Get started for free
                        </button>
                    }

                    <Link href={"/login"} className="text-[15px] text-zinc-600 place-self-center">
                        Already have an account? &nbsp;
                        <span className="underline hover:no-underline cursor-pointer">Log In</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function BodyPoint({ para }: { para: string }) {
    return (
        <p className="flex items-center justify-center gap-2 text-lg">
            <Check className="h-5 w-5 text-[#FF4F00] text-lg font-bold!" />
            {para}
        </p>
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
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
}) {
    return (
        <div className="flex flex-col items-start w-full">
            <label className="font-medium!" >{`${lable} *`}</label>
            <input
                type={type}
                placeholder={placeholder}
                required={true}
                value={value}
                onChange={onChange}
                className="w-full py-3 pl-3 border border-zinc-300 rounded-md"
            />
        </div>
    )
}