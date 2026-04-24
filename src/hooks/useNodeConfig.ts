import { useMemo, useCallback } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import type { WorkflowNodeData } from '../types/workflow.types';
import type { Node } from '@xyflow/react';

export const useNodeConfig = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  const selectedNode: Node | null = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodes.find((n) => n.id === selectedNodeId) ?? null;
  }, [nodes, selectedNodeId]);

  const updateField = useCallback(
    (field: string, value: any) => {
      if (!selectedNodeId) return;
      updateNodeData(selectedNodeId, { [field]: value } as Partial<WorkflowNodeData>);
    },
    [selectedNodeId, updateNodeData]
  );

  const close = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const remove = useCallback(() => {
    if (!selectedNodeId) return;
    deleteNode(selectedNodeId);
  }, [selectedNodeId, deleteNode]);

  return { selectedNode, selectedNodeId, updateField, close, remove };
};
