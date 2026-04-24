import { supabase, isSupabaseConfigured } from './supabase';
import type {
  Workflow,
  WorkflowNode,
  WorkflowEdge,
  AutomationAction,
  SimulationResult,
  SimulationStep,
} from '../types/workflow.types';

// ─── Extended types for pages ──────────────────────────────────────

export interface WorkflowListItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived' | 'error';
  node_count: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationListItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  icon_color: string;
  icon_bg: string;
  params: string[];
}

export interface ExecutionLogItem {
  id: string;
  workflow_id: string;
  workflow_name: string;
  steps: SimulationStep[];
  status: 'success' | 'error' | 'pending' | 'running';
  duration_ms: number;
  created_at: string;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  description: string;
  actor: string;
  icon: string;
  icon_color: string;
  created_at: string;
}

export interface DashboardStats {
  totalWorkflows: number;
  activeWorkflows: number;
  failedRuns: number;
  pendingApprovals: number;
  recentWorkflows: WorkflowListItem[];
  activityLog: ActivityLogItem[];
}

// ─── Fallback data (used when Supabase is not configured) ──────────

const fallbackAutomations: AutomationListItem[] = [
  { id: 'send_email', label: 'Send Email', description: 'Automated outreach via SMTP or internal mailer.', icon: 'mail', icon_color: 'text-blue-400', icon_bg: 'bg-blue-500/10', params: ['to', 'subject', 'template_key'] },
  { id: 'generate_doc', label: 'Generate Document', description: 'Create dynamic PDF/Docx from employee data.', icon: 'description', icon_color: 'text-amber-400', icon_bg: 'bg-amber-500/10', params: ['template', 'recipient', 'doc_type'] },
  { id: 'slack_notify', label: 'Slack Notification', description: 'Notify channels about workflow status changes.', icon: 'chat', icon_color: 'text-pink-400', icon_bg: 'bg-pink-500/10', params: ['channel', 'message', 'webhook_url'] },
  { id: 'create_ticket', label: 'Create Ticket', description: 'Create a ticket in the issue tracking system.', icon: 'confirmation_number', icon_color: 'text-indigo-400', icon_bg: 'bg-indigo-500/10', params: ['title', 'priority', 'assignee'] },
  { id: 'update_record', label: 'Update Record', description: 'Direct mutations to the HCM database records.', icon: 'database', icon_color: 'text-indigo-400', icon_bg: 'bg-indigo-500/10', params: ['entry_uuid', 'patch_set'] },
  { id: 'ad_sync', label: 'AD Profile Sync', description: 'Synchronize employee profiles with Active Directory.', icon: 'sync', icon_color: 'text-cyan-400', icon_bg: 'bg-cyan-500/10', params: ['user_id', 'attributes'] },
  { id: 'calendar_sync', label: 'Calendar Sync', description: 'Sync leave/absence data with calendar systems.', icon: 'calendar_month', icon_color: 'text-emerald-400', icon_bg: 'bg-emerald-500/10', params: ['employee_id', 'event_type', 'date_range'] },
  { id: 'webhook_call', label: 'Webhook Call', description: 'Fire an HTTP webhook to an external service.', icon: 'webhook', icon_color: 'text-orange-400', icon_bg: 'bg-orange-500/10', params: ['url', 'method', 'payload'] },
];

