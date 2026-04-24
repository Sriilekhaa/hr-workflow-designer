import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { TaskNodeData } from '../../types/workflow.types';
import KeyValueEditor from './KeyValueEditor';

interface TaskNodeFormProps {
  nodeId: string;
  data: TaskNodeData;
}

const TaskNodeForm: React.FC<TaskNodeFormProps> = ({ nodeId, data }) => {
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

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400">Description</label>
        <textarea
          value={data.description ?? ''}
          onChange={(e) => updateNodeData(nodeId, { description: e.target.value })}
          className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all h-24 resize-none"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400">Assignee</label>
          <input
            type="text"
            value={data.assignee ?? ''}
            onChange={(e) => updateNodeData(nodeId, { assignee: e.target.value })}
            placeholder="e.g. james.wilson@company.com"
            className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400">Due Date</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">calendar_today</span>
            <input
              type="date"
              value={data.dueDate ?? ''}
              onChange={(e) => updateNodeData(nodeId, { dueDate: e.target.value })}
              className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <KeyValueEditor
        label="Custom Fields"
        value={data.customFields ?? {}}
        onChange={(customFields) => updateNodeData(nodeId, { customFields })}
      />
    </div>
  );
};

export default TaskNodeForm;
