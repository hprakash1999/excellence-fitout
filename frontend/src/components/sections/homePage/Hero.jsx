import React from "react";
import homeHeroVideo from "../../../assets/homePage/homeHeroVideo.mp4";


const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <video
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                src={homeHeroVideo}
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Decorative overlay pattern */}
            <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
                <div className="max-w-3xl text-white">
                    {/* Animated badge */}
                    <div className="mb-6 inline-flex items-center rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
                        <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-yellow-400"></span>
                        Dubai's Premier Construction Partner
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                        Excellence {" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Interior
                        </span>
                        <br />
                         & Contracting LLC.
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-gray-200 md:text-xl">
                        From concept to completion — delivering premium residential and commercial spaces with
                        <span className="font-semibold text-yellow-300"> craftsmanship</span> and
                        <span className="font-semibold text-yellow-300"> speed</span>.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <a
                            href="/broucher/Excellence_Interior_Renovation_&_Construction_Brochure-2025.pdf"
                            className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <span className="relative z-10">Download Brochure</span>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </a>
                        <a
                            href="#services"
                            className="group inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
                        >
                            <span>Our Services</span>
                            <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center">
                            <div className="mr-2 h-1 w-8 bg-yellow-400"></div>
                            <span>5+ Years Experience</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 h-1 w-8 bg-yellow-400"></div>
                            <span>50+ Projects Completed</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 h-1 w-8 bg-yellow-400"></div>
                            <span>98% Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;


