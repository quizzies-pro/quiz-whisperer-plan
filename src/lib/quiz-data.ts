export type QuizStepType = "welcome" | "multiple-choice" | "text" | "scale" | "result";

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  category?: string; // for lead categorization
}

export interface QuizStepData {
  id: number;
  title: string;
  subtitle?: string;
  type: QuizStepType;
  options?: QuizOption[];
  placeholder?: string;
  required?: boolean;
  category?: string; // category this step evaluates
}

export const quizSteps: QuizStepData[] = [
  {
    id: 1,
    title: "Bem-vindo ao LocAgora!",
    subtitle: "Vamos entender melhor o seu perfil para te ajudar da melhor forma. Leva menos de 2 minutos.",
    type: "welcome",
  },
  {
    id: 2,
    title: "Qual é o seu principal objetivo com locação?",
    subtitle: "Selecione a opção que mais se encaixa no seu momento.",
    type: "multiple-choice",
    required: true,
    category: "objetivo",
    options: [
      { id: "a", label: "Quero alugar um imóvel", value: "alugar", category: "locatario" },
      { id: "b", label: "Quero colocar meu imóvel para alugar", value: "proprietario", category: "proprietario" },
      { id: "c", label: "Sou corretor / imobiliária", value: "corretor", category: "profissional" },
      { id: "d", label: "Estou apenas pesquisando", value: "pesquisa", category: "frio" },
    ],
  },
  {
    id: 3,
    title: "Como você conheceu o LocAgora?",
    subtitle: "Queremos saber como chegou até nós.",
    type: "multiple-choice",
    required: true,
    category: "canal",
    options: [
      { id: "a", label: "Redes sociais", value: "social" },
      { id: "b", label: "Indicação de amigo", value: "indicacao" },
      { id: "c", label: "Google / Pesquisa", value: "google" },
      { id: "d", label: "Outro", value: "outro" },
    ],
  },
];

export const totalSteps = quizSteps.length;
