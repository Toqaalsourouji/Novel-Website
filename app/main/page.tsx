"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ModalType = null | "typeface" | "legal" | "social" | "support" | "typeface-item" | "age-verification";
interface ModalData {
  title: string;
  content: string;
}

const typefaces = [
  "BASEMENT GROTESQUE",
  "ADHESION",
  "B-MECHA",
  "BLOB",
  "BUNKER",
  "CANTCHE",
  "CARPENTER",
  "CURIA",
  "FFFLAUTA",
  "TROVADOR",
  "XERO",
];

export default function MainPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData>({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if age verification is already done
    const ageVerified = sessionStorage.getItem("ageVerified");
    if (!ageVerified || ageVerified === "false") {
      setActiveModal("age-verification");
    }
  }, []);

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

        setActiveModal(null);
      } catch (error) {
        console.error("Age verification error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      sessionStorage.setItem("ageVerified", "false");
      router.push("/age-restricted");
    }
  };

  const openModal = (type: ModalType, data: ModalData) => {
    setModalData(data);
    setActiveModal(type);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-mono overflow-hidden" style={{
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
    }}>
      {/* Background particles effect */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%223%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23ffffff%22 filter=%22url(%23noise)%22 opacity=%220.02%22 /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }} />
      </div>

      <div className="relative h-screen flex">
        {/* LEFT SIDEBAR */}
        <aside className="w-60 bg-black border-r border-[#8F5CFF]/20 overflow-y-auto hidden lg:flex flex-col">
          <div className="p-6 space-y-8 flex-1">
            {/* Logo */}
            <div className="flex items-center gap-2 select-none">
              <span className="text-white tracking-[0.2em] font-bold text-lg">SLUMPUN</span>
              <span className="bg-[#8F5CFF] text-black font-bold px-2 py-1 text-lg">X</span>
            </div>

            {/* Typefaces Section */}
            <nav className="space-y-3">
              <div className="text-[#8F5CFF] text-xs uppercase font-bold tracking-[0.15em]">TYPEFACES</div>
              <ul className="space-y-2">
                {typefaces.map((tf) => (
                  <li
                    key={tf}
                    onClick={() => openModal("typeface-item", { title: tf, content: `Typeface: ${tf}` })}
                    className="text-white/70 hover:text-[#8F5CFF] text-xs uppercase font-mono tracking-widest cursor-pointer transition"
                  >
                    [ {tf} ]
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Section */}
            <nav className="space-y-3">
              <div className="text-[#8F5CFF] text-xs uppercase font-bold tracking-[0.15em]">LEGAL</div>
              <ul className="space-y-1">
                <li
                  onClick={() => openModal("legal", { title: "EULA", content: "End User License Agreement\n\nBy accessing this experience, you agree to our terms and conditions." })}
                  className="text-white/70 hover:text-[#8F5CFF] text-xs uppercase cursor-pointer transition"
                >
                  [ EULA ]
                </li>
              </ul>
            </nav>

            {/* Social Section */}
            <nav className="space-y-3">
              <div className="text-[#8F5CFF] text-xs uppercase font-bold tracking-[0.15em]">SOCIAL</div>
              <ul className="space-y-1">
                {["TWITTER", "TIKTOK", "INSTAGRAM", "FACEBOOK"].map((social) => (
                  <li
                    key={social}
                    onClick={() => openModal("social", { title: social, content: `Follow us on ${social}` })}
                    className="text-white/70 hover:text-[#8F5CFF] text-xs uppercase cursor-pointer transition"
                  >
                    [ {social} ]
                  </li>
                ))}
              </ul>
            </nav>

            {/* Support Section */}
            <nav className="space-y-3">
              <div className="text-[#8F5CFF] text-xs uppercase font-bold tracking-[0.15em]">SUPPORT</div>
              <p className="text-white/70 text-xs">
                FOUNDRY@BASEMENT.STUDIO
              </p>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#8F5CFF]/10 text-white/40 text-[9px] uppercase tracking-[0.1em]">
            © SLUMPUNX.COM 2026 KSH
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          {/* Glassmorphic Panel */}
          <div className="w-full max-w-2xl bg-black/60 backdrop-blur-xl border border-[#8F5CFF]/20 rounded-3xl p-10 space-y-8 shadow-2xl" style={{
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}>
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-[0.15em] text-[#8F5CFF]" style={{
                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
              }}>
                72 | KVS PROTOCOL
              </h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-[#8F5CFF] to-transparent"></div>
            </div>

            {/* Story Text */}
            <div className="space-y-4 text-sm leading-relaxed text-white/80 font-light">
              <p>
                the world has collapsed, not once, but twice. a new system had took over, a system where everyone is watched. freedom is tested and submission is not an option.
              </p>
              <p>
                but when it seemed like nothing will change, few decided that they had enough, that when the slums fought and the system riveled.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#8F5CFF]/20"></div>

            {/* Footer Statement */}
            <div className="space-y-3 text-xs text-white/60 leading-relaxed text-center">
              <p>
                This here is not for the <span className="text-[#8F5CFF]">Weak-minded</span> nor the <span className="text-[#8F5CFF]">Unrady</span>.
              </p>
              <p className="font-bold text-white">
                <span className="text-[#8F5CFF]">PUNX</span> is the movement.
              </p>
              <p>
                And the movement is <span className="text-[#8F5CFF]">PUNX</span>.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL OVERLAY */}
        {activeModal && activeModal !== "age-verification" && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="bg-black/80 backdrop-blur-xl border border-[#8F5CFF]/30 rounded-2xl p-8 max-w-lg w-full mx-4 space-y-4 animate-slideUp"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
              }}
            >
              <h2 className="text-2xl font-bold text-[#8F5CFF] tracking-[0.1em]">
                {modalData.title}
              </h2>
              <div className="h-0.5 w-12 bg-[#8F5CFF]/50"></div>
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {modalData.content}
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full mt-6 px-4 py-2 border border-[#8F5CFF] text-[#8F5CFF] uppercase text-xs font-bold tracking-widest rounded-lg hover:bg-[#8F5CFF]/10 transition"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        )}

        {/* AGE VERIFICATION MODAL */}
        {activeModal === "age-verification" && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div
              className="bg-[#0b0b0f] backdrop-blur-xl border-2 border-[#8F5CFF]/50 rounded-2xl p-10 max-w-[680px] w-full mx-4 space-y-5 animate-slideUp font-mono"
              style={{
                boxShadow: '0 0 40px rgba(123, 97, 255, 0.3)',
              }}
            >
              {/* Header */}
              <div>
                <h1 className="text-[#7b61ff] text-2xl sm:text-3xl uppercase tracking-[0.25em] font-bold mb-5" style={{
                  textShadow: '0 0 10px #7b61ff',
                }}>
                  72 | KV5 PROTOCOL
                </h1>
              </div>

              {/* Story Text */}
              <div className="space-y-4 text-[#cccccc] text-sm leading-relaxed">
                <p>
                  the world has collapsed, not once, but twice. a new system had took over, a system where everyone is watched. freedom is tested and submission is not an option.
                </p>
                <p>
                  but when it seemed like nothing will change, few decided that they had enough, that when the slums fought and the system riveled.
                </p>
              </div>

              {/* Age Prompt */}
              <div className="pt-4">
                <h2 className="text-[#7b61ff] text-xl sm:text-2xl uppercase tracking-[0.35em] font-bold text-center my-7" style={{
                  textShadow: '0 0 8px #7b61ff',
                }}>
                  WHAT IS YOUR AGE?
                </h2>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-5 mb-7">
                  <button
                    onClick={() => handleAgeVerification(true)}
                    disabled={isLoading}
                    className="enter-button bg-transparent border-2 border-[#7b61ff] text-white uppercase py-3.5 px-7 text-sm tracking-[0.125em] font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    style={{
                      textShadow: '0 0 5px #7b61ff',
                    }}
                  >
                    I AM +16 | [ ENTER ]
                  </button>

                  <button
                    onClick={() => handleAgeVerification(false)}
                    disabled={isLoading}
                    className="exit-button bg-transparent border-2 border-[#444] text-[#aaa] uppercase py-3.5 px-7 text-sm tracking-[0.125em] font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    I AM -16 | [ EXIT ]
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 text-[#cccccc] text-[13px] leading-relaxed text-center">
                <p>This here is not for the <span className="text-[#7b61ff] font-bold" style={{textShadow: '0 0 6px #7b61ff'}}>Weak-minded</span> nor the <span className="text-[#7b61ff] font-bold" style={{textShadow: '0 0 6px #7b61ff'}}>Unready</span>.</p>
                <p className="mt-2"><span className="text-[#7b61ff] font-bold" style={{textShadow: '0 0 6px #7b61ff'}}>PUNX</span> is the movement.</p>
                <p>And the movement is <span className="text-[#7b61ff] font-bold" style={{textShadow: '0 0 6px #7b61ff'}}>PUNX</span>.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .enter-button:hover {
          box-shadow: 0 0 15px #7b61ff;
        }

        .exit-button:hover {
          box-shadow: 0 0 10px #666;
        }
      `}</style>
    </main>
  );
}
