
INSERT INTO storage.buckets (id, name, public)
VALUES ('materiais', 'materiais', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "materiais public read" ON storage.objects;
DROP POLICY IF EXISTS "materiais public insert" ON storage.objects;
DROP POLICY IF EXISTS "materiais public update" ON storage.objects;
DROP POLICY IF EXISTS "materiais public delete" ON storage.objects;

CREATE POLICY "materiais public read" ON storage.objects
FOR SELECT TO public USING (bucket_id = 'materiais');

CREATE POLICY "materiais public insert" ON storage.objects
FOR INSERT TO public WITH CHECK (bucket_id = 'materiais');

CREATE POLICY "materiais public update" ON storage.objects
FOR UPDATE TO public USING (bucket_id = 'materiais') WITH CHECK (bucket_id = 'materiais');

CREATE POLICY "materiais public delete" ON storage.objects
FOR DELETE TO public USING (bucket_id = 'materiais');
