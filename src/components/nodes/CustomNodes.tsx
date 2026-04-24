import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface NodeProps {
  data: Record<string, any>;
  selected?: boolean;
}

// Start Node
export const StartNode = memo(({ data }: NodeProps) => {
  const title = data.title ?? data.label ?? 'Start';
  return (
    <div className="w-[180px] bg-[#252932] border border-white/10 rounded-xl p-3 z-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">Trigger</span>
        <span className="material-symbols-outlined text-gray-500 text-sm">more_vert</span>
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <p className="text-[10px] text-gray-500 mt-1">{Object.keys(data.metadata).length} metadata fields</p>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-violet-500 !rounded-full !border-2 !border-[#1A1D23]" style={{ right: -6 }} />
    </div>
  );
});

// Task Node
export const TaskNode = memo(({ data, selected }: NodeProps) => {
  const title = data.title ?? data.label ?? 'Task';
  return (
    <div className={`w-[240px] bg-[#252932] border-2 rounded-xl p-4 z-20 ${selected ? 'border-violet-500 workflow-node-glow' : 'border-white/10'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ left: -6 }} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase">Task</span>
        {data.assignee && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-gray-400">Assigned</span>
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      {data.description && <p className="text-xs text-gray-500 mt-1">{data.description}</p>}
      {data.assignee && (
        <div className="mt-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500 text-sm">person</span>
          <span className="text-[10px] text-gray-400 truncate">{data.assignee}</span>
        </div>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-violet-500 !rounded-full !border-2 !border-[#1A1D23]" style={{ right: -6 }} />
    </div>
  );
});

// Approval Node
export const ApprovalNode = memo(({ data, selected }: NodeProps) => {
  const title = data.title ?? data.label ?? 'Approval';
  return (
    <div className={`w-[240px] bg-[#252932] border rounded-xl p-4 z-10 ${selected ? 'border-violet-500 workflow-node-glow' : 'border-white/10'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ left: -6 }} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">Approval</span>
        {data.approverRole && <span className="text-[10px] text-gray-500">{data.approverRole}</span>}
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      {data.autoApproveThreshold > 0 && (
        <p className="text-[10px] text-gray-500 mt-1">Auto-approve ≤ {data.autoApproveThreshold}%</p>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ right: -6 }} />
    </div>
  );
});

// Automated Node
export const AutomatedNode = memo(({ data, selected }: NodeProps) => {
  const title = data.title ?? data.label ?? 'Automated';
  return (
    <div className={`w-[240px] bg-[#252932] border rounded-xl p-4 z-10 ${selected ? 'border-violet-500 workflow-node-glow' : 'border-white/10'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ left: -6 }} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded uppercase">Automated</span>
        {data.actionId && <span className="text-[10px] text-gray-500">{data.actionId}</span>}
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      {data.description && <p className="text-xs text-gray-500 mt-1">{data.description}</p>}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ right: -6 }} />
    </div>
  );
});

// End Node
export const EndNode = memo(({ data }: NodeProps) => {
  const title = data.message ?? data.label ?? 'End';
  return (
    <div className="w-[160px] bg-[#252932] border border-white/10 rounded-xl p-3 z-10 opacity-70">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-600 !rounded-full !border-2 !border-[#1A1D23]" style={{ left: -6 }} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded uppercase">End</span>
        {data.summary && <span className="text-[10px] text-gray-500">+Summary</span>}
      </div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
    </div>
  );
});
