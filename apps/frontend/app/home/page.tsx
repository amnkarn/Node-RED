"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

//import Appbar from "@/components/Appbar";


export default function Home() {
    const searchParams = useSearchParams();
    const isRegistered = searchParams.get("registered");

    useEffect(() => {
        if(isRegistered === 'true') {
            alert("Registration successful! Welcome to your automated workspace.");
        }
    }, [isRegistered])

    useEffect(() => {
        alert("Hello! Welcome back.");
    }, [])

    return (
        <div className="w-full bg-white">
            <p>Home Page</p>
        </div>
    )
}