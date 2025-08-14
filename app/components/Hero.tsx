import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <div className="w-full text-center flex flex-col items-center justify-between py-16">
        <div className="w-full flex items-start justify-between px-8">
          <div className="w-1/2">
            <h1 className="text-5xl font-medium text-gray-800 mb-4 text-left">See your space <br /> transformed <br /> instantly</h1>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-between gap-8">
            <h2 className="text-3xl font-normal text-gray-800 text-right">Interior design shopping made simple. Upload your room, discover products that belong.</h2>
            <Link
                href="/login"
                className="px-4 py-2 text-xl font-normal text-white bg-[#1a1a1a] rounded-full hover:bg-[#1a1a1a]/80"
              >
                Design my space now →
              </Link>
          </div>
        </div>
        
        {/* Showcase Feature Video */}
        <div className="w-full py-8">
          <video
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src="/landing/showcase-feature.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
      </div>
    </>
  )
}
