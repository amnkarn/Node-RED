"use client";

import AlertPopup from "@/components/AlertPopup";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [popupMessage, setPopupMessage] = useState<string>('');
    const [popupType, setPopupType] = useState<"success" | "info">("info");
    const hasExecuted = useRef(false);

    useEffect(() => {
        if (hasExecuted.current) return;
        hasExecuted.current = true;

        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("registered") === 'true') {
            setPopupType("success");
            setPopupMessage("Registration successful! Welcome to your automated workspace.");
        } else {
            setPopupType("info");
            setPopupMessage("Hello! Welcome back.");
        }
    }, []);

    return (
        <div className="w-full bg-white min-h-screen p-8 relative">
            <AlertPopup 
                message={popupMessage} 
                type={popupType} 
                onClose={() => setPopupMessage('')} 
            />
            <h1 className="text-2xl font-bold">Home Page</h1>
        </div>
    );
}