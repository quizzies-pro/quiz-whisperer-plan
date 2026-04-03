import React, { useEffect, useRef, useState } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import bgHero from "@/assets/bg-hero.jpg";
import { CTAButton } from "@/components/ui/cta-button";
import { VideoCard } from "./shared";
import MarketSection from "./MarketSection";
import ComparisonSection from "./ComparisonSection";
import type { QuizStepData } from "@/lib/quiz-data";

interface VSLStepProps {
  step: QuizStepData;
  onNext: () => void;
}

const VSLStep = React.memo(({ step, onNext }: VSLStepProps) => {
  const [showCTA, setShowCTA] = useState(true);
  const [ctaOutOfView, setCtaOutOfView] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<any>(null);
  const scriptLoaded = useRef(false);

  const pauseAndNext = React.useCallback(() => {
    try {
      if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.pause();
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

  // Load Vimeo Player API and init player
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const initPlayer = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('#vimeo-player iframe');
      if (iframe && (window as any).Vimeo) {
        vimeoPlayerRef.current = new (window as any).Vimeo.Player(iframe);
      }
    };

    if ((window as any).Vimeo) {
      initPlayer();
    } else {
      const s = document.createElement("script");
      s.src = "https://player.vimeo.com/api/player.js";
      s.async = true;
      s.onload = initPlayer;
      document.head.appendChild(s);
    }
  }, []);
  return (
    <div ref={scrollRef} className="h-full w-full relative flex flex-col items-center scrollbar-none overflow-y-auto">
    {/* Green banner strip */}
    <div className="w-full bg-primary py-2.5 sm:py-3 text-center flex-shrink-0 z-20">
      <p className="font-heading font-extrabold sm:text-sm md:text-base text-primary-foreground tracking-widest uppercase text-sm">
        Exclusivo para quem quer investir em franquias
      </p>
    </div>

    {/* Scrollable background image */}
    <div
      className="absolute inset-x-0 top-0 h-[120vh] sm:h-[100vh] bg-cover bg-center bg-no-repeat pointer-events-none"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[30%] sm:h-[40%] bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
    <div className="relative z-10 max-w-5xl w-full space-y-3 sm:space-y-6 md:space-y-8 animate-fade-in text-center px-4 pt-6 sm:pt-16 pb-[100px] sm:pb-[120px]">
      <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-10 md:h-16 mx-auto object-contain mb-4 sm:mb-8" />

      <h1 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-[2.75rem] tracking-[-0.02em] text-foreground max-w-5xl mx-auto" style={{ lineHeight: 1.2 }}>
        A franquia que <span className="text-primary">converte R$200.000</span> em ganhos de <span className="text-primary">R$20.000 mensais</span> ou mais
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-foreground/70 font-body max-w-3xl mx-auto leading-relaxed">
        Receba de 20 mil a 40 mil de lucro líquido por mês com apenas 1h de dedicação por dia. <span className="font-bold text-foreground">Fazemos tudo para você enquanto você só acompanha os números:</span>
      </p>



      <div id="vimeo-player" className="w-full max-w-3xl mx-auto rounded-[10px] overflow-hidden">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/1176398208?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="A franquia que converte R$200.000 em ganhos de R$20.000 mensais ou mais"
          />
        </div>
      </div>

      <p className="text-base sm:text-lg md:text-xl font-heading font-normal text-foreground max-w-3xl mx-auto leading-relaxed tracking-tight">
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
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-body">
            Investimento mínimo necessário de R$200.000,00
          </p>
        </div>

          {/* Market section */}
          <MarketSection />
          <ComparisonSection onCta={pauseAndNext} />

          {/* Why invest + Testimonial videos */}
          <section
            className="w-screen relative left-1/2 -translate-x-1/2 py-16 sm:py-24 !mt-0"
            style={{
              backgroundImage: 'url(https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313034/bg2bfoca_bin3ti.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24">
              {/* Why invest */}
              <div>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 sm:mb-16">
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug">
                      Por que investir na LocAgora<br />é o <span className="text-primary">melhor negócio</span>?
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto md:mx-0">
                      Somos uma marca em constante crescimento e com presença nacional!
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img
                      src="https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313032/motobfloca_awd9rk.png"
                      alt="Moto LocAgora"
                      className="w-full max-w-md object-contain"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { value: "+1000", label: "FRANQUIAS ABERTAS" },
                    { value: "+98", label: "CIDADES ATENDIDAS" },
                    { value: "+100", label: "LOJAS EM OPERAÇÃO" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-secondary/50 border border-foreground/6 p-6 sm:p-8 text-center">
                      <p className="font-heading font-extrabold text-4xl sm:text-5xl text-primary">{stat.value}</p>
                      <p className="font-heading font-bold text-xs sm:text-sm text-muted-foreground tracking-widest mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial videos */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-foreground text-center">
                  Confira o que os franqueados dizem
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          </section>
          {/* Franchise CTA section */}
          <section
            className="w-screen relative left-1/2 -translate-x-1/2 py-16 sm:py-24 !mt-0"
            style={{
              background: 'linear-gradient(180deg, hsl(130 40% 95%) 0%, hsl(130 35% 92%) 50%, hsl(130 40% 95%) 100%)',
            }}
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="flex-1 space-y-8 text-center md:text-left">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-snug" style={{ color: '#0D1B2E' }}>
                    Seja um franqueado LocAgora{" "}
                    e fature mais de{" "}
                    <span className="text-primary bg-primary/15 px-1 rounded">R$400.000</span>{" "}
                    por ano em um dos setores{" "}
                    que mais cresce no Brasil.
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto md:mx-0">
                    <div className="rounded-2xl px-5 py-6 sm:px-6 sm:py-7 text-center" style={{ background: '#0D1B2E' }}>
                      <p className="text-xs sm:text-sm text-white/70 font-body leading-tight">Lucro líquido<br />mensal estimado</p>
                      <p className="font-heading font-extrabold text-lg sm:text-2xl text-primary mt-2">de 60 a 75%</p>
                    </div>
                    <div className="rounded-2xl px-5 py-6 sm:px-6 sm:py-7 text-center" style={{ background: '#0D1B2E' }}>
                      <p className="text-xs sm:text-sm text-white/70 font-body leading-tight">Payback<br />estimado de</p>
                      <p className="font-heading font-extrabold text-lg sm:text-2xl text-primary mt-2">18 a 29 meses</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={pauseAndNext}
                      className="w-full sm:w-auto px-10 py-4 sm:px-16 sm:py-5 rounded-full font-heading font-bold text-sm md:text-base text-white tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] hover:-translate-y-[2px]"
                      style={{
                        background: 'linear-gradient(90deg, #00C944 0%, #00E64D 50%, #4CAF50 100%)',
                        boxShadow: '0 4px 24px rgba(0,230,77,0.30)',
                      }}
                    >
                      QUERO CONHECER A LOCAGORA
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313034/ILUBRASILMAPA2_n44fir.webp"
                    alt="Mapa do Brasil com franquias LocAgora"
                    className="w-full max-w-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
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