const fallbackWorkflows: WorkflowListItem[] = [
  { id: 'wf-1', name: 'Employee Onboarding Flow', description: 'Complete multi-stage onboarding.', status: 'active', node_count: 6, created_at: new Date(Date.now() - 30 * 86400000).toISOString(), updated_at: new Date(Date.now() - 120000).toISOString() },
  { id: 'wf-2', name: 'Performance Review Pipeline', description: 'Annual review cycle.', status: 'draft', node_count: 4, created_at: new Date(Date.now() - 14 * 86400000).toISOString(), updated_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { id: 'wf-3', name: 'PTO Approval Logic', description: 'Leave request routing.', status: 'active', node_count: 5, created_at: new Date(Date.now() - 60 * 86400000).toISOString(), updated_at: new Date(Date.now() - 50400000).toISOString() },
  { id: 'wf-4', name: 'ID Card Auto-Issue', description: 'Automated ID card generation.', status: 'error', node_count: 3, created_at: new Date(Date.now() - 90 * 86400000).toISOString(), updated_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'wf-5', name: 'Benefits Enrollment', description: 'Annual benefits selection workflow.', status: 'active', node_count: 7, created_at: new Date(Date.now() - 45 * 86400000).toISOString(), updated_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'wf-6', name: 'Contract Generation', description: 'Auto-generate employment contracts.', status: 'active', node_count: 4, created_at: new Date(Date.now() - 20 * 86400000).toISOString(), updated_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'wf-7', name: 'Offboarding Exit Interview', description: 'Exit interview scheduling.', status: 'draft', node_count: 5, created_at: new Date(Date.now() - 7 * 86400000).toISOString(), updated_at: new Date(Date.now() - 21600000).toISOString() },
  { id: 'wf-8', name: 'Payroll Verification', description: 'Monthly payroll data validation.', status: 'active', node_count: 6, created_at: new Date(Date.now() - 120 * 86400000).toISOString(), updated_at: new Date(Date.now() - 300000).toISOString() },
];

const fallbackExecutionLogs: ExecutionLogItem[] = [
  { id: 'log-1', workflow_id: 'wf-1', workflow_name: 'Employee Onboarding Flow', steps: [], status: 'success', duration_ms: 1200, created_at: new Date(Date.now() - 120000).toISOString() },
  { id: 'log-2', workflow_id: 'wf-8', workflow_name: 'Payroll Verification', steps: [], status: 'running', duration_ms: 0, created_at: new Date(Date.now() - 300000).toISOString() },
  { id: 'log-3', workflow_id: 'wf-4', workflow_name: 'ID Card Auto-Issue', steps: [], status: 'error', duration_ms: 4500, created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'log-4', workflow_id: 'wf-5', workflow_name: 'Benefits Enrollment', steps: [], status: 'success', duration_ms: 800, created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'log-5', workflow_id: 'wf-6', workflow_name: 'Contract Generation', steps: [], status: 'success', duration_ms: 2400, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'log-6', workflow_id: 'wf-3', workflow_name: 'PTO Approval Logic', steps: [], status: 'success', duration_ms: 950, created_at: new Date(Date.now() - 50400000).toISOString() },
  { id: 'log-7', workflow_id: 'wf-9', workflow_name: 'Training Compliance Tracker', steps: [], status: 'success', duration_ms: 600, created_at: new Date(Date.now() - 10800000).toISOString() },
];

const fallbackActivity: ActivityLogItem[] = [
  { id: 'a1', action: 'Modified Workflow', description: 'Updated node "Slack_Invite_Trigger" in Employee Onboarding Flow', actor: 'Alex Rivera', icon: 'edit_note', icon_color: 'text-violet-400', created_at: new Date(Date.now() - 720000).toISOString() },
  { id: 'a2', action: 'Approved Request', description: 'Auto-approved vacation request for EMP-0922', actor: 'Auto-system', icon: 'check_circle', icon_color: 'text-green-400', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'a3', action: 'Execution Warning', description: 'API Latency detected on Jira Integration connector', actor: 'System Log', icon: 'warning', icon_color: 'text-amber-400', created_at: new Date(Date.now() - 10800000).toISOString() },
  { id: 'a4', action: 'Created Template', description: 'New template: "Offboarding Exit Interview"', actor: 'Sarah Chen', icon: 'add_circle', icon_color: 'text-violet-400', created_at: new Date(Date.now() - 21600000).toISOString() },
];

// ─── Automations ───────────────────────────────────────────────────

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
  const items = await fetchAutomationsFull();
  return items.map((a) => ({ id: a.id, label: a.label, params: a.params }));
};

export const fetchAutomationsFull = async (): Promise<AutomationListItem[]> => {
  if (!isSupabaseConfigured()) return fallbackAutomations;

  const { data, error } = await supabase.from('automations').select('*');
  if (error) {
    console.error('Error fetching automations:', error);
    return fallbackAutomations;
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    label: row.label,
    description: row.description ?? '',
    icon: row.icon ?? 'bolt',
    icon_color: row.icon_color ?? 'text-violet-400',
    icon_bg: row.icon_bg ?? 'bg-violet-500/10',
    params: row.params ?? [],
  }));
};

