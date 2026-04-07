import React from "react";

const LOGO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591024/faro-branco.png_b5oidm.webp";
const BG_FARO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/FUNDO-RODRIGO-FARO-WEB3.2-1_1_mqn1sp.webp";
const CIRCLE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/f19bc88ebc50c7f39519cb6422ae96cf_o9bdrp.jpg";

interface FaroHeroProps {
  onCTA: () => void;
}

const FaroHero: React.FC<FaroHeroProps> = ({ onCTA }) => {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#2B2BFF', minHeight: '90vh' }}>
      {/* Background Rodrigo Faro image — right side */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={BG_FARO}
          alt=""
          className="absolute right-0 top-0 h-full w-auto max-w-none object-cover object-top hidden md:block"
          style={{ maxWidth: '65%' }}
        />
        {/* Mobile: centered */}
        <img
          src={BG_FARO}
          alt=""
          className="absolute right-0 bottom-0 h-[60%] w-auto max-w-none object-cover object-top md:hidden"
          style={{ opacity: 0.3 }}
        />
      </div>

      {/* Circular photo — top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/20 z-20 hidden md:block shadow-xl">
        <img src={CIRCLE_IMG} alt="Rodrigo Faro na LocAgora" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 md:pt-12 pb-32 md:pb-24 flex flex-col justify-center" style={{ minHeight: '90vh' }}>
        {/* Logo centered */}
        <div className="flex justify-center md:justify-start mb-12 md:mb-16">
          <img src={LOGO} alt="LocAgora" className="h-8 sm:h-10 md:h-11 w-auto object-contain" />
        </div>

        {/* Title block — left half */}
        <div className="max-w-lg space-y-5 text-center md:text-left">
          <p className="text-white/70 text-[11px] sm:text-xs tracking-[0.35em] uppercase font-heading font-semibold">
            A &nbsp; F R A N Q U I A &nbsp; D O
          </p>
          <h1
            className="font-heading font-extrabold text-white leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', letterSpacing: '-0.03em' }}
          >
            Faro
          </h1>
          <p className="text-white/85 text-base sm:text-lg md:text-xl font-body leading-relaxed max-w-md mx-auto md:mx-0">
            Transforme o crescimento do delivery em renda recorrente com um modelo já estruturado
          </p>

          <div className="pt-2">
            <button
              onClick={onCTA}
              className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.08em] text-xs sm:text-sm px-8 py-4 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{ background: '#00E64D', color: '#080F1C' }}
            >
              QUERO ENTENDER COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>

      {/* Quote card — overlaid bottom center-right */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[10%] z-20 w-[90%] max-w-lg md:w-[420px]">
        <div className="backdrop-blur-lg bg-white/15 rounded-xl px-5 py-4 border border-white/10 shadow-xl">
          <p className="text-white/90 text-[11px] sm:text-xs font-body italic leading-relaxed">
            "Quando conheci esse modelo, entendi que não era só um negócio. Era uma oportunidade de investir em algo que faz parte da vida de milhões de brasileiros todos os dias."
          </p>
          <p className="font-heading font-bold text-sm mt-2" style={{ color: '#00E64D' }}>
            Rodrigo Faro
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaroHero;
