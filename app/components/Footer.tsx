import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function Footer() {
    return (
        <div className="p-4 w-full">
        <footer id="footer-section" className="bg-brand-dark-brown pt-12 px-12 flex flex-col items-center w-full rounded-md">
            {/* <hr className="w-full border-white/10 border-[.5px] mt-8 mb-12" /> */}
            <div className="flex flex-col-reverse lg:flex-row items-start lg:justify-between w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        <Image src="/images/cnc-logo.png" alt="Calla & Copper" width={150} height={150} />
                    </Link> 
                    <span className="text-white">Interior design made simple. <br /> Upload your space, discover products that belong.</span>
                    <div className="flex flex-row items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 cursor-pointer">
                            <Image src="/images/fb.png" alt="Facebook" width={16} height={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 cursor-pointer">
                            <Image src="/images/x.png" alt="Twitter" width={16} height={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 cursor-pointer">
                            <Image src="/images/ig.png" alt="Instagram" width={16} height={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 cursor-pointer">
                            <Image src="/images/li.png" alt="LinkedIn" width={16} height={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 cursor-pointer">
                            <Image src="/images/yt.png" alt="Youtube" width={16} height={16} />
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12 lg:mb-0">
                    <div className="flex flex-col items-start gap-4 text-white">
                        <span className="text-white/80 uppercase font-light">menu</span>
                        <Link href="/#how-it-works" className="text-white text-sm font-light tracking-wide mb-0 md:mb-4">
                            How it works
                        </Link>
                        <Link href="/#faq" className="text-white text-sm font-light tracking-wide mb-0 md:mb-4">
                            FAQ
                        </Link>
                        <Link href="/terms-of-service" className="text-white text-sm font-light tracking-wide mb-0 md:mb-4">
                            Design my space
                        </Link>
                    </div>
                    <div className="flex flex-col items-start gap-4 text-white">
                        <span className="text-white/80 uppercase font-light">company</span>
                        <Link href="/privacy-policy" className="text-white text-sm font-light tracking-wide mb-0 md:mb-4">
                        Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-white text-sm font-light tracking-wide mb-0 md:mb-4">
                            Terms of Service
                        </Link>
                    </div>
                    <div className="flex flex-col items-start gap-4 text-white">
                        <span className="text-white/80 uppercase font-light">contact</span>
                        <span className="text-white text-sm font-light tracking-wide mb-0 md:mb-4 flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /> CallaandCopperLLC@Yahoo.com</span>
                        <span className="text-white text-sm font-light tracking-wide mb-0 md:mb-4 flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> +1 (615) 810-9313</span>
                        <span className="text-white text-sm font-light tracking-wide mb-0 md:mb-4 flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> 1821 North Naperville Rd Naperville, IL 6055513</span>
                    </div>
                </div>

            </div>
            <hr className="w-full border-white/10 border-[.5px] mt-12 mb-4" />
            <div className="flex justify-start lg:justify-center w-full px-4 sm:px-6 lg:px-8 pb-4 lg:pb-0">
                <p className="text-white/60 text-xs font-geist-sans uppercase font-base tracking-wide mb-0 md:mb-4">
                    © {new Date().getFullYear()} Calla & Copper. All rights reserved.
                </p>
            </div>
        </footer>
        </div>

    )
}