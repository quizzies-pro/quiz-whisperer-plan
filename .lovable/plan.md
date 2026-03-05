

## Plan: Apply LocaGora Design System + Restructure Quiz Funnel

This is a large undertaking. I'll break it into phases to keep each change manageable.

### What Changes

**1. Design System — Theme & Fonts**
- Update `index.html` to load Montserrat and Open Sans from Google Fonts
- Rewrite `src/index.css` CSS variables to map the LocaGora dark navy + neon green tokens (navy_deep as background, green_neon as primary, etc.)
- Update `tailwind.config.ts` to add the LocaGora font families (`fontFamily.heading: Montserrat`, `fontFamily.body: Open Sans`) and any custom colors/shadows needed beyond CSS variables

**2. Reusable Components**
- Create `src/components/ui/cta-button.tsx` — pill-shaped green CTA with Montserrat 700 uppercase, hover lift/scale, green glow shadow
- Update existing `Button` variants or add a new `cta` variant
- Ensure card components use navy_mid backgrounds with subtle white border

**3. Quiz Step Views — Full Visual Overhaul**
- Rewrite `QuizStepView.tsx` to use the dark theme: navy backgrounds, green accents, Montserrat headings, Open Sans body text
- Option cards: navy_mid background, green border glow on selected, lift animation on hover
- Progress bar: green_neon fill on navy_light background
- Text inputs: dark-styled with green focus ring

**4. Quiz Structure — Align with PRD**
- Update `quiz-data.ts` to match the 6-stage structure from the PRD:
  - Step 1: VSL intro
  - Step 2: User capture (Nome, Email, WhatsApp — consolidated into one form step or kept as 3 separate steps)
  - Step 3: Profile qualification (city population, investment capacity, operate vs invest)
  - Step 4: Entrepreneur profile (previous business, dedication time)
  - Step 5: ROI Calculator with 4 scenarios (2, 5, 10, 20 motos)
  - Step 6: Result page with WhatsApp CTA
- Update `investmentTiers` to reflect the new scenarios (2/5/10/20 motos)

**5. QuizSidebar — Dark Theme**
- Restyle sidebar to use navy_mid background, green active indicators, white text

**6. Result Page**
- "Parabéns, você foi aprovado" title
- Profit estimate display with Montserrat 900 green numbers
- "FALAR COM UM ESPECIALISTA" CTA linking to WhatsApp

**7. Mobile Optimization**
- Full-width buttons, vertically stacked cards, 16px minimum spacing

### What Won't Be Done Yet (requires Supabase)
- Database tables (leads, quiz_responses, simulation_results) — needs Cloud/Supabase connection
- Lead saving and sales routing/CRM tagging
- Pixel tracking (Meta, GA, TikTok) — can be added as script tags later

### Implementation Order
1. Fonts + CSS variables + Tailwind config (foundation)
2. CTA Button component
3. QuizStepView visual overhaul (all step types)
4. QuizSidebar restyle
5. Quiz data structure adjustments
6. Calculator with 4 moto scenarios
7. Result page with WhatsApp CTA

