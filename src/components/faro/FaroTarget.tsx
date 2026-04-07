import React from "react";
import { Check, X } from "lucide-react";

const PHONE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/iphone17pro2-scaled_e4nif4.png";

interface FaroTargetProps {
  onCTA: () => void;
}

const FaroTarget: React.FC<FaroTargetProps> = ({ onCTA }) => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 text-center mb-12 leading-snug">
          Para <span style={{ color: '#00E64D' }}>quem</span> é esse modelo
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left — cards */}
          <div className="flex-1 space-y-6 w-full max-w-md">
            {/* É para você se */}
            <div className="border border-gray-200 rounded-2xl px-6 py-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#00E64D' }} />
                <p className="font-heading font-bold text-xs tracking-[0.15em] uppercase" style={{ color: '#00E64D' }}>
                  É para você se
                </p>
              </div>
              {[
                "Quer construir renda recorrente",
                "Busca um negócio estruturado",
                "Quer investir em um mercado em crescimento",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#00E64D' }} />
                  <p className="text-sm text-gray-700 font-body">{item}</p>
                </div>
              ))}
            </div>

            {/* Não é para você se */}
            <div className="border border-gray-200 rounded-2xl px-6 py-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <p className="font-heading font-bold text-xs tracking-[0.15em] uppercase text-red-500">
                  Não é para você se
                </p>
              </div>
              {[
                "Não tem capital para investir",
                "Busca dinheiro rápido",
                "Não segue processo",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <p className="text-sm text-gray-700 font-body">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex-1 flex justify-center">
            <img
              src={PHONE_IMG}
              alt="LocAgora no celular"
              className="w-full max-w-xs md:max-w-sm object-contain"
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onCTA}
            className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.06em] text-sm px-10 py-4 rounded-[10px] transition-all duration-300 hover:scale-[1.02]"
            style={{ background: '#2B2BFF', color: '#FFFFFF' }}
          >
            QUERO A FRANQUIA DO FARO
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaroTarget;
