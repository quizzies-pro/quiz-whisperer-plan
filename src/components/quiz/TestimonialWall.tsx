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
    role: "Franqueado em São Paulo",
    text: "A LocaGora mudou minha vida financeira. Em 3 meses já tinha retorno do investimento.",
    highlight: "Retorno em 3 meses!",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Ana Rodrigues",
    role: "Franqueada em Belo Horizonte",
    text: "O suporte da equipe é incrível. Me ajudaram em cada etapa da implantação.",
    highlight: "Suporte completo desde o início.",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "Fernando Costa",
    role: "Franqueado em Curitiba",
    text: "Nunca imaginei que alugar motos pudesse gerar tanta renda passiva. Estou impressionado com os resultados.",
    highlight: "Renda passiva real e consistente.",
    avatar: "https://i.pravatar.cc/80?img=53",
  },
  {
    name: "Juliana Mendes",
    role: "Franqueada no Rio de Janeiro",
    text: "A demanda por entregadores só cresce. Meus 10 veículos estão sempre alugados.",
    highlight: "100% de ocupação dos veículos.",
    avatar: "https://i.pravatar.cc/80?img=9",
  },
  {
    name: "Roberto Almeida",
    role: "Franqueado em Campinas",
    text: "Saí do CLT e hoje faturo mais do que o dobro. A LocaGora me deu essa oportunidade.",
    highlight: "Faturamento dobrou após sair do CLT.",
    avatar: "https://i.pravatar.cc/80?img=60",
  },
  {
    name: "Patrícia Nunes",
    role: "Franqueada em Salvador",
    text: "O modelo de negócio é à prova de crises. Entregas não param nunca.",
    highlight: "Negócio à prova de crises.",
    avatar: "https://i.pravatar.cc/80?img=20",
  },
  {
    name: "Diego Ferreira",
    role: "Franqueado em Brasília",
    text: "Com 5 motos já consigo uma renda excelente. Planejando expandir para 15.",
    highlight: "Escalando de 5 para 15 motos.",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Mariana Lopes",
    role: "Franqueada em Recife",
    text: "A facilidade de gestão me surpreendeu. O sistema da LocaGora resolve tudo.",
    highlight: "Gestão simplificada e eficiente.",
    avatar: "https://i.pravatar.cc/80?img=25",
  },
  {
    name: "Thiago Martins",
    role: "Franqueado em Fortaleza",
    text: "Investi e em menos de 6 meses já estava no lucro. Recomendo fortemente.",
    highlight: "Lucro em menos de 6 meses.",
    avatar: "https://i.pravatar.cc/80?img=14",
  },
  {
    name: "Camila Santos",
    role: "Franqueada em Porto Alegre",
    text: "A LocaGora encontrou meus primeiros clientes. Não precisei me preocupar com nada.",
    highlight: "Clientes garantidos desde o início.",
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    name: "Lucas Oliveira",
    role: "Franqueado em Goiânia",
    text: "O payback foi mais rápido do que imaginei. Já estou reinvestindo os lucros.",
    highlight: "Payback acelerado e reinvestimento.",
    avatar: "https://i.pravatar.cc/80?img=68",
  },
  {
    name: "Beatriz Cardoso",
    role: "Franqueada em Manaus",
    text: "Mesmo longe dos grandes centros, a demanda é altíssima. Negócio funciona em qualquer lugar.",
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
  // Split into 4 columns
  const cols = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
    testimonials.slice(6, 9),
    testimonials.slice(9, 12),
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden pointer-events-none">
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-background to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-background to-transparent" />

      <div className="h-full flex gap-3 px-4 md:px-8 opacity-40">
        {cols.map((col, colIdx) => (
          <div
            key={colIdx}
            className={cn(
              "flex-1 flex flex-col gap-3",
              colIdx % 2 === 0 ? "animate-scroll-up" : "animate-scroll-down"
            )}
          >
            {/* Duplicate for seamless loop */}
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
