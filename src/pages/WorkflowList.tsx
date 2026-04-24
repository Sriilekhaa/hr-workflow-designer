import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { listWorkflows, deleteWorkflow, createWorkflow } from '../services/api';
import type { WorkflowListItem } from '../services/api';
import { formatDate, formatRelativeTime } from '../utils/timeFormat';

const statusBadge: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  active:   { bg: 'bg-green-500/10',  text: 'text-green-400',  dot: 'bg-green-400',  label: 'Active' },
  draft:    { bg: 'bg-gray-500/10',   text: 'text-gray-400',   dot: 'bg-gray-400',   label: 'Draft' },
  archived: { bg: 'bg-gray-500/10',   text: 'text-gray-500',   dot: 'bg-gray-500',   label: 'Archived' },
  error:    { bg: 'bg-red-500/10',    text: 'text-red-400',    dot: 'bg-red-400',    label: 'Error' },
};

const iconColors: string[] = [
  'bg-violet-500/10 border-violet-500/20 text-violet-400',
  'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'bg-orange-500/10 border-orange-500/20 text-orange-400',
  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  'bg-pink-500/10 border-pink-500/20 text-pink-400',
];

export const WorkflowList: React.FC = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const data = await listWorkflows();
    setWorkflows(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = statusFilter === 'all' ? workflows : workflows.filter((w) => w.status === statusFilter);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this workflow?')) return;
    await deleteWorkflow(id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const wf = await createWorkflow(newName.trim());
    setWorkflows((prev) => [wf, ...prev]);
    setNewName('');
    setShowNewModal(false);
    navigate('/designer');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-violet-400 text-3xl">progress_activity</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 workflow-dot-grid p-gutter h-[calc(100vh-64px)] overflow-y-auto bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-2 text-label-sm text-gray-500 mb-2 pt-6">
            <span>Architect</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-violet-400">Workflows</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-h1 text-h1 text-on-surface">Workflow Designer</h1>
              <p className="text-body-lg text-gray-400 mt-1">Manage and orchestrate your HR logic mapping systems.</p>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-violet-600/20"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Workflow
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 glass-panel p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#101319] border border-white/10 rounded-lg text-sm py-1.5 pl-3 pr-8 focus:ring-violet-500 focus:border-violet-500 text-on-surface appearance-none outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
          <div className="text-label-sm text-gray-500">{filtered.length} workflow{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="max-w-7xl mx-auto glass-panel rounded-xl overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider">Workflow Name</th>
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider">Nodes</th>
                <th className="px-6 py-4 text-label-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((wf, idx) => {
                const badge = statusBadge[wf.status] ?? statusBadge.draft;
                const color = iconColors[idx % iconColors.length];
                return (
                  <tr key={wf.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${color}`}>
                          <span className="material-symbols-outlined text-[20px]">hub</span>
                        </div>
                        <div>
                          <div className="text-body-md font-semibold text-white group-hover:text-violet-300 transition-colors">{wf.name}</div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[240px]">{wf.description || `ID: ${wf.id.slice(0, 8)}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-body-md text-gray-400 font-inter">{formatDate(wf.created_at)}</td>
                    <td className="px-6 py-5 text-body-md text-gray-400">{formatRelativeTime(wf.updated_at)}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text} border border-current/20`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-body-md text-gray-400 font-mono">{wf.node_count}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all" title="Edit" onClick={() => navigate('/designer')}>
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-error hover:bg-error/10 rounded-md transition-all" title="Delete" onClick={() => handleDelete(wf.id)}>
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No workflows found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewModal(false)}>
          <div className="bg-[#1A1D23] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-h2 text-h2 text-on-surface mb-6">Create New Workflow</h3>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Workflow Name</label>
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="e.g. Employee Onboarding v2"
              className="w-full mt-2 mb-6 px-4 py-2.5 bg-[#0B0E14] border border-white/10 rounded-lg text-on-surface text-sm outline-none focus:border-violet-500 transition-colors"
            />
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={!newName.trim()} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white rounded-lg font-semibold text-sm transition-all">
                Create &amp; Open Designer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
