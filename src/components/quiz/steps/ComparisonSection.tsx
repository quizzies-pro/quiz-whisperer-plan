import React from "react";
import { Check, X } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";

const rows = [
  "Lucro no primeiro mês",
  "Sem contratação de funcionários",
  "Facilidade na compra de produtos",
  "Não exige tempo integral de dedicação",
];

interface ComparisonSectionProps {
  onCta?: () => void;
}

const ComparisonSection = React.memo(({ onCta }: ComparisonSectionProps) => {
  return (
    <section
      className="w-screen relative left-1/2 -translate-x-1/2 py-16 sm:py-24 text-center border-t border-b border-foreground/6"
      style={{
        background: 'linear-gradient(180deg, hsl(231 50% 16%) 0%, hsl(232 55% 11%) 50%, hsl(231 50% 16%) 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4">
          Por que somos a melhor escolha?
        </p>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary leading-snug mb-12 sm:mb-16">
          A LocAgora é a melhor porque tudo nela foi pensado para que você tenha resultado
        </h2>

        {/* Table */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Header row */}
          <div className="rounded-xl border border-border/40 bg-secondary p-5 sm:p-7 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-xl md:text-2xl text-foreground">Benefícios</span>
          </div>
          <div className="rounded-xl bg-destructive p-5 sm:p-7 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-xl md:text-2xl text-destructive-foreground">Concorrentes</span>
          </div>
          <div className="rounded-xl bg-primary p-5 sm:p-7 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-xl md:text-2xl text-primary-foreground">LocAgora</span>
          </div>

          {/* Data rows */}
          {rows.map((label, i) => (
            <React.Fragment key={i}>
              <div className="rounded-xl bg-secondary/50 p-5 sm:p-7 flex items-center">
                <span className="font-body text-sm sm:text-base md:text-lg text-foreground text-left">{label}</span>
              </div>
              <div className="rounded-xl bg-secondary/30 p-5 sm:p-7 flex items-center justify-center">
                <X className="w-8 h-8 sm:w-9 sm:h-9 text-destructive" strokeWidth={3} />
              </div>
              <div className={`rounded-xl p-5 sm:p-7 flex items-center justify-center ${i % 2 === 0 ? 'bg-primary/80' : 'bg-primary/65'}`}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground/20 flex items-center justify-center">
                  <Check className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" strokeWidth={3} />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        {onCta && (
          <div className="mt-12 sm:mt-14">
            <CTAButton onClick={onCta} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
              COMEÇAR AVALIAÇÃO AGORA
            </CTAButton>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 font-body">
              Investimento mínimo necessário de R$200.000,00
            </p>
          </div>
        )}
      </div>
    </section>
  );
});
ComparisonSection.displayName = "ComparisonSection";

export default ComparisonSection;
