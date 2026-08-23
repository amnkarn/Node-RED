"use client";
import AuthNav from "@/components/auth/NavBar";
import Loader from "@/components/Loader";
import { AlertCircle, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import OtpBox from "@/components/OtpBox";


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

    function clearInputs() {
        setFormData({email: "", name: "", password: ""});
        setOtp(null);
    }

    const handleInputChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    async function sendOtp() {
        if (!formData.email) {
            setError('Please enter your email address');
            return;
        }
        console.log(formData.email);
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
                let msg = "Invalid credentials";
                try {
                    const data = await res.json();
                    if (data && typeof data.message === "string") {
                        msg = data.message;
                    }
                } catch {
                    // JSON parse failed
                }
                setError(msg);
                clearInputs();
                return;
            }

            //give otp box input
            setOtpState(true);

        } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
                setError(error.message);
            } else setError("Something went wrong");
            
            clearInputs();
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if(!formData) {
            setError('Please enter your email address');
            return;
        }
        console.log(formData.email, formData.name, formData.password, otp);

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
            //console.log(registerRes);

            if (!registerRes.ok) {
                let msg = "Invalid credentials";
                try {
                    const data = await registerRes.json();
                    if (data && typeof data.message === "string") {
                        msg = data.message;
                    }
                } catch {
                    // Json parse failed
                }
                setError(msg);
                clearInputs();
                return;
            }

            alert("You are successfully signed up")
            router.push("/home?registered=true");

        } catch (error: unknown) {
            console.log(error);

            if (error instanceof Error) {
                setError(error.message);
            } else setError("Something went wrong");

            clearInputs();
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

function FooterLoop() {
    const logoLinks = [
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/flipkart_gag3du.png",
        "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/disney_zfpuci.png",
        "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254335/thomson-reuters_hvfvdm.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/alphabet-logo_ojj7s0.png",
        "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/meta_sa6fhf.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866527/Homepage/Ticker/okta-w-circle_nb2lkv.png",
        "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/hp_lhfrfl.png",
        "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/samsung_bvgxev.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/lowes_jookhj.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866525/Homepage/Ticker/pepsico_sklm0o.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866525/Homepage/Ticker/p-and-g_o60hzm.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745867083/Homepage/Ticker/alibaba-2_stdr10.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/hermes_mpn39n.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/siemens_zmbyn5.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/equifax_cmnhn3.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/american-family_b0rj2q.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/stone-x_wyzrjl.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/opendoor_ocwpe0.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/booking_lwarz3.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/indeed_jakzfz.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/mastercard_g9zhda.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/allstate_dqosx8.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/edward-jones_ejarvl.png",
        "https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/poshmark_vjxmpp.png"
    ];

    const doubleLogos = [...logoLinks, ...logoLinks];

    return (
        <div className="pb-20 w-[75%] flex flex-col items-center border-t border-zinc-200 pt-10">
            <p className="text-[15px] text-zinc-400">Trusted by 3.4 million companies</p>

            {/* continuous moving effect left to right */}
            <div className="w-full pt-8 overflow-hidden">
                <div className="flex items-center gap-12 animate-marquee-right-to-left">
                    {doubleLogos.map((link: string, idx: number) => (
                        <Image
                            src={link}
                            key={idx}
                            alt="logo"
                            height={30}
                            width={60}
                            className="object-contain shrink-0 h-5 w-auto"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}