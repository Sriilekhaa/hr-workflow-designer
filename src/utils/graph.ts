import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';

export type AdjacencyList = Map<string, string[]>;

export const buildAdjacencyList = (edges: WorkflowEdge[]): AdjacencyList => {
  const adj: AdjacencyList = new Map();
  for (const edge of edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    adj.get(edge.source)!.push(edge.target);
  }
  return adj;
};

export const buildReverseAdjacencyList = (edges: WorkflowEdge[]): AdjacencyList => {
  const adj: AdjacencyList = new Map();
  for (const edge of edges) {
    if (!adj.has(edge.target)) adj.set(edge.target, []);
    adj.get(edge.target)!.push(edge.source);
  }
  return adj;
};

export const findStartNode = (nodes: WorkflowNode[]): WorkflowNode | undefined => {
  return nodes.find((n) => n.type === 'startNode');
};

export const findEndNodes = (nodes: WorkflowNode[]): WorkflowNode[] => {
  return nodes.filter((n) => n.type === 'endNode');
};

export const detectCycle = (nodes: WorkflowNode[], edges: WorkflowEdge[]): boolean => {
  const adj = buildAdjacencyList(edges);
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map<string, number>();

  for (const node of nodes) {
    color.set(node.id, WHITE);
  }

  const dfs = (nodeId: string): boolean => {
    color.set(nodeId, GRAY);
    const neighbors = adj.get(nodeId) ?? [];
    for (const neighbor of neighbors) {
      if (color.get(neighbor) === GRAY) return true;
      if (color.get(neighbor) === WHITE && dfs(neighbor)) return true;
    }
    color.set(nodeId, BLACK);
    return false;
  };

  for (const node of nodes) {
    if (color.get(node.id) === WHITE) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
};

export const topologicalSort = (nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] => {
  const adj = buildAdjacencyList(edges);
  const visited = new Set<string>();
  const stack: string[] = [];

  const dfs = (nodeId: string) => {
    visited.add(nodeId);
    const neighbors = adj.get(nodeId) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    stack.push(nodeId);
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id);
    }
  }

  return stack.reverse();
};

export const getDisconnectedNodes = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): string[] => {
  const connectedIds = new Set<string>();
  for (const edge of edges) {
    connectedIds.add(edge.source);
    connectedIds.add(edge.target);
  }

  // Single node graphs with start are valid
  if (nodes.length === 1) return [];

  return nodes
    .filter((n) => !connectedIds.has(n.id))
    .map((n) => n.id);
};

export const bfsTraversal = (
  startNodeId: string,
  adj: AdjacencyList
): string[] => {
  const visited = new Set<string>();
  const queue: string[] = [startNodeId];
  const order: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    order.push(current);
    const neighbors = adj.get(current) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return order;
};
