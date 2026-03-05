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
    title: "Sua cidade possui mais de 100 mil habitantes?",
    subtitle: "Isso nos ajuda a avaliar o potencial da sua região.",
    type: "multiple-choice",
    required: true,
    category: "cidade_100k",
    macroStep: 3,
    options: [
      { id: "a", label: "Sim", value: "sim" },
      { id: "b", label: "Não", value: "nao" },
    ],
  },
  {
    id: 6,
    title: "Qual sua capacidade de investimento inicial?",
    subtitle: "Para manter a qualidade da nossa rede de franqueados avaliamos também a capacidade de investimento.",
    type: "multiple-choice",
    required: true,
    category: "investimento",
    macroStep: 3,
    options: [
      { id: "a", label: "Até R$ 20 mil", value: "ate_20k" },
      { id: "b", label: "R$ 20 mil a R$ 50 mil", value: "20k_50k" },
      { id: "c", label: "R$ 50 mil a R$ 100 mil", value: "50k_100k" },
      { id: "d", label: "Mais de R$ 100 mil", value: "mais_100k" },
    ],
  },
  {
    id: 7,
    title: "Você pretende:",
    type: "multiple-choice",
    required: true,
    category: "perfil_operacao",
    macroStep: 3,
    options: [
      { id: "a", label: "Operar o negócio", value: "operar" },
      { id: "b", label: "Ser investidor", value: "investidor" },
    ],
  },

  // ── Stage 4: Entrepreneur Profile ──
  {
    id: 8,
    title: "Você já teve negócio próprio?",
    subtitle: "Responda com honestidade. Isso nos ajuda a indicar o plano ideal para você.",
    type: "multiple-choice",
    required: true,
    category: "experiencia",
    macroStep: 4,
    options: [
      { id: "a", label: "Sim", value: "sim" },
      { id: "b", label: "Não", value: "nao" },
    ],
  },
  {
    id: 9,
    title: "Quanto tempo você pretende dedicar ao negócio?",
    type: "multiple-choice",
    required: true,
    category: "tempo",
    macroStep: 4,
    options: [
      { id: "a", label: "1 hora por dia", value: "1h" },
      { id: "b", label: "Meio período", value: "meio_periodo" },
      { id: "c", label: "Tempo integral", value: "integral" },
    ],
  },

  // ── Interstitial ──
  {
    id: 10,
    title: "Parabéns! 98% dos nossos maiores franqueados de sucesso têm características muito semelhantes às suas.",
    type: "interstitial",
    macroStep: 4,
  },

  // ── Stage 5: ROI Calculator ──
  {
    id: 11,
    title: "Veja quanto você poderia lucrar com a LocaGora",
    subtitle: "Selecione um cenário e simule seu retorno.",
    type: "calculator",
    macroStep: 5,
  },

  // ── Stage 6: Loading + Result ──
  {
    id: 12,
    title: "Analisando seu perfil...",
    type: "loading",
    macroStep: 6,
  },
  {
    id: 13,
    title: "Parabéns, você foi aprovado para avançar na avaliação da franquia.",
    subtitle: "Com base nas suas respostas você demonstra ter o perfil ideal para abrir uma franquia LocaGora na sua região.",
    type: "result",
    macroStep: 6,
  },
];

export const totalSteps = quizSteps.length;

// Macro step labels for sidebar
export const macroStepLabels: Record<number, string> = {
  1: "Apresentação",
  2: "Seus dados",
  3: "Qualificação",
  4: "Perfil",
  5: "Simulação",
  6: "Resultado",
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
  ate_20k: { motos: 2, lucroMensal: 1700, label: "Plano Starter — 2 motos" },
  "20k_50k": { motos: 5, lucroMensal: 4250, label: "Plano Growth — 5 motos" },
  "50k_100k": { motos: 10, lucroMensal: 8500, label: "Plano Premium — 10 motos" },
  mais_100k: { motos: 20, lucroMensal: 17000, label: "Plano Master — 20 motos" },
};