// ─── Workflow CRUD ─────────────────────────────────────────────────

export const saveWorkflow = async (workflow: Workflow): Promise<Workflow> => {
  if (!isSupabaseConfigured()) {
    console.log('[mock] Workflow saved:', workflow);
    return workflow;
  }

  const { error: metaError } = await supabase
    .from('workflows')
    .upsert({
      id: workflow.id,
      name: workflow.name,
      description: workflow.description ?? '',
      node_count: workflow.nodes.length,
      updated_at: new Date().toISOString(),
    });
  if (metaError) throw metaError;

  await supabase.from('workflow_nodes').delete().eq('workflow_id', workflow.id);
  await supabase.from('workflow_edges').delete().eq('workflow_id', workflow.id);

  if (workflow.nodes.length > 0) {
    const nodeRows = workflow.nodes.map((n) => ({
      id: n.id, workflow_id: workflow.id, type: n.type,
      position_x: n.position.x, position_y: n.position.y, data: n.data,
    }));
    const { error: nodesErr } = await supabase.from('workflow_nodes').insert(nodeRows);
    if (nodesErr) throw nodesErr;
  }

  if (workflow.edges.length > 0) {
    const edgeRows = workflow.edges.map((e) => ({
      id: e.id, workflow_id: workflow.id, source: e.source, target: e.target,
    }));
    const { error: edgesErr } = await supabase.from('workflow_edges').insert(edgeRows);
    if (edgesErr) throw edgesErr;
  }

  return workflow;
};

export const loadWorkflow = async (workflowId: string): Promise<Workflow | null> => {
  if (!isSupabaseConfigured()) return null;

  const { data: meta, error: metaErr } = await supabase
    .from('workflows').select('*').eq('id', workflowId).single();
  if (metaErr || !meta) return null;

  const { data: nodesRaw } = await supabase.from('workflow_nodes').select('*').eq('workflow_id', workflowId);
  const { data: edgesRaw } = await supabase.from('workflow_edges').select('*').eq('workflow_id', workflowId);

  const nodes: WorkflowNode[] = (nodesRaw ?? []).map((r: any) => ({
    id: r.id, type: r.type, position: { x: r.position_x, y: r.position_y }, data: r.data,
  }));
  const edges: WorkflowEdge[] = (edgesRaw ?? []).map((r: any) => ({
    id: r.id, source: r.source, target: r.target,
  }));

  return {
    id: meta.id, name: meta.name, description: meta.description,
    nodes, edges, created_at: meta.created_at, updated_at: meta.updated_at,
  };
};

export const listWorkflows = async (): Promise<WorkflowListItem[]> => {
  if (!isSupabaseConfigured()) return fallbackWorkflows;

  const { data, error } = await supabase
    .from('workflows').select('*').order('updated_at', { ascending: false });
  if (error) {
    console.error('Error listing workflows:', error);
    return fallbackWorkflows;
  }

  return (data ?? []).map((row: any) => ({
    id: row.id, name: row.name, description: row.description ?? '',
    status: row.status ?? 'draft', node_count: row.node_count ?? 0,
    created_at: row.created_at, updated_at: row.updated_at,
  }));
};

export const deleteWorkflow = async (workflowId: string): Promise<void> => {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from('workflows').delete().eq('id', workflowId);
  if (error) throw error;
};

export const createWorkflow = async (name: string, description: string = ''): Promise<WorkflowListItem> => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  if (!isSupabaseConfigured()) {
    return { id, name, description, status: 'draft', node_count: 0, created_at: now, updated_at: now };
  }

  const { data, error } = await supabase
    .from('workflows')
    .insert({ id, name, description, status: 'draft', node_count: 0 })
    .select()
    .single();
  if (error) throw error;

  return {
    id: data.id, name: data.name, description: data.description ?? '',
    status: data.status, node_count: data.node_count,
    created_at: data.created_at, updated_at: data.updated_at,
  };
};

