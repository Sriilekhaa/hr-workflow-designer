import React, { useCallback, useRef, useMemo } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  type Connection,
  type Node,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from '../nodes/CustomNodes';
import { useWorkflowStore } from '../../store/workflowStore';
import type { WorkflowNodeType } from '../../types/workflow.types';
import { createDefaultNodeData } from '../../types/workflow.types';

const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};

let _canvasNodeId = 200;
const generateCanvasNodeId = () => `node_${_canvasNodeId++}`;

const WorkflowCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Single source of truth: Zustand store
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setNodes = useWorkflowStore((s) => s.setNodes);
  const setEdges = useWorkflowStore((s) => s.setEdges);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);
  const pushUndo = useWorkflowStore((s) => s.pushUndo);
  const validationErrors = useWorkflowStore((s) => s.validationErrors);

  // Apply React Flow changes directly to the Zustand store
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes) as Node[]);
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      pushUndo();
      const newEdges = addEdge(
        { ...params, animated: true, style: { stroke: '#494454' } },
        edges
      );
      setEdges(newEdges);
    },
    [edges, setEdges, pushUndo]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as WorkflowNodeType;
      if (!type) return;

      if (reactFlowWrapper.current) {
        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };

        const data = createDefaultNodeData(type);
        const newNode: Node = {
          id: generateCanvasNodeId(),
          type,
          position,
          data: data as any,
        };

        pushUndo();
        setNodes([...nodes, newNode]);
      }
    },
    [nodes, setNodes, pushUndo]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // Highlight nodes with validation errors
  const errorNodeIds = useMemo(
    () => new Set(validationErrors.filter((e) => e.nodeId).map((e) => e.nodeId!)),
    [validationErrors]
  );

  const styledNodes = useMemo(
    () =>
      nodes.map((n) =>
        errorNodeIds.has(n.id)
          ? { ...n, style: { ...n.style, boxShadow: '0 0 12px rgba(244,63,94,0.5)', borderRadius: '12px' } }
          : n
      ),
    [nodes, errorNodeIds]
  );

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#0b0e14]"
      >
        <Background color="#333" gap={24} size={1} />
        <Controls className="!bg-[#252932] !border-white/10 !fill-gray-400" />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
