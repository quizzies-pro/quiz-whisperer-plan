import React from "react";
import { TrendingUp, Users, Infinity, Bike, CalendarX } from "lucide-react";

const newsImage = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313033/ILUNOTICIAS2_y3xbi0.webp";

const tickerItems = [
  { icon: <CalendarX className="w-5 h-5" />, text: "Não sofre com sazonalidade" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Cresce todos os anos" },
  { icon: <Users className="w-5 h-5" />, text: "É pouco profissionalizado" },
  { icon: <Infinity className="w-5 h-5" />, text: "Tem demanda infinita" },
  { icon: <Bike className="w-5 h-5" />, text: "Não depende de tecnologia" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Margem alta desde o dia 1" },
];

const TickerContent = () => (
  <>
    {tickerItems.map((item, i) => (
      <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
        <span className="text-primary">{item.icon}</span>
        <span className="font-heading font-bold text-sm sm:text-base text-foreground whitespace-nowrap">
          {item.text}
        </span>
      </div>
    ))}
  </>
);

const MarketSection = React.memo(() => {
  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden text-left">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left — Text */}
          <div className="flex-1 space-y-5 max-w-xl">
            <h2
              className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-primary leading-snug"
            >
              O mercado que JÁ gera mais de 1.6
              milhão de empregos no país vai
              crescer ainda mais nos próximos anos
            </h2>

            <p className="text-sm sm:text-base text-foreground font-body leading-relaxed">
              iFood, 99, Uber e agora… <strong>Keeta.</strong>{" "}
              O Brasil vive uma explosão histórica no setor de entregas e
              mobilidade urbana e{" "}
              <strong>você pode alugar motos para entregadores.</strong>
            </p>

            <p className="text-sm sm:text-base text-foreground font-body leading-relaxed">
              O brasileiro compra muito, pede muito e{" "}
              <strong>precisa de entregadores todos os dias.</strong>
            </p>

            <p className="text-sm sm:text-base text-foreground font-body leading-relaxed">
              E para cada entrega feita no Brasil, existe{" "}
              <strong>uma única engrenagem indispensável: a moto.</strong>
            </p>
          </div>

          {/* Right — News collage */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <img
              src={newsImage}
              alt="Notícias sobre o mercado de entregas no Brasil"
              className="w-full max-w-[480px] drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Scrolling ticker bar */}
      <div className="mt-14 sm:mt-20 w-full py-4 sm:py-5 bg-card/80 border-y border-border/30 overflow-hidden">
        <div className="flex animate-ticker">
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </section>
  );
});
MarketSection.displayName = "MarketSection";

export default MarketSection;
