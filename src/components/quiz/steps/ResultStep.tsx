import React, { useState, useMemo } from "react";
import logoLocagora from "@/assets/logo-locagora.png";
import mapaBrasil from "@/assets/mapa-brasil.webp";
import ceoFoto from "@/assets/ceo-foto.png";
import { MessageCircle, TrendingUp, DollarSign, Clock, BarChart3 } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { calcularRetorno, MOTO_OPTIONS, type QuizStepData } from "@/lib/quiz-data";
import { StatCard, ProfileItem, VideoCard, TabletCarousel } from "./shared";

interface ResultStepProps {
  step: QuizStepData;
  answers: Record<number, string>;
}

const ResultStep = React.memo(({ step, answers }: ResultStepProps) => {
  const nome = answers[2] || "Candidato";
  const [selectedMotos, setSelectedMotos] = useState(5);
  const scenario = useMemo(() => calcularRetorno(selectedMotos), [selectedMotos]);

  // Lazy load moto images
  const [motoImages, setMotoImages] = React.useState<string[]>([]);
  React.useEffect(() => {
    Promise.all([
      import("@/assets/moto-1.webp"),
      import("@/assets/moto-2.webp"),
      import("@/assets/moto-3.webp"),
    ]).then(([a, b, c]) => setMotoImages([a.default, b.default, c.default]));
  }, []);

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
                label="Capacidade"
                value={(() => {
                  const v = answers[7];
                  if (v === "sem_tempo") return "Sem tempo disponível";
                  if (v === "1h") return "1 hora por dia";
                  if (v === "algumas_horas") return "Algumas horas/semana";
                  if (v === "integral") return "Dedicação integral";
                  return "Não informado";
                })()}
              />
              <ProfileItem label="Plano sugerido" value={scenario.tierLabel.split(":")[0] || `${scenario.motos} motos`} />
              <ProfileItem label="Lucro estimado" value={`R$ ${scenario.lucroMensal.toLocaleString("pt-BR")}/mês`} highlight />
            </div>
          </div>

          {/* Market Section */}
          <div className="py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
              <div className="flex justify-center">
                <TabletCarousel />
              </div>
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

          {/* Franchise CTA + Map */}
          <div className="mt-12 sm:mt-16 md:mt-20 py-10 sm:py-12 md:py-16" style={{ background: 'hsl(0 0% 100%)', margin: '0 -9999px', padding: '3rem 9999px' }}>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center max-w-5xl mx-auto">
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
              <div className="flex justify-center order-1 md:order-2">
                <img src={mapaBrasil} alt="Mapa do Brasil - Onde estamos" className="w-[320px] sm:w-[400px] md:w-full md:max-w-[500px] drop-shadow-xl" />
              </div>
            </div>
          </div>

          {/* Why invest */}
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

          {/* Testimonial videos */}
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

          {/* Guarantee */}
          {motoImages.length === 3 && (
            <div className="py-10 sm:py-14 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
                <div className="flex justify-center items-center gap-[-8px] sm:gap-0 relative py-4">
                  <div className="w-[32%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/20 shadow-2xl z-10 -mr-2" style={{ animation: 'float-a 4s ease-in-out infinite' }}>
                    <img src={motoImages[0]} alt="Franqueado em moto" className="w-full object-cover aspect-[2/3]" loading="lazy" />
                  </div>
                  <div className="w-[36%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/40 shadow-2xl z-20 relative top-4" style={{ animation: 'float-b 4s ease-in-out infinite' }}>
                    <img src={motoImages[1]} alt="Motociclista com capacete" className="w-full object-cover aspect-[3/5]" loading="lazy" />
                  </div>
                  <div className="w-[32%] rounded-[var(--radius)] overflow-hidden border-2 border-primary/20 shadow-2xl z-10 -ml-2" style={{ animation: 'float-c 4s ease-in-out infinite' }}>
                    <img src={motoImages[2]} alt="Entregador em moto" className="w-full object-cover aspect-[2/3]" loading="lazy" />
                  </div>
                </div>
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
          )}

          {/* 1h/dia */}
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

          {/* Sobre nós */}
          <div className="relative py-10 sm:py-14">
            <div className="relative glass-card rounded-[var(--radius)] overflow-hidden max-w-4xl mx-auto">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
              <div className="flex flex-col md:flex-row items-stretch">
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
                <div className="relative w-full md:w-[320px] lg:w-[380px] shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <img src={ceoFoto} alt="CEO LocaGora" className="w-full h-full object-cover object-top max-h-[380px] sm:max-h-[420px] md:max-h-none" />
                </div>
              </div>
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
