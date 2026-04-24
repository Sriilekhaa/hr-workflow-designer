import React, { useEffect, useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { fetchAutomations } from '../../services/api';
import type { AutomatedNodeData, AutomationAction } from '../../types/workflow.types';

interface AutomatedNodeFormProps {
  nodeId: string;
  data: AutomatedNodeData;
}

const AutomatedNodeForm: React.FC<AutomatedNodeFormProps> = ({ nodeId, data }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomations()
      .then(setAutomations)
      .finally(() => setLoading(false));
  }, []);

  const selectedAction = automations.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    const action = automations.find((a) => a.id === actionId);
    const params: Record<string, any> = {};
    if (action) {
      for (const p of action.params) {
        params[p] = data.params?.[p] ?? '';
      }
    }
    updateNodeData(nodeId, { actionId, params });
  };

  const handleParamChange = (param: string, value: string) => {
    updateNodeData(nodeId, { params: { ...data.params, [param]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400">Title</label>
        <input
          type="text"
          value={data.title ?? ''}
          onChange={(e) => updateNodeData(nodeId, { title: e.target.value })}
          className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400">Action</label>
        {loading ? (
          <div className="text-xs text-gray-500 py-2">Loading automations...</div>
        ) : (
          <select
            value={data.actionId ?? ''}
            onChange={(e) => handleActionChange(e.target.value)}
            className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all appearance-none"
          >
            <option value="">Select an action...</option>
            {automations.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/5">
          <label className="text-xs font-semibold text-gray-400">Action Parameters</label>
          {selectedAction.params.map((param) => (
            <div key={param} className="space-y-1">
              <label className="text-[10px] text-gray-500 capitalize">{param}</label>
              <input
                type="text"
                value={data.params?.[param] ?? ''}
                onChange={(e) => handleParamChange(param, e.target.value)}
                placeholder={`Enter ${param}`}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white focus:ring-1 focus:ring-violet-500 outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomatedNodeForm;
