import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';
import type {
  WorkflowMeta,
  WorkflowNodeType,
  WorkflowNodeData,
  ValidationError,
  SimulationStep,
} from '../types/workflow.types';
import { createDefaultNodeData } from '../types/workflow.types';

// ─── Undo/Redo snapshot ────────────────────────────────────────────

interface HistorySnapshot {
  nodes: Node[];
  edges: Edge[];
}

// ─── Store shape ───────────────────────────────────────────────────

interface WorkflowState {
  // Canvas state
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  workflowMeta: WorkflowMeta;

  // Validation
  validationErrors: ValidationError[];

  // Simulation
  simulationSteps: SimulationStep[];
  isSimulating: boolean;
  showSimulationPanel: boolean;

  // Undo / Redo
  undoStack: HistorySnapshot[];
  redoStack: HistorySnapshot[];

  // Actions — canvas
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: WorkflowNodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;
  connectNodes: (edge: Edge) => void;
  setSelectedNode: (id: string | null) => void;
  setWorkflowMeta: (meta: Partial<WorkflowMeta>) => void;

  // Validation
  setValidationErrors: (errors: ValidationError[]) => void;
  clearValidationErrors: () => void;

  // Simulation
  setSimulationSteps: (steps: SimulationStep[]) => void;
  addSimulationStep: (step: SimulationStep) => void;
  setIsSimulating: (value: boolean) => void;
  setShowSimulationPanel: (value: boolean) => void;
  clearSimulation: () => void;

  // Undo / Redo
  pushUndo: () => void;
  undo: () => void;
  redo: () => void;
}

let _nodeIdCounter = 100;
const generateId = () => `node_${_nodeIdCounter++}`;

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  workflowMeta: { id: crypto.randomUUID(), name: 'Untitled Workflow' },

  validationErrors: [],
  simulationSteps: [],
  isSimulating: false,
  showSimulationPanel: false,

  undoStack: [],
  redoStack: [],

  // ─── Canvas actions ─────────────────────────────────────────────

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (type, position) => {
    const id = generateId();
    const data = createDefaultNodeData(type);
    const newNode: Node = { id, type, position, data: data as any };
    get().pushUndo();
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  updateNodeData: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
    }));
  },

  deleteNode: (id) => {
    get().pushUndo();
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  connectNodes: (edge) => {
    get().pushUndo();
    set((state) => ({ edges: [...state.edges, edge] }));
  },

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  setWorkflowMeta: (meta) =>
    set((state) => ({ workflowMeta: { ...state.workflowMeta, ...meta } })),

  // ─── Validation ─────────────────────────────────────────────────

  setValidationErrors: (errors) => set({ validationErrors: errors }),
  clearValidationErrors: () => set({ validationErrors: [] }),

  // ─── Simulation ─────────────────────────────────────────────────

  setSimulationSteps: (steps) => set({ simulationSteps: steps }),
  addSimulationStep: (step) =>
    set((state) => ({ simulationSteps: [...state.simulationSteps, step] })),
  setIsSimulating: (value) => set({ isSimulating: value }),
  setShowSimulationPanel: (value) => set({ showSimulationPanel: value }),
  clearSimulation: () => set({ simulationSteps: [], isSimulating: false }),

  // ─── Undo / Redo ───────────────────────────────────────────────

  pushUndo: () => {
    const { nodes, edges, undoStack } = get();
    const snapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };
    set({ undoStack: [...undoStack, snapshot], redoStack: [] });
  },

  undo: () => {
    const { undoStack, nodes, edges } = get();
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    const currentSnapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };
    set((state) => ({
      nodes: prev.nodes,
      edges: prev.edges,
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, currentSnapshot],
    }));
  },

  redo: () => {
    const { redoStack, nodes, edges } = get();
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const currentSnapshot: HistorySnapshot = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
    };
    set((state) => ({
      nodes: next.nodes,
      edges: next.edges,
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack, currentSnapshot],
    }));
  },
}));
