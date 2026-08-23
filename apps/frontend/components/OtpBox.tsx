import { useRef, useState } from "react";


export default function OtpBox({ length = 6, onChange }: { length?: number, onChange?: (otp: string) => void }) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        // Allow only the last entered digit to show up in the box
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (onChange) onChange(newOtp.join(""));

        // Move to next input field if there is a value
        if (value && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to the previous input field on Backspace if the current one is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        if (isNaN(Number(data))) return;

        const pasteData = data.slice(0, length).split("");
        const newOtp = [...otp];

        pasteData.forEach((char, index) => {
            newOtp[index] = char;
        });

        setOtp(newOtp);
        if (onChange) onChange(newOtp.join(""));

        // Focus the appropriate field after pasting
        const focusIndex = pasteData.length < length ? pasteData.length : length - 1;
        inputRef.current[focusIndex]?.focus();
    }

    return (
        <div className="flex  flex-col items-center">
            <h1 className="text-2xl font-bold">Account Verification</h1>
            <p className="text-sm pb-3">Enter Verify Code Below</p>

            <div className="flex items-center gap-2">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRef.current[index] = el; }}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="h-12 w-12 text-center rounded-sm border border-zinc-500 text-lg font-semibold outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                    />
                ))}
            </div>
        </div>
    )
}