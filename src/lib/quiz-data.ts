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
  link?: string; // External URL — navigates away instead of advancing
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
  bgImage?: string;
  bgImageMobile?: string;
  buttonLabel?: string;
  privacyText?: string;
  highlightText?: string; // Big highlighted text for interstitials
}

const BG_DESKTOP = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313034/bg2bfoca_bin3ti.webp";
const BG_MOBILE = "https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774317562/Capa_para_Reels_Instagram_Minimalista_Simples_Cores_Neutras_1080_x_1921_px_nmdvaa.png";

export const quizSteps: QuizStepData[] = [
  // ── Página de abertura (VSL) ──
  {
    id: 1,
    title: "Descubra como pessoas comuns estão faturando com franquias de motos.",
    subtitle: "Assista ao vídeo e veja como funciona a oportunidade LocaGora.",
    type: "vsl",
    videoUrl: "",
    macroStep: 1,
  },

  // ── STEP 1 do Quiz: Welcome ──
  {
    id: 2,
    title: "Vou apresentar nossa franquia ainda hoje para você.",
    subtitle: "Você gostaria de ter ganhos de até R$20.000,00 por mês?",
    type: "welcome",
    buttonLabel: "Quero ganhos de até R$20.000,00",
    privacyText: "Clicando acima você aceita nossas Políticas de Privacidade.",
    macroStep: 2,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },

  // ── STEP 2 do Quiz: O que procura? ──
  {
    id: 3,
    title: "Perfeito! Para isso preciso de algumas informações rápidas.",
    subtitle: "O que você está procurando na LocAgora?",
    type: "multiple-choice",
    required: true,
    category: "interesse",
    macroStep: 2,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
    options: [
      { id: "a", label: "Quero alugar uma moto.", value: "alugar_moto", link: "https://locagoraveiculos.com.br" },
      { id: "b", label: "Tenho interesse na Franquia.", value: "interesse_franquia" },
    ],
  },

  // ── STEP 3 do Quiz: Nome ──
  {
    id: 4,
    title: "Qual é o seu nome?",
    subtitle: "Estamos avaliando novos franqueados para as próximas cidades. Precisamos de algumas informações.",
    subtitleParts: ["Estamos avaliando novos franqueados para as próximas cidades.", " Precisamos de algumas informações."],
    type: "text",
    inputType: "text",
    placeholder: "Digite seu nome",
    required: true,
    category: "nome",
    macroStep: 3,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },

  // ── STEP 4 do Quiz: Email ──
  {
    id: 5,
    title: "Qual é o seu email?",
    type: "text",
    inputType: "email",
    placeholder: "seu@email.com",
    required: true,
    category: "email",
    macroStep: 3,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },

  // ── STEP 5 do Quiz: WhatsApp ──
  {
    id: 6,
    title: "Qual é o seu número de WhatsApp?",
    type: "text",
    inputType: "tel",
    placeholder: "(00) 00000-0000",
    required: true,
    category: "whatsapp",
    macroStep: 3,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },

  // ── STEP 6 do Quiz: Interstitial ──
  {
    id: 7,
    title: "Estamos preparando algo pra você",
    highlightText: "Você sabia que um franqueado com 10 motos, lucra R$ 12.000 por mês?",
    type: "interstitial",
    macroStep: 4,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },

  // ── STEP 7 do Quiz: Investimento ──
  {
    id: 8,
    title: "Qual valor você pretende investir na compra de motos?",
    subtitle: "Antes de verificar sua disponibilidade de investimento, gostaria de informar que, para se tornar um franqueado da Locagora, é necessário ter pelo menos 200 mil disponíveis para investir.",
    type: "multiple-choice",
    required: true,
    category: "investimento",
    macroStep: 5,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
    options: [
      { id: "a", label: "Menos de 200 Mil", value: "menos_200k" },
      { id: "b", label: "200 Mil a 300 Mil", value: "200k_300k" },
      { id: "c", label: "300 Mil a 500 Mil", value: "300k_500k" },
      { id: "d", label: "500 Mil a 700 Mil", value: "500k_700k" },
      { id: "e", label: "Acima de 700 Mil", value: "mais_700k" },
    ],
  },

  // ── STEP 8 do Quiz: Resultado ──
  {
    id: 9,
    title: "Parabéns, você foi aprovado para avançar na avaliação da franquia.",
    subtitle: "Com base nas suas respostas você demonstra ter o perfil ideal para abrir uma franquia LocaGora na sua região.",
    type: "result",
    macroStep: 6,
    bgImage: BG_DESKTOP,
    bgImageMobile: BG_MOBILE,
  },
];

