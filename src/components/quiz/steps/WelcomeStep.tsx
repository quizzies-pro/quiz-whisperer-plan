import React, { useRef, useState, useEffect } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
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
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl w-full animate-fade-in">
          {/* Desktop: side by side | Mobile: stacked */}
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            {/* Left: Text content */}
            <div className="flex-1 text-center md:text-left space-y-4 sm:space-y-6 order-2 md:order-1">
              <img
                src={logoLocagora}
                alt="LocaGora"
                className="h-7 sm:h-9 md:h-12 object-contain mx-auto md:mx-0"
              />

              <h1 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.15] tracking-[-0.01em]">
                {step.title}
              </h1>

              {step.subtitle && (
                <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-primary leading-snug">
                  {step.subtitle}
                </p>
              )}

              <div ref={ctaRef} className="pt-2 sm:pt-4">
                <CTAButton
                  onClick={onNext}
                  className="text-sm sm:text-base px-8 py-4 sm:px-10 sm:py-5 font-heading font-bold tracking-wide w-full md:w-auto"
                  showArrow
                >
                  {step.buttonLabel || "CONTINUAR"}
                </CTAButton>
              </div>

              {step.privacyText && (
                <p className="text-[10px] sm:text-xs text-muted-foreground/50 font-body">
                  {step.privacyText}
                </p>
              )}
            </div>

            {/* Right: Hero image */}
            <div className="flex-shrink-0 order-1 md:order-2 w-[200px] sm:w-[240px] md:w-[400px] lg:w-[480px] xl:w-[520px]">
              <img
                  src={HERO_IMAGE}
                  alt="Franquia LocaGora"
                  className="relative w-full h-auto object-contain"
                />
              </div>
            </div>
            </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mt-6 sm:mt-8">
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
          <CTAButton onClick={onNext} className="w-full text-sm py-3.5 font-heading font-bold tracking-wide" showArrow>
            {step.buttonLabel || "CONTINUAR"}
          </CTAButton>
        </div>
      )}
    </div>
  );
});
WelcomeStep.displayName = "WelcomeStep";

export default WelcomeStep;
