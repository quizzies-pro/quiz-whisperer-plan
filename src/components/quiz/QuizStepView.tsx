import { useState, useEffect, useRef } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import ceoImage from "@/assets/ceo-locagora.png";
import mockupTablet1 from "@/assets/mockup-tablet-1.webp";
import mockupTablet2 from "@/assets/mockup-tablet-2.webp";
import mapaBrasil from "@/assets/mapa-brasil.webp";
import moto1 from "@/assets/moto-1.webp";
import moto2 from "@/assets/moto-2.webp";
import moto3 from "@/assets/moto-3.webp";
import ceoFoto from "@/assets/ceo-foto.png";
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

const VideoCard = ({ id, title }: { id: string; title: string }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="group relative rounded-[var(--radius)] overflow-hidden border border-border/30 transition-all duration-300">
      {playing ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button onClick={() => setPlaying(true)} className="w-full text-left">
          <div className="aspect-video relative">
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-3 bg-card">
            <p className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">{title}</p>
          </div>
        </button>
      )}
    </div>
  );
};

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
      <div className="h-full w-full relative flex items-start justify-center px-4 pt-12 sm:pt-[70px] pb-[100px] sm:pb-[120px] overflow-y-auto scrollbar-none">
        <div className="relative z-10 max-w-4xl w-full space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in text-center">
          <img src={logoLocagora} alt="LocaGora" className="h-8 sm:h-10 md:h-16 mx-auto object-contain" />

          <h1 className="font-heading font-extrabold text-lg sm:text-2xl md:text-[2rem] leading-[1.15] tracking-[-0.01em] text-foreground">
            <span className="text-primary">Comece a lucrar já no primeiro mês</span>
            <br />
            <span className="font-black">com a franquia mais segura do Brasil</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-foreground/70 font-body max-w-2xl mx-auto leading-relaxed">
            Receba até R$ 20.000,00 por mês e garanta a franquia mais lucrativa
            do país: alugue motos para entregadores do iFood e Ubers.
          </p>

          {/* Video placeholder */}
          <div className="relative aspect-[9/16] sm:aspect-video w-full max-w-[300px] sm:max-w-[680px] mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
            <iframe
              src="https://www.youtube.com/embed/ppB407OeAUc"
              title="LocaGora - Apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg font-heading font-bold text-foreground max-w-xl mx-auto leading-relaxed tracking-tight">
            Encontramos seus primeiros clientes e facilitamos seu investimento para
            que você comece a lucrar com sua empresa no <span className="text-primary">menor tempo possível</span>
          </p>

          <CTAButton onClick={onNext} className="text-sm md:text-base px-10 py-3.5 sm:px-12 sm:py-4 md:px-16 md:py-5 font-heading font-bold tracking-wide">
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
      <div className="h-full w-full flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10 overflow-y-auto scrollbar-none">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-10 animate-fade-in my-auto">
          {/* Top section */}
          <div className="space-y-4 sm:space-y-5">
            <img src={logoLocagora} alt="Locagora" className="h-8 sm:h-10 md:h-14 mx-auto object-contain mb-8 sm:mb-10" />
            <LoadingTitle />
            <LoadingAnimation onComplete={onNext} isActive={isActive} />
          </div>

          {/* Comparison - Cards on mobile, Table on desktop */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="font-heading font-bold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-primary">Use seu lado racional</p>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug">
                {answers[2] ? `${answers[2]}, a` : "A"} Loca<span className="text-primary">go</span>ra é melhor não só pelo marketing...
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

            {/* Video */}
            <div className="text-center">
              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
                Fillipe Félix tem uma <span className="text-primary">mensagem pra você!</span>
              </h3>
            </div>
            <div className="relative aspect-[9/16] sm:aspect-video w-full max-w-xl mx-auto rounded-[10px] overflow-hidden border-2 border-primary/40">
              <iframe
                src="https://www.youtube.com/embed/ppB407OeAUc"
                title="LocaGora - Resultado"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground text-center">
              Veja o seu lucro com a <span className="text-primary">franquia aprovada</span> pra você!
            </h3>

            {/* Lucro Mensal - Hero */}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <ProfileItem
                  label="Região"
                  value={(() => {
                    const v = answers[7];
                    if (v === "menos_50k") return "Cidade até 50 mil hab.";
                    if (v === "50k_100k") return "Cidade de 50-100 mil hab.";
                    if (v === "mais_100k") return "Cidade +100 mil hab.";
                    return "Não informado";
                  })()}
                />
                <ProfileItem
                  label="Capacidade"
                  value={(() => {
                    const v = answers[8];
                    if (v === "sem_tempo") return "Sem tempo disponível";
                    if (v === "1h") return "1 hora por dia";
                    if (v === "algumas_horas") return "Algumas horas/semana";
                    if (v === "integral") return "Dedicação integral";
                    return "Não informado";
                  })()}
                />
                <ProfileItem
                  label="Plano sugerido"
                  value={scenario.tierLabel.split(":")[0] || `${scenario.motos} motos`}
                />
                <ProfileItem
                  label="Lucro estimado"
                  value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}/mês`}
                  highlight
                />
              </div>
            </div>

            {/* Market Section - full width like reference */}
            <div className="py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
                {/* Tablet mockups - carousel */}
                <div className="flex justify-center">
                  <TabletCarousel />
                </div>

                {/* Text content */}
                <div className="space-y-5">
                  <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.1]">
                    O mercado que{" "}
                    <span className="text-primary">gera mais de 1,6 milhão de empregos no país</span>{" "}
                    pode aumentar seu patrimônio
                  </h3>
                  <p className="text-sm md:text-base text-foreground/80 font-body leading-relaxed">
                    Se sua cidade tem mais de 100 mil habitantes e você quer empreender com uma margem de lucro maior que as demais franquias do mercado, ter uma franquia LocAgora é o que você precisa.
                  </p>
                  <p className="text-sm md:text-base text-foreground/80 font-body leading-relaxed">
                    Muitas pessoas querem começar a trabalhar com entregas e transporte, mas não podem comprar uma moto, por isso a opção mais barata é alugar.
                  </p>
                  <p className="text-sm md:text-base text-foreground/80 font-body leading-relaxed">
                    Com nossa franquia, você vai poder oferecer motos para uma demanda sedenta a um preço acessível. Junte-se a nós.
                  </p>
                </div>
              </div>
              <p className="text-center text-sm md:text-base text-foreground font-body mt-8">
                Invista agora em uma <strong>franquia de locação de motos</strong> rentável e validada.
              </p>
            </div>

            {/* Franchise CTA + Map section */}
            <div className="mt-12 sm:mt-16 md:mt-20 py-10 sm:py-12 md:py-16" style={{ background: 'hsl(0 0% 100%)', margin: '0 -9999px', padding: '3rem 9999px' }}>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center max-w-5xl mx-auto">
                {/* Left: text + stats */}
                <div className="space-y-4 sm:space-y-5 text-center md:text-left order-2 md:order-1">
                  <h3 className="font-heading font-black text-xl sm:text-2xl md:text-4xl text-background uppercase leading-tight">
                    Seja um franqueado Loca<span className="text-primary">go</span>ra e fature mais de
                  </h3>
                  <p className="font-heading font-black text-4xl sm:text-5xl md:text-7xl text-primary leading-none">
                    R$ {scenario.lucroAnual.toLocaleString("pt-BR")}
                  </p>
                  <h4 className="font-heading font-black text-base sm:text-xl md:text-3xl text-background uppercase leading-tight">
                    por ano em um dos setores que mais cresce no Brasil.
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto md:mx-0">
                    <div className="rounded-[var(--radius)] bg-card p-4 sm:p-5 text-center space-y-2 border border-primary/10 shadow-lg shadow-primary/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <p className="text-[10px] sm:text-xs font-body text-foreground/60 uppercase tracking-wider relative">Lucro líquido mensal estimado</p>
                      <p className="font-heading font-black text-lg sm:text-xl md:text-2xl text-primary relative">DE 60 A 75%</p>
                    </div>
                    <div className="rounded-[var(--radius)] bg-card p-4 sm:p-5 text-center space-y-2 border border-primary/10 shadow-lg shadow-primary/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <p className="text-[10px] sm:text-xs font-body text-foreground/60 uppercase tracking-wider relative">Payback estimado de</p>
                      <p className="font-heading font-black text-lg sm:text-xl md:text-2xl text-primary relative">{scenario.paybackMeses} MESES</p>
                    </div>
                  </div>
                </div>

                {/* Right: Brazil map */}
                <div className="flex justify-center order-1 md:order-2">
                  <img src={mapaBrasil} alt="Mapa do Brasil - Onde estamos" className="w-[200px] sm:w-[280px] md:w-full md:max-w-[450px] drop-shadow-xl" />
                </div>
              </div>
            </div>

            {/* Why invest section */}
            <div className="text-center space-y-4 sm:space-y-5 py-8 sm:py-10 md:py-14 pb-12 sm:pb-16 md:pb-20" style={{ background: 'hsl(0 0% 100%)', margin: '0 -9999px', padding: '2rem 9999px 3.5rem 9999px' }}>
              <h3 className="font-heading font-black text-xl sm:text-2xl md:text-4xl text-background">
                Por quê investir na Loca<span className="text-primary">go</span>ra é o melhor negócio?
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-background/60 font-body">
                Somos uma marca em constante crescimento e com presença nacional!
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <p className="font-heading font-black text-2xl sm:text-3xl md:text-5xl text-primary">+770</p>
                  <p className="font-heading font-bold text-[8px] sm:text-[10px] md:text-sm uppercase tracking-wider text-background mt-1">Franquias Abertas</p>
                </div>
                <div className="text-center border-x border-background/15">
                  <p className="font-heading font-black text-2xl sm:text-3xl md:text-5xl text-primary">+98</p>
                  <p className="font-heading font-bold text-[8px] sm:text-[10px] md:text-sm uppercase tracking-wider text-background mt-1">Cidades Atendidas</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-black text-2xl sm:text-3xl md:text-5xl text-primary">+100</p>
                  <p className="font-heading font-bold text-[8px] sm:text-[10px] md:text-sm uppercase tracking-wider text-background mt-1">Lojas em Operação</p>
                </div>
              </div>
            </div>

            {/* Franchisee testimonials videos */}
            <div className="py-10 sm:py-14 space-y-6 sm:space-y-8">
              <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-foreground text-center">
                Confira o que os franqueados dizem
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
                {[
                  { id: "rl-AYQ90-YU", title: "Case de Sucesso" },
                  { id: "6qa_JlGQQW8", title: "Viva a Experiência" },
                  { id: "hlEn0HbV36U", title: "Vivência" },
                  { id: "vtoTG4_fOBk", title: "Crescimento" },
                  { id: "nrVIL8DZygw", title: "Motos alugadas em 10 dias" },
                  { id: "UJeqcMXjDbY", title: "Plano Fidelidade" },
                ].map((video) => (
                  <VideoCard key={video.id} id={video.id} title={video.title} />
                ))}
              </div>
            </div>

            {/* Guarantee section */}
            <div className="py-10 sm:py-14 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
                {/* Left: vertical images with float animation */}
                <div className="flex justify-center items-center gap-[-8px] sm:gap-0 relative py-4">
                  <div className="w-[32%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/20 shadow-2xl z-10 -mr-2" style={{ animation: 'float-a 4s ease-in-out infinite' }}>
                    <img src={moto1} alt="Franqueado em moto" className="w-full object-cover aspect-[2/3]" loading="lazy" />
                  </div>
                  <div className="w-[36%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/40 shadow-2xl z-20 relative top-4" style={{ animation: 'float-b 4s ease-in-out infinite' }}>
                    <img src={moto2} alt="Motociclista com capacete" className="w-full object-cover aspect-[3/5]" loading="lazy" />
                  </div>
                  <div className="w-[32%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/20 shadow-2xl z-10 -ml-2" style={{ animation: 'float-c 4s ease-in-out infinite' }}>
                    <img src={moto3} alt="Entregador em moto" className="w-full object-cover aspect-[2/3]" loading="lazy" />
                  </div>
                </div>

                {/* Right: text */}
                <div className="space-y-4 sm:space-y-5 text-center md:text-left">
                  <span className="inline-block font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest text-primary border border-primary/30 rounded-full px-4 py-1.5">
                    Garantido em cartório
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
                    Encontramos seus primeiros clientes ou devolvemos todo o seu investimento
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">
                    Queremos que você comece sua franquia com um retorno imediato, além de encontrar seus primeiros clientes por você. Tudo isso garantido por um contrato assinado em cartório.
                  </p>
                  <CTAButton
                    onClick={() => window.open("https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20conhecer%20a%20LocaGora!", "_blank")}
                    className="mt-2"
                  >
                    QUERO CONHECER A LOCAGORA
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* 1h/dia section */}
            <div className="relative py-10 sm:py-14">
              <div className="relative glass-card rounded-[var(--radius)] p-8 sm:p-10 md:p-12 text-center space-y-5 max-w-3xl mx-auto overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-primary shadow-[0_0_20px_4px_hsl(140_100%_45%/0.5)]" />
                <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-primary leading-tight">
                  Você só precisa de 1h/dia<br />para tocar sua franquia
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
                  Se você quer diversificar suas fontes de renda, mas não tem tempo para construir do zero um outro negócio, a franquia Loca<span className="text-primary font-bold">go</span>ra é a opção ideal. Em apenas uma hora do seu dia você consegue olhar os requerimentos da empresa e resolver o que precisa.
                </p>


              </div>
            </div>

            {/* Sobre Nós section */}
            <div className="relative py-10 sm:py-14">
              <div className="relative glass-card rounded-[var(--radius)] overflow-hidden max-w-4xl mx-auto">
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
                
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Text content */}
                  <div className="flex-1 p-8 sm:p-10 md:p-12 flex flex-col justify-center space-y-5">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-[2px] bg-primary rounded-full" />
                      <span className="text-primary text-xs font-heading font-bold uppercase tracking-[0.15em]">Quem somos</span>
                    </div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground leading-tight">
                      Sobre a Loca<span className="text-primary">go</span>ra
                    </h3>
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base text-foreground/70 font-body leading-relaxed">
                        Somos a número um em franquias de aluguel de motos no país e acreditamos que esse mercado une as duas formas de negócio mais rentáveis que existem: a de franquias e a de locomoção.
                      </p>
                      <p className="text-sm sm:text-base text-foreground/70 font-body leading-relaxed">
                        Oferecemos veículos de qualidade superior, a um preço acessível para que seus clientes te procurem.
                      </p>
                      <p className="text-sm sm:text-base text-foreground font-body leading-relaxed font-semibold">
                        Invista na franquia com o potencial mais lucrativo do país.
                      </p>
                    </div>


                  </div>

                  {/* CEO Image */}
                  <div className="relative w-full md:w-[280px] lg:w-[320px] shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card/80 via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                      src={ceoFoto}
                      alt="CEO LocaGora"
                      className="w-full h-full object-cover object-top max-h-[250px] sm:max-h-[300px] md:max-h-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground font-body text-center">
              Um consultor especializado entrará em contato com você em até 24 horas.
            </p>
          </div>
        </div>

        {/* Fixed CTA at bottom */}
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
  }

  // ── Default: Multiple Choice / Text ──
  return (
    <div className="h-full w-full flex items-center justify-center px-4 py-10 overflow-y-auto scrollbar-none">
      <div className="max-w-xl w-full space-y-8 animate-fade-in my-auto">
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
    <div className="h-full w-full flex flex-col overflow-hidden">
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
  const DURATION_MS = 5000;
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
  const DURATION_MS = 5000;
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
    <div className="h-full w-full relative overflow-hidden">
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
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
          {/* CEO Photo */}
          <div className="relative">
            <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_rgba(34,197,94,0.2)]">
              <img
                src={ceoImage}
                alt="CEO LocaGora"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">Excelente Perfil!</span>
            </div>

            <h2 className="font-heading font-black text-lg sm:text-xl md:text-3xl leading-tight text-foreground">
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

const TabletCarousel = () => {
  const [current, setCurrent] = useState(0);
  const images = [mockupTablet1, mockupTablet2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[420px]">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Mockup tablet ${idx + 1}`}
          className={cn(
            "w-full drop-shadow-2xl transition-opacity duration-700 absolute inset-0",
            idx === current ? "opacity-100 relative" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
};

const ProfileItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="space-y-1">
    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground/70 font-heading">{label}</p>
    <p className={cn("font-heading font-bold text-sm sm:text-base", highlight ? "text-primary" : "text-foreground")}>{value}</p>
  </div>
);

export default QuizStepView;
