"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
 

export default function AgeVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleAgeVerification = async (isVerified: boolean) => {
    setIsLoading(true);

    if (isVerified) {
      try {
        sessionStorage.setItem("ageVerified", "true");
        sessionStorage.setItem("ageVerificationTime", new Date().toISOString());

        if (email) {
          await fetch("/api/age-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, age_verified: true }),
          });
        }

        router.push("/main");
      } catch (error) {
        console.error("Age verification error:", error);
        setIsLoading(false);
      }
    } else {
      sessionStorage.setItem("ageVerified", "false");
      router.push("/age-restricted");
    }
  };
  return (
    <main className="min-h-screen bg-black text-white font-mono" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23000%22 filter=%22url(%23noise)%22 opacity=%220.05%22 /%3E%3C/svg%3E")'}}>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <aside className="w-48 border-r border-[#8F5CFF]/30 p-8 flex flex-col justify-between overflow-y-auto hidden lg:flex">
          {/* Top Section */}
          <div className="space-y-12">
            {/* Logo */}
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-wider">SLUMP</span>
              <span className="text-2xl font-bold bg-[#8F5CFF] text-black px-2 py-1">X</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-6 text-sm">
              <div className="text-[#8F5CFF] uppercase tracking-wider font-bold text-xs">Navigation</div>
              <ul className="space-y-2 text-white/70 text-xs uppercase tracking-wider">
                <li>[ TYPEFACES ]</li>
                <li>[ LEGAL ]</li>
                <li>[ SOCIAL ]</li>
                <li>[ SUPPORT ]</li>
              </ul>
            </nav>

            {/* Legal Text */}
            <div className="text-white/50 text-[10px] leading-relaxed">
              <p>T2 | KVS PROTOCOL v2.1</p>
              <p className="mt-2">© 2089 SLUMPUNX</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <div className="flex gap-2 justify-center text-white/50">
              <span>◉</span>
              <span>●</span>
              <span>○</span>
              <span>■</span>
            </div>
            <div className="text-[#8F5CFF] text-xs text-center tracking-wider">ONLINE</div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
          {/* Main Card */}
          <div className="w-full max-w-xl bg-black/80 backdrop-blur border-2 border-[#8F5CFF]/50 rounded-2xl p-8 sm:p-12 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="text-[#8F5CFF] text-sm uppercase tracking-[0.25em] font-bold">
                T2 | KVS PROTOCOL
              </div>
              <div className="h-0.5 w-12 bg-[#8F5CFF]"></div>
            </div>

            {/* Body Text */}
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed tracking-wide font-light">
              the world has collapsed, not once, but twice. a new system had took over, a system where everyone is watched. freedom is tested and submission is not an option.
              <br />
              <br />
              but when it seemed like nothing will change, few decided that they had enough, that when the slums fought and the system riveled.
            </p>

            {/* Age Prompt */}
            <div className="pt-6 border-t border-[#8F5CFF]/30 space-y-6">
                <div className="relative w-full max-w-xl px-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-10">
                    <span className="font-latin text-white tracking-[0.35em] font-semibold text-2xl sm:text-3xl">SLUMPUN</span>
                    <span className="bg-[#8F5CFF] text-black font-bold px-2 py-1 text-2xl sm:text-3xl">X</span>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[#8F5CFF] text-xs sm:text-sm uppercase tracking-[0.35em] font-bold">THIS EXPERIENCE ONLY INTENDED FOR USERS</p>
                    <p className="text-[#8F5CFF] text-xs sm:text-sm uppercase tracking-[0.35em] font-bold">OVER THE AGE OF</p>

                    <div className="text-[#8F5CFF] text-7xl sm:text-8xl font-bold tracking-wider py-4 select-none">16+</div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAgeVerification(true)}
                      disabled={isLoading}
                      className="flex-1 bg-black/60 hover:bg-black/40 border-2 border-[#8F5CFF] text-white uppercase py-3 px-4 text-xs sm:text-sm tracking-widest font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#8F5CFF]"
                    >
                      I AM +16 | [ ENTER ]
                    </button>

                    <button
                      onClick={() => handleAgeVerification(false)}
                      disabled={isLoading}
                      className="flex-1 bg-black/60 hover:bg-black/40 border-2 border-white/30 text-white/60 hover:text-white uppercase py-3 px-4 text-xs sm:text-sm tracking-widest font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      I AM -16 | [ EXIT ]
                    </button>
                  </div>

                  <div className="mt-8 text-white/40 text-[10px] uppercase tracking-[0.2em]">T2 | KVS PROTOCOL v2.1</div>
                </div>
            </div>

            {/* Footer Manifesto */}
            <div className="pt-6 border-t border-[#8F5CFF]/30 text-white/50 text-[10px] leading-relaxed text-center uppercase tracking-wider">
              <p>This here is not for the Weak-minded nor the Unrady.</p>
              <p className="text-[#8F5CFF] font-bold mt-2">PUNX is the movement.</p>
              <p>And the movent is PUNX.</p>
            </div>
          </div>
        </div>

        {/* Right Scroll Indicator */}
        <div className="w-1 bg-gradient-to-b from-transparent via-[#8F5CFF] to-transparent opacity-30 hidden lg:block"></div>
      </div>
    </main>
  );
}
