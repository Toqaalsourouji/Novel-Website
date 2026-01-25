"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


function Logo() {
  return (
    <div className="flex items-center gap-1 select-none">
      <span className="text-white tracking-[0.35em] font-semibold text-2xl sm:text-3xl">
        SLUMPUN
      </span>
      <span className="bg-[#6D28D9] text-black font-bold px-2 py-1 text-2xl sm:text-3xl">
        X
      </span>
    </div>
  );
}

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/language");
    }, 2000); // tweak to match the “feel” you want
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <Logo />
    </main>
  );
}
