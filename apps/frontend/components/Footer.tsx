import Link from "next/link";

interface FooterSection {
    title: string;
    links: string[];
    showMore?: boolean;
}

const footerSections: FooterSection[] = [
    {
        title: "Top searches",
        links: [
            "Slack integrations",
            "Salesforce integrations",
            "HubSpot CRM integrations",
            "PayPal integrations",
            "Asana integrations",
        ],
        showMore: true,
    },
    {
        title: "Popular apps",
        links: [
            "Dropbox",
            "Google Sheets",
            "DocuSign",
            "WordPress",
            "Office 365",
        ],
        showMore: true,
    },
    {
        title: "Trending apps",
        links: [
            "Twitch",
            "Calendly",
            "Microsoft To-Do",
            "Microsoft Outlook",
            "Medium",
        ],
        showMore: true,
    },
    {
        title: "Top apps by category",
        links: [
            "Project management",
            "Calendar",
            "Email",
            "CRM",
            "Marketing",
        ],
        showMore: true,
    },
    {
        title: "Our best content",
        links: [
            "Best Video Conferencing Apps",
            "Best Email Apps",
            "Best CRM Apps",
            "Best Note Taking Apps",
            "Best Calendar Apps",
        ],
        showMore: true,
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#FAF9F6] border-t border-zinc-200 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <h3 className="font-medium text-sm text-black tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-2.5 text-sm text-zinc-600">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link 
                                            href="#" 
                                            className="hover:text-black hover:underline transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                                {section.showMore && (
                                    <li>
                                        <Link 
                                            href="#" 
                                            className="text-[#FF4F00] font-medium hover:underline inline-flex items-center gap-1 mt-1"
                                        >
                                            Show more &rarr;
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}

                </div>
                <div className="flex items-center justify-between pt-5">
                    <div className="">
                        <Link href="/" className="text-black" >
                            <span className="text-[#FF4F00] text-2xl font-extrabold">_</span>
                            <span className="text-2xl font-extrabold">Node-RED</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-zinc-700">
                        <ul>© 2026 Node-RED Inc.</ul>
                        <ul>Manage cookies</ul>
                        <ul>Legal</ul>
                        <ul>Privacy</ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}