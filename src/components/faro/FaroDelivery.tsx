import React from "react";

const FaroDelivery: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 sm:py-28 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-heading font-extrabold text-[1.7rem] sm:text-3xl md:text-[2.5rem] leading-snug" style={{ color: '#0f172a' }}>
          O delivery virou rotina.{" "}
          <span className="italic" style={{ color: '#00E64D' }}>
            Milhões de
            <br className="hidden sm:inline" /> brasileiros
          </span>{" "}
          dependem de motos
          <br className="hidden sm:inline" /> para trabalhar.
        </h2>

        <p className="text-sm sm:text-[15px] font-body leading-relaxed max-w-xl mx-auto" style={{ color: '#6b7280' }}>
          Mas a maioria não consegue comprar uma. O que eles fazem?{" "}
          <strong style={{ color: '#0f172a' }}>Alugam!</strong> Foi a partir dessa
          demanda que a Locagora estruturou um modelo simples e escalável:
        </p>

        {/* Bullet card */}
        <div className="rounded-2xl px-8 sm:px-12 py-8 sm:py-10 max-w-lg mx-auto text-left" style={{ border: '1px solid #e5e7eb', background: '#fafbfc' }}>
          <div className="space-y-4">
            {[
              "Você adquire as motos",
              "A Locagora encontra os locatários",
              "Cuida dos contratos e da operação",
              "E você recebe a renda mensal",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: '#00E64D' }} />
                <p className="text-sm sm:text-[15px] font-body" style={{ color: '#374151' }}>{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
            <p className="text-sm sm:text-[15px] font-heading font-bold text-center leading-relaxed" style={{ color: '#0f172a' }}>
              Você não entra para aprender do zero.
              <br />
              Você entra em um modelo que já está validado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaroDelivery;
