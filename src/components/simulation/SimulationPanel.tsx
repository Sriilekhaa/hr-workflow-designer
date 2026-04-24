import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { SimulationStepStatus } from '../../types/workflow.types';

const statusConfig: Record<SimulationStepStatus, { icon: string; color: string; bg: string }> = {
  success: { icon: 'check_circle', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  error: { icon: 'error', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  skipped: { icon: 'skip_next', color: 'text-gray-400', bg: 'bg-gray-500/10' },
  pending: { icon: 'schedule', color: 'text-gray-500', bg: 'bg-gray-500/10' },
  running: { icon: 'sync', color: 'text-violet-400', bg: 'bg-violet-500/10' },
};

const SimulationPanel: React.FC = () => {
  const simulationSteps = useWorkflowStore((s) => s.simulationSteps);
  const isSimulating = useWorkflowStore((s) => s.isSimulating);
  const validationErrors = useWorkflowStore((s) => s.validationErrors);
  const showPanel = useWorkflowStore((s) => s.showSimulationPanel);
  const setShowPanel = useWorkflowStore((s) => s.setShowSimulationPanel);

  if (!showPanel) return null;

  const hasValidationErrors = validationErrors.length > 0;

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[560px] max-h-[400px] bg-[#1A1D23]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-violet-400 text-lg">terminal</span>
          <h3 className="text-sm font-semibold text-white">
            {hasValidationErrors ? 'Validation Errors' : 'Simulation Log'}
          </h3>
          {isSimulating && (
            <span className="flex items-center gap-1 ml-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-violet-400">Running...</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setShowPanel(false)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {hasValidationErrors ? (
          validationErrors.map((err, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg"
            >
              <span className="material-symbols-outlined text-rose-400 text-sm mt-0.5">error</span>
              <div>
                <p className="text-xs text-rose-300">{err.message}</p>
                {err.nodeId && (
                  <p className="text-[10px] text-rose-400/60 mt-0.5">Node: {err.nodeId}</p>
                )}
              </div>
            </div>
          ))
        ) : simulationSteps.length === 0 && !isSimulating ? (
          <p className="text-xs text-gray-500 text-center py-6">
            No simulation data. Click "Run Simulation" to start.
          </p>
        ) : (
          simulationSteps.map((step, i) => {
            const cfg = statusConfig[step.status];
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 ${cfg.bg} border border-white/5 rounded-lg`}
              >
                <span className={`material-symbols-outlined ${cfg.color} text-sm mt-0.5`}>
                  {cfg.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white">{step.step}</p>
                    <span className={`text-[10px] font-medium uppercase ${cfg.color}`}>
                      {step.status}
                    </span>
                  </div>
                  {step.message && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{step.message}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SimulationPanel;
