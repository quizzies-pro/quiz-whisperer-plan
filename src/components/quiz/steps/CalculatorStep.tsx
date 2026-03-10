import React, { useState } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { cn } from "@/lib/utils";
import { TrendingUp, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { MOTO_OPTIONS, calcularRetorno, type QuizStepData } from "@/lib/quiz-data";
import { DetailRow } from "./shared";

interface CalculatorStepProps {
  step: QuizStepData;
  onNext: () => void;
  onAnswer: (v: string) => void;
  answer?: string;
  answers: Record<number, string>;
}

const CalculatorStep = React.memo(({ step, onNext, onAnswer, answer, answers }: CalculatorStepProps) => {
  const [selectedMotos, setSelectedMotos] = useState(parseInt(answer || "5", 10));
  const result = calcularRetorno(selectedMotos);

  const handleSelect = (motos: number) => {
    setSelectedMotos(motos);
    onAnswer(String(motos));
  };

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 sm:px-4 pt-[72px] sm:pt-[60px] pb-4">
        <div className="max-w-3xl w-full mx-auto space-y-5 sm:space-y-6 animate-fade-in">
          <div className="flex flex-col items-center gap-2 sm:gap-2">
            <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-8 md:h-10 object-contain" />
            <p className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-foreground/80 tracking-tight text-center">
              Calculadora de Investimentos na Franquia Loca<span className="text-primary">go</span>ra
            </p>
          </div>

          <div className="text-center space-y-2 sm:space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-[28px] text-foreground leading-snug">
              {answers[2] ? <>{answers[2]}, selecione</> : <>Selecione</>} o tamanho da sua franquia e veja o quanto pode lucrar com a Loca<span className="text-primary">go</span>ra.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">
              Escolha com quantas motos você gostaria de começar.
              <span className="hidden sm:inline"><br />A simulação é baseada na média real dos franqueados ativos.</span>
            </p>
          </div>

          {/* Moto counter */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary sm:w-8 sm:h-8">
                <circle cx="5" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
                <circle cx="19" cy="17" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 17h2l2-5h4l3 5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 12l-1-4h3l2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="7" r="1.5" fill="currentColor"/>
              </svg>
              <span className="text-foreground font-heading font-black text-4xl sm:text-5xl md:text-6xl">{selectedMotos}</span>
            </div>
            <span className="text-muted-foreground font-body text-xs sm:text-sm tracking-wide">motos</span>
          </div>

          {/* Contextual message */}
          {(() => {
            const getMotoMessage = (motos: number): string | null => {
              if (motos <= 3) return "Ideal para testar o modelo Locagora";
              if (motos >= 8 && motos <= 12) return "Investimento mais recomendado para começar";
              if (motos >= 25) return "Maior rentabilidade e menor Payback";
              return null;
            };
            const msg = getMotoMessage(selectedMotos);
            if (!msg) return null;
            return (
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] glow-border bg-card/60 text-center">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs sm:text-sm text-primary font-body leading-snug">{msg}</p>
              </div>
            );
          })()}

          {/* Slider */}
          <div className="space-y-1 px-1 sm:px-2">
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={selectedMotos}
              onChange={(e) => handleSelect(parseInt(e.target.value, 10))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-primary/30 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,230,77,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-primary/30 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(0,230,77,0.5)] [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((selectedMotos - 2) / 28) * 100}%, hsl(214 55% 12%) ${((selectedMotos - 2) / 28) * 100}%, hsl(214 55% 12%) 100%)`,
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-muted-foreground font-body">2 motos</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-body">30 motos</span>
            </div>
          </div>

          {/* Quick select */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
            {MOTO_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => handleSelect(m)}
                className={cn(
                  "rounded-[10px] px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-6 md:py-3 font-heading font-bold text-sm sm:text-sm md:text-base transition-all duration-300 min-w-[44px] sm:min-w-[52px]",
                  selectedMotos === m
                    ? "bg-primary text-primary-foreground scale-105 shadow-[0_0_20px_rgba(0,230,77,0.3)]"
                    : "bg-card card-border text-foreground/70 hover:text-foreground hover:bg-card/80"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-[10px] glass-card p-4 sm:p-5 space-y-3 sm:space-y-4">
              <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground/80 uppercase tracking-wider">Detalhes do Investimento</h3>
              <div className="space-y-2 sm:space-y-3">
                <DetailRow label="Taxa de Franquia:" value={fmt(result.taxaFranquia)} />
                <DetailRow label="Valor por Moto:" value={fmt(result.custoPorMoto)} />
                <DetailRow label={`Investimento em Motos (${selectedMotos}x):`} value={fmt(result.investimentoMotos)} />
                <div className="h-px bg-foreground/10" />
                <DetailRow label="Investimento Total:" value={fmt(result.investimentoTotal)} highlight />
              </div>
              <p className="text-[10px] text-muted-foreground/50 font-body">🏷️ {result.tierLabel}</p>
            </div>

            <div className="rounded-[10px] glow-border bg-card/80 p-4 sm:p-5 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-heading font-bold text-xs sm:text-sm text-primary uppercase tracking-wider">Resultados Locagora</h3>
              </div>
              <div className="text-center py-4 sm:py-4 rounded-[10px] bg-primary/5 border border-primary/20">
                <p className="text-xs sm:text-xs uppercase tracking-wider text-muted-foreground font-heading mb-1">Lucro Mensal Estimado</p>
                <p className="font-heading font-black text-4xl sm:text-4xl text-primary leading-none">{fmt(result.lucroMensal)}</p>
                <p className="text-xs sm:text-xs text-muted-foreground/70 mt-1.5 font-body">por mês</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <DetailRow label="Lucro Anual:" value={fmt(result.lucroAnual)} highlight />
                <DetailRow label="ROI Mensal:" value={fmtPercent(result.roiMensal)} />
                <div className="h-px bg-foreground/10" />
                <DetailRow label="Payback:" value={`${result.paybackMeses} meses`} highlight />
              </div>
            </div>
          </div>

          {/* Projection */}
          <div className="rounded-[10px] glass-card p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground font-body text-center mb-2 sm:mb-3">Projeção de ganhos acumulados</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground/70 font-heading">Em 1 ano</p>
                <p className="font-heading font-black text-primary text-base sm:text-lg md:text-xl">{fmt(result.lucroAnual)}</p>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground/60">projeção total</span>
              </div>
              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground/70 font-heading">Em 3 anos</p>
                <p className="font-heading font-black text-primary text-base sm:text-lg md:text-xl">{fmt(result.lucroAnual * 3)}</p>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground/60">projeção total</span>
              </div>
            </div>
          </div>

          {/* CDB & Selic comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[10px] glass-card p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🏦</span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground">CDB 100% CDI</h4>
              </div>
              <p className="text-[10px] text-muted-foreground/70 font-body">Ganho Passivo</p>
              <div className="space-y-1.5">
                <DetailRow label="Rendimento Mensal:" value={fmt(result.cdbRendimentoMensal)} />
                <DetailRow label="Rendimento Anual:" value={fmt(result.cdbRendimentoAnual)} />
                <div className="h-px bg-foreground/10" />
                <DetailRow label="ROI Mensal:" value={fmtPercent(result.cdbRoiMensal)} />
                <DetailRow label="Taxa:" value="11,75% a.a." />
              </div>
            </div>
            <div className="rounded-[10px] glass-card p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🐷</span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-400">Tesouro Selic</h4>
              </div>
              <p className="text-[10px] text-muted-foreground/70 font-body">Ganho Passivo</p>
              <div className="space-y-1.5">
                <DetailRow label="Rendimento Mensal:" value={fmt(result.selicRendimentoMensal)} valueClassName="text-amber-400" />
                <DetailRow label="Rendimento Anual:" value={fmt(result.selicRendimentoAnual)} valueClassName="text-amber-400" />
                <div className="h-px bg-foreground/10" />
                <DetailRow label="ROI Mensal:" value={fmtPercent(result.selicRoiMensal)} valueClassName="text-amber-400" />
                <DetailRow label="Taxa:" value="15% a.a." valueClassName="text-amber-400" />
              </div>
            </div>
          </div>

          <p className="text-[9px] sm:text-[10px] text-muted-foreground/50 font-body text-center leading-relaxed max-w-xl mx-auto pb-2">
            Os valores apresentados são projeções baseadas em dados históricos e premissas de mercado.
            Rentabilidade passada não é garantia de rentabilidade futura. O investimento em franquias envolve riscos.
            Consulte um especialista antes de investir.
          </p>
        </div>
      </div>

      <div className="shrink-0 px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto">
          <CTAButton onClick={onNext} fullWidth className="py-4 sm:py-5 text-sm sm:text-base" showArrow>
            QUERO GARANTIR MINHA FRANQUIA
          </CTAButton>
        </div>
      </div>
    </div>
  );
});
CalculatorStep.displayName = "CalculatorStep";

export default CalculatorStep;
