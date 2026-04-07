import React from "react";

interface FaroNumbersProps {
  onCTA: () => void;
}

const STATS = [
  { value: "95+", label: "CIDADES", highlight: false },
  { value: "1.350", label: "FRANQUEADOS", highlight: true },
  { value: "25", label: "ESTADOS", highlight: false },
  { value: "20K+", label: "MOTOS", highlight: false },
];

const FaroNumbers: React.FC<FaroNumbersProps> = ({ onCTA }) => {
  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-10 relative overflow-hidden" style={{ background: '#2B2BFF' }}>
      {/* Dot pattern — right side */}
      <div
        className="absolute top-0 right-0 w-[40%] h-full opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-snug mb-2">
          Os Números
        </h2>
        <p className="text-sm sm:text-[15px] text-white/60 font-body max-w-xl mb-10 leading-relaxed">
          Hoje, a Locagora está presente em mais de 95 cidades, com mais de 20 mil motos em operação e 1.350 franqueados.
        </p>

        {/* Stat boxes */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-6 py-4 sm:px-8 sm:py-5 text-center min-w-[90px] sm:min-w-[110px]"
              style={{
                background: stat.highlight ? '#00E64D' : 'rgba(255,255,255,0.06)',
                border: stat.highlight ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <p
                className="font-heading font-extrabold text-2xl sm:text-3xl"
                style={{ color: stat.highlight ? '#080F1C' : '#FFFFFF' }}
              >
                {stat.value}
              </p>
              <p
                className="font-heading font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mt-1 uppercase"
                style={{ color: stat.highlight ? '#080F1C' : 'rgba(255,255,255,0.45)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Two info cards side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Left — Os números do modelo */}
          <div
            className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8 space-y-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="font-heading font-bold text-sm sm:text-[15px] text-white mb-4">Os números do modelo:</h3>
            <ul className="space-y-3">
              {[
                ["Investimento inicial:", " a partir de R$185 mil"],
                ["Renda mensal:", " até R$20 mil"],
                ["Margem média:", " 60% a 75%"],
                ["Payback:", " entre 18 e 29 meses"],
                ["Dedicação:", " cerca de 1 hora por dia"],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-2.5 text-sm text-white/75 font-body">
                  <span className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 bg-white/30" />
                  <span><strong className="text-white">{label}</strong>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Além disso */}
          <div
            className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8 space-y-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="font-heading font-bold text-sm sm:text-[15px] text-white mb-4">Além disso, a Locagora oferece:</h3>
            <ul className="space-y-3">
              {[
                "Suporte completo ao franqueado",
                "Estrutura operacional validada",
                "Acompanhamento contínuo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/75 font-body">
                  <span className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ background: '#00E64D' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-white font-heading font-bold pt-3">
              Aqui, o foco é{" "}
              <span className="underline decoration-2 underline-offset-2" style={{ textDecorationColor: '#00E64D' }}>
                previsibilidade
              </span>
              !
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCTA}
          className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.08em] text-xs sm:text-sm px-10 py-4 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          style={{ background: '#00E64D', color: '#080F1C' }}
        >
          QUERO SER UM FRANQUEADO
        </button>
      </div>
    </section>
  );
};

export default FaroNumbers;
