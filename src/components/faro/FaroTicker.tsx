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
    <div className="w-full bg-white py-5 overflow-hidden" style={{ borderBottom: '1px solid #e5e7eb' }}>
      <p className="text-center text-[10px] tracking-[0.35em] uppercase font-heading font-semibold mb-4" style={{ color: '#9ca3af' }}>
        Presença Nacional Comprovada
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-5 text-xs font-body font-medium shrink-0" style={{ color: '#374151' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#2B2BFF' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaroTicker;
