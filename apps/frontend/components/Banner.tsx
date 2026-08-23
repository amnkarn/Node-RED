

export default function Banner() {
    return (
        <div className="w-full flex flex-col items-center justify-between pt-10 pb-20 px-4">
            <h1 className="text-black text-4xl font-medium max-w-xl text-center">
                Your <span className="text-[#FF4F00]">complete AI toolkit</span>: MCP, SDK, CLI, and 9,000+ integrations
            </h1>
            <p className="text-zinc-800 py-5 text-center">Everything you need to build, automate, and scale with AI — no code required.</p>

            <div className="w-7xl max-w-7xl flex items-center justify-center mt-4">
                <div className="relative w-full p-20! sm:p-22 md:p24 rounded-3xl bg-linear-to-br from-[#96A9C7] via-sky-200 to-[#F6F0DF] shadow-2xl shadow-sky-400/30 border border-sky-300/50 flex items-center justify-center overflow-hidden">
                    {/* Sky ambient background glows */}
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-sky-100/70 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-sky-300/70 rounded-full blur-2xl pointer-events-none" />
                    
                    <video 
                        src="https://res.cloudinary.com/zapier-media/video/upload/so_3.8/q_auto/f_auto/c_scale,w_1920/v1745864783/aiworkflowshomepage.mp4" 
                        className="w-full rounded-2xl shadow-lg relative z-10"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
            </div>

        </div>
    )
}