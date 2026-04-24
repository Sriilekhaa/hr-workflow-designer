import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { EndNodeData } from '../../types/workflow.types';

interface EndNodeFormProps {
  nodeId: string;
  data: EndNodeData;
}

const EndNodeForm: React.FC<EndNodeFormProps> = ({ nodeId, data }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400">Message</label>
        <input
          type="text"
          value={data.message ?? ''}
          onChange={(e) => updateNodeData(nodeId, { message: e.target.value })}
          className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
        />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.summary ?? false}
            onChange={(e) => updateNodeData(nodeId, { summary: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600 peer-checked:after:bg-white"></div>
        </label>
        <div>
          <p className="text-xs font-semibold text-gray-300">Include Summary</p>
          <p className="text-[10px] text-gray-500">Generate a summary when workflow ends.</p>
        </div>
      </div>
    </div>
  );
};

export default EndNodeForm;
