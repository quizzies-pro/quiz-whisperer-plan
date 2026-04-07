import React from "react";

interface FaroNumbersProps {
  onCTA: () => void;
}

const STATS = [
  { value: "95+", label: "CIDADES" },
  { value: "1.350", label: "FRANQUEADOS" },
  { value: "25", label: "ESTADOS" },
  { value: "20K+", label: "MOTOS" },
];

const FaroNumbers: React.FC<FaroNumbersProps> = ({ onCTA }) => {
  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-10 relative overflow-hidden" style={{ background: '#2B2BFF' }}>
      {/* Subtle dot pattern on the right */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-snug mb-3">
          Os Números
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-body max-w-xl mb-10 leading-relaxed">
          Hoje, a Locagora está presente em mais de 95 cidades, com mais de 20 mil motos em operação e 1.350 franqueados.
        </p>

        {/* Stat boxes */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-6 py-5 sm:px-8 sm:py-6 text-center min-w-[100px]"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{stat.value}</p>
              <p className="font-heading font-semibold text-[10px] sm:text-xs text-white/50 tracking-widest mt-1 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Left card */}
          <div className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8 space-y-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white">Os números do modelo:</h3>
            <ul className="space-y-2">
              {[
                ["Investimento inicial:", "a partir de R$185 mil"],
                ["Renda mensal:", "até R$20 mil"],
                ["Margem média:", "60% a 75%"],
                ["Payback:", "entre 18 e 29 meses"],
                ["Dedicação:", "cerca de 1 hora por dia"],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2 text-sm text-white/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-white/40" />
                  <span><strong className="text-white">{label}</strong> {value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right card */}
          <div className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8 space-y-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white">Além disso, a Locagora oferece:</h3>
            <ul className="space-y-2">
              {[
                "Suporte completo ao franqueado",
                "Estrutura operacional validada",
                "Acompanhamento contínuo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80 font-body">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00E64D' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-white font-heading font-bold mt-4">
              Aqui, o foco é <span className="underline decoration-2" style={{ textDecorationColor: '#00E64D' }}>previsibilidade</span>!
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCTA}
          className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.06em] text-sm px-10 py-4 rounded-[10px] transition-all duration-300 hover:scale-[1.02]"
          style={{ background: '#00E64D', color: '#080F1C' }}
        >
          QUERO SER UM FRANQUEADO
        </button>
      </div>
    </section>
  );
};

export default FaroNumbers;
