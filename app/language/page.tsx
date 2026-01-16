"use client";

import { useRouter } from "next/navigation";

const topBannerText =
  "OUR AVERAGE FONT SHOP — 95% OF THE WEB IS MADE OUT OF FONTS, CHOOSE WISELY — COMPUTING YOU CAN TRUST — ";
const bottomBannerText =
  "اختر بحكمة — النص تجريبي مؤقت حتى يرسل العميل المحتوى النهائي — اختر بحكمة — النص تجريبي مؤقت — ";

function Marquee({
  text,
  direction = "left",
}: {
  text: string;
  direction?: "left" | "right";
}) {
  return (
    <div className="w-full overflow-hidden border-y border-white/10">
      <div
        className={[
          "flex whitespace-nowrap text-[10px] sm:text-xs text-white/35 tracking-[0.25em] py-2",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        ].join(" ")}
      >
        {/* duplicate content for seamless loop */}
        <span className="px-4">{text.repeat(6)}</span>
        <span className="px-4">{text.repeat(6)}</span>
      </div>
    </div>
  );
}

export default function LanguagePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Marquee text={topBannerText} direction="left" />

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl text-center space-y-10">
          <div className="text-[#6D28D9] text-sm sm:text-base tracking-[0.35em]">
            اختار لغتك | CHOOSE UR LANGUAGE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <button
              onClick={() => router.push("/signup")}
              className="rounded-full bg-white/10 hover:bg-white/15 border border-white/10
                         text-white/80 py-6 text-lg tracking-[0.35em] transition"
            >
              [ ENGLISH ]
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="rounded-full bg-white/10 hover:bg-white/15 border border-white/10
                text-white/80 py-6 transition font-ar text-xl sm:text-2xl tracking-normal"
              dir="rtl"
              lang="ar"
            >
              [ عربي ]
            </button>
          </div>

          <div className="text-[#6D28D9] text-xs sm:text-sm tracking-[0.35em] leading-7">
            [ WARNING | YOUR CHOICE WILL AFFECT YOUR EXPERIENCE. YOU CAN CHANGE YOUR DECISION LATER. ]
            <br />
            [ تحذير | اختيارك سيؤثر على تجربتك. يمكن التغيير لاحقاً. ]
          </div>
        </div>
      </div>

      <Marquee text={bottomBannerText} direction="right" />
    </main>
  );
}
