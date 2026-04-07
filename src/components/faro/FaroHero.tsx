import React from "react";

const LOGO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591024/faro-branco.png_b5oidm.webp";
const BG_FARO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/FUNDO-RODRIGO-FARO-WEB3.2-1_1_mqn1sp.webp";
const CIRCLE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/f19bc88ebc50c7f39519cb6422ae96cf_o9bdrp.jpg";

interface FaroHeroProps {
  onCTA: () => void;
}

const FaroHero: React.FC<FaroHeroProps> = ({ onCTA }) => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden" style={{ background: '#2B2BFF' }}>
      {/* Background image — Rodrigo Faro */}
      <div className="absolute inset-0 flex justify-center md:justify-end">
        <img
          src={BG_FARO}
          alt="Rodrigo Faro"
          className="h-full w-auto max-w-none object-cover object-top md:mr-[5%]"
        />
      </div>

      {/* Circular image — top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/20 z-20 hidden md:block">
        <img src={CIRCLE_IMG} alt="Rodrigo Faro na LocAgora" className="w-full h-full object-cover" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-16 md:pt-12 md:pb-20 flex flex-col justify-center min-h-[600px] md:min-h-[700px]">
        {/* Logo */}
        <img src={LOGO} alt="LocAgora" className="h-8 sm:h-10 md:h-12 w-auto object-contain mb-10 md:mb-14" />

        {/* Title */}
        <div className="max-w-xl space-y-4">
          <p className="text-white/80 font-heading text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
            A &nbsp;F R A N Q U I A &nbsp; D O
          </p>
          <h1 className="font-heading font-extrabold text-white leading-none" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>
            Faro
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-body leading-relaxed max-w-md">
            Transforme o crescimento do delivery em renda recorrente com um modelo já estruturado
          </p>

          <button
            onClick={onCTA}
            className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.06em] text-sm px-8 py-4 rounded-[10px] transition-all duration-300 mt-4"
            style={{ background: '#00E64D', color: '#080F1C' }}
          >
            QUERO ENTENDER COMO FUNCIONA
          </button>
        </div>

        {/* Quote card */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[15%] md:bottom-20 max-w-md w-[90%] md:w-auto z-20">
          <div className="backdrop-blur-md bg-white/10 rounded-xl px-6 py-5 border border-white/15">
            <p className="text-white/90 text-xs sm:text-sm font-body italic leading-relaxed">
              "Quando conheci esse modelo, entendi que não era só um negócio. Era uma oportunidade de investir em algo que faz parte da vida de milhões de brasileiros todos os dias."
            </p>
            <p className="text-primary font-heading font-bold text-sm mt-2">Rodrigo Faro</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaroHero;
