import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { StartNodeData } from '../../types/workflow.types';
import KeyValueEditor from './KeyValueEditor';

interface StartNodeFormProps {
  nodeId: string;
  data: StartNodeData;
}

const StartNodeForm: React.FC<StartNodeFormProps> = ({ nodeId, data }) => {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

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

      <KeyValueEditor
        label="Metadata"
        value={data.metadata ?? {}}
        onChange={(metadata) => updateNodeData(nodeId, { metadata })}
      />
    </div>
  );
};

export default StartNodeForm;
