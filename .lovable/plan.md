

## Plano: Remover a etapa da Calculadora do Quiz

### O que muda
A etapa 11 (Calculadora/Simulador de ROI) será removida do fluxo. Após responder a faixa de investimento (atual step 10), o usuário irá direto para o loading ("Analisando perfil") e depois o resultado.

### Como implementar

1. **`src/lib/quiz-data.ts`** — Remover o objeto do step `calculator` (id 11) do array `quizSteps`. Re-numerar os steps 12 e 13 para 11 e 12. Atualizar `macroStepLabels` removendo a entrada "Simulação" (key 6) e ajustando as keys restantes.

2. **`src/components/quiz/QuizContainer.tsx`** — Ajustar referências ao step 13 (agora 12) para o envio do lead ao RD Station e evento `CompleteRegistration`. Ajustar a referência ao step 5 para o evento `Lead`. Remover a referência `answers[11]` do payload enviado às Edge Functions.

3. **`src/components/quiz/QuizStepView.tsx`** — Nenhuma alteração necessária (o tipo `calculator` simplesmente não aparecerá mais no array).

4. **`src/components/quiz/steps/CalculatorStep.tsx`** — Pode ser mantido ou removido. Recomendo remover para limpar o código.

### Resultado
O quiz passa de 13 para 12 etapas. O fluxo fica: Investimento → Loading → Resultado.

