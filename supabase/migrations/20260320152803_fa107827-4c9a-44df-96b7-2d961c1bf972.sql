-- Fix shifted leads: where name contains an email address and email contains a phone number
-- Shift: name→email, email→phone, phone→answers.5, answers.5→answers.6, answers.6→answers.7
-- The real name is lost (overwritten), so we set it to empty string

UPDATE quiz_leads
SET 
  answers = jsonb_build_object(
    '5', COALESCE(phone, ''),
    '6', COALESCE(answers->>'5', ''),
    '7', COALESCE(answers->>'6', ''),
    '9', COALESCE(answers->>'9', '')
  ),
  phone = email,
  email = name,
  name = ''
WHERE 
  name LIKE '%@%'
  AND (email LIKE '+%' OR email LIKE '+%' OR email LIKE '%(%)%');