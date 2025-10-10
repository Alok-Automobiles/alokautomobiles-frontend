import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Alok_Automobiles_Trucks_and_Cars.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl pl-8 md:pl-12 lg:pl-16">
            {/* Gradient background for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent -z-10 rounded-lg"></div>
            {/* Animated tagline */}
            <div className="overflow-hidden mb-3 relative z-10">
              <p className="text-sm font-medium text-white/95 mb-2 animate-fade-in-up drop-shadow-lg">
               20+ Years of Experience and more then 1000+ Happy Customers
              </p>
            </div>
            
            {/* Main headline with staggered animation */}
            <div className="overflow-hidden mb-6 font-mono relative z-10">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                <span className="block animate-slide-in-left delay-100">Keep Your</span>
                <span className="block animate-slide-in-right delay-200 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Fleet Moving
                </span>
              </h1>
            </div>
            
            {/* Dynamic subtitle with emphasis */}
            <div className="overflow-hidden mb-8 relative z-10">
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed animate-fade-in-up delay-300 drop-shadow-lg">
                <span className="font-semibold text-yellow-300 drop-shadow-md">Genuine parts</span> for trucks & 4-wheelers. 
                <br className="hidden md:block" />
                <span className="font-semibold text-green-300 drop-shadow-md">Wide Range</span> of parts.
                <br className="hidden md:block" />
                <span className="font-semibold text-blue-300 drop-shadow-md">You get things here</span> You get nowhere else.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-400">
              {/* Animated Border Button */}
              <Link href="#categories" className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 transition-transform duration-300">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-bold text-white backdrop-blur-3xl font-mono tracking-wide">
                  Browse Parts
                </span>
              </Link>
              
              {/* Secondary Button */}
              <Link href="#contact" className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 transition-transform duration-300">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10B981_0%,#059669_50%,#10B981_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-bold text-white backdrop-blur-3xl font-mono tracking-wide">
                  Get a Quote
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
