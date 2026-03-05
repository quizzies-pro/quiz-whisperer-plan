export type QuizStepType =
  | "vsl"
  | "welcome"
  | "text"
  | "multiple-choice"
  | "scale"
  | "interstitial"
  | "calculator"
  | "loading"
  | "result";

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  category?: string;
}

export interface QuizStepData {
  id: number;
  title: string;
  subtitle?: string;
  type: QuizStepType;
  options?: QuizOption[];
  placeholder?: string;
  required?: boolean;
  category?: string;
  inputType?: "text" | "email" | "tel";
  autoAdvanceMs?: number;
  videoUrl?: string;
  macroStep?: number; // 1-5 for sidebar grouping
}

export const quizSteps: QuizStepData[] = [
  // ── Macro 1: VSL ──
  {
    id: 1,
    title: "Descubra se você tem o perfil para ser um franqueado LocaGora",
    subtitle: "Assista ao vídeo e inicie sua avaliação de perfil.",
    type: "vsl",
    videoUrl: "",
    macroStep: 1,
  },

  // ── Macro 2: Captura de Dados ──
  {
    id: 2,
    title: "Qual é o seu nome?",
    subtitle:
      "Estamos avaliando novos franqueados para as próximas cidades. Para garantir a qualidade do nosso atendimento precisamos de algumas informações.",
    type: "text",
    inputType: "text",
    placeholder: "Digite seu nome",
    required: true,
    category: "nome",
    macroStep: 2,
  },
  {
    id: 3,
    title: "Qual é o seu email?",
    type: "text",
    inputType: "email",
    placeholder: "seu@email.com",
    required: true,
    category: "email",
    macroStep: 2,
  },
  {
    id: 4,
    title: "Qual é o seu número de WhatsApp?",
    type: "text",
    inputType: "tel",
    placeholder: "(00) 00000-0000",
    required: true,
    category: "whatsapp",
    macroStep: 2,
  },

  // ── Macro 3: Qualificação de Perfil ──
  {
    id: 5,
    title: "O que melhor descreve o que você está buscando agora?",
    subtitle:
      "Responda com honestidade. Isso nos ajuda a indicar o plano ideal para você.",
    type: "multiple-choice",
    required: true,
    category: "motivacao",
    macroStep: 3,
    options: [
      { id: "a", label: "Quero uma renda extra sem abrir mão do que já faço", value: "renda_extra" },
      { id: "b", label: "Quero diversificar meus investimentos com mais rentabilidade", value: "diversificar" },
      { id: "c", label: "Quero empreender com uma franquia validada", value: "empreender" },
      { id: "d", label: "Estou conhecendo a oportunidade por curiosidade", value: "curiosidade" },
    ],
  },
  {
    id: 6,
    title: "Você já tem algum negócio ativo ou investimento financeiro?",
    type: "multiple-choice",
    required: true,
    category: "experiencia",
    macroStep: 3,
    options: [
      { id: "a", label: "Sim, tenho negócio(s) ativo(s)", value: "negocio" },
      { id: "b", label: "Sim, tenho investimentos (CDB, ações, fundos)", value: "investimentos" },
      { id: "c", label: "Não, esse seria meu primeiro investimento", value: "primeiro" },
    ],
  },
  {
    id: 7,
    title: "Qual é o tamanho aproximado da sua cidade?",
    type: "multiple-choice",
    required: true,
    category: "cidade_tamanho",
    macroStep: 3,
    options: [
      { id: "a", label: "Menos de 50 mil habitantes", value: "menos_50k" },
      { id: "b", label: "Entre 50 mil e 100 mil habitantes", value: "50k_100k" },
      { id: "c", label: "Mais de 100 mil habitantes", value: "mais_100k" },
    ],
  },
  {
    id: 8,
    title: "Quanto tempo por dia você conseguiria dedicar ao negócio?",
    type: "multiple-choice",
    required: true,
    category: "tempo",
    macroStep: 3,
    options: [
      { id: "a", label: "Não tenho tempo para me dedicar", value: "sem_tempo" },
      { id: "b", label: "Tenho 1 hora por dia", value: "1h" },
      { id: "c", label: "Algumas horas por semana", value: "horas_semana" },
      { id: "d", label: "Dedicação integral", value: "integral" },
    ],
  },

  // ── Interstitial ──
  {
    id: 9,
    title: "Parabéns! 98% dos nossos maiores clientes de sucesso têm características muito semelhantes às suas.",
    type: "interstitial",
    autoAdvanceMs: 5000,
    macroStep: 3,
  },

  // ── Macro 4: Investimento + Calculadora ──
  {
    id: 10,
    title: "Qual faixa representa sua disponibilidade de investimento hoje?",
    subtitle:
      "Para manter a qualidade da nossa rede de franqueados avaliamos também a capacidade de investimento.",
    type: "multiple-choice",
    required: true,
    category: "investimento",
    macroStep: 4,
    options: [
      { id: "a", label: "Menos de R$ 200 mil", value: "menos_200k" },
      { id: "b", label: "R$ 200 mil a R$ 300 mil", value: "200k_300k" },
      { id: "c", label: "R$ 300 mil a R$ 500 mil", value: "300k_500k" },
      { id: "d", label: "R$ 500 mil a R$ 700 mil", value: "500k_700k" },
      { id: "e", label: "Mais de R$ 700 mil", value: "mais_700k" },
    ],
  },
  {
    id: 11,
    title: "Veja quanto você poderia lucrar com a LocaGora",
    subtitle: "Com base nas suas respostas vamos simular seu retorno.",
    type: "calculator",
    macroStep: 4,
  },

  // ── Macro 5: Avaliação + Resultado ──
  {
    id: 12,
    title: "Analisando seu perfil...",
    type: "loading",
    autoAdvanceMs: 6000,
    macroStep: 5,
  },
  {
    id: 13,
    title: "Parabéns! Seu perfil foi aprovado.",
    subtitle:
      "Com base nas suas respostas você demonstra ter o perfil ideal para abrir uma franquia LocaGora na sua região.",
    type: "result",
    macroStep: 5,
  },
];

export const totalSteps = quizSteps.length;

// Macro step labels for sidebar
export const macroStepLabels: Record<number, string> = {
  1: "Apresentação",
  2: "Seus dados",
  3: "Perfil",
  4: "Investimento",
  5: "Resultado",
};

// Investment tier helpers
export const investmentTiers: Record<string, { motos: number; lucroMensal: number; label: string }> = {
  menos_200k: { motos: 0, lucroMensal: 0, label: "Lista de espera" },
  "200k_300k": { motos: 10, lucroMensal: 8000, label: "Plano Starter — 10 motos" },
  "300k_500k": { motos: 20, lucroMensal: 18000, label: "Plano Growth — 20 motos" },
  "500k_700k": { motos: 35, lucroMensal: 32000, label: "Plano Premium — 35 motos" },
  mais_700k: { motos: 50, lucroMensal: 50000, label: "Plano Master — 50 motos" },
};
