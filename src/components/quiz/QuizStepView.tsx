import { useState, useEffect } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import { cn } from "@/lib/utils";
import { QuizStepData, motoScenarios, MotoScenario } from "@/lib/quiz-data";
import { CTAButton } from "@/components/ui/cta-button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Play, CheckCircle2, Sparkles, MessageCircle, TrendingUp, DollarSign, Clock, BarChart3 } from "lucide-react";


interface QuizStepViewProps {
  step: QuizStepData;
  answer: string | undefined;
  answers: Record<number, string>;
  onAnswer: (value: string) => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizStepView = ({ step, answer, answers, onAnswer, onNext, isFirst }: QuizStepViewProps) => {
  const [localText, setLocalText] = useState(answer || "");

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
    return (
      <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none">
        <div className="max-w-2xl w-full text-center space-y-10 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center animate-float">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-xl md:text-3xl leading-tight text-foreground px-4">
            {step.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[10px] glass-card p-5 space-y-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  "Depoimento de franqueado #{i}"
                </p>
              </div>
            ))}
          </div>
          <CTAButton onClick={onNext} className="px-10 py-5" showArrow>
            CONTINUAR
          </CTAButton>
        </div>
      </div>
    );
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
              {step.subtitleParts ? (
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

        {step.type === "text" && (
          <div className="space-y-5">
            <input
              type={step.inputType || "text"}
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onBlur={() => { if (localText) onAnswer(localText); }}
              placeholder={step.placeholder || "Digite aqui..."}
              className="w-full h-14 px-5 rounded-[10px] bg-card card-border text-foreground text-base font-body placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && localText) {
                  onAnswer(localText);
                  onNext();
                }
              }}
            />
            <CTAButton
              onClick={() => {
                if (localText) onAnswer(localText);
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

// ── Calculator View ──
const CalculatorView = ({ step, onNext, onAnswer, answer }: { step: QuizStepData; onNext: () => void; onAnswer: (v: string) => void; answer?: string }) => {
  const [selectedIdx, setSelectedIdx] = useState(parseInt(answer || "2", 10));
  const scenario = motoScenarios[selectedIdx] || motoScenarios[2];

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto scrollbar-none">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{step.title}</h2>
          {step.subtitle && <p className="text-sm text-muted-foreground font-body">{step.subtitle}</p>}
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {motoScenarios.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedIdx(idx); onAnswer(String(idx)); }}
              className={cn(
                "rounded-[10px] p-3 md:p-4 text-center transition-all duration-300 font-heading",
                selectedIdx === idx
                  ? "glow-border bg-primary/10 scale-[1.03]"
                  : "card-border bg-card hover:-translate-y-[1px] hover:border-[rgba(255,255,255,0.12)]"
              )}
            >
              <div className={cn("text-xl md:text-2xl font-black", selectedIdx === idx ? "text-primary" : "text-foreground")}>{s.motos}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">motos</div>
            </button>
          ))}
        </div>

        <div className="rounded-[10px] glass-card p-6 md:p-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-muted-foreground font-body uppercase tracking-[0.18em]">Lucro mensal estimado</span>
            <p className="text-4xl md:text-5xl font-heading font-black text-primary leading-none">
              {scenario.lucroMensal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              <span className="text-base font-bold text-muted-foreground ml-1">/mês</span>
            </p>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.06)]" />
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Lucro líquido %" value={`DE 60 A ${scenario.roiPercent}%`} />
            <MiniStat label="Payback estimado" value={`${scenario.paybackMeses} A 29 MESES`} />
            <MiniStat label="Lucro anual" value={scenario.lucroAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
          </div>
        </div>

        <div className="text-center">
          <CTAButton onClick={onNext} className="px-10 py-5 text-base" showArrow>
            QUERO CONHECER A LOCAGORA
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center space-y-1.5 rounded-[8px] bg-[rgba(0,0,0,0.2)] card-border p-3">
    <span className="text-[10px] text-muted-foreground font-body leading-tight block">{label}</span>
    <p className="font-heading font-black text-primary text-sm md:text-base leading-tight">{value}</p>
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

export default QuizStepView;