// ─── Simulation / Execution Logs ──────────────────────────────────

export const saveSimulationResult = async (result: SimulationResult): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('[mock] Simulation result saved:', result);
    return;
  }
  const { error } = await supabase.from('simulation_logs').insert({
    workflow_id: result.workflow_id, steps: result.steps, status: result.status,
  });
  if (error) throw error;
};

export const loadSimulationLogs = async (workflowId: string): Promise<SimulationResult[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('simulation_logs').select('*').eq('workflow_id', workflowId)
    .order('created_at', { ascending: false }).limit(20);
  if (error) { console.error('Error loading simulation logs:', error); return []; }

  return (data ?? []).map((row: any) => ({
    id: row.id, workflow_id: row.workflow_id,
    steps: row.steps as SimulationStep[], status: row.status, created_at: row.created_at,
  }));
};

export const fetchExecutionLogs = async (): Promise<ExecutionLogItem[]> => {
  if (!isSupabaseConfigured()) return fallbackExecutionLogs;

  const { data, error } = await supabase
    .from('simulation_logs').select('*')
    .order('created_at', { ascending: false }).limit(50);
  if (error) {
    console.error('Error fetching execution logs:', error);
    return fallbackExecutionLogs;
  }

  return (data ?? []).map((row: any) => ({
    id: row.id, workflow_id: row.workflow_id,
    workflow_name: row.workflow_name ?? 'Unknown',
    steps: row.steps ?? [], status: row.status,
    duration_ms: row.duration_ms ?? 0, created_at: row.created_at,
  }));
};

// ─── Activity Log ─────────────────────────────────────────────────

export const fetchActivityLog = async (limit = 10): Promise<ActivityLogItem[]> => {
  if (!isSupabaseConfigured()) return fallbackActivity;

  const { data, error } = await supabase
    .from('activity_log').select('*')
    .order('created_at', { ascending: false }).limit(limit);
  if (error) {
    console.error('Error fetching activity log:', error);
    return fallbackActivity;
  }

  return (data ?? []).map((row: any) => ({
    id: row.id, action: row.action, description: row.description ?? '',
    actor: row.actor ?? 'System', icon: row.icon ?? 'info',
    icon_color: row.icon_color ?? 'text-violet-400', created_at: row.created_at,
  }));
};

// ─── Dashboard Stats ──────────────────────────────────────────────

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  if (!isSupabaseConfigured()) {
    const workflows = fallbackWorkflows;
    return {
      totalWorkflows: workflows.length,
      activeWorkflows: workflows.filter((w) => w.status === 'active').length,
      failedRuns: fallbackExecutionLogs.filter((l) => l.status === 'error').length,
      pendingApprovals: 5,
      recentWorkflows: workflows.slice(0, 5),
      activityLog: fallbackActivity,
    };
  }

  const [workflowsRes, logsRes, activityRes] = await Promise.all([
    supabase.from('workflows').select('*').order('updated_at', { ascending: false }),
    supabase.from('simulation_logs').select('status'),
    supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(6),
  ]);

  const workflows: WorkflowListItem[] = (workflowsRes.data ?? []).map((r: any) => ({
    id: r.id, name: r.name, description: r.description ?? '',
    status: r.status ?? 'draft', node_count: r.node_count ?? 0,
    created_at: r.created_at, updated_at: r.updated_at,
  }));

  const logStatuses = (logsRes.data ?? []).map((r: any) => r.status);
  const activity: ActivityLogItem[] = (activityRes.data ?? []).map((r: any) => ({
    id: r.id, action: r.action, description: r.description ?? '',
    actor: r.actor ?? 'System', icon: r.icon ?? 'info',
    icon_color: r.icon_color ?? 'text-violet-400', created_at: r.created_at,
  }));

  return {
    totalWorkflows: workflows.length,
    activeWorkflows: workflows.filter((w) => w.status === 'active').length,
    failedRuns: logStatuses.filter((s: string) => s === 'error').length,
    pendingApprovals: workflows.filter((w) => w.status === 'draft').length,
    recentWorkflows: workflows.slice(0, 5),
    activityLog: activity,
  };
};
