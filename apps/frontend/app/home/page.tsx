"use client";
import AlertPopup from "@/components/AlertPopup";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import Loader from "@/components/Loader";

interface Zap {
    id: string,
    triggerId: string,
    userId: string,
    actions: {
        id: string,
        zapId: string,
        actionId: string,
        sortingOrder: number,
        type: {
            id: string,
            name: string
        }
    }[]
}

function useZap() {
    const [loading, setLoading] = useState<boolean>(false);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        const fetchZaps = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${BACKEND_URL}/api/v1/zap`, {
                    method: "GET",
                    credentials: 'include',
                });

                if (!res.ok) throw new Error("Failed to fetch zaps");

                const data = await res.json();
                setZaps(data.zaps || data); // Adjust based on your API response structure
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchZaps();
    }, []);

    return { loading, zaps };
}

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

    const { zaps, loading } = useZap();

    if(loading) {
        return <Loader />
    }

    return (
        <div className="w-full bg-white min-h-screen p-8 relative">
            <AlertPopup 
                message={popupMessage} 
                type={popupType} 
                onClose={() => setPopupMessage('')} 
            />

            <p className="text-black">Home Page</p>
            <ZapTable zaps={zaps} />
        </div>
    );
}

function ZapTable({zaps}: {zaps: Zap[]}) {
    return (
        <div className="">
            <div className="flex">
                <div className="flex-1" >Name</div>
                <div className="flex-1" >Last Edit</div>
                <div className="flex-1" >Running</div>
                <div className="flex-1" >Go</div>
            </div>

            { zaps.map((zap, idx) => (
                <div className="" key={idx} >
                    name
                </div>
            ))}
        </div>
    )
}