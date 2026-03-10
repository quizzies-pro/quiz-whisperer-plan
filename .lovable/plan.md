

# Integração com RD Station CRM

## Contexto

O quiz coleta dados do lead ao longo das etapas (nome, email, WhatsApp, respostas de qualificação, cenário de motos selecionado). Atualmente esses dados ficam apenas no estado local do React e não são enviados a nenhum lugar. Precisamos enviar para o RD Station quando o lead chega na etapa de resultado (step 13).

## Como funciona a API do RD Station

O RD Station Marketing oferece uma API REST para criação de conversões (leads). O endpoint principal é:

```
POST https://api.rd.services/platform/conversions
```

Requer um **token de API privado** (gerado em RD Station → Configurações → Integrações → Tokens). Como é uma chave privada, **não pode ficar no código do frontend** — precisa de uma Edge Function no backend.

## Arquitetura proposta

```text
┌──────────────┐       ┌─────────────────────┐       ┌──────────────┐
│  Quiz React  │──────▶│  Edge Function      │──────▶│  RD Station  │
│  (Step 13)   │  POST │  send-to-rdstation  │  POST │  API         │
└──────────────┘       └─────────────────────┘       └──────────────┘
```

## Pré-requisitos

1. **Ativar Lovable Cloud** — necessário para criar Edge Functions e armazenar secrets
2. **Token da API do RD Station** — gerado no painel do RD Station (Configurações → Integrações → Chave de API ou Token)

## Passo a passo da implementação

### 1. Configurar Lovable Cloud + Secret
- Ativar Lovable Cloud no projeto
- Armazenar o token do RD Station como secret (`RDSTATION_API_TOKEN`)

### 2. Criar Edge Function `send-to-rdstation`
- Recebe os dados do lead via POST (nome, email, WhatsApp, respostas)
- Valida os campos com Zod no servidor
- Envia para a API do RD Station como uma **conversão** com campos customizados:
  - `email`, `name`, `personal_phone`
  - `cf_objetivo` (resposta step 5)
  - `cf_experiencia` (step 6)
  - `cf_cidade` (step 7)
  - `cf_tempo` (step 8)
  - `cf_investimento` (step 10)
  - `cf_motos_selecionadas` (step 11)
- Retorna sucesso/erro ao frontend

### 3. Disparar envio no frontend
- Na transição para o step 13 (resultado), chamar a Edge Function com todos os dados coletados
- Mostrar o resultado normalmente sem bloquear a experiência do usuário (envio assíncrono, fire-and-forget)
- Se falhar, logar o erro silenciosamente (não impactar o lead)

### 4. Dados enviados ao RD Station

| Campo RD Station | Origem | Step |
|---|---|---|
| `name` | Nome digitado | 2 |
| `email` | Email digitado | 3 |
| `personal_phone` | WhatsApp | 4 |
| `cf_objetivo` | Opção selecionada | 5 |
| `cf_experiencia_investimento` | Opção selecionada | 6 |
| `cf_tamanho_cidade` | Opção selecionada | 7 |
| `cf_disponibilidade_tempo` | Opção selecionada | 8 |
| `cf_faixa_investimento` | Opção selecionada | 10 |
| `cf_qtd_motos` | Motos selecionadas | 11 |
| `conversion_identifier` | `"quiz-locagora"` | — |

## Importante

- Os campos customizados (`cf_*`) precisam ser criados previamente no RD Station para que os dados sejam salvos corretamente
- O token nunca fica exposto no frontend — só existe na Edge Function
- O envio é feito de forma assíncrona para não atrasar a experiência do lead

