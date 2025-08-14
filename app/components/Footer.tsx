import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer id="footer-section" className="bg-[#1F1F1F] pt-16 flex flex-col items-center w-full">
            {/* <hr className="w-full border-white/10 border-[.5px] mt-8 mb-12" /> */}
            <div className="flex flex-col items-start md:flex-row md:justify-between w-full px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold text-gray-800">
                    <Image src="/cnc-logomark.png" alt="Calla & Copper" width={75} height={75} />
                </Link> 
            </div>
            <hr className="w-full border-white/10 border-[.5px] mt-8 mb-4" />
            <div className="flex flex-col-reverse items-start md:flex-row md:justify-between w-full px-4 sm:px-6 lg:px-8">
                <p className="text-white text-xs font-geist-sans uppercase font-base tracking-wide mb-0 md:mb-4">
                    © {new Date().getFullYear()} Calla & Copper. All rights reserved.
                </p>
                <div className="flex flex-row items-center gap-4">
                    <Link href="/privacy-policy" className="text-white/80 text-xs font-light tracking-wide mb-0 md:mb-4">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className="text-white/80 text-xs font-light tracking-wide mb-0 md:mb-4">
                        Terms of Service
                    </Link>
                </div>
            </div>
      </footer>
    )
}