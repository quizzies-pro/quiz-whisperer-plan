import React, { useEffect, useRef, useState } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { CTAButton } from "@/components/ui/cta-button";
import { VideoCard } from "./shared";
import type { QuizStepData } from "@/lib/quiz-data";
import type { QuizStepData } from "@/lib/quiz-data";

interface VSLStepProps {
  step: QuizStepData;
  onNext: () => void;
}

const VTURB_SCRIPT_URL =
  "https://scripts.converteai.net/24b2503b-80e1-4a01-93e4-fc585d3a548f/players/69b32d2c4601d16cb0664cf7/v4/player.js";

const CTA_DELAY_SECONDS = 150; // 2:30

const VSLStep = React.memo(({ step, onNext }: VSLStepProps) => {
  const scriptLoaded = useRef(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;
    const s = document.createElement("script");
    s.src = VTURB_SCRIPT_URL;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Listen for VTurb smartplayer timeupdate events
  useEffect(() => {
    if (showCTA) return; // Already visible, stop listening

    const handleMessage = (e: MessageEvent) => {
      try {
        if (typeof e.data === "string") {
          const data = JSON.parse(e.data);
          if (
            data.type === "smartplayer" &&
            data.event === "timeupdate" &&
            typeof data.currentTime === "number" &&
            data.currentTime >= CTA_DELAY_SECONDS
          ) {
            setShowCTA(true);
          }
        }
      } catch {
        // ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showCTA]);

  // Fallback timer in case VTurb postMessage doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), CTA_DELAY_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
  <div className="h-full w-full relative flex items-start justify-center px-4 pt-12 sm:pt-[70px] pb-[100px] sm:pb-[120px] overflow-y-auto scrollbar-none">
    <div className="relative z-10 max-w-4xl w-full space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in text-center">
      <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-10 md:h-16 mx-auto object-contain" />

      <h1 className="font-heading font-extrabold text-xl sm:text-3xl md:text-[2.25rem] leading-[1.15] tracking-[-0.01em] text-foreground">
        <span className="text-primary">Comece a lucrar já no primeiro mês</span>
        <br />
        <span className="font-black">com a franquia mais segura do Brasil</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-foreground/70 font-body max-w-2xl mx-auto leading-relaxed">
        Receba até R$ 20.000,00 por mês e garanta a franquia mais lucrativa
        do país: alugue motos para entregadores do iFood e Ubers.
      </p>

      <div className="w-full max-w-xl mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
        {/* @ts-ignore – VTurb custom element */}
        <vturb-smartplayer
          id="vid-69b32d2c4601d16cb0664cf7"
          style={{ display: "block", margin: "0 auto", width: "100%" }}
        />
      </div>

      <p className="text-sm sm:text-base md:text-lg font-heading font-bold text-foreground max-w-xl mx-auto leading-relaxed tracking-tight">
        Encontramos seus primeiros clientes e facilitamos seu investimento para
        que você comece a lucrar com sua empresa no <span className="text-primary">menor tempo possível</span>
      </p>

      {/* CTA button — appears after 2:30 */}
      <div
        className={`transition-all duration-700 ease-out ${
          showCTA
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <CTAButton onClick={onNext} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
          COMEÇAR AGORA
        </CTAButton>
      </div>

      {/* Footer mark */}
      <div className="pt-6 pb-4">
        <p className="text-[10px] text-foreground/30 font-body tracking-wider uppercase">
          © {new Date().getFullYear()} LocaGora · Todos os direitos reservados
        </p>
      </div>
    </div>
  </div>
);
});
VSLStep.displayName = "VSLStep";

export default VSLStep;
