import React from "react";
import { Check, X } from "lucide-react";

const PHONE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/iphone17pro2-scaled_e4nif4.png";

interface FaroTargetProps {
  onCTA: () => void;
}

const FaroTarget: React.FC<FaroTargetProps> = ({ onCTA }) => {
  return (
    <section className="w-full py-20 sm:py-28 px-6 sm:px-10" style={{ background: '#f8f9fa' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-center mb-14 leading-snug" style={{ color: '#0f172a' }}>
          Para <span style={{ color: '#00E64D' }}>quem</span> é esse modelo
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left — cards */}
          <div className="flex-1 space-y-5 w-full max-w-md">
            {/* É para você se */}
            <div className="bg-white rounded-2xl px-6 py-6 space-y-4 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#00E64D' }} />
                <p className="font-heading font-bold text-[11px] tracking-[0.18em] uppercase" style={{ color: '#00E64D' }}>
                  É para você se
                </p>
              </div>
              <div className="space-y-3.5 pt-1">
                {[
                  "Quer construir renda recorrente",
                  "Busca um negócio estruturado",
                  "Quer investir em um mercado em crescimento",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: '#ecfdf5' }}>
                      <Check className="w-3.5 h-3.5" style={{ color: '#00E64D' }} strokeWidth={3} />
                    </div>
                    <p className="text-sm font-body" style={{ color: '#374151' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Não é para você se */}
            <div className="bg-white rounded-2xl px-6 py-6 space-y-4 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
                <p className="font-heading font-bold text-[11px] tracking-[0.18em] uppercase" style={{ color: '#ef4444' }}>
                  Não é para você se
                </p>
              </div>
              <div className="space-y-3.5 pt-1">
                {[
                  "Não tem capital para investir",
                  "Busca dinheiro rápido",
                  "Não segue processo",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: '#fef2f2' }}>
                      <X className="w-3.5 h-3.5" style={{ color: '#ef4444' }} strokeWidth={3} />
                    </div>
                    <p className="text-sm font-body" style={{ color: '#374151' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex-1 flex justify-center">
            <img
              src={PHONE_IMG}
              alt="LocAgora no celular"
              className="w-full max-w-[280px] md:max-w-[320px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-14">
          <button
            onClick={onCTA}
            className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.08em] text-xs sm:text-sm px-10 py-4 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-white"
            style={{ background: '#2B2BFF' }}
          >
            QUERO A FRANQUIA DO FARO
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaroTarget;
