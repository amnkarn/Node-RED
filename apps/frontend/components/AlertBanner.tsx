import { AlertCircle, X } from "lucide-react";

interface AlertBannerProps {
    message: string;
    onClose?: () => void;
    type?: "error" | "warning" | "success";
}

export default function AlertBanner({ message, onClose, type = "error" }: AlertBannerProps) {
    if (!message) return null;

    const bgStyles = type === "error" 
        ? "bg-red-50 border-red-200 text-red-800" 
        : type === "warning"
        ? "bg-amber-50 border-amber-200 text-amber-800"
        : "bg-emerald-50 border-emerald-200 text-emerald-800";

    const iconStyles = type === "error"
        ? "text-red-500"
        : type === "warning"
        ? "text-amber-500"
        : "text-emerald-500";

    return (
        <div className={`w-full flex items-center justify-between gap-3 p-3.5 border rounded-lg transition-all duration-200 shadow-sm ${bgStyles}`}>
            <div className="flex items-center gap-2.5">
                <AlertCircle className={`h-5 w-5 shrink-0 ${iconStyles}`} />
                <p className="text-sm font-medium leading-tight">{message}</p>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer text-zinc-500"
                    aria-label="Dismiss message"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
