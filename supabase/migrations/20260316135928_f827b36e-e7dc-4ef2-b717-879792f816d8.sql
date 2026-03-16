
ALTER TABLE public.quiz_leads 
  ALTER COLUMN email SET DEFAULT '',
  ALTER COLUMN name SET DEFAULT '',
  ADD COLUMN session_id uuid UNIQUE,
  ADD COLUMN current_step integer DEFAULT 1;
