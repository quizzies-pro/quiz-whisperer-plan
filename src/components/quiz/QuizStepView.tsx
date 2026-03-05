import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { QuizStepData, investmentTiers } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowDown, Play, CheckCircle2, Sparkles, Calendar, MessageCircle } from "lucide-react";

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

  // Auto-advance (only when autoAdvanceMs is set)
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
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
            {step.title}
          </h1>
          {step.subtitle && (
            <p className="text-lg text-muted-foreground">{step.subtitle}</p>
          )}
          {/* Video placeholder */}
          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl bg-muted border-2 border-border overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Play className="w-16 h-16" />
              <span className="text-sm">Vídeo de apresentação</span>
            </div>
          </div>
          <Button
            onClick={onNext}
            size="lg"
            className="text-base px-10 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Começar avaliação
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Interstitial ──
  if (step.type === "interstitial") {
    return (
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <Sparkles className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">
            {step.title}
          </h2>
          {/* Testimonials placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-muted border border-border p-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 mx-auto" />
                <p className="text-xs text-muted-foreground">
                  "Depoimento de cliente #{i}"
                </p>
              </div>
            ))}
          </div>
          <Button
            onClick={onNext}
            size="lg"
            className="text-base px-8 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Calculator ──
  if (step.type === "calculator") {
    const investimento = answers[10] || "200k_300k";
    const tier = investmentTiers[investimento] || investmentTiers["200k_300k"];

    return (
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground text-center">
            {step.title}
          </h2>
          {step.subtitle && (
            <p className="text-lg text-muted-foreground text-center">{step.subtitle}</p>
          )}

          <div className="rounded-2xl border-2 border-border bg-card p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Plano sugerido</span>
                <p className="text-lg font-semibold text-foreground">{tier.label}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Quantidade de motos</span>
                <p className="text-lg font-semibold text-foreground">{tier.motos}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <span className="text-sm text-muted-foreground">Lucro mensal estimado</span>
                <p className="text-3xl font-bold text-primary">
                  {tier.lucroMensal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onNext}
              size="lg"
              className="text-base px-10 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Quero garantir minha franquia LocaGora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (step.type === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{step.title}</h2>
          <LoadingAnimation />
          {/* Social proof placeholders */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-muted border border-border aspect-square flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Prova social #{i}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={onNext}
            size="lg"
            className="text-base px-8 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Ver resultado
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Result ──
  if (step.type === "result") {
    const nome = answers[2] || "Candidato";
    const investimento = answers[10] || "200k_300k";
    const tier = investmentTiers[investimento] || investmentTiers["200k_300k"];
    const cidadeLabel =
      answers[7] === "menos_50k" ? "< 50 mil hab." :
      answers[7] === "50k_100k" ? "50-100 mil hab." :
      "> 100 mil hab.";

    return (
      <div className="h-screen w-full flex items-center justify-center px-4 overflow-y-auto py-12">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 mx-auto text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              {nome}, parabéns! Seu perfil foi aprovado.
            </h2>
            <p className="text-lg text-muted-foreground">{step.subtitle}</p>
          </div>

          {/* Video placeholder */}
          <div className="relative aspect-video w-full rounded-2xl bg-muted border-2 border-border overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Play className="w-12 h-12" />
              <span className="text-sm">Vídeo do fundador</span>
            </div>
          </div>

          {/* Profile summary */}
          <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-lg">Resumo do perfil</h3>
            <div className="grid grid-cols-2 gap-4">
              <SummaryItem label="Região" value={cidadeLabel} />
              <SummaryItem label="Investimento" value={investimento.replace(/_/g, " ")} />
              <SummaryItem label="Plano sugerido" value={tier.label} />
              <SummaryItem label="Lucro estimado" value={tier.lucroMensal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + "/mês"} />
            </div>
          </div>

          {/* Conversion CTAs */}
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground font-medium">Escolha como quer dar o próximo passo</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8 py-6 rounded-xl gap-2 shadow-lg">
                <Calendar className="w-5 h-5" />
                Agendar minha apresentação
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" />
                Falar com consultor agora
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Um consultor especializado entrará em contato com você em até 24 horas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Default: Text / Multiple Choice / Welcome ──
  const questionNumber = (() => {
    // Count only answerable steps before this one
    const answerableTypes = ["text", "multiple-choice"];
    let count = 0;
    // quiz-data imported by parent — we rely on step.id
    for (let i = 2; i <= step.id; i++) {
      // Steps 2+ that are text or multiple-choice
      if (answerableTypes.includes(step.type) && i === step.id) {
        count++;
      } else if (i < step.id) {
        count++;
      }
    }
    return step.id - 1; // simplified
  })();

  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {step.type !== "welcome" && (
          <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            Pergunta {questionNumber}
          </span>
        )}

        <h2 className={cn(
          "font-bold leading-tight tracking-tight text-foreground",
          step.type === "welcome" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
        )}>
          {step.title}
        </h2>

        {step.subtitle && (
          <p className="text-lg text-muted-foreground leading-relaxed">{step.subtitle}</p>
        )}

        {step.type === "multiple-choice" && step.options && (
          <div className="space-y-3 pt-4">
            {step.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 group",
                  answer === option.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 transition-colors duration-300",
                  answer === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  "text-base md:text-lg font-medium transition-colors",
                  answer === option.value ? "text-foreground" : "text-foreground/80"
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
              className="text-lg py-6 px-4 border-2 rounded-xl"
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
            <Button
              onClick={() => {
                if (step.type === "text" && localText) onAnswer(localText);
                onNext();
              }}
              disabled={step.type === "text" && !localText && step.required}
              size="lg"
              className="text-base px-8 py-6 rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {isFirst ? "Começar" : "Continuar"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {isFirst && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm pt-8 animate-bounce">
            <ArrowDown className="w-4 h-4" />
            <span>ou pressione Enter ↵</span>
          </div>
        )}
      </div>
    </div>
  );
};

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
      <Progress value={progress} className="h-3" />
      <p className="text-sm text-muted-foreground">
        {progress < 30 ? "Verificando dados..." : progress < 60 ? "Analisando perfil..." : progress < 90 ? "Calculando compatibilidade..." : "Quase pronto..."}
      </p>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <p className="font-semibold text-foreground">{value}</p>
  </div>
);

export default QuizStepView;
