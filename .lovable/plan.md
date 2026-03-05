

# Plano: Implementar Todas as Etapas do Quiz LocaGora (PRD Completo)

## Resumo

Expandir o quiz atual de 3 etapas de exemplo para as **14 telas reais** do funil de qualificação de franquia LocaGora, adicionando novos tipos de tela: VSL (vídeo), interstitial (mensagem intermediária), calculadora e resultado/aprovação.

## Mapeamento das Etapas (14 telas)

```text
ID  | Tipo              | Conteudo
----|-------------------|------------------------------------------
1   | vsl               | Pagina inicial com video + CTA "Começar avaliação"
2   | text              | Captura: Nome
3   | text              | Captura: Email (input type email)
4   | text              | Captura: WhatsApp (input tel)
5   | multiple-choice   | Motivação (4 opções)
6   | multiple-choice   | Experiência em negócios (3 opções)
7   | multiple-choice   | Tamanho da cidade (3 opções)
8   | multiple-choice   | Disponibilidade de tempo (4 opções)
9   | interstitial      | Mensagem "98% dos clientes..." + auto-redirect
10  | multiple-choice   | Faixa de investimento (5 opções) + filtro
11  | calculator        | Calculadora de potencial de lucro
12  | loading           | Tela de avaliação com provas sociais
13  | result            | Página de aprovação com resumo + vídeo
```

## Mudanças Técnicas

### 1. `src/lib/quiz-data.ts`
- Adicionar novos tipos: `"vsl" | "interstitial" | "calculator" | "loading"` ao `QuizStepType`
- Adicionar campos opcionais ao `QuizStepData`: `inputType` (email, tel), `autoAdvanceMs`, `videoUrl`
- Substituir as 3 etapas de exemplo pelas 13 etapas reais com todo o conteúdo do PRD

### 2. `src/components/quiz/QuizStepView.tsx`
Adicionar renderização para os novos tipos de tela:
- **vsl**: Headline + placeholder de vídeo + botão "Começar avaliação"
- **interstitial**: Mensagem de parabéns + auto-redirect após ~4 segundos
- **calculator**: Simulador simples baseado na faixa de investimento selecionada (etapa 10)
- **loading**: Barra de progresso animada + placeholders para provas sociais
- **result**: Headline personalizada com nome, resumo do perfil, vídeo placeholder, botões de conversão (agendar / WhatsApp)

### 3. `src/components/quiz/QuizContainer.tsx`
- Lógica de filtro: se investimento < 200k na etapa 10, pode redirecionar para tela diferente (lista de espera)
- Passar `answers` completo para o QuizStepView (necessário para a tela de resultado exibir resumo)
- Suporte a auto-advance para etapas interstitial/loading

### 4. `src/components/quiz/QuizSidebar.tsx`
- Ajustar para 13 etapas (possivelmente agrupar nas 5 macro-etapas visuais em vez de mostrar 13 dots)

## Lógica Condicional
- **Etapa 10 (investimento)**: se "Menos de 200 mil" -> pode mostrar tela de lista de espera em vez de calculadora
- **Etapa 13 (resultado)**: exibe dados dinâmicos do lead (nome, cidade, faixa, plano sugerido, lucro estimado)

## O Que Fica Para Depois
- Design system / cores da LocaGora (você disse que ainda vai passar)
- Vídeos reais (ficam como placeholders por agora)
- Integração com backend/CRM para salvar leads
- Link real do WhatsApp e agenda online
- Carrossel de depoimentos real (placeholder por agora)

