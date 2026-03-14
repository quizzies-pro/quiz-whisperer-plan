

## Implementação dos Cookies First-Party (_fbc / _fbp)

### Resposta às suas perguntas

**Você precisa fazer algo?** Não. Eu implemento tudo aqui, sem necessidade de configuração externa.

**Vai atrapalhar a campanha rodando?** Não. A mudança é 100% aditiva — ela apenas **melhora** o que já existe:
- Se o Pixel já criou os cookies, o código não sobrescreve
- Se o Pixel não criou (browser in-app, bloqueio), o código gera manualmente
- Os eventos continuam sendo enviados exatamente da mesma forma
- O `event_id` para deduplicação continua funcionando normalmente

### O que será feito

1. **Criar hook `src/hooks/use-fb-cookies.ts`**
   - Lê `fbclid` da URL ao carregar a página
   - Gera `_fbc` e `_fbp` como cookies first-party se não existirem
   - Preserva cookies existentes do Pixel (não sobrescreve)

2. **Atualizar `QuizContainer.tsx`**
   - Importar o hook e usar os valores retornados no `sendMetaEvent`
   - Remover a função `getCookie` (substituída pelo hook)

Zero risco para a campanha atual.

