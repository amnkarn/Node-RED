import Image from "next/image";


export default function FooterLoop() {
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