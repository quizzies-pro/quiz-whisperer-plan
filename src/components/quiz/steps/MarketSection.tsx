import React from "react";
import { TrendingUp, Users, Infinity, Bike } from "lucide-react";

const newsImage = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313033/ILUNOTICIAS2_y3xbi0.webp";

const tickerItems = [
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
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — Text */}
          <div className="flex-1 space-y-6 text-left">
            <h2
              className="font-heading font-extrabold text-2xl sm:text-3xl md:text-[2.25rem] text-foreground italic leading-tight"
            >
              O mercado que JÁ gera mais de{" "}
              <span className="text-primary">1.6 milhão de empregos</span> no
              país vai crescer ainda mais nos próximos anos
            </h2>

            <p className="text-sm sm:text-base text-foreground/70 font-body leading-relaxed">
              iFood, 99, Uber e agora… <strong className="text-foreground">Keeta.</strong>{" "}
              O Brasil vive uma explosão histórica no setor de entregas e
              mobilidade urbana e{" "}
              <span className="text-primary font-semibold">
                você pode alugar motos para entregadores.
              </span>
            </p>

            <p className="text-sm sm:text-base text-foreground/70 font-body leading-relaxed">
              O brasileiro compra muito, pede muito e{" "}
              <strong className="text-foreground">
                precisa de entregadores todos os dias.
              </strong>
            </p>

            <p className="text-sm sm:text-base text-foreground/70 font-body leading-relaxed">
              E para cada entrega feita no Brasil, existe{" "}
              <strong className="text-foreground">
                uma única engrenagem indispensável: a moto.
              </strong>
            </p>
          </div>

          {/* Right — News collage */}
          <div className="flex-1 relative flex items-center justify-center">
            <img
              src={newsImage}
              alt="Notícias sobre o mercado de entregas no Brasil"
              className="w-full max-w-[500px] rounded-lg shadow-dark"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Scrolling ticker bar */}
      <div className="mt-16 sm:mt-20 w-full py-4 sm:py-5 bg-card/80 border-y border-border/30 overflow-hidden">
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
