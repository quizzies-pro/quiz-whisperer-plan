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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground font-heading mb-3">
          Por que somos a melhor escolha?
        </p>
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-primary leading-snug mb-10 sm:mb-14">
          A LocAgora é a melhor porque tudo nela foi pensado para que você tenha resultado
        </h2>

        {/* Table */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Header row */}
          <div className="rounded-lg bg-secondary p-3 sm:p-4 flex items-center justify-center">
            <span className="font-heading font-bold text-sm sm:text-base text-foreground">Benefícios</span>
          </div>
          <div className="rounded-lg bg-destructive p-3 sm:p-4 flex items-center justify-center">
            <span className="font-heading font-bold text-sm sm:text-base text-destructive-foreground">Concorrentes</span>
          </div>
          <div className="rounded-lg bg-primary p-3 sm:p-4 flex items-center justify-center">
            <span className="font-heading font-bold text-sm sm:text-base text-primary-foreground">LocAgora</span>
          </div>

          {/* Data rows */}
          {rows.map((label, i) => (
            <React.Fragment key={i}>
              {/* Benefit label */}
              <div className="rounded-lg bg-secondary/60 p-3 sm:p-4 flex items-center">
                <span className="font-body text-xs sm:text-sm text-foreground text-left">{label}</span>
              </div>
              {/* Concorrentes — X */}
              <div className="rounded-lg bg-secondary/40 p-3 sm:p-4 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" strokeWidth={3} />
              </div>
              {/* LocAgora — Check */}
              <div className="rounded-lg bg-primary/80 p-3 sm:p-4 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-foreground" strokeWidth={3} />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        {onCta && (
          <div className="mt-10">
            <CTAButton onClick={onCta} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4">
              QUERO CONHECER A LOCAGORA
            </CTAButton>
          </div>
        )}
      </div>
    </section>
  );
});
ComparisonSection.displayName = "ComparisonSection";

export default ComparisonSection;
