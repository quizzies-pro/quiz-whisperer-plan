

# Quiz Dinâmico LocAgora — Plano de Implementação

## Visão Geral

Quiz estilo Typeform com transições verticais suaves (scroll entre seções), barra de progresso lateral, e rotas individuais por etapa para facilitar edição no Lovable.

## Arquitetura

```text
/quiz          → Quiz completo (experiência do usuário)
/quiz/step/1   → Acesso direto à etapa 1 (dev only)
/quiz/step/2   → Acesso direto à etapa 2 (dev only)
...etc
```

### Estrutura de Arquivos

- `src/pages/Quiz.tsx` — Página principal do quiz, gerencia estado e navegação
- `src/pages/QuizStep.tsx` — Página para acesso direto a uma etapa (dev)
- `src/components/quiz/QuizContainer.tsx` — Container centralizado estilo Typeform
- `src/components/quiz/QuizSidebar.tsx` — Barra lateral com progresso
- `src/components/quiz/QuizStep.tsx` — Componente genérico de etapa
- `src/components/quiz/steps/` — Pasta com cada etapa individual
- `src/lib/quiz-data.ts` — Dados/configuração das etapas do quiz

## Comportamento e UX

**Transição vertical (estilo Typeform):**
- Cada etapa ocupa 100vh (tela cheia)
- Ao avançar, a próxima etapa sobe com `transform: translateY()` animado
- Não há navegação de página — é uma SPA com scroll controlado

**Barra lateral:**
- Fixa à esquerda, mostra progresso (etapa atual / total)
- Indicadores visuais por etapa (concluída, atual, pendente)
- Responsiva: no mobile vira barra superior fina

**Centralização:**
- Conteúdo de cada etapa centralizado vertical e horizontalmente
- Tipografia grande, espaçosa, limpa — estilo Typeform

**Rotas de desenvolvimento:**
- `/quiz` renderiza o fluxo completo
- `/quiz/step/:id` renderiza uma etapa isolada (mesmo componente, estado inicial diferente)
- Essas rotas existem no código mas não são expostas na UI

## Design System

- Fundo com cor sólida ou gradiente suave por etapa (configurável)
- Botões grandes e claros para avançar
- Animações: fade-in no conteúdo, slide vertical na transição
- Cores do LocAgora (você me passa depois ou defino um padrão inicial)

## Dados do Quiz

Estrutura central em `quiz-data.ts`:
```text
{
  id, título, tipo (múltipla escolha, texto, escala...),
  opções, categoria (para classificação do lead),
  cor de fundo (opcional)
}
```

Você vai me passar as etapas e eu populo essa estrutura.

## Próximos Passos

Após aprovação deste plano:
1. Você me passa as etapas/perguntas do quiz
2. Eu construo a estrutura base com 2-3 etapas de exemplo
3. Iteramos no visual e comportamento
4. Populamos com o conteúdo real

