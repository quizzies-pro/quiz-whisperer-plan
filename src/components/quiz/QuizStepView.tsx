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
    return <CalculatorView step={step} onNext={onNext} onAnswer={onAnswer} answer={answer} />;
  }

  // ── Loading ──
  if (step.type === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none">
        <div className="max-w-md w-full text-center space-y-10 animate-fade-in">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{step.title}</h2>
          <LoadingAnimation />
          <CTAButton onClick={onNext} className="px-10 py-5" showArrow>
            VER RESULTADO
          </CTAButton>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (step.type === "result") {
    const nome = answers[2] || "Candidato";
    const selectedScenarioIdx = parseInt(answer || answers[11] || "2", 10);
    const scenario = motoScenarios[selectedScenarioIdx] || motoScenarios[2];

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
            <StatCard icon={<BarChart3 className="w-5 h-5" />} label="Lucro líquido" value={`${scenario.roiPercent}%`} />
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
const CalculatorView = ({ step, onNext, onAnswer, answer }: { step: QuizStepData; onNext: () => void; onAnswer: (v: string) => void; answer?: string }) => {
  const [selectedMotos, setSelectedMotos] = useState(parseInt(answer || "5", 10));
  const result = calcularRetorno(selectedMotos);

  const handleSelect = (motos: number) => {
    setSelectedMotos(motos);
    onAnswer(String(motos));
  };

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtPercent = (v: number) => `${v.toFixed(2)}%`;

  return (
    <div className="h-screen w-full flex items-start justify-center px-4 overflow-y-auto scrollbar-none pt-[60px] pb-[80px]">
      <div className="max-w-3xl w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">{step.title}</h2>
          <p className="text-sm text-muted-foreground font-body">
            Escolha com quantas motos você gostaria de começar.<br className="hidden md:inline" />
            A simulação é baseada na média real dos franqueados ativos.
          </p>
        </div>

        {/* Moto selector */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {MOTO_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => handleSelect(m)}
              className={cn(
                "rounded-[10px] px-4 py-2.5 md:px-6 md:py-3 font-heading font-bold text-sm md:text-base transition-all duration-300",
                selectedMotos === m
                  ? "bg-primary text-primary-foreground scale-105 shadow-[0_0_20px_rgba(0,230,77,0.3)]"
                  : "bg-card card-border text-foreground/70 hover:text-foreground hover:bg-card/80"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/70 font-body">
          <span className="text-primary font-heading font-bold text-2xl md:text-3xl">{selectedMotos}</span>
          <span className="ml-2">motos selecionadas</span>
        </p>

        {/* Main grid: Investment + Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Investment Details */}
          <div className="rounded-[10px] glass-card p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm text-foreground/80 uppercase tracking-wider">Detalhes do Investimento</h3>
            <div className="space-y-3">
              <DetailRow label="Valor por Moto:" value={fmt(CALC_CONSTANTS.custoPorMoto)} />
              <DetailRow label={`Investimento em Motos (${selectedMotos}x):`} value={fmt(selectedMotos * CALC_CONSTANTS.custoPorMoto)} />
              <div className="h-px bg-foreground/10" />
              <DetailRow label="Investimento Total:" value={fmt(result.investimentoTotal)} highlight />
            </div>
          </div>

          {/* LocaGora Results */}
          <div className="rounded-[10px] glow-border bg-card/80 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">LOCAgora Franquias</h3>
            </div>
            <div className="space-y-3">
              <DetailRow label="Lucro Mensal:" value={fmt(result.lucroMensal)} highlight />
              <DetailRow label="Lucro Anual:" value={fmt(result.lucroAnual)} />
              <DetailRow label="ROI Mensal:" value={fmtPercent(result.roiMensal)} highlight />
              <DetailRow label="Payback:" value={`${result.paybackMeses} meses`} />
            </div>
          </div>
        </div>

        {/* Quanto você ganha a mais */}
        <div className="rounded-[10px] glass-card p-5">
          <h3 className="font-heading font-bold text-sm md:text-base text-center text-foreground mb-4">
            <Sparkles className="w-4 h-4 inline text-primary mr-1" />
            Quanto você ganha com a franquia?
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider block">Por mês</span>
              <p className="font-heading font-black text-primary text-lg md:text-xl">{fmt(result.lucroMensal)}</p>
              <span className="text-[10px] text-muted-foreground/60">lucro estimado</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider block">Em 1 ano</span>
              <p className="font-heading font-black text-primary text-lg md:text-xl">{fmt(result.lucroAnual)}</p>
              <span className="text-[10px] text-muted-foreground/60">lucro acumulado</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider block">Em 3 anos</span>
              <p className="font-heading font-black text-primary text-lg md:text-xl">{fmt(result.lucroAnual * 3)}</p>
              <span className="text-[10px] text-muted-foreground/60">projeção total</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground/50 font-body text-center leading-relaxed max-w-xl mx-auto">
          Os valores apresentados são projeções baseadas em dados históricos e premissas de mercado. 
          Rentabilidade passada não é garantia de rentabilidade futura. O investimento em franquias envolve riscos. 
          Consulte um especialista antes de investir.
        </p>

        {/* CTA */}
        <div className="text-center pt-1">
          <CTAButton onClick={onNext} className="px-10 py-5 text-base" showArrow>
            QUERO GARANTIR MINHA FRANQUIA
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs text-muted-foreground font-body">{label}</span>
    <span className={cn(
      "font-heading font-bold text-sm",
      highlight ? "text-primary" : "text-foreground"
    )}>{value}</span>
  </div>
);

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="h-3 bg-card rounded-full overflow-hidden card-border">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200 progress-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground font-body">
        {progress < 30 ? "Verificando dados..." : progress < 60 ? "Analisando perfil..." : progress < 90 ? "Calculando compatibilidade..." : "Quase pronto..."}
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
