
DROP POLICY IF EXISTS "temp anon write delegations" ON public.delegations;
DROP POLICY IF EXISTS "temp anon write demands" ON public.demands;
DROP POLICY IF EXISTS "temp anon write follow_ups" ON public.follow_ups;
DROP POLICY IF EXISTS "temp anon write meetings" ON public.meetings;
DROP POLICY IF EXISTS "temp anon write pendencies" ON public.pendencies;
DROP POLICY IF EXISTS "temp anon write risks" ON public.risks;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
