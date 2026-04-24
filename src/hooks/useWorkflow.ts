import { useCallback } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { saveWorkflow, loadWorkflow } from '../services/api';
import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';
import type { Node, Edge } from '@xyflow/react';

export const useWorkflow = () => {
  const store = useWorkflowStore();

  const save = useCallback(async () => {
    const workflowNodes: WorkflowNode[] = store.nodes.map((n: Node) => ({
      id: n.id,
      type: n.type as any,
      position: n.position,
      data: n.data as any,
    }));

    const workflowEdges: WorkflowEdge[] = store.edges.map((e: Edge) => ({
      id: e.id!,
      source: e.source,
      target: e.target,
    }));

    await saveWorkflow({
      id: store.workflowMeta.id,
      name: store.workflowMeta.name,
      description: store.workflowMeta.description,
      nodes: workflowNodes,
      edges: workflowEdges,
    });
  }, [store.nodes, store.edges, store.workflowMeta]);

  const load = useCallback(async (workflowId: string) => {
    const workflow = await loadWorkflow(workflowId);
    if (!workflow) return;

    const rfNodes: Node[] = workflow.nodes.map((n) => ({
      id: n.id,
      type: n.type,
      position: n.position,
      data: n.data as any,
    }));

    const rfEdges: Edge[] = workflow.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: '#494454' },
    }));

    store.setNodes(rfNodes);
    store.setEdges(rfEdges);
    store.setWorkflowMeta({ id: workflow.id, name: workflow.name, description: workflow.description });
  }, [store]);

  const exportJSON = useCallback(() => {
    const workflowNodes: WorkflowNode[] = store.nodes.map((n: Node) => ({
      id: n.id,
      type: n.type as any,
      position: n.position,
      data: n.data as any,
    }));

    const workflowEdges: WorkflowEdge[] = store.edges.map((e: Edge) => ({
      id: e.id!,
      source: e.source,
      target: e.target,
    }));

    const json = JSON.stringify({
      id: store.workflowMeta.id,
      name: store.workflowMeta.name,
      nodes: workflowNodes,
      edges: workflowEdges,
    }, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${store.workflowMeta.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [store.nodes, store.edges, store.workflowMeta]);

  const importJSON = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workflow = JSON.parse(e.target?.result as string);
        const rfNodes: Node[] = (workflow.nodes ?? []).map((n: any) => ({
          id: n.id,
          type: n.type,
          position: n.position,
          data: n.data,
        }));
        const rfEdges: Edge[] = (workflow.edges ?? []).map((e: any) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          animated: true,
          style: { stroke: '#494454' },
        }));
        store.setNodes(rfNodes);
        store.setEdges(rfEdges);
        if (workflow.name) store.setWorkflowMeta({ name: workflow.name });
        if (workflow.id) store.setWorkflowMeta({ id: workflow.id });
      } catch {
        console.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }, [store]);

  return { save, load, exportJSON, importJSON };
};
