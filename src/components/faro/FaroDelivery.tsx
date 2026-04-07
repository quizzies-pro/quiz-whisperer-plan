import React from "react";

const FaroDelivery: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-snug">
          O delivery virou rotina.{" "}
          <span style={{ color: '#00E64D' }}>Milhões de<br className="hidden sm:inline" /> brasileiros</span>{" "}
          dependem de motos para trabalhar.
        </h2>

        <p className="text-sm sm:text-base text-gray-600 font-body leading-relaxed max-w-xl mx-auto">
          Mas a maioria não consegue comprar uma. O que eles fazem? <strong className="text-gray-900">Alugam!</strong> Foi a partir dessa demanda que a Locagora estruturou um modelo simples e escalável:
        </p>

        {/* Bullet card */}
        <div className="border border-gray-200 rounded-2xl px-8 py-8 max-w-lg mx-auto text-left space-y-3">
          {[
            "Você adquire as motos",
            "A Locagora encontra os locatários",
            "Cuida dos contratos e da operação",
            "E você recebe a renda mensal",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00E64D' }} />
              <p className="text-sm sm:text-base text-gray-700 font-body">{item}</p>
            </div>
          ))}

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm sm:text-base text-gray-900 font-heading font-bold text-center leading-relaxed">
              Você não entra para aprender do zero.<br />
              Você entra em um modelo que já está validado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaroDelivery;
