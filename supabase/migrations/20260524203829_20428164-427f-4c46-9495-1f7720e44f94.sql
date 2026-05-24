
-- Enums
CREATE TYPE public.demand_priority AS ENUM ('baixa','media','alta','critica');
CREATE TYPE public.demand_status AS ENUM ('aberta','em-progresso','bloqueada','concluida','cancelada');
CREATE TYPE public.risk_level AS ENUM ('baixo','medio','alto','critico');
CREATE TYPE public.risk_impact AS ENUM ('baixo','medio','alto','critico');
CREATE TYPE public.risk_probability AS ENUM ('baixa','media','alta','muito-alta');
CREATE TYPE public.risk_status AS ENUM ('ativo','mitigado','encerrado');
CREATE TYPE public.delegation_status AS ENUM ('pendente','em-progresso','concluida','atrasada');
CREATE TYPE public.followup_status AS ENUM ('aberta','em-progresso','concluida');
CREATE TYPE public.app_role AS ENUM ('admin','coordenador','user');

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Profiles (linked to auth.users by id, no FK to auth schema)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  department TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles (separate table, no role on profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Workstreams
CREATE TABLE public.workstreams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Demands
CREATE TABLE public.demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  origin TEXT,
  workstream TEXT,
  responsible TEXT,
  priority public.demand_priority NOT NULL DEFAULT 'media',
  status public.demand_status NOT NULL DEFAULT 'aberta',
  due_date DATE,
  risk_level public.risk_level NOT NULL DEFAULT 'baixo',
  next_step TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER demands_updated BEFORE UPDATE ON public.demands FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Delegations
CREATE TABLE public.delegations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  responsible TEXT NOT NULL,
  deliverable TEXT NOT NULL,
  due_date DATE,
  last_update DATE,
  status public.delegation_status NOT NULL DEFAULT 'pendente',
  risk_level public.risk_level NOT NULL DEFAULT 'baixo',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER delegations_updated BEFORE UPDATE ON public.delegations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Risks
CREATE TABLE public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  impact public.risk_impact NOT NULL DEFAULT 'medio',
  probability public.risk_probability NOT NULL DEFAULT 'media',
  level public.risk_level NOT NULL DEFAULT 'medio',
  mitigation_plan TEXT,
  responsible TEXT,
  status public.risk_status NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER risks_updated BEFORE UPDATE ON public.risks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Meetings
CREATE TABLE public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  participants TEXT[] NOT NULL DEFAULT '{}',
  decisions TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER meetings_updated BEFORE UPDATE ON public.meetings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.pendencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  responsible TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Follow-ups
CREATE TABLE public.follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person TEXT NOT NULL,
  subject TEXT NOT NULL,
  last_interaction DATE,
  next_action TEXT,
  follow_up_date DATE,
  status public.followup_status NOT NULL DEFAULT 'aberta',
  priority public.demand_priority NOT NULL DEFAULT 'media',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER follow_ups_updated BEFORE UPDATE ON public.follow_ups FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workstreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delegations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- Public read for governance tables (auth will be added in next iteration)
CREATE POLICY "public read workstreams" ON public.workstreams FOR SELECT USING (true);
CREATE POLICY "public read demands" ON public.demands FOR SELECT USING (true);
CREATE POLICY "public read delegations" ON public.delegations FOR SELECT USING (true);
CREATE POLICY "public read risks" ON public.risks FOR SELECT USING (true);
CREATE POLICY "public read meetings" ON public.meetings FOR SELECT USING (true);
CREATE POLICY "public read pendencies" ON public.pendencies FOR SELECT USING (true);
CREATE POLICY "public read follow_ups" ON public.follow_ups FOR SELECT USING (true);

-- Writes: admins only (until auth is in place, effectively locked)
CREATE POLICY "admins write workstreams" ON public.workstreams FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins write demands" ON public.demands FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));
CREATE POLICY "admins write delegations" ON public.delegations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));
CREATE POLICY "admins write risks" ON public.risks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));
CREATE POLICY "admins write meetings" ON public.meetings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));
CREATE POLICY "admins write pendencies" ON public.pendencies FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));
CREATE POLICY "admins write follow_ups" ON public.follow_ups FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'coordenador'));

-- Profiles: each user sees and edits their own
CREATE POLICY "users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- User roles: only admins can manage; users can read their own
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
