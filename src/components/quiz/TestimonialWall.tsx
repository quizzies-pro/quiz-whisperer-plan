import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  highlight: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos Silva",
    role: "Franqueado Locagora - SP",
    text: "A Locagora mudou minha vida financeira. Em 3 meses já tinha retorno do investimento. Retorno em 3 meses!",
    highlight: "Retorno em 3 meses!",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Ana Rodrigues",
    role: "Franqueada Locagora - BH",
    text: "O suporte da Locagora é incrível. Me ajudaram em cada etapa, desde a compra das motos até os primeiros aluguéis. Suporte completo desde o início.",
    highlight: "Suporte completo desde o início.",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "Fernando Costa",
    role: "Franqueado Locagora - Curitiba",
    text: "Com a Locagora descobri que alugar motos para entregadores do iFood é o negócio mais lucrativo que já tive. Renda passiva real e consistente.",
    highlight: "Renda passiva real e consistente.",
    avatar: "https://i.pravatar.cc/80?img=53",
  },
  {
    name: "Juliana Mendes",
    role: "Franqueada Locagora - RJ",
    text: "A demanda por motos na Locagora é absurda. Meus 10 veículos estão sempre alugados, nunca fico sem cliente. 100% de ocupação dos veículos.",
    highlight: "100% de ocupação dos veículos.",
    avatar: "https://i.pravatar.cc/80?img=9",
  },
  {
    name: "Roberto Almeida",
    role: "Franqueado Locagora - Campinas",
    text: "Saí do CLT e hoje faturo mais do que o dobro com a Locagora. Melhor decisão da minha vida. Faturamento dobrou após sair do CLT.",
    highlight: "Faturamento dobrou após sair do CLT.",
    avatar: "https://i.pravatar.cc/80?img=60",
  },
  {
    name: "Patrícia Nunes",
    role: "Franqueada Locagora - Salvador",
    text: "O modelo da Locagora é à prova de crises. Entregas não param nunca, e a receita é constante. Negócio à prova de crises.",
    highlight: "Negócio à prova de crises.",
    avatar: "https://i.pravatar.cc/80?img=20",
  },
  {
    name: "Diego Ferreira",
    role: "Franqueado Locagora - Brasília",
    text: "Com 5 motos na Locagora já consigo uma renda excelente. Planejando expandir para 15 motos ainda este ano. Escalando de 5 para 15 motos.",
    highlight: "Escalando de 5 para 15 motos.",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Mariana Lopes",
    role: "Franqueada Locagora - Recife",
    text: "A facilidade de gestão da Locagora me surpreendeu. O sistema resolve tudo, é muito prático. Gestão simplificada e eficiente.",
    highlight: "Gestão simplificada e eficiente.",
    avatar: "https://i.pravatar.cc/80?img=25",
  },
  {
    name: "Thiago Martins",
    role: "Franqueado Locagora - Fortaleza",
    text: "Investi na Locagora e em menos de 6 meses já estava no lucro. Recomendo fortemente para qualquer pessoa. Lucro em menos de 6 meses.",
    highlight: "Lucro em menos de 6 meses.",
    avatar: "https://i.pravatar.cc/80?img=14",
  },
  {
    name: "Camila Santos",
    role: "Franqueada Locagora - POA",
    text: "A Locagora encontrou meus primeiros clientes antes mesmo das motos chegarem. Não precisei me preocupar com nada. Clientes garantidos desde o início.",
    highlight: "Clientes garantidos desde o início.",
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    name: "Lucas Oliveira",
    role: "Franqueado Locagora - Goiânia",
    text: "O payback da Locagora foi mais rápido do que imaginei. Já estou reinvestindo os lucros em mais motos. Payback acelerado e reinvestimento.",
    highlight: "Payback acelerado e reinvestimento.",
    avatar: "https://i.pravatar.cc/80?img=68",
  },
  {
    name: "Beatriz Cardoso",
    role: "Franqueada Locagora - Manaus",
    text: "Mesmo longe dos grandes centros, a demanda da Locagora é altíssima. Funciona em qualquer cidade do Brasil.",
    highlight: "Funciona em qualquer cidade do Brasil.",
    avatar: "https://i.pravatar.cc/80?img=32",
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="rounded-lg glass-card p-4 space-y-3 w-full">
    <p className="text-xs text-foreground/70 font-body leading-relaxed">
      {testimonial.text.split(testimonial.highlight)[0]}
      <span className="font-bold text-foreground underline decoration-primary/40 underline-offset-2">
        {testimonial.highlight}
      </span>
      {testimonial.text.split(testimonial.highlight)[1] || ""}
    </p>
    <Stars />
    <div className="flex items-center gap-2.5">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-8 h-8 rounded-full object-cover border border-foreground/10"
      />
      <div>
        <p className="text-xs font-heading font-bold text-foreground leading-tight">{testimonial.name}</p>
        <p className="text-[10px] text-muted-foreground font-body leading-tight">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialWall = () => {
  const cols = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
    testimonials.slice(6, 9),
    testimonials.slice(9, 12),
  ];

  return (
    <div className="absolute inset-x-0 top-[50%] bottom-0 overflow-hidden pointer-events-none">
      {/* Strong center radial shadow for readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 0%, hsl(216 55% 7% / 1) 0%, hsl(216 55% 7% / 0.95) 30%, hsl(216 55% 7% / 0.75) 50%, hsl(216 55% 7% / 0.3) 70%, transparent 85%)",
        }}
      />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 z-[5] bg-gradient-to-b from-background to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 z-[5] bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div className="h-full flex gap-3 px-4 md:px-8 opacity-50">
        {cols.map((col, colIdx) => (
          <div
            key={colIdx}
            className={cn(
              "flex-1 flex flex-col gap-3",
              colIdx % 2 === 0 ? "animate-scroll-up" : "animate-scroll-down"
            )}
          >
            {[...col, ...col].map((t, i) => (
              <TestimonialCard key={`${colIdx}-${i}`} testimonial={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialWall;
