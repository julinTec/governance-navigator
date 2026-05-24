export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

export type DemandStatus = 'aberta' | 'em-progresso' | 'bloqueada' | 'concluida' | 'cancelada';
export type DemandPriority = 'baixa' | 'media' | 'alta' | 'critica';
export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

export interface Demand {
  id: string;
  title: string;
  description?: string;
  origin: string;
  workstream: string;
  responsible: string;
  priority: DemandPriority;
  status: DemandStatus;
  dueDate: string;
  riskLevel: RiskLevel;
  nextStep?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Delegation {
  id: string;
  responsible: string;
  deliverable: string;
  dueDate: string;
  lastUpdate: string;
  status: 'pendente' | 'em-progresso' | 'concluida' | 'atrasada';
  riskLevel: RiskLevel;
  notes?: string;
}

export interface Risk {
  id: string;
  description: string;
  impact: 'baixo' | 'medio' | 'alto' | 'critico';
  probability: 'baixa' | 'media' | 'alta' | 'muito-alta';
  level: RiskLevel;
  mitigationPlan: string;
  responsible: string;
  status: 'ativo' | 'mitigado' | 'encerrado';
  createdAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  decisions: string[];
  pendencies: Pendency[];
  notes?: string;
  createdAt: string;
}

export interface Pendency {
  id: string;
  description: string;
  responsible: string;
  dueDate: string;
}

export interface FollowUp {
  id: string;
  person: string;
  subject: string;
  lastInteraction: string;
  nextAction: string;
  followUpDate: string;
  status: 'aberta' | 'em-progresso' | 'concluida';
  priority: DemandPriority;
}

export interface Workstream {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface Config {
  workstreams: Workstream[];
  users: UserProfile[];
  priorities: string[];
  statuses: string[];
  riskLevels: string[];
}
