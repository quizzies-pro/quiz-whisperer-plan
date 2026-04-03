import React from "react";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import { TrendingUp, Users, Infinity, Bike } from "lucide-react";

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
          <div className="flex-1 relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center">
            <img
              src={news1}
              alt="Notícia sobre entregadores"
              className="absolute w-44 sm:w-52 rounded-lg shadow-dark -rotate-3 top-0 left-0 sm:left-4 z-10"
              loading="lazy"
            />
            <img
              src={news3}
              alt="Notícia Exame sobre Keeta"
              className="absolute w-44 sm:w-52 rounded-lg shadow-dark rotate-3 top-4 right-0 sm:right-4 z-20"
              loading="lazy"
            />
            <img
              src={news2}
              alt="Notícia CNN sobre 99"
              className="absolute w-44 sm:w-52 rounded-lg shadow-dark -rotate-2 bottom-4 left-8 sm:left-12 z-30"
              loading="lazy"
            />
            <img
              src={news4}
              alt="Notícia sobre iFood"
              className="absolute w-44 sm:w-52 rounded-lg shadow-dark rotate-2 bottom-0 right-4 sm:right-8 z-40"
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
