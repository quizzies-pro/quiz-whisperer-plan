import React from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { CTAButton } from "@/components/ui/cta-button";
import type { QuizStepData } from "@/lib/quiz-data";

interface VSLStepProps {
  step: QuizStepData;
  onNext: () => void;
}

const VSLStep = React.memo(({ step, onNext }: VSLStepProps) => (
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

      <div className="relative aspect-[9/16] sm:aspect-video w-full max-w-xl mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
        <iframe
          src="https://www.youtube.com/embed/ppB407OeAUc"
          title="LocaGora - Apresentação"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>

      <p className="text-sm sm:text-base md:text-lg font-heading font-bold text-foreground max-w-xl mx-auto leading-relaxed tracking-tight">
        Encontramos seus primeiros clientes e facilitamos seu investimento para
        que você comece a lucrar com sua empresa no <span className="text-primary">menor tempo possível</span>
      </p>

      <CTAButton onClick={onNext} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
        COMEÇAR AGORA
      </CTAButton>
    </div>
  </div>
));
VSLStep.displayName = "VSLStep";

export default VSLStep;
