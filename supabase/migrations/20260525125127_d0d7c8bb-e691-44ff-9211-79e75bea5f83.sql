
-- Drop existing write policies
DROP POLICY IF EXISTS "admins write demands" ON public.demands;
DROP POLICY IF EXISTS "admins write delegations" ON public.delegations;
DROP POLICY IF EXISTS "admins write risks" ON public.risks;
DROP POLICY IF EXISTS "admins write meetings" ON public.meetings;
DROP POLICY IF EXISTS "admins write follow_ups" ON public.follow_ups;
DROP POLICY IF EXISTS "admins write pendencies" ON public.pendencies;
DROP POLICY IF EXISTS "admins write workstreams" ON public.workstreams;

-- Public write policies (insert/update/delete) for all listed tables
CREATE POLICY "public write demands" ON public.demands FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write delegations" ON public.delegations FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write risks" ON public.risks FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write meetings" ON public.meetings FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write follow_ups" ON public.follow_ups FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write pendencies" ON public.pendencies FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "public write workstreams" ON public.workstreams FOR ALL TO public USING (true) WITH CHECK (true);
