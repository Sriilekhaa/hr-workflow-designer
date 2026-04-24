import type { WorkflowNode, WorkflowEdge, ValidationError, WorkflowNodeType } from '../types/workflow.types';
import type { StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedNodeData, EndNodeData } from '../types/workflow.types';
import { findEndNodes, getDisconnectedNodes, detectCycle } from './graph';

export const validateWorkflow = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (nodes.length === 0) {
    errors.push({ message: 'Workflow has no nodes.' });
    return errors;
  }

  // Exactly 1 start node
  const startNodes = nodes.filter((n) => n.type === 'startNode');
  if (startNodes.length === 0) {
    errors.push({ message: 'Workflow must have exactly 1 Start node.' });
  } else if (startNodes.length > 1) {
    startNodes.slice(1).forEach((n) =>
      errors.push({ nodeId: n.id, message: 'Multiple Start nodes detected. Only 1 is allowed.' })
    );
  }

  // At least 1 end node
  const endNodes = findEndNodes(nodes);
  if (endNodes.length === 0) {
    errors.push({ message: 'Workflow must have at least 1 End node.' });
  }

  // No disconnected nodes
  const disconnected = getDisconnectedNodes(nodes, edges);
  for (const nodeId of disconnected) {
    errors.push({ nodeId, message: 'Node is disconnected from the workflow.' });
  }

  // No cycles
  if (detectCycle(nodes, edges)) {
    errors.push({ message: 'Workflow contains a cycle. Cycles are not allowed.' });
  }

  // Validate required fields per node type
  for (const node of nodes) {
    const fieldErrors = validateNodeFields(node);
    errors.push(...fieldErrors);
  }

  return errors;
};

const validateNodeFields = (node: WorkflowNode): ValidationError[] => {
  const errors: ValidationError[] = [];
  const data = node.data;

  switch (node.type as WorkflowNodeType) {
    case 'startNode': {
      const d = data as StartNodeData;
      if (!d.title || d.title.trim() === '') {
        errors.push({ nodeId: node.id, message: 'Start node must have a title.' });
      }
      break;
    }
    case 'taskNode': {
      const d = data as TaskNodeData;
      if (!d.title || d.title.trim() === '') {
        errors.push({ nodeId: node.id, message: 'Task node must have a title.' });
      }
      break;
    }
    case 'approvalNode': {
      const d = data as ApprovalNodeData;
      if (!d.title || d.title.trim() === '') {
        errors.push({ nodeId: node.id, message: 'Approval node must have a title.' });
      }
      break;
    }
    case 'automatedNode': {
      const d = data as AutomatedNodeData;
      if (!d.title || d.title.trim() === '') {
        errors.push({ nodeId: node.id, message: 'Automated node must have a title.' });
      }
      if (!d.actionId) {
        errors.push({ nodeId: node.id, message: 'Automated node must have an action selected.' });
      }
      break;
    }
    case 'endNode': {
      const d = data as EndNodeData;
      if (!d.message || d.message.trim() === '') {
        errors.push({ nodeId: node.id, message: 'End node must have a message.' });
      }
      break;
    }
  }

  return errors;
};
