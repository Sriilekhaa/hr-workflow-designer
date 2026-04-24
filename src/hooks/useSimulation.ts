import { useCallback } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { validateWorkflow } from '../utils/validators';
import { runSimulation } from '../services/simulationEngine';
import { saveSimulationResult } from '../services/api';
import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';
import type { Node, Edge } from '@xyflow/react';

const toWorkflowNodes = (nodes: Node[]): WorkflowNode[] =>
  nodes.map((n) => ({
    id: n.id,
    type: n.type as any,
    position: n.position,
    data: n.data as any,
  }));

const toWorkflowEdges = (edges: Edge[]): WorkflowEdge[] =>
  edges.map((e) => ({
    id: e.id!,
    source: e.source,
    target: e.target,
  }));

export const useSimulation = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const workflowMeta = useWorkflowStore((s) => s.workflowMeta);
  const setValidationErrors = useWorkflowStore((s) => s.setValidationErrors);
  const clearValidationErrors = useWorkflowStore((s) => s.clearValidationErrors);
  const setSimulationSteps = useWorkflowStore((s) => s.setSimulationSteps);
  const setIsSimulating = useWorkflowStore((s) => s.setIsSimulating);
  const setShowSimulationPanel = useWorkflowStore((s) => s.setShowSimulationPanel);
  const clearSimulation = useWorkflowStore((s) => s.clearSimulation);

  const validate = useCallback(() => {
    const wNodes = toWorkflowNodes(nodes);
    const wEdges = toWorkflowEdges(edges);
    const errors = validateWorkflow(wNodes, wEdges);
    setValidationErrors(errors);
    return errors;
  }, [nodes, edges, setValidationErrors]);

  const simulate = useCallback(async () => {
    clearSimulation();
    clearValidationErrors();

    const errors = validate();
    if (errors.length > 0) {
      setShowSimulationPanel(true);
      return;
    }

    setIsSimulating(true);
    setShowSimulationPanel(true);

    const wNodes = toWorkflowNodes(nodes);
    const wEdges = toWorkflowEdges(edges);

    const result = await runSimulation(wNodes, wEdges, workflowMeta.id);
    setSimulationSteps(result.steps);
    setIsSimulating(false);

    // Save to Supabase
    try {
      await saveSimulationResult(result);
    } catch (err) {
      console.error('Failed to save simulation result:', err);
    }
  }, [
    nodes, edges, workflowMeta.id, validate,
    clearSimulation, clearValidationErrors, setIsSimulating,
    setShowSimulationPanel, setSimulationSteps,
  ]);

  return { validate, simulate };
};
