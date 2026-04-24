import React, { Suspense } from 'react';
import { useNodeConfig } from '../../hooks/useNodeConfig';
import { nodeRegistry } from '../../services/nodeRegistry';
import { useWorkflowStore } from '../../store/workflowStore';
import type { WorkflowNodeType } from '../../types/workflow.types';

const NodeFormPanel: React.FC = () => {
  const { selectedNode, close, remove } = useNodeConfig();
  const validationErrors = useWorkflowStore((s) => s.validationErrors);

  if (!selectedNode) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div>
          <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">touch_app</span>
          <p className="text-gray-400 text-sm">Select a node on the canvas to edit its configuration.</p>
        </div>
      </div>
    );
  }

  const nodeType = selectedNode.type as WorkflowNodeType;
  const registryEntry = nodeRegistry[nodeType];
  const FormComponent = registryEntry?.formComponent;

  const nodeErrors = validationErrors.filter((e) => e.nodeId === selectedNode.id);

  return (
    <>
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-h2 text-h3 text-white">Node Config</h2>
          <button
            className="text-gray-500 hover:text-white transition-colors"
            onClick={close}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-white/5">
          <div className={`p-2 ${registryEntry?.iconBg ?? 'bg-blue-500/10'} rounded-lg`}>
            <span className={`material-symbols-outlined ${registryEntry?.iconColor ?? 'text-blue-400'} text-xl`}>
              {registryEntry?.icon ?? 'settings'}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">TYPE</p>
            <p className="text-sm font-semibold text-white capitalize">
              {registryEntry?.label ?? nodeType.replace('Node', '')} Node
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {nodeErrors.length > 0 && (
          <div className="space-y-2">
            {nodeErrors.map((err, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg"
              >
                <span className="material-symbols-outlined text-rose-400 text-sm mt-0.5">error</span>
                <p className="text-xs text-rose-300">{err.message}</p>
              </div>
            ))}
          </div>
        )}

        {FormComponent ? (
          <Suspense
            fallback={
              <div className="text-xs text-gray-500 py-4 text-center">Loading form...</div>
            }
          >
            <FormComponent nodeId={selectedNode.id} data={selectedNode.data} />
          </Suspense>
        ) : (
          <p className="text-xs text-gray-500">No configuration form for this node type.</p>
        )}
      </div>

      <div className="p-6 bg-[#1A1D23] border-t border-white/5 mt-auto space-y-2">
        <button
          onClick={remove}
          className="w-full bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 font-bold py-2.5 rounded-lg text-sm transition-all border border-rose-500/20 active:scale-[0.98]"
        >
          Delete Node
        </button>
      </div>
    </>
  );
};

export default NodeFormPanel;
