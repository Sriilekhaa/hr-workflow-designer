import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { ApprovalNodeData } from '../../types/workflow.types';

interface ApprovalNodeFormProps {
  nodeId: string;
  data: ApprovalNodeData;
}

const ApprovalNodeForm: React.FC<ApprovalNodeFormProps> = ({ nodeId, data }) => {
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
        <label className="text-xs font-semibold text-gray-400">Approver Role</label>
        <input
          type="text"
          value={data.approverRole ?? ''}
          onChange={(e) => updateNodeData(nodeId, { approverRole: e.target.value })}
          placeholder="e.g. Manager, VP, Director"
          className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400">
          Auto-Approve Threshold (0–100)
        </label>
        <input
          type="number"
          min={0}
          max={100}
          value={data.autoApproveThreshold ?? 0}
          onChange={(e) => updateNodeData(nodeId, { autoApproveThreshold: Number(e.target.value) })}
          className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
        />
        <p className="text-[10px] text-gray-500">
          If &gt; 0, simulated random score ≤ threshold triggers auto-approval.
        </p>
      </div>
    </div>
  );
};

export default ApprovalNodeForm;
