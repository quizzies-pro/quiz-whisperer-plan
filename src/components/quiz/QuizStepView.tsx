import { useState, useEffect, useRef } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import ceoImage from "@/assets/ceo-locagora.png";
import { cn } from "@/lib/utils";
import { QuizStepData, motoScenarios, MotoScenario, MOTO_OPTIONS, calcularRetorno, CALC_CONSTANTS, type CalculatorResult } from "@/lib/quiz-data";
import { CTAButton } from "@/components/ui/cta-button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Play, CheckCircle2, Sparkles, MessageCircle, TrendingUp, DollarSign, Clock, BarChart3 } from "lucide-react";
import PhoneInput from "./PhoneInput";
import TestimonialWall from "./TestimonialWall";


interface QuizStepViewProps {
  step: QuizStepData;
  answer: string | undefined;
  answers: Record<number, string>;
  onAnswer: (value: string) => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
}

const QuizStepView = ({ step, answer, answers, onAnswer, onNext, isFirst, isActive }: QuizStepViewProps) => {
  const [localText, setLocalText] = useState(answer || "");
  const [validationError, setValidationError] = useState("");
  useEffect(() => {
    if (step.autoAdvanceMs) {
      const timer = setTimeout(() => onNext(), step.autoAdvanceMs);
      return () => clearTimeout(timer);
    }
  }, [step, onNext]);

  const handleOptionClick = (value: string) => {
    onAnswer(value);
    setTimeout(() => onNext(), 400);
  };

  // ── VSL ──
  if (step.type === "vsl") {
    return (
      <div className="h-screen w-full relative flex items-start justify-center px-4 pt-[70px] pb-[70px] overflow-y-auto scrollbar-none">
        <div className="relative z-10 max-w-4xl w-full space-y-5 md:space-y-6 animate-fade-in text-center">
          <img src={logoLocagora} alt="LocaGora" className="h-10 md:h-16 mx-auto object-contain" />

          <h1 className="font-heading font-extrabold text-lg sm:text-2xl md:text-[2rem] leading-[1.15] tracking-[-0.01em] text-foreground">
            <span className="text-primary">Comece a lucrar já no primeiro mês</span>
            <br />
            <span className="font-black">com a franquia mais segura do Brasil</span>
          </h1>

          <p className="text-sm md:text-base text-foreground/70 font-body max-w-2xl mx-auto leading-relaxed">
            Receba até R$ 20.000,00 por mês e garanta a franquia mais lucrativa
            <span className="block">do país: alugue motos para entregadores do iFood e Ubers.</span>
          </p>

          {/* Video placeholder */}
          <div className="relative aspect-video w-full max-w-[680px] mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
            <iframe
              src="https://www.youtube.com/embed/ppB407OeAUc"
              title="LocaGora - Apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-base md:text-lg font-heading font-bold text-foreground max-w-xl mx-auto leading-relaxed tracking-tight">
            Encontramos seus primeiros clientes e facilitamos seu investimento para
            que você comece a lucrar com sua empresa no <span className="text-primary">menor tempo possível</span>
          </p>

          <CTAButton onClick={onNext} className="text-sm md:text-base px-12 py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
            COMEÇAR AGORA
          </CTAButton>
        </div>
      </div>
    );
  }

  // ── Interstitial ──
  if (step.type === "interstitial") {
    return <InterstitialView step={step} onNext={onNext} answers={answers} isActive={isActive} />;
  }

  // ── Calculator ──
  if (step.type === "calculator") {
    return <CalculatorView step={step} onNext={onNext} onAnswer={onAnswer} answer={answer} answers={answers} />;
  }

  // ── Loading ──
  if (step.type === "loading") {
    const benefits = [
      "Lucro no primeiro mês",
      "Sem contratação de funcionários",
      "Facilidade na compra de produtos",
      "Não exige tempo integral de dedicação",
    ];

    return (
      <div className="h-screen w-full flex items-start sm:items-center justify-center px-4 sm:px-6 py-6 sm:py-10 overflow-y-auto scrollbar-none">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-10 animate-fade-in">
          {/* Top section */}
          <div className="space-y-4 sm:space-y-5 pt-2 sm:pt-0">
            <img src={logoLocagora} alt="Locagora" className="h-8 sm:h-10 md:h-14 mx-auto object-contain" />
            <LoadingTitle />
            <LoadingAnimation onComplete={onNext} isActive={isActive} />
          </div>

          {/* Comparison - Cards on mobile, Table on desktop */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="font-heading font-bold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-primary">Use seu lado racional</p>
              <h3 className="font-heading font-extrabold text-base sm:text-2xl md:text-3xl text-foreground leading-snug">
                A Loca<span className="text-primary">go</span>ra é melhor não só pelo marketing...
              </h3>
            </div>

            {/* Mobile: card-style layout matching reference */}
            <div className="sm:hidden rounded-[10px] overflow-hidden card-border">
              {/* Header */}
              <div className="text-center py-4 bg-card border-b border-border/20">
                <span className="font-heading font-bold text-sm text-foreground">Benefícios</span>
              </div>
              {/* Badges row */}
              <div className="flex bg-card border-b border-border/20 py-3 px-4 gap-3">
                <div className="flex-1 flex justify-center">
                  <span className="w-full text-center py-2.5 rounded-lg bg-destructive text-xs font-heading font-bold text-primary-foreground">Concorrentes</span>
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="w-full text-center py-2.5 rounded-lg bg-primary text-xs font-heading font-bold text-primary-foreground">LocAgora</span>
                </div>
              </div>
              {/* Benefit rows */}
              {benefits.map((benefit, idx) => (
                <div key={idx} className={cn(
                  "bg-card",
                  idx < benefits.length - 1 && "border-b border-border/15"
                )}>
                  <div className="text-center py-3 px-4">
                    <span className="text-sm font-body text-foreground/90">{benefit}</span>
                  </div>
                  <div className="flex gap-[1px] px-3 pb-3">
                    <div className="flex-1 flex justify-center py-3 rounded-lg bg-background/60">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-destructive/15">
                        <span className="text-destructive text-xs font-bold">✕</span>
                      </span>
                    </div>
                    <div className="flex-1 flex justify-center py-3 rounded-lg bg-background/60">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: full table */}
            <div className="hidden sm:block rounded-[10px] overflow-hidden card-border">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-5 py-4 text-left text-xs sm:text-sm font-heading font-bold text-foreground/80 bg-card">Benefícios</th>
                    <th className="px-4 py-4 text-center text-xs sm:text-sm font-heading font-bold text-primary-foreground bg-destructive/80 w-[150px]">Concorrentes</th>
                    <th className="px-4 py-4 text-center text-xs sm:text-sm font-heading font-bold text-primary-foreground bg-primary w-[150px]">Locagora</th>
                  </tr>
                </thead>
                <tbody>
                  {benefits.map((benefit, idx) => (
                    <tr key={idx} className="border-t border-border/20">
                      <td className="px-5 py-5 text-sm font-body text-foreground/80 bg-card">{benefit}</td>
                      <td className="px-4 py-5 text-center bg-card">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-destructive/15">
                          <span className="text-destructive text-xs font-bold">✕</span>
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center bg-card">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ── Result ──
  if (step.type === "result") {
    const nome = answers[2] || "Candidato";
    const selectedMotos = parseInt(answers[11] || "5", 10);
    const scenario = calcularRetorno(selectedMotos);

    return (
      <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none py-12">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center animate-pulse-green">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading font-black text-2xl md:text-4xl text-foreground">
              {nome}, parabéns!
            </h2>
            <p className="font-heading font-bold text-lg md:text-xl text-primary">
              Seu perfil foi aprovado.
            </p>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-lg mx-auto">{step.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Lucro mensal estimado" value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}`} highlight />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Lucro anual estimado" value={`R$ ${scenario.lucroAnual.toLocaleString("pt-BR")}`} />
            <StatCard icon={<BarChart3 className="w-5 h-5" />} label="ROI Mensal" value={`${scenario.roiMensal.toFixed(2)}%`} />
            <StatCard icon={<Clock className="w-5 h-5" />} label="Payback estimado" value={`${scenario.paybackMeses} meses`} />
          </div>

          <div className="space-y-4 text-center pt-2">
            <CTAButton
              onClick={() => window.open("https://wa.me/5500000000000?text=Ol%C3%A1!%20Fui%20aprovado%20no%20quiz%20da%20LocaGora!", "_blank")}
              fullWidth
              className="py-5 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              FALAR COM UM ESPECIALISTA
            </CTAButton>
            <p className="text-xs text-muted-foreground font-body">
              Um consultor especializado entrará em contato com você em até 24 horas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Default: Multiple Choice / Text ──
  return (
    <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none">
      <div className="max-w-xl w-full space-y-8 animate-fade-in">
        <div className="space-y-3">
          <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-foreground">
            {step.id === 3 && answers[2]
              ? <>{answers[2]}, <span className="text-primary">qual é o seu email?</span></>
              : step.id === 4 && answers[2]
              ? <>{answers[2]}, <span className="text-primary">qual é o seu WhatsApp?</span></>
              : step.title}
          </h2>
          {step.subtitle && (
            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
              {step.id === 10 && answers[2]
                ? <>{answers[2]}, {step.subtitle.charAt(0).toLowerCase() + step.subtitle.slice(1)}</>
                : step.subtitleParts ? (
                  <>
                    {step.subtitleParts[0]}<br className="hidden md:inline" />{step.subtitleParts[1]}
                  </>
                ) : step.subtitle}
            </p>
          )}
        </div>

        {step.type === "multiple-choice" && step.options && (
          <div className="space-y-3">
            {step.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "w-full text-left px-5 py-4 rounded-[10px] transition-all duration-300 flex items-center gap-4 group",
                  answer === option.value
                    ? "glow-border bg-primary/5"
                    : "card-border bg-card hover:bg-card/80 hover:-translate-y-[1px] hover:border-[rgba(255,255,255,0.12)]"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-[6px] flex items-center justify-center text-sm font-heading font-bold shrink-0 transition-all duration-300",
                  answer === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  "text-sm md:text-base font-body transition-colors",
                  answer === option.value ? "text-foreground" : "text-foreground/75 group-hover:text-foreground/90"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {step.type === "text" && step.inputType === "tel" && (
          <div className="space-y-5">
            <PhoneInput
              value={localText}
              onChange={(val) => { setLocalText(val); setValidationError(""); }}
              onSubmit={() => {
                onAnswer(localText);
                onNext();
              }}
            />
            {validationError && (
              <p className="text-sm text-destructive font-body">{validationError}</p>
            )}
            <CTAButton
              onClick={() => {
                if (!localText || localText.replace(/\D/g, "").length < 10) {
                  setValidationError("Informe um número de telefone válido.");
                  return;
                }
                onAnswer(localText);
                onNext();
              }}
              disabled={!localText && step.required}
              className="px-10 py-4"
              showArrow
            >
              CONTINUAR
            </CTAButton>
          </div>
        )}

        {step.type === "text" && step.inputType !== "tel" && (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <input
                type={step.inputType || "text"}
                value={localText}
                onChange={(e) => { setLocalText(e.target.value); setValidationError(""); }}
                onBlur={() => { if (localText) onAnswer(localText); }}
                placeholder={step.placeholder || "Digite aqui..."}
                className={cn(
                  "w-full h-14 px-5 rounded-[10px] bg-card card-border text-foreground text-base font-body placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all",
                  validationError && "border-destructive/60 focus:border-destructive/60 focus:ring-destructive/30"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && localText) {
                    if (step.inputType === "email") {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(localText.trim())) {
                        setValidationError("Informe um e-mail válido.");
                        return;
                      }
                    }
                    onAnswer(localText.trim());
                    onNext();
                  }
                }}
              />
              {validationError && (
                <p className="text-sm text-destructive font-body">{validationError}</p>
              )}
            </div>
            <CTAButton
              onClick={() => {
                if (step.inputType === "email") {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(localText.trim())) {
                    setValidationError("Informe um e-mail válido.");
                    return;
                  }
                }
                if (localText) onAnswer(localText.trim());
                onNext();
              }}
              disabled={!localText && step.required}
              className="px-10 py-4"
              showArrow
            >
              {isFirst ? "COMEÇAR" : "CONTINUAR"}
            </CTAButton>
          </div>
        )}

        {step.type === "welcome" && (
          <CTAButton onClick={onNext} className="px-10 py-5" showArrow>
            {isFirst ? "COMEÇAR" : "CONTINUAR"}
          </CTAButton>
        )}
      </div>
    </div>
  );
};

// ── Calculator View (Dynamic PRD) ──
const CalculatorView = ({ step, onNext, onAnswer, answer, answers }: { step: QuizStepData; onNext: () => void; onAnswer: (v: string) => void; answer?: string; answers: Record<number, string> }) => {
  const [selectedMotos, setSelectedMotos] = useState(parseInt(answer || "5", 10));
  const result = calcularRetorno(selectedMotos);

  const handleSelect = (motos: number) => {
    setSelectedMotos(motos);
    onAnswer(String(motos));
  };

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 sm:px-4 pt-[72px] sm:pt-[60px] pb-4">
        <div className="max-w-3xl w-full mx-auto space-y-5 sm:space-y-6 animate-fade-in">
          {/* Logo + subtitle */}
          <div className="flex flex-col items-center gap-2 sm:gap-2">
            <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-8 md:h-10 object-contain" />
            <p className="font-heading font-bold text-[11px] sm:text-sm md:text-base text-foreground/80 tracking-tight text-center">
              Calculadora de Investimentos na Franquia Loca<span className="text-primary">go</span>ra
            </p>
          </div>

          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-[28px] text-foreground leading-snug">
              {answers[2] ? <>{answers[2]}, selecione</> : <>Selecione</>} o tamanho da sua franquia e veja o quanto pode lucrar com a Loca<span className="text-primary">go</span>ra.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">
              Escolha com quantas motos você gostaria de começar.
              <span className="hidden sm:inline"><br />A simulação é baseada na média real dos franqueados ativos.</span>
            </p>
          </div>

          {/* Moto counter + icon */}
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

          {/* Contextual message based on moto count — only for 2, 10, 30 */}
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

          {/* Quick select buttons */}
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

          {/* Main grid: Investment + Result */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Investment Details */}
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

            {/* LocaGora Results */}
            <div className="rounded-[10px] glow-border bg-card/80 p-4 sm:p-5 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-heading font-bold text-xs sm:text-sm text-primary uppercase tracking-wider">Resultados Locagora</h3>
              </div>

              {/* Lucro Mensal - Hero destaque */}
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

          {/* Comparativo: CDB e Selic */}
          <div className="grid grid-cols-2 gap-3">
            {/* CDB */}
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
            {/* Selic */}
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

      {/* Fixed CTA at bottom */}
      <div className="shrink-0 px-3 sm:px-4 py-3 sm:py-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto">
          <CTAButton onClick={onNext} fullWidth className="py-4 sm:py-5 text-sm sm:text-base" showArrow>
            QUERO GARANTIR MINHA FRANQUIA
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight, valueClassName }: { label: string; value: React.ReactNode; highlight?: boolean; valueClassName?: string }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs text-muted-foreground font-body">{label}</span>
    <span className={cn(
      "font-heading font-bold text-sm",
      valueClassName ? valueClassName : highlight ? "text-primary" : "text-foreground"
    )}>{value}</span>
  </div>
);

const LoadingTitle = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const texts = ["Aguarde um momento", "Analisando seu perfil..."];
  return (
    <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground animate-[pulse_2.5s_ease-in-out_infinite]">
      <span key={phase} className="animate-fade-in inline-block">{texts[phase]}</span>
    </h2>
  );
};

const LoadingAnimation = ({ onComplete, isActive }: { onComplete: () => void; isActive: boolean }) => {
  const [progress, setProgress] = useState(0);
  const hasAdvanced = useRef(false);
  const DURATION_MS = 10000;
  const INTERVAL_MS = 100;
  const increment = 100 / (DURATION_MS / INTERVAL_MS);

  // Reset when becoming active
  useEffect(() => {
    if (isActive) {
      setProgress(0);
      hasAdvanced.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isActive, increment]);

  useEffect(() => {
    if (progress >= 100 && !hasAdvanced.current && isActive) {
      hasAdvanced.current = true;
      const timer = setTimeout(() => onComplete(), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete, isActive]);

  return (
    <div className="space-y-4">
      <div className="h-3 bg-card rounded-full overflow-hidden card-border">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground font-body">
        {progress < 25 ? "Verificando dados..." : progress < 50 ? "Analisando perfil..." : progress < 75 ? "Calculando compatibilidade..." : progress < 100 ? "Quase pronto..." : "Concluído! ✓"}
      </p>
    </div>
  );
};

const StatCard = ({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) => (
  <div className={cn(
    "rounded-[10px] p-4 md:p-5 space-y-2 glass-card",
    highlight && "glow-border"
  )}>
    <div className="text-primary">{icon}</div>
    <span className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-[0.12em] block">{label}</span>
    <p className={cn(
      "font-heading font-black text-primary leading-none",
      highlight ? "text-xl md:text-2xl" : "text-lg md:text-xl"
    )}>{value}</p>
  </div>
);

// ── Interstitial View ──
const InterstitialView = ({ step, onNext, answers, isActive }: { step: QuizStepData; onNext: () => void; answers: Record<number, string>; isActive: boolean }) => {
  const [progress, setProgress] = useState(0);
  const hasAdvanced = useRef(false);
  const DURATION_MS = 10000;
  const INTERVAL_MS = 70;
  const increment = 100 / (DURATION_MS / INTERVAL_MS);

  // Reset when becoming active
  useEffect(() => {
    if (isActive) {
      setProgress(0);
      hasAdvanced.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isActive, increment]);

  useEffect(() => {
    if (progress >= 100 && !hasAdvanced.current && isActive) {
      hasAdvanced.current = true;
      const timer = setTimeout(() => onNext(), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onNext, isActive]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Testimonial wall in bottom 50% */}
      <TestimonialWall />

      {/* Circle shadow behind content for readability */}
      <div
        className="absolute z-[15] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(216 55% 7% / 1) 0%, hsl(216 55% 7% / 1) 25%, hsl(216 55% 7% / 0.97) 35%, hsl(216 55% 7% / 0.88) 45%, hsl(216 55% 7% / 0.7) 55%, hsl(216 55% 7% / 0.45) 65%, hsl(216 55% 7% / 0.2) 75%, hsl(216 55% 7% / 0.07) 85%, transparent 95%)",
        }}
      />

      <div className="relative z-20 h-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none">
      <div className="max-w-3xl w-full animate-fade-in">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* CEO Photo - grande */}
          <div className="relative">
            <div className="w-60 h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
              <img
                src={ceoImage}
                alt="CEO LocaGora"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Excelente Perfil!</span>
            </div>

            <h2 className="font-heading font-black text-xl md:text-3xl leading-tight text-foreground">
              {step.title}
            </h2>

            {step.subtitle && (
              <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                {step.subtitle}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              {["✓ Alta rentabilidade", "✓ Suporte completo", "✓ Retorno rápido"].map((item) => (
                <span key={item} className="text-xs font-body text-primary/90 bg-primary/5 border border-primary/10 rounded-full px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="pt-4 space-y-3">
              <div className="h-3 bg-card rounded-full overflow-hidden card-border">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground font-body">
                {progress < 100
                  ? `Estamos atualizando seus dados... ${Math.floor(progress)}%`
                  : "Dados atualizados com sucesso! ✓"}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default QuizStepView;
