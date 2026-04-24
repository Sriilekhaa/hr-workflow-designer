// ─── Node Data Types ───────────────────────────────────────────────

export interface StartNodeData {
  title: string;
  metadata: Record<string, string>;
}

export interface TaskNodeData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData {
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedNodeData {
  title: string;
  actionId: string;
  params: Record<string, any>;
}

export interface EndNodeData {
  message: string;
  summary: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

// ─── Node Types ────────────────────────────────────────────────────

export type WorkflowNodeType = 'startNode' | 'taskNode' | 'approvalNode' | 'automatedNode' | 'endNode';

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

// ─── Workflow ──────────────────────────────────────────────────────

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  created_at?: string;
  updated_at?: string;
}

// ─── Automation ────────────────────────────────────────────────────

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

// ─── Validation ────────────────────────────────────────────────────

export interface ValidationError {
  nodeId?: string;
  message: string;
}

// ─── Simulation ────────────────────────────────────────────────────

export type SimulationStepStatus = 'success' | 'error' | 'skipped' | 'pending' | 'running';

export interface SimulationStep {
  nodeId: string;
  step: string;
  status: SimulationStepStatus;
  message?: string;
  timestamp: number;
}

export interface SimulationResult {
  id?: string;
  workflow_id: string;
  steps: SimulationStep[];
  status: 'success' | 'error' | 'pending';
  created_at?: string;
}

// ─── Store ─────────────────────────────────────────────────────────

export interface WorkflowMeta {
  id: string;
  name: string;
  description?: string;
}

// ─── Default data factories ────────────────────────────────────────

export const createDefaultNodeData = (type: WorkflowNodeType): WorkflowNodeData => {
  switch (type) {
    case 'startNode':
      return { title: 'Start', metadata: {} } satisfies StartNodeData;
    case 'taskNode':
      return { title: 'New Task', description: '', assignee: '', dueDate: '', customFields: {} } satisfies TaskNodeData;
    case 'approvalNode':
      return { title: 'Approval', approverRole: '', autoApproveThreshold: 0 } satisfies ApprovalNodeData;
    case 'automatedNode':
      return { title: 'Automated Step', actionId: '', params: {} } satisfies AutomatedNodeData;
    case 'endNode':
      return { message: 'Flow Complete', summary: false } satisfies EndNodeData;
  }
};
