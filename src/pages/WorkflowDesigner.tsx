import React, { useCallback, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import WorkflowCanvas from '../components/canvas/WorkflowCanvas';
import NodeFormPanel from '../components/forms/NodeFormPanel';
import NodePalette from '../components/sidebar/NodePalette';
import SimulationPanel from '../components/simulation/SimulationPanel';
import { useWorkflowStore } from '../store/workflowStore';
import { useWorkflow } from '../hooks/useWorkflow';
import { useSimulation } from '../hooks/useSimulation';
import type { StartNodeData, TaskNodeData, ApprovalNodeData, EndNodeData } from '../types/workflow.types';
import type { Node, Edge } from '@xyflow/react';

// ─── Initial demo workflow ─────────────────────────────────────────

const demoNodes: Node[] = [
  {
    id: 'demo_1',
    type: 'startNode',
    position: { x: 40, y: 120 },
    data: { title: 'Employee Hired', metadata: { trigger: 'HR System' } } satisfies StartNodeData as any,
  },
  {
    id: 'demo_2',
    type: 'taskNode',
    position: { x: 300, y: 120 },
    data: {
      title: 'IT Equipment Setup',
      description: 'Assign hardware to new recruit',
      assignee: 'james.wilson@company.com',
      dueDate: '2025-06-01',
      customFields: { Priority: 'High', Department: 'IT' },
    } satisfies TaskNodeData as any,
  },
  {
    id: 'demo_3',
    type: 'approvalNode',
    position: { x: 600, y: 120 },
    data: {
      title: 'Manager Review',
      approverRole: 'Manager',
      autoApproveThreshold: 50,
    } satisfies ApprovalNodeData as any,
  },
  {
    id: 'demo_4',
    type: 'endNode',
    position: { x: 900, y: 120 },
    data: { message: 'Onboarding Complete', summary: true } satisfies EndNodeData as any,
  },
];

const demoEdges: Edge[] = [
  { id: 'e1-2', source: 'demo_1', target: 'demo_2', animated: true, style: { stroke: '#8B5CF6' } },
  { id: 'e2-3', source: 'demo_2', target: 'demo_3', animated: true, style: { stroke: '#494454' } },
  { id: 'e3-4', source: 'demo_3', target: 'demo_4', animated: true, style: { stroke: '#494454' } },
];

// ─── Toolbar ───────────────────────────────────────────────────────

const CanvasToolbar: React.FC = () => {
  const { save, exportJSON, importJSON } = useWorkflow();
  const { validate, simulate } = useSimulation();
  const isSimulating = useWorkflowStore((s) => s.isSimulating);
  const undo = useWorkflowStore((s) => s.undo);
  const redo = useWorkflowStore((s) => s.redo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importJSON(file);
      e.target.value = '';
    }
  }, [importJSON]);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#1A1D23]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 gap-1 shadow-2xl z-30">
      <button
        onClick={undo}
        className="flex items-center gap-1 px-3 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
        title="Undo"
      >
        <span className="material-symbols-outlined text-lg">undo</span>
      </button>
      <button
        onClick={redo}
        className="flex items-center gap-1 px-3 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
        title="Redo"
      >
        <span className="material-symbols-outlined text-lg">redo</span>
      </button>

      <div className="w-px h-6 bg-white/10 mx-1"></div>

      <button
        onClick={save}
        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
      >
        <span className="material-symbols-outlined text-lg">save</span>
        <span>Save</span>
      </button>

      <button
        onClick={exportJSON}
        className="flex items-center gap-1 px-3 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
        title="Export JSON"
      >
        <span className="material-symbols-outlined text-lg">download</span>
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1 px-3 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
        title="Import JSON"
      >
        <span className="material-symbols-outlined text-lg">upload</span>
      </button>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

      <div className="w-px h-6 bg-white/10 mx-1"></div>

      <button
        onClick={() => validate()}
        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-colors text-sm text-gray-300"
      >
        <span className="material-symbols-outlined text-lg">verified</span>
        <span>Validate</span>
      </button>

      <button
        onClick={simulate}
        disabled={isSimulating}
        className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-full transition-all text-sm font-bold shadow-lg shadow-violet-900/40"
      >
        <span
          className="material-symbols-outlined text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isSimulating ? 'sync' : 'play_arrow'}
        </span>
        <span>{isSimulating ? 'Running...' : 'Run Simulation'}</span>
      </button>
    </div>
  );
};

// ─── Inner (requires ReactFlowProvider ancestor) ───────────────────

const WorkflowDesignerInner: React.FC = () => {
  const setNodes = useWorkflowStore((s) => s.setNodes);
  const setEdges = useWorkflowStore((s) => s.setEdges);
  const nodes = useWorkflowStore((s) => s.nodes);

  // Seed demo workflow on first mount if store is empty
  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(demoNodes);
      setEdges(demoEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-[280px_1fr_320px] h-[calc(100vh-64px)] overflow-hidden">
      {/* LEFT: Node Library (driven by registry) */}
      <NodePalette />

      {/* CENTER: Canvas + Toolbar + Simulation Panel */}
      <section className="relative bg-[#0b0e14] overflow-hidden">
        <WorkflowCanvas />
        <CanvasToolbar />
        <SimulationPanel />
      </section>

      {/* RIGHT: Config Panel (driven by registry) */}
      <section className="bg-[#1A1D23] border-l border-white/10 flex flex-col overflow-y-auto z-20">
        <NodeFormPanel />
      </section>
    </div>
  );
};

// ─── Export ────────────────────────────────────────────────────────

export const WorkflowDesigner: React.FC = () => {
  return (
    <Layout>
      <ReactFlowProvider>
        <WorkflowDesignerInner />
      </ReactFlowProvider>
    </Layout>
  );
};