export const totalSteps = quizSteps.length;

// Macro step labels for sidebar
export const macroStepLabels: Record<number, string> = {
  1: "Apresentação",
  2: "Interesse",
  3: "Seus dados",
  4: "Preparação",
  5: "Investimento",
  6: "Resultado",
};

// ── Dynamic Calculator Constants (real LOC data) ──
export const CALC_CONSTANTS = {
  lucroMensalPorMoto: 960,     // R$ 960/moto/mês (dado real)
  cdbRoiMensal: 0.0094,       // 0,94% ao mês (Taxa 11,75% a.a.)
  selicRoiMensal: 0.0117,     // 1,17% ao mês (Taxa 15% a.a.)
};

// Tier-based franchise fee + cost per moto
export function getTierData(motos: number): { taxa: number; custoPorMoto: number; tierLabel: string } {
  if (motos <= 3) return { taxa: 49990, custoPorMoto: 21000, tierLabel: "Tier 1 (2-3 motos): Taxa R$ 49.990 + R$ 21.000/moto" };
  if (motos <= 19) return { taxa: 79990, custoPorMoto: 21000, tierLabel: "Tier 2 (4-19 motos): Taxa R$ 79.990 + R$ 21.000/moto" };
  return { taxa: 110000, custoPorMoto: 20000, tierLabel: "Tier 3 (20+ motos): Taxa R$ 110.000 + R$ 20.000/moto" };
}

export interface CalculatorResult {
  motos: number;
  taxaFranquia: number;
  custoPorMoto: number;
  tierLabel: string;
  investimentoMotos: number;
  investimentoTotal: number;
  lucroMensal: number;
  lucroAnual: number;
  roiMensal: number;
  paybackMeses: number;
  cdbRendimentoMensal: number;
  cdbRendimentoAnual: number;
  cdbRoiMensal: number;
  selicRendimentoMensal: number;
  selicRendimentoAnual: number;
  selicRoiMensal: number;
}

export function calcularRetorno(motos: number): CalculatorResult {
  const { lucroMensalPorMoto, cdbRoiMensal, selicRoiMensal } = CALC_CONSTANTS;
  const { taxa: taxaFranquia, custoPorMoto, tierLabel } = getTierData(motos);

  const investimentoMotos = motos * custoPorMoto;
  const investimentoTotal = taxaFranquia + investimentoMotos;
  const lucroMensal = motos * lucroMensalPorMoto;
  const lucroAnual = lucroMensal * 12;
  const roiMensal = (lucroMensal / investimentoTotal) * 100;
  const paybackMeses = Math.ceil(investimentoTotal / lucroMensal);

  const cdbRendimentoMensal = Math.round(investimentoTotal * cdbRoiMensal);
  const cdbRendimentoAnual = Math.round(cdbRendimentoMensal * 12);

  const selicRendimentoMensal = Math.round(investimentoTotal * selicRoiMensal);
  const selicRendimentoAnual = Math.round(selicRendimentoMensal * 12);

  return {
    motos,
    taxaFranquia,
    custoPorMoto,
    tierLabel,
    investimentoMotos,
    investimentoTotal,
    lucroMensal,
    lucroAnual,
    roiMensal,
    paybackMeses,
    cdbRendimentoMensal,
    cdbRendimentoAnual,
    cdbRoiMensal: cdbRoiMensal * 100,
    selicRendimentoMensal,
    selicRendimentoAnual,
    selicRoiMensal: selicRoiMensal * 100,
  };
}

export const MOTO_OPTIONS = [2, 5, 10, 15, 20, 30] as const;

export interface MotoScenario {
  motos: number;
  lucroMensal: number;
  lucroAnual: number;
  roiPercent: number;
  paybackMeses: number;
  label: string;
}

export const motoScenarios: MotoScenario[] = MOTO_OPTIONS.map((m) => {
  const r = calcularRetorno(m);
  return {
    motos: m,
    lucroMensal: Math.round(r.lucroMensal),
    lucroAnual: Math.round(r.lucroAnual),
    roiPercent: Math.round(r.roiMensal * 100) / 100,
    paybackMeses: r.paybackMeses,
    label: `${m} Motos`,
  };
});
