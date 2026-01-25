"use client";

import { useRouter } from "next/navigation";

export default function AgeRestrictedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center px-6" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23000%22 filter=%22url(%23noise)%22 opacity=%220.05%22 /%3E%3C/svg%3E")'}}>
      <div className="w-full max-w-md text-center space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl font-bold tracking-wider">SLUMP</span>
          <span className="text-4xl font-bold bg-[#8F5CFF] text-black px-3 py-2">X</span>
        </div>

        {/* Main Text */}
        <div className="space-y-8">
          <p className="text-[#8F5CFF] text-sm uppercase tracking-[0.3em] font-bold leading-relaxed">
            THIS EXPERIENCE
            <br />
            ONLY INTENDED FOR USERS
            <br />
            OVER THE AGE OF
          </p>

          {/* Large 16 */}
          <div className="text-[#8F5CFF] text-9xl font-bold tracking-wider py-6">
            16
          </div>

          {/* Minimal Footer */}
          <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
            ACCESS DENIED
          </p>
        </div>

        {/* Back Button - Optional, minimal */}
        <div className="pt-8 border-t border-[#8F5CFF]/20">
          <button
            onClick={() => router.push("/language")}
            className="text-white/50 hover:text-[#8F5CFF] text-xs uppercase tracking-widest transition"
          >
            [ RETURN TO SELECTION ]
          </button>
        </div>
      </div>
    </main>
  );
}
