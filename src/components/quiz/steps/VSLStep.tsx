import React, { useEffect, useRef, useState } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import bgHero from "@/assets/bg-hero.jpg";
import { CTAButton } from "@/components/ui/cta-button";
import { VideoCard } from "./shared";
import type { QuizStepData } from "@/lib/quiz-data";

interface VSLStepProps {
  step: QuizStepData;
  onNext: () => void;
}

const VTURB_SCRIPT_URL =
  "https://scripts.converteai.net/24b2503b-80e1-4a01-93e4-fc585d3a548f/players/69b32d2c4601d16cb0664cf7/v4/player.js";

const CTA_DELAY_SECONDS = 90; // 1:30

const VSLStep = React.memo(({ step, onNext }: VSLStepProps) => {
  const scriptLoaded = useRef(false);
  const [showCTA, setShowCTA] = useState(true);
  const [ctaOutOfView, setCtaOutOfView] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pauseAndNext = React.useCallback(() => {
    try {
      const iframe = document.querySelector<HTMLIFrameElement>(
        'vturb-smartplayer iframe, #vid-69b32d2c4601d16cb0664cf7 iframe'
      );
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({ type: "smartplayer", action: "pause" }),
          "*"
        );
      }
    } catch { /* ignore */ }
    onNext();
  }, [onNext]);

  // Observe inline CTA button visibility (mobile)
  useEffect(() => {
    if (!showCTA || !ctaRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaOutOfView(!entry.isIntersecting),
      { root: scrollRef.current, threshold: 0.1 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [showCTA]);

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
    <div ref={scrollRef} className="h-full w-full relative flex flex-col items-center scrollbar-none overflow-y-auto">
    {/* Green banner strip */}
    <div className="w-full bg-primary py-2.5 sm:py-3 text-center flex-shrink-0 z-20">
      <p className="font-heading font-extrabold text-xs sm:text-sm md:text-base text-primary-foreground tracking-widest uppercase">
        Exclusivo para quem quer investir em franquias
      </p>
    </div>

    {/* Scrollable background image (mobile + desktop) */}
    <div
      className="absolute inset-x-0 top-0 h-[100vh] bg-cover bg-center bg-no-repeat pointer-events-none"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
    <div className="relative z-10 max-w-4xl w-full space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in text-center">
      <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-10 md:h-16 mx-auto object-contain mb-2 sm:mb-3" />

      <h1 className="font-heading font-extrabold text-xl sm:text-3xl md:text-[2.25rem] leading-[1.15] tracking-[-0.01em] text-foreground">
        <span className="text-primary">Comece a lucrar já no primeiro mês</span>
        <br />
        <span className="font-black">com a franquia mais segura do Brasil</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-foreground/70 font-body max-w-2xl mx-auto leading-relaxed">
        Receba até R$ 20.000,00 por mês e garanta a franquia mais lucrativa
        do país: alugue motos para entregadores do iFood e Ubers.
      </p>

      <p className="font-heading font-bold text-sm sm:text-base text-primary animate-pulse">
        👇 Assista o vídeo agora! 👇
      </p>

      <div className="w-full max-w-3xl mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
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

      {/* CTA + Social proof — only after timer */}
      {showCTA && (
        <div className="space-y-8 animate-fade-in">
        <div ref={ctaRef}>
          <CTAButton onClick={pauseAndNext} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
            COMEÇAR AVALIAÇÃO AGORA
          </CTAButton>
        </div>

          {/* Testimonial videos */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-foreground text-center">
              Confira o que os franqueados dizem
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {[
                { id: "rl-AYQ90-YU", title: "Case de Sucesso" },
                { id: "6qa_JlGQQW8", title: "Viva a Experiência" },
                { id: "hlEn0HbV36U", title: "Vivência" },
                { id: "vtoTG4_fOBk", title: "Crescimento" },
                { id: "nrVIL8DZygw", title: "Motos alugadas em 10 dias" },
                { id: "UJeqcMXjDbY", title: "Plano Fidelidade" },
              ].map((video) => (
                <VideoCard key={video.id} id={video.id} title={video.title} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer mark */}
      <div className="pt-6 pb-20 sm:pb-4">
        <p className="text-[10px] text-foreground/30 font-body tracking-wider uppercase">
          © {new Date().getFullYear()} LocaGora · Todos os direitos reservados
        </p>
      </div>
    </div>

    {/* Fixed bottom CTA — mobile only, when inline CTA scrolls out of view */}
    {showCTA && ctaOutOfView && (
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <CTAButton onClick={pauseAndNext} className="w-full text-sm py-3.5 font-heading font-bold tracking-wide">
          COMEÇAR AVALIAÇÃO AGORA
        </CTAButton>
      </div>
    )}
  </div>
);
});
VSLStep.displayName = "VSLStep";

export default VSLStep;
