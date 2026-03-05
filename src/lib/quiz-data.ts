export type QuizStepType =
  | "vsl"
  | "welcome"
  | "text"
  | "multiple-choice"
  | "scale"
  | "interstitial"
  | "calculator"
  | "loading"
  | "result"
  | "form";

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
  subtitleParts?: [string, string];
  type: QuizStepType;
  options?: QuizOption[];
  placeholder?: string;
  required?: boolean;
  category?: string;
  inputType?: "text" | "email" | "tel";
  autoAdvanceMs?: number;
  videoUrl?: string;
  macroStep?: number;
}

export const quizSteps: QuizStepData[] = [
  // ── Stage 1: VSL ──
  {
    id: 1,
    title: "Descubra como pessoas comuns estão faturando com franquias de motos.",
    subtitle: "Assista ao vídeo e veja como funciona a oportunidade LocaGora.",
    type: "vsl",
    videoUrl: "",
    macroStep: 1,
  },

  // ── Stage 2: User Capture (separate steps) ──
  {
    id: 2,
    title: "Qual é o seu nome?",
    subtitle: "Estamos avaliando novos franqueados para as próximas cidades. Precisamos de algumas informações.",
    subtitleParts: ["Estamos avaliando novos franqueados para as próximas cidades.", " Precisamos de algumas informações."],
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

  // ── Stage 3: Profile Qualification ──
  {
    id: 5,
    title: "Qual dessas opções mais descreve o que você quer conquistar agora?",
    subtitle: "Suas respostas nos ajudam a avaliar seu perfil e indicar a melhor oportunidade para você.",
    type: "multiple-choice",
    required: true,
    category: "busca",
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
    category: "negocio_investimento",
    macroStep: 3,
    options: [
      { id: "a", label: "Sim, tenho negócio(s) ativo(s)", value: "negocio_ativo" },
      { id: "b", label: "Sim, tenho investimentos (CDB, ações, fundos...)", value: "investimentos" },
      { id: "c", label: "Não, esse seria meu primeiro investimento", value: "primeiro" },
    ],
  },

  // ── Stage 4: Entrepreneur Profile ──
  {
    id: 7,
    title: "Qual é o tamanho aproximado da sua cidade?",
    type: "multiple-choice",
    required: true,
    category: "tamanho_cidade",
    macroStep: 4,
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
    macroStep: 4,
    options: [
      { id: "a", label: "Não tenho tempo para me dedicar", value: "sem_tempo" },
      { id: "b", label: "Você tem 1 hora por dia para se dedicar?", value: "1h" },
      { id: "c", label: "Algumas horas por semana", value: "algumas_horas" },
      { id: "d", label: "Tenho disponibilidade para dedicação integral", value: "integral" },
    ],
  },

  // ── Interstitial ──
  {
    id: 9,
    title: "Parabéns, 98% dos nossos maiores clientes de sucesso tem características muito semelhantes a você!",
    subtitle: "Só mais uma pergunta antes do seu resultado.",
    type: "interstitial",
    macroStep: 4,
  },

  // ── Stage 5: Investment Qualification ──
  {
    id: 10,
    title: "Qual faixa representa sua disponibilidade de investimento hoje?",
    subtitle: "Para manter a qualidade da nossa rede de franqueados e garantir o sucesso de cada um dos nossos parceiros, avaliamos também a capacidade de investimento. Cada plano exige um capital inicial diferente e queremos indicar o caminho certo para o seu momento.",
    type: "multiple-choice",
    required: true,
    category: "investimento",
    macroStep: 5,
    options: [
      { id: "a", label: "Menos de 200 Mil", value: "menos_200k" },
      { id: "b", label: "200 Mil a 300 Mil", value: "200k_300k" },
      { id: "c", label: "300 Mil a 500 Mil", value: "300k_500k" },
      { id: "d", label: "500 Mil a 700 Mil", value: "500k_700k" },
      { id: "e", label: "Mais de 700 Mil", value: "mais_700k" },
    ],
  },

  // ── Stage 6: ROI Calculator ──
  {
    id: 11,
    title: "Veja quanto você poderia lucrar com a LocaGora",
    subtitle: "Selecione um cenário e simule seu retorno.",
    type: "calculator",
    macroStep: 6,
  },

  // ── Stage 7: Loading + Result ──
  {
    id: 12,
    title: "Analisando seu perfil...",
    type: "loading",
    macroStep: 7,
  },
  {
    id: 13,
    title: "Parabéns, você foi aprovado para avançar na avaliação da franquia.",
    subtitle: "Com base nas suas respostas você demonstra ter o perfil ideal para abrir uma franquia LocaGora na sua região.",
    type: "result",
    macroStep: 7,
  },
];

export const totalSteps = quizSteps.length;

// Macro step labels for sidebar
export const macroStepLabels: Record<number, string> = {
  1: "Apresentação",
  2: "Seus dados",
  3: "Qualificação",
  4: "Perfil",
  5: "Investimento",
  6: "Simulação",
  7: "Resultado",
};

// Business scenarios (2, 5, 10, 20 motos)
export interface MotoScenario {
  motos: number;
  lucroMensal: number;
  lucroAnual: number;
  roiPercent: number;
  paybackMeses: number;
  label: string;
}

export const motoScenarios: MotoScenario[] = [
  { motos: 2, lucroMensal: 1700, lucroAnual: 20400, roiPercent: 102, paybackMeses: 12, label: "2 Motos" },
  { motos: 5, lucroMensal: 4250, lucroAnual: 51000, roiPercent: 102, paybackMeses: 12, label: "5 Motos" },
  { motos: 10, lucroMensal: 8500, lucroAnual: 102000, roiPercent: 102, paybackMeses: 12, label: "10 Motos" },
  { motos: 20, lucroMensal: 17000, lucroAnual: 204000, roiPercent: 102, paybackMeses: 12, label: "20 Motos" },
];

// Legacy compatibility
export const investmentTiers: Record<string, { motos: number; lucroMensal: number; label: string }> = {
  menos_200k: { motos: 0, lucroMensal: 0, label: "Lista de espera" },
  "200k_300k": { motos: 5, lucroMensal: 4250, label: "Plano Starter — 5 motos" },
  "300k_500k": { motos: 10, lucroMensal: 8500, label: "Plano Growth — 10 motos" },
  "500k_700k": { motos: 15, lucroMensal: 12750, label: "Plano Premium — 15 motos" },
  mais_700k: { motos: 20, lucroMensal: 17000, label: "Plano Master — 20 motos" },
};
