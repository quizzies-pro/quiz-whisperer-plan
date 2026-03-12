INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read videos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'videos');

CREATE POLICY "Authenticated upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');