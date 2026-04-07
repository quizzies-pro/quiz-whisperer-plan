import React from "react";

const LOGO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591024/faro-branco.png_b5oidm.webp";
const BG_FARO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/FUNDO-RODRIGO-FARO-WEB3.2-1_1_mqn1sp.webp";
const CIRCLE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/f19bc88ebc50c7f39519cb6422ae96cf_o9bdrp.jpg";

interface FaroHeroProps {
  onCTA: () => void;
}

const FaroHero: React.FC<FaroHeroProps> = ({ onCTA }) => {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#2B2BFF' }}>
      {/* Background Rodrigo Faro — positioned right, cropped naturally */}
      <img
        src={BG_FARO}
        alt=""
        className="absolute top-0 right-0 h-full w-auto max-w-none object-cover object-top pointer-events-none hidden md:block"
        style={{ maxWidth: '62%' }}
      />
      {/* Mobile fallback — subtle opacity */}
      <img
        src={BG_FARO}
        alt=""
        className="absolute right-0 bottom-0 h-[55%] w-auto max-w-none object-cover object-top pointer-events-none md:hidden"
        style={{ opacity: 0.25 }}
      />

      {/* Circular photo — top right */}
      <div
        className="absolute z-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl hidden md:block"
        style={{ top: '20px', right: '24px', width: '140px', height: '140px' }}
      >
        <img src={CIRCLE_IMG} alt="Rodrigo Faro na LocAgora" className="w-full h-full object-cover" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-10 sm:pb-12 md:pb-16" style={{ minHeight: '85vh' }}>
        {/* Logo — centered */}
        <div className="flex justify-center md:justify-start mb-16 sm:mb-20 md:mb-24">
          <img src={LOGO} alt="LocAgora" className="h-9 sm:h-10 md:h-11 w-auto object-contain" />
        </div>

        {/* Text block — left side */}
        <div className="max-w-[520px] space-y-4 text-center md:text-left">
          <p className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-heading font-semibold">
            A &nbsp; F R A N Q U I A &nbsp; D O
          </p>

          <h1
            className="font-heading font-extrabold text-white leading-[0.82] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(5.5rem, 13vw, 10rem)' }}
          >
            Faro
          </h1>

          <p className="text-white/80 text-base sm:text-lg md:text-xl font-body leading-relaxed max-w-md mx-auto md:mx-0 pt-2">
            Transforme o crescimento do delivery em renda recorrente com um modelo já estruturado
          </p>

          <div className="pt-3">
            <button
              onClick={onCTA}
              className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.08em] text-xs sm:text-sm px-8 py-4 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
              style={{ background: '#00E64D', color: '#080F1C' }}
            >
              QUERO ENTENDER COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>

      {/* Quote card — bottom, overlaid on the Faro image area */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[8%] lg:right-[12%] z-20 w-[92%] max-w-[460px] md:w-[420px]">
        <div className="backdrop-blur-xl rounded-xl px-5 py-4 shadow-xl" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Quote mark */}
          <div className="text-white/20 font-heading font-extrabold text-4xl leading-none mb-1" style={{ marginTop: '-4px' }}>
            "
          </div>
          <p className="text-white/85 text-[11px] sm:text-xs font-body italic leading-relaxed -mt-3">
            "Quando conheci esse modelo, entendi que não era só um negócio. Era uma oportunidade de investir em algo que faz parte da vida de milhões de brasileiros todos os dias."
          </p>
          <p className="font-heading font-bold text-sm mt-2.5" style={{ color: '#00E64D' }}>
            Rodrigo Faro
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaroHero;
