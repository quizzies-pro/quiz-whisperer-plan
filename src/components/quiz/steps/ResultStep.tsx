import React, { useState, useMemo } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { MessageCircle, TrendingUp, DollarSign, Clock, BarChart3 } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { calcularRetorno, MOTO_OPTIONS, type QuizStepData } from "@/lib/quiz-data";
import { StatCard, ProfileItem } from "./shared";

interface ResultStepProps {
  step: QuizStepData;
  answers: Record<number, string>;
}

const ResultStep = React.memo(({ step, answers }: ResultStepProps) => {
  const nome = answers[4] || "Candidato";
  const [selectedMotos, setSelectedMotos] = useState(5);
  const scenario = useMemo(() => calcularRetorno(selectedMotos), [selectedMotos]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none px-4 pt-[70px] pb-4">
        <div className="max-w-5xl w-full mx-auto space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <img src={logoLocagora} alt="Locagora" className="h-8 sm:h-10 md:h-14 mx-auto object-contain mb-4" />
            <h2 className="font-heading font-black text-2xl md:text-4xl text-foreground">
              {nome}, parabéns!
            </h2>
            <p className="font-heading font-bold text-xl md:text-2xl text-primary">
              Seu perfil foi aprovado.
            </p>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg mx-auto">{step.subtitle}</p>
          </div>


          <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground text-center">
            Veja o seu lucro com a <span className="text-primary">franquia aprovada</span> pra você!
          </h3>

          {/* Moto quantity slider */}
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-heading uppercase tracking-wider">Quantidade de motos</span>
              <span className="font-heading font-black text-lg text-primary">{selectedMotos} motos</span>
            </div>
            <input
              type="range"
              min={MOTO_OPTIONS[0]}
              max={MOTO_OPTIONS[MOTO_OPTIONS.length - 1]}
              step={1}
              value={selectedMotos}
              onChange={(e) => setSelectedMotos(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/20 accent-primary
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:shadow-primary/40 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-foreground
                [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-foreground"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/50 font-heading">
              {MOTO_OPTIONS.map((qty) => (
                <span key={qty}>{qty}</span>
              ))}
            </div>
          </div>

          {/* Lucro Mensal Hero */}
          <div className="text-center py-5 rounded-[10px] bg-primary/5 border border-primary/20">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-heading mb-1">Lucro Mensal Estimado</p>
            <p className="font-heading font-black text-4xl sm:text-5xl text-primary leading-none">
              R$ {scenario.lucroMensal.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1.5 font-body">com {scenario.motos} motos</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Lucro mensal estimado" value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}`} highlight />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Lucro anual estimado" value={`R$ ${scenario.lucroAnual.toLocaleString("pt-BR")}`} />
            <StatCard icon={<BarChart3 className="w-5 h-5" />} label="ROI Mensal" value={`${scenario.roiMensal.toFixed(2)}%`} />
            <StatCard icon={<Clock className="w-5 h-5" />} label="Payback estimado" value={`${scenario.paybackMeses} meses`} />
          </div>

          {/* Profile Summary */}
          <div className="rounded-[10px] glass-card p-5 sm:p-6 md:p-8">
            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground/80 uppercase tracking-wider mb-4">Resumo do seu perfil</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
               <ProfileItem
                label="Investimento"
                value={(() => {
                  const v = answers[8];
                  if (v === "menos_200k") return "Menos de 200 Mil";
                  if (v === "200k_300k") return "200 a 300 Mil";
                  if (v === "300k_500k") return "300 a 500 Mil";
                  if (v === "500k_700k") return "500 a 700 Mil";
                  if (v === "mais_700k") return "Acima de 700 Mil";
                  return "Não informado";
                })()}
              />
              <ProfileItem label="Plano sugerido" value={scenario.tierLabel.split(":")[0] || `${scenario.motos} motos`} />
              <ProfileItem label="Lucro estimado" value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}/mês`} highlight />
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-body text-center">
            Um consultor especializado entrará em contato com você em até 24 horas.
          </p>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="shrink-0 px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-xl mx-auto">
          <CTAButton
            onClick={() => window.open("https://wa.me/5500000000000?text=Ol%C3%A1!%20Fui%20aprovado%20no%20quiz%20da%20LocaGora!", "_blank")}
            fullWidth
            className="py-3.5 text-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            FALAR COM UM ESPECIALISTA
          </CTAButton>
        </div>
      </div>
    </div>
  );
});
ResultStep.displayName = "ResultStep";

export default ResultStep;
