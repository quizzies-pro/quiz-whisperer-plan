import React from "react";

const ITEMS = [
  "Associada ABF",
  "95+ Cidades",
  "20.000+ Motos",
  "1.350 Franqueados",
  "Certificada Velo e Asa",
  "25 Estados",
  "Parceria Suzuki",
  "Parceria Yamaha",
  "R$ 400MM Faturamento 2025",
  "Associada ABF",
  "95+ Cidades",
  "20.000+ Motos",
];

const FaroTicker: React.FC = () => {
  return (
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden py-4">
      <p className="text-center text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gray-400 font-heading font-semibold mb-3">
        Presença Nacional Comprovada
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 sm:px-6 text-xs sm:text-sm text-gray-700 font-body font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B2BFF] shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaroTicker;
