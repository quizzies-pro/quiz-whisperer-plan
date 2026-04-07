import { useNavigate } from "react-router-dom";
import logoLocagora from "@/assets/logo-locagora.png";
import { Check, X } from "lucide-react";

/* ── Image URLs ── */
const IMG_FARO_BG = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/FUNDO-RODRIGO-FARO-WEB3.2-1_1_mqn1sp.webp";
const IMG_CIRCLE = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/f19bc88ebc50c7f39519cb6422ae96cf_o9bdrp.jpg";
const IMG_PHONE = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1775591025/iphone17pro2-scaled_e4nif4.png";

/* ── Brand colors ── */
const BLUE = "#2B2BFF";
const GREEN = "#00E64D";
const DARK = "#0a0f2c";

/* ── Ticker items ── */
const TICKER = [
  "Associada ABF", "95+ Cidades", "20.000+ Motos", "1.350 Franqueados",
  "Certificada Velo e Asa", "25 Estados", "Parceria Suzuki", "Parceria Yamaha",
  "R$ 400MM Faturamento 2025", "Associada ABF", "95+ Cidades", "20.000+ Motos",
];

const Faro = () => {
  const navigate = useNavigate();
  const go = () => navigate("/quiz/step/2");

  return (
    <div className="w-full min-h-screen font-body" style={{ background: "#fff", color: DARK }}>

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ background: BLUE, height: "clamp(600px, 85vh, 880px)" }}>
        {/* Faro background — right half */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <img src={IMG_FARO_BG} alt="" className="absolute right-0 top-0 h-full w-[60%] object-cover object-top" />
        </div>
        <div className="absolute inset-0 pointer-events-none md:hidden">
          <img src={IMG_FARO_BG} alt="" className="absolute right-0 bottom-0 h-[55%] w-auto object-cover object-top opacity-20" />
        </div>

        {/* Circular photo */}
        <div className="absolute top-5 right-5 md:top-6 md:right-6 w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden border-[3px] border-white/20 shadow-2xl z-20 hidden md:block">
          <img src={IMG_CIRCLE} alt="Rodrigo Faro" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          {/* Logo top-left */}
          <div className="pt-5 md:pt-7 shrink-0">
            <img src={logoLocagora} alt="LocAgora" className="h-8 md:h-10 w-auto" />
          </div>

          {/* Centered title */}
          <div className="flex-1 flex items-center">
            <div className="max-w-[500px]">
              <p className="text-white/50 text-[10px] sm:text-[11px] tracking-[0.45em] uppercase font-heading font-semibold mb-4">
                A FRANQUIA DO
              </p>
              <h1 className="font-heading font-extrabold text-white leading-[0.85] tracking-[-0.03em]" style={{ fontSize: "clamp(5rem, 12vw, 9.5rem)" }}>
                Faro
              </h1>
              <p className="text-white/80 text-[15px] sm:text-[17px] md:text-lg leading-[1.65] mt-6 max-w-[420px]">
                Transforme o crescimento do delivery em renda recorrente com um modelo já estruturado
              </p>
              <button onClick={go} className="mt-7 inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-lg px-8 py-4 cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.97]" style={{ background: GREEN, color: DARK }}>
                QUERO ENTENDER COMO FUNCIONA
              </button>
            </div>
          </div>
        </div>

        {/* Quote card */}
        <div className="absolute bottom-5 sm:bottom-8 z-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[7%] lg:right-[11%] w-[90%] max-w-[440px]">
          <div className="backdrop-blur-xl rounded-xl px-5 py-4" style={{ background: "rgba(180,195,230,0.18)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="block text-white/15 font-heading font-black text-3xl leading-none -mb-1">"</span>
            <p className="text-white/85 text-[11px] sm:text-xs italic leading-[1.7]">
              "Quando conheci esse modelo, entendi que não era só um negócio. Era uma oportunidade de investir em algo que faz parte da vida de milhões de brasileiros todos os dias."
            </p>
            <p className="font-heading font-bold text-[13px] mt-2" style={{ color: GREEN }}>Rodrigo Faro</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — TICKER
      ════════════════════════════════════════════ */}
      <div className="w-full bg-white py-5 overflow-hidden" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <p className="text-center text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-heading font-semibold mb-3" style={{ color: "#9ca3af" }}>
          Presença Nacional Comprovada
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 px-5 text-xs font-body font-medium shrink-0" style={{ color: "#374151" }}>
                <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: BLUE }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SECTION 3 — DELIVERY
      ════════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-[1.65rem] sm:text-3xl md:text-[2.4rem] leading-snug" style={{ color: DARK }}>
            O delivery virou rotina.{" "}
            <span className="italic" style={{ color: GREEN }}>Milhões de brasileiros</span>{" "}
            dependem de motos para trabalhar.
          </h2>

          <p className="text-[14px] sm:text-[15px] leading-[1.7] mt-5 max-w-xl mx-auto" style={{ color: "#6b7280" }}>
            Mas a maioria não consegue comprar uma. O que eles fazem?{" "}
            <strong style={{ color: DARK }}>Alugam!</strong> Foi a partir dessa demanda que a Locagora estruturou um modelo simples e escalável:
          </p>

          {/* Bullet card */}
          <div className="rounded-2xl mt-8 max-w-lg mx-auto text-left overflow-hidden" style={{ border: "1px solid #e5e7eb", background: "#fafbfc" }}>
            <div className="px-8 sm:px-12 py-8 space-y-4">
              {["Você adquire as motos", "A Locagora encontra os locatários", "Cuida dos contratos e da operação", "E você recebe a renda mensal"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: GREEN }} />
                  <span className="text-[14px] sm:text-[15px]" style={{ color: "#374151" }}>{t}</span>
                </div>
              ))}
            </div>
            <div className="px-8 sm:px-12 py-5 text-center" style={{ borderTop: "1px solid #e5e7eb" }}>
              <p className="font-heading font-bold text-[14px] sm:text-[15px] leading-relaxed" style={{ color: DARK }}>
                Você não entra para aprender do zero.<br />
                Você entra em um modelo que já está validado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — OS NÚMEROS
      ════════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10 relative overflow-hidden" style={{ background: BLUE }}>
        {/* Dot pattern */}
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-snug mb-2">Os Números</h2>
          <p className="text-[14px] sm:text-[15px] text-white/55 max-w-xl mb-10 leading-relaxed">
            Hoje, a Locagora está presente em mais de 95 cidades, com mais de 20 mil motos em operação e 1.350 franqueados.
          </p>

          {/* Stat boxes */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
            {([
              { v: "95+", l: "CIDADES", green: false },
              { v: "1.350", l: "FRANQUEADOS", green: true },
              { v: "25", l: "ESTADOS", green: false },
              { v: "20K+", l: "MOTOS", green: false },
            ] as const).map((s) => (
              <div key={s.l} className="rounded-xl px-6 py-4 sm:px-8 sm:py-5 text-center min-w-[95px] sm:min-w-[115px]" style={{ background: s.green ? GREEN : "rgba(255,255,255,0.06)", border: s.green ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl" style={{ color: s.green ? DARK : "#fff" }}>{s.v}</p>
                <p className="font-heading font-semibold text-[9px] sm:text-[10px] tracking-[0.15em] mt-1 uppercase" style={{ color: s.green ? DARK : "rgba(255,255,255,0.4)" }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* Two info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-heading font-bold text-[14px] sm:text-[15px] text-white mb-4">Os números do modelo:</h3>
              <ul className="space-y-3">
                {([["Investimento inicial:", " a partir de R$185 mil"], ["Renda mensal:", " até R$20 mil"], ["Margem média:", " 60% a 75%"], ["Payback:", " entre 18 e 29 meses"], ["Dedicação:", " cerca de 1 hora por dia"]] as const).map(([label, val]) => (
                  <li key={label} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-white/70">
                    <span className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0 bg-white/30" />
                    <span><strong className="text-white">{label}</strong>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl px-6 py-6 sm:px-8 sm:py-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-heading font-bold text-[14px] sm:text-[15px] text-white mb-4">Além disso, a Locagora oferece:</h3>
              <ul className="space-y-3">
                {["Suporte completo ao franqueado", "Estrutura operacional validada", "Acompanhamento contínuo"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-white/70">
                    <span className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0" style={{ background: GREEN }} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-[14px] text-white font-heading font-bold mt-5">
                Aqui, o foco é <span className="underline decoration-2 underline-offset-2" style={{ textDecorationColor: GREEN }}>previsibilidade</span>!
              </p>
            </div>
          </div>

          <button onClick={go} className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-lg px-10 py-4 cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.97]" style={{ background: GREEN, color: DARK }}>
            QUERO SER UM FRANQUEADO
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — PARA QUEM É ESSE MODELO
      ════════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-10" style={{ background: "#f7f8fa" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-center mb-14 leading-snug" style={{ color: DARK }}>
            Para <span style={{ color: GREEN }}>quem</span> é esse modelo
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Cards */}
            <div className="flex-1 space-y-5 w-full max-w-md">
              {/* É para você se */}
              <div className="bg-white rounded-2xl px-6 py-6 shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
                  <p className="font-heading font-bold text-[11px] tracking-[0.2em] uppercase" style={{ color: GREEN }}>É para você se</p>
                </div>
                <div className="space-y-3.5">
                  {["Quer construir renda recorrente", "Busca um negócio estruturado", "Quer investir em um mercado em crescimento"].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: "#ecfdf5" }}>
                        <Check className="w-3.5 h-3.5" style={{ color: GREEN }} strokeWidth={3} />
                      </div>
                      <span className="text-[14px]" style={{ color: "#374151" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Não é para você se */}
              <div className="bg-white rounded-2xl px-6 py-6 shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
                  <p className="font-heading font-bold text-[11px] tracking-[0.2em] uppercase" style={{ color: "#ef4444" }}>Não é para você se</p>
                </div>
                <div className="space-y-3.5">
                  {["Não tem capital para investir", "Busca dinheiro rápido", "Não segue processo"].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: "#fef2f2" }}>
                        <X className="w-3.5 h-3.5" style={{ color: "#ef4444" }} strokeWidth={3} />
                      </div>
                      <span className="text-[14px]" style={{ color: "#374151" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex-1 flex justify-center">
              <img src={IMG_PHONE} alt="LocAgora no celular" className="w-full max-w-[260px] md:max-w-[300px] object-contain drop-shadow-2xl" />
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-14">
            <button onClick={go} className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-lg px-10 py-4 text-white cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.97] shadow-lg" style={{ background: BLUE }}>
              QUERO A FRANQUIA DO FARO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faro;
