import React from "react";
import logoLocagora from "@/assets/logo-locagora.png";

const BG_FARO = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/FUNDO-RODRIGO-FARO-WEB3.2-1_1_mqn1sp.webp";
const CIRCLE_IMG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/f19bc88ebc50c7f39519cb6422ae96cf_o9bdrp.jpg";

interface FaroHeroProps {
  onCTA: () => void;
}

const FaroHero: React.FC<FaroHeroProps> = ({ onCTA }) => {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col"
      style={{ background: '#2B2BFF', height: '100vh', maxHeight: '900px', minHeight: '600px' }}
    >
      {/* ── Rodrigo Faro background image ── */}
      <img
        src={BG_FARO}
        alt=""
        className="absolute top-0 right-0 h-full object-cover object-top pointer-events-none select-none hidden md:block"
        style={{ width: '58%', maxWidth: '800px' }}
      />
      {/* Mobile fallback */}
      <img
        src={BG_FARO}
        alt=""
        className="absolute bottom-0 right-0 w-full object-cover object-top pointer-events-none select-none md:hidden opacity-20"
        style={{ height: '50%' }}
      />

      {/* ── Circular photo top-right ── */}
      <div className="absolute top-5 right-5 md:top-6 md:right-6 w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden border-[3px] border-white/15 z-30 shadow-2xl hidden md:block">
        <img src={CIRCLE_IMG} alt="Rodrigo Faro" className="w-full h-full object-cover" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-8 sm:px-12 lg:px-20">
        {/* Logo */}
        <div className="pt-6 md:pt-8">
          <img src={logoLocagora} alt="LocAgora" className="h-8 md:h-10 w-auto object-contain" />
        </div>

        {/* Title — vertically centered in remaining space */}
        <div className="flex-1 flex items-center">
          <div className="max-w-[480px] space-y-5">
            <div>
              <p className="text-white/55 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-heading font-semibold mb-3">
                A &nbsp;F R A N Q U I A &nbsp;D O
              </p>
              <h1
                className="font-heading font-extrabold text-white"
                style={{
                  fontSize: 'clamp(6rem, 14vw, 11rem)',
                  lineHeight: 0.82,
                  letterSpacing: '-0.03em',
                }}
              >
                Faro
              </h1>
            </div>

            <p className="text-white/75 text-[15px] sm:text-lg font-body leading-[1.6] max-w-[400px]">
              Transforme o crescimento do delivery em renda recorrente com um modelo já estruturado
            </p>

            <button
              onClick={onCTA}
              className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.1em] text-[13px] px-9 py-[18px] rounded-[8px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: '#00E64D', color: '#080F1C' }}
            >
              QUERO ENTENDER COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>

      {/* ── Quote card ── */}
      <div className="absolute bottom-5 sm:bottom-8 z-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[6%] lg:right-[10%] w-[88%] max-w-[440px]">
        <div
          className="backdrop-blur-xl rounded-xl px-5 py-4"
          style={{ background: 'rgba(200,210,230,0.15)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="text-white/15 font-heading font-black text-3xl leading-none mb-0.5">"</div>
          <p className="text-white/80 text-[11px] sm:text-xs font-body italic leading-[1.65] -mt-2">
            "Quando conheci esse modelo, entendi que não era só um negócio. Era uma oportunidade de investir em algo que faz parte da vida de milhões de brasileiros todos os dias."
          </p>
          <p className="font-heading font-bold text-[13px] mt-2" style={{ color: '#00E64D' }}>
            Rodrigo Faro
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaroHero;
