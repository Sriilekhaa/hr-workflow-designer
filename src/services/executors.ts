import type {
  WorkflowNode,
  SimulationStep,
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData,
} from '../types/workflow.types';

export const executeStartNode = async (node: WorkflowNode): Promise<SimulationStep> => {
  const data = node.data as StartNodeData;
  return {
    nodeId: node.id,
    step: `Start: ${data.title}`,
    status: 'success',
    message: 'Workflow initialized.',
    timestamp: Date.now(),
  };
};

export const executeTaskNode = async (node: WorkflowNode): Promise<SimulationStep> => {
  const data = node.data as TaskNodeData;
  return {
    nodeId: node.id,
    step: `Task: ${data.title}`,
    status: 'success',
    message: data.assignee ? `Assigned to ${data.assignee}. Task completed.` : 'Task completed (no assignee).',
    timestamp: Date.now(),
  };
};

export const executeApprovalNode = async (node: WorkflowNode): Promise<SimulationStep> => {
  const data = node.data as ApprovalNodeData;
  const threshold = data.autoApproveThreshold ?? 0;
  const randomScore = Math.random() * 100;

  if (threshold > 0 && randomScore <= threshold) {
    return {
      nodeId: node.id,
      step: `Approval: ${data.title}`,
      status: 'success',
      message: `Auto-approved (score ${randomScore.toFixed(0)} ≤ threshold ${threshold}).`,
      timestamp: Date.now(),
    };
  }

  return {
    nodeId: node.id,
    step: `Approval: ${data.title}`,
    status: 'success',
    message: `Approved by ${data.approverRole || 'reviewer'}.`,
    timestamp: Date.now(),
  };
};

export const executeAutomatedNode = async (node: WorkflowNode): Promise<SimulationStep> => {
  const data = node.data as AutomatedNodeData;

  if (!data.actionId) {
    return {
      nodeId: node.id,
      step: `Automated: ${data.title}`,
      status: 'error',
      message: 'No action configured.',
      timestamp: Date.now(),
    };
  }

  return {
    nodeId: node.id,
    step: `Automated: ${data.title}`,
    status: 'success',
    message: `Executed action '${data.actionId}' with params: ${JSON.stringify(data.params)}.`,
    timestamp: Date.now(),
  };
};

export const executeEndNode = async (node: WorkflowNode): Promise<SimulationStep> => {
  const data = node.data as EndNodeData;
  return {
    nodeId: node.id,
    step: `End: ${data.message || 'Complete'}`,
    status: 'success',
    message: data.summary ? 'Workflow finalized with summary.' : 'Workflow finalized.',
    timestamp: Date.now(),
  };
};
