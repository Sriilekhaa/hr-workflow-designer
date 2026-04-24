import type {
  WorkflowNode,
  WorkflowEdge,
  SimulationResult,
  WorkflowNodeType,
} from '../types/workflow.types';
import { buildAdjacencyList, bfsTraversal, findStartNode } from '../utils/graph';
import {
  executeStartNode,
  executeTaskNode,
  executeApprovalNode,
  executeAutomatedNode,
  executeEndNode,
} from './executors';

// ─── Executor map (avoids circular dep with nodeRegistry) ──────────

const executorMap: Record<WorkflowNodeType, (node: WorkflowNode) => Promise<any>> = {
  startNode: executeStartNode,
  taskNode: executeTaskNode,
  approvalNode: executeApprovalNode,
  automatedNode: executeAutomatedNode,
  endNode: executeEndNode,
};

export const runSimulation = async (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  workflowId: string
): Promise<SimulationResult> => {
  const steps = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const adj = buildAdjacencyList(edges);

  const start = findStartNode(nodes);
  if (!start) {
    return {
      workflow_id: workflowId,
      steps: [{ nodeId: '', step: 'Error', status: 'error' as const, message: 'No Start node found.', timestamp: Date.now() }],
      status: 'error',
    };
  }

  const traversalOrder = bfsTraversal(start.id, adj);

  for (const nodeId of traversalOrder) {
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    const executor = executorMap[node.type as WorkflowNodeType];
    if (executor) {
      const step = await executor(node);
      steps.push(step);
    } else {
      steps.push({
        nodeId: node.id,
        step: `Unknown: ${node.id}`,
        status: 'error' as const,
        message: `No executor for type '${node.type}'`,
        timestamp: Date.now(),
      });
    }

    // Simulate async delay for realism
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const hasError = steps.some((s) => s.status === 'error');

  return {
    workflow_id: workflowId,
    steps,
    status: hasError ? 'error' : 'success',
  };
};
