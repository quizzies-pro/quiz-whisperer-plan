CREATE TABLE public.quiz_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  answers jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert leads"
  ON public.quiz_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read leads"
  ON public.quiz_leads
  FOR SELECT
  TO service_role
  USING (true);