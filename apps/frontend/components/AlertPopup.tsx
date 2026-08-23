"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertPopupProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number; // duration in ms, default 4000
    onClose?: () => void;
}

export default function AlertPopup({
    message,
    type = "success",
    duration = 4000,
    onClose
}: AlertPopupProps) {
    
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (!message) return;
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!visible || !message) return null;

    const config = {
        success: {
            bg: "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-emerald-950/5",
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />,
            border: "border-emerald-300"
        },
        error: {
            bg: "bg-red-50 border-red-200 text-red-900 shadow-red-950/5",
            icon: <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />,
            border: "border-red-300"
        },
        info: {
            bg: "bg-blue-50 border-blue-200 text-blue-900 shadow-blue-950/5",
            icon: <Info className="h-5 w-5 text-blue-600 shrink-0" />,
            border: "border-blue-300"
        }
    };

    const currentConfig = config[type] || config.info;

    return (
        <div className={`fixed top-5 right-5 z-50 min-w-75 max-w-md flex items-center justify-between gap-3 p-4 border rounded-xl shadow-lg transition-all duration-300 backdrop-blur-sm ${currentConfig.bg} ${currentConfig.border}`}>
            <div className="flex items-center gap-3">
                {currentConfig.icon}
                <p className="text-sm font-semibold tracking-wide leading-snug">{message}</p>
            </div>
            <button
                type="button"
                onClick={() => {
                    setVisible(false);
                    if (onClose) onClose();
                }}
                className="p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer text-zinc-500 hover:text-zinc-800"
                aria-label="Close notification"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
