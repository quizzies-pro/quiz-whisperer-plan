import React, { useRef, useState, useEffect } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import type { QuizStepData } from "@/lib/quiz-data";

interface WelcomeStepProps {
  step: QuizStepData;
  onNext: () => void;
}

const HERO_IMAGE = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313033/biobflo_dcciwv.png";

const WelcomeStep = React.memo(({ step, onNext }: WelcomeStepProps) => {
  const [ctaOutOfView, setCtaOutOfView] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaOutOfView(!entry.isIntersecting),
      { root: scrollRef.current, threshold: 0.1 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="h-full w-full relative flex flex-col overflow-y-auto scrollbar-none">
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 py-2">
        <div className="max-w-6xl w-full animate-fade-in">
          {/* Desktop: image left, text right — vertically centered */}
          <div className="flex flex-col md:flex-row items-center gap-0 md:gap-0 -space-y-6 md:space-y-0">

            {/* Image — takes ~55% on desktop */}
            <div className="order-1 w-[300px] sm:w-[340px] md:w-[55%] md:flex-shrink-0 flex items-center justify-center md:justify-start md:-ml-4 lg:-ml-8 pt-6 sm:pt-8 md:pt-0">
              <img
                src={HERO_IMAGE}
                alt="Franquia LocaGora"
                className="w-full max-w-[600px] h-auto object-contain"
              />
            </div>

            {/* Text — takes ~45% on desktop */}
            <div className="order-2 flex-1 text-center md:text-left space-y-5 sm:space-y-6 md:pl-4 lg:pl-8">
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.12] tracking-[-0.02em]">
                {step.title}
              </h1>

              {step.subtitle && (
                <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] text-primary leading-snug">
                  {step.subtitle}
                </p>
              )}

              <div ref={ctaRef} className="pt-1 sm:pt-3">
                <CTAButton
                  onClick={onNext}
                  className="text-base sm:text-lg md:text-xl px-10 py-5 sm:px-12 sm:py-6 md:px-14 md:py-6 font-heading font-extrabold tracking-wide w-full md:w-auto md:whitespace-nowrap uppercase shadow-green hover:shadow-green-lg [&_svg]:hidden sm:[&_svg]:block"
                  showArrow
                >
                  {step.buttonLabel || "CONTINUAR"}
                </CTAButton>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-body">
                  Investimento mínimo necessário de R$200.000,00
                </p>
              </div>

              {step.privacyText && (
                <p className="text-[10px] sm:text-xs text-muted-foreground/50 font-body">
                  {step.privacyText}
                </p>
              )}
            </div>
          </div>

          {/* Trust badges — centered */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 md:mt-10">
            {[
              "✓ Lucro de até R$20.000/mês",
              "✓ Apenas 1h/dia",
              "✓ Suporte completo",
            ].map((item) => (
              <span
                key={item}
                className="text-[10px] sm:text-xs font-body text-primary/90 bg-primary/5 border border-primary/10 rounded-full px-3 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA — mobile only */}
      {ctaOutOfView && (
        <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
          <CTAButton onClick={onNext} className="w-full text-base py-4.5 font-heading font-extrabold tracking-wide uppercase shadow-green" showArrow>
            {step.buttonLabel || "CONTINUAR"}
          </CTAButton>
        </div>
      )}
    </div>
  );
});
WelcomeStep.displayName = "WelcomeStep";

export default WelcomeStep;
