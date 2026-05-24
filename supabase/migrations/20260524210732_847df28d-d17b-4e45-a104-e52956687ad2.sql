
-- TEMPORARY: allow anon writes until auth is enabled
CREATE POLICY "temp anon write demands" ON public.demands FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "temp anon write delegations" ON public.delegations FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "temp anon write risks" ON public.risks FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "temp anon write meetings" ON public.meetings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "temp anon write pendencies" ON public.pendencies FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "temp anon write follow_ups" ON public.follow_ups FOR ALL TO anon USING (true) WITH CHECK (true);
