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
    <section className="w-full pt-16 sm:pt-24 pb-8 sm:pb-12 text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-muted-foreground font-heading mb-4">
          Por que somos a melhor escolha?
        </p>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary leading-snug mb-12 sm:mb-16">
          A LocAgora é a melhor porque tudo nela foi pensado para que você tenha resultado
        </h2>

        {/* Table */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {/* Header row */}
          <div className="rounded-xl bg-secondary p-4 sm:p-6 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-lg md:text-xl text-foreground">Benefícios</span>
          </div>
          <div className="rounded-xl bg-destructive p-4 sm:p-6 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-lg md:text-xl text-destructive-foreground">Concorrentes</span>
          </div>
          <div className="rounded-xl bg-primary p-4 sm:p-6 flex items-center justify-center">
            <span className="font-heading font-bold text-base sm:text-lg md:text-xl text-primary-foreground">LocAgora</span>
          </div>

          {/* Data rows */}
          {rows.map((label, i) => (
            <React.Fragment key={i}>
              <div className="rounded-xl bg-secondary/60 p-4 sm:p-6 flex items-center">
                <span className="font-body text-sm sm:text-base md:text-lg text-foreground text-left">{label}</span>
              </div>
              <div className="rounded-xl bg-secondary/40 p-4 sm:p-6 flex items-center justify-center">
                <X className="w-7 h-7 sm:w-8 sm:h-8 text-destructive" strokeWidth={3} />
              </div>
              <div className="rounded-xl bg-primary/80 p-4 sm:p-6 flex items-center justify-center">
                <Check className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" strokeWidth={3} />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        {onCta && (
          <div className="mt-12 sm:mt-14">
            <CTAButton onClick={onCta} fullWidth className="text-base sm:text-lg md:text-xl px-10 py-5 sm:py-6">
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
