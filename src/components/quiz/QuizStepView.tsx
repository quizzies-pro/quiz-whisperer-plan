import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { QuizStepData, motoScenarios, MotoScenario } from "@/lib/quiz-data";
import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
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
  const [formData, setFormData] = useState({ nome: "", email: "", whatsapp: "" });

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
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-3xl w-full space-y-8 animate-fade-in text-center">
          <h1 className="font-heading font-black text-3xl md:text-5xl leading-tight text-foreground">
            {step.title}
          </h1>
          {step.subtitle && (
            <p className="text-lg text-muted-foreground font-body">{step.subtitle}</p>
          )}
          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-xl bg-card border border-border/30 overflow-hidden flex items-center justify-center shadow-card-dark">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-green">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <span className="text-sm font-body">Vídeo de apresentação</span>
            </div>
          </div>
          <CTAButton onClick={onNext} className="text-lg px-12 py-5">
            COMEÇAR A AVALIAÇÃO
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>
      </div>
    );
  }

  // ── Form (User Capture) ──
  if (step.type === "form") {
    const isFormValid = formData.nome && formData.email && formData.whatsapp;
    return (
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-lg w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{step.title}</h2>
            {step.subtitle && <p className="text-muted-foreground font-body">{step.subtitle}</p>}
          </div>
          <div className="rounded-xl bg-card border border-border/30 p-8 space-y-5 shadow-card-dark">
            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-foreground uppercase tracking-wide">Nome</label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))}
                placeholder="Seu nome completo"
                className="bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-foreground uppercase tracking-wide">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="seu@email.com"
                className="bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-foreground uppercase tracking-wide">WhatsApp</label>
              <Input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                placeholder="(00) 00000-0000"
                className="bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
          </div>
          <CTAButton
            onClick={() => {
              onAnswer(JSON.stringify(formData));
              onNext();
            }}
            disabled={!isFormValid}
            fullWidth
            className="py-5"
          >
            CONTINUAR A AVALIAÇÃO
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>
      </div>
    );
  }

  // ── Interstitial ──
  if (step.type === "interstitial") {
    return (
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center animate-float">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-4xl leading-tight text-foreground">
            {step.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-card border border-border/30 p-5 space-y-3 shadow-card-dark">
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  "Depoimento de franqueado #{i}"
                </p>
              </div>
            ))}
          </div>
          <CTAButton onClick={onNext} className="px-12 py-5">
            CONTINUAR
            <ArrowRight className="w-5 h-5" />
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
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{step.title}</h2>
          <LoadingAnimation />
          <CTAButton onClick={onNext} className="px-12 py-5">
            VER RESULTADO
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (step.type === "result") {
    let nome = "Candidato";
    try {
      const parsed = JSON.parse(answers[2] || "{}");
      nome = parsed.nome || "Candidato";
    } catch { nome = "Candidato"; }

    const selectedScenarioIdx = parseInt(answer || answers[9] || "2", 10);
    const scenario = motoScenarios[selectedScenarioIdx] || motoScenarios[2];

    return (
      <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto py-12">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center animate-pulse-green">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading font-black text-2xl md:text-4xl text-foreground">
              {nome}, parabéns!
            </h2>
            <p className="font-heading font-bold text-xl text-primary">
              Seu perfil foi aprovado.
            </p>
            <p className="text-muted-foreground font-body">{step.subtitle}</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={<DollarSign />} label="Lucro mensal estimado" value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}`} highlight />
            <StatCard icon={<TrendingUp />} label="Lucro anual estimado" value={`R$ ${scenario.lucroAnual.toLocaleString("pt-BR")}`} />
            <StatCard icon={<BarChart3 />} label="ROI estimado" value={`${scenario.roiPercent}%`} />
            <StatCard icon={<Clock />} label="Payback estimado" value={`${scenario.paybackMeses} meses`} />
          </div>

          <div className="space-y-4 text-center pt-4">
            <CTAButton
              onClick={() => window.open("https://wa.me/5500000000000?text=Ol%C3%A1!%20Fui%20aprovado%20no%20quiz%20da%20LocaGora!", "_blank")}
              fullWidth
              className="py-5 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              FALAR COM UM ESPECIALISTA
            </CTAButton>
            <p className="text-sm text-muted-foreground font-body">
              Um consultor especializado entrará em contato com você em até 24 horas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Default: Multiple Choice / Text ──
  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <h2 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-foreground">
          {step.title}
        </h2>
        {step.subtitle && (
          <p className="text-lg text-muted-foreground font-body leading-relaxed">{step.subtitle}</p>
        )}

        {step.type === "multiple-choice" && step.options && (
          <div className="space-y-3 pt-2">
            {step.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group",
                  answer === option.value
                    ? "border-primary bg-primary/10 shadow-green"
                    : "border-border/30 bg-card hover:border-primary/50 hover:bg-card/80 hover:-translate-y-0.5"
                )}
              >
                <span className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-heading font-bold shrink-0 transition-all duration-300",
                  answer === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  "text-base md:text-lg font-body transition-colors",
                  answer === option.value ? "text-foreground font-semibold" : "text-foreground/80"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {step.type === "text" && (
          <div className="pt-4 space-y-4">
            <Input
              type={step.inputType || "text"}
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onBlur={() => { if (localText) onAnswer(localText); }}
              placeholder={step.placeholder || "Digite aqui..."}
              className="text-lg py-6 px-4 bg-secondary border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter" && localText) {
                  onAnswer(localText);
                  onNext();
                }
              }}
            />
          </div>
        )}

        {(step.type === "welcome" || step.type === "text") && (
          <div className="pt-4">
            <CTAButton
              onClick={() => {
                if (step.type === "text" && localText) onAnswer(localText);
                onNext();
              }}
              disabled={step.type === "text" && !localText && step.required}
              className="px-12 py-5"
            >
              {isFirst ? "COMEÇAR" : "CONTINUAR"}
              <ArrowRight className="w-5 h-5" />
            </CTAButton>
          </div>
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
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-3xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">{step.title}</h2>
          {step.subtitle && <p className="text-muted-foreground font-body">{step.subtitle}</p>}
        </div>

        {/* Scenario selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {motoScenarios.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedIdx(idx); onAnswer(String(idx)); }}
              className={cn(
                "rounded-xl p-4 text-center transition-all duration-300 border font-heading font-bold",
                selectedIdx === idx
                  ? "bg-primary text-primary-foreground border-primary shadow-green scale-105"
                  : "bg-card text-foreground border-border/30 hover:border-primary/50 hover:-translate-y-0.5"
              )}
            >
              <div className="text-2xl font-black">{s.motos}</div>
              <div className="text-xs uppercase tracking-wide opacity-80">motos</div>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="rounded-xl bg-card border border-border/30 p-8 shadow-card-dark space-y-6">
          <div className="text-center space-y-2">
            <span className="text-sm text-muted-foreground font-body uppercase tracking-wide">Lucro mensal estimado</span>
            <p className="text-4xl md:text-5xl font-heading font-black text-primary">
              {scenario.lucroMensal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              <span className="text-lg font-bold text-muted-foreground"> /mês</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <MiniStat label="Lucro líquido %" value={`${scenario.roiPercent}%`} />
            <MiniStat label="Payback estimado" value={`${scenario.paybackMeses} meses`} />
            <MiniStat label="Lucro anual" value={scenario.lucroAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
          </div>
        </div>

        <div className="text-center">
          <CTAButton onClick={onNext} className="px-12 py-5 text-lg">
            QUERO GARANTIR MINHA FRANQUIA
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center space-y-1">
    <span className="text-xs text-muted-foreground font-body">{label}</span>
    <p className="font-heading font-black text-primary text-lg">{value}</p>
  </div>
);

// ── Sub-components ──
const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <Progress value={progress} className="h-3 bg-secondary" />
      <p className="text-sm text-muted-foreground font-body">
        {progress < 30 ? "Verificando dados..." : progress < 60 ? "Analisando perfil..." : progress < 90 ? "Calculando compatibilidade..." : "Quase pronto..."}
      </p>
    </div>
  );
};

const StatCard = ({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) => (
  <div className={cn(
    "rounded-xl p-5 space-y-2 border shadow-card-dark",
    highlight ? "bg-card border-primary/30" : "bg-card border-border/30"
  )}>
    <div className="text-primary w-5 h-5">{icon}</div>
    <span className="text-xs text-muted-foreground font-body uppercase tracking-wide">{label}</span>
    <p className={cn(
      "font-heading font-black text-primary",
      highlight ? "text-2xl" : "text-xl"
    )}>{value}</p>
  </div>
);

export default QuizStepView;
