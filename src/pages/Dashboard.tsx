import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { fetchDashboardStats } from '../services/api';
import type { DashboardStats } from '../services/api';
import { formatRelativeTime } from '../utils/timeFormat';

const statusConfig: Record<string, { dot: string; text: string; label: string }> = {
  active:   { dot: 'bg-green-400',  text: 'text-green-400',  label: 'Active' },
  draft:    { dot: 'bg-gray-600',   text: 'text-gray-500',   label: 'Draft' },
  archived: { dot: 'bg-gray-600',   text: 'text-gray-500',   label: 'Archived' },
  error:    { dot: 'bg-red-400',    text: 'text-red-400',    label: 'Error' },
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats().then((data) => { setStats(data); setLoading(false); });
  }, []);

  if (loading || !stats) {
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
      <div className="flex-1 workflow-dot-grid relative overflow-hidden bg-surface-container-lowest overflow-y-auto">
        <div className="p-gutter max-w-7xl mx-auto space-y-gutter pb-12 pt-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-h1 text-h1 text-on-surface">Architect Dashboard</h1>
            <p className="text-body-md font-body-md text-gray-400">Manage and monitor your HR operational logic structures.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack_gap">
            <div className="bg-[#1A1D23] p-card_padding rounded-xl border border-white/5 hover:border-violet-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-violet-400">account_tree</span>
                </div>
              </div>
              <div className="text-h2 font-h2 text-on-surface">{stats.totalWorkflows}</div>
              <div className="text-label-sm font-label-sm text-gray-500 uppercase tracking-wider mt-1">Total Workflows</div>
            </div>

            <div className="bg-[#1A1D23] p-card_padding rounded-xl border border-white/5 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-blue-400">bolt</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
              <div className="text-h2 font-h2 text-on-surface">{stats.activeWorkflows}</div>
              <div className="text-label-sm font-label-sm text-gray-500 uppercase tracking-wider mt-1">Active Now</div>
            </div>

            <div className="bg-[#1A1D23] p-card_padding rounded-xl border border-white/5 hover:border-red-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-red-400">error</span>
                </div>
                {stats.failedRuns > 0 && <span className="text-label-sm font-label-sm text-red-400">Needs Action</span>}
              </div>
              <div className="text-h2 font-h2 text-on-surface">{stats.failedRuns}</div>
              <div className="text-label-sm font-label-sm text-gray-500 uppercase tracking-wider mt-1">Failed Runs</div>
            </div>

            <div className="bg-[#1A1D23] p-card_padding rounded-xl border border-white/5 hover:border-amber-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-amber-400">assignment_late</span>
                </div>
                {stats.pendingApprovals > 0 && <span className="text-label-sm font-label-sm text-amber-400">{stats.pendingApprovals} Pending</span>}
              </div>
              <div className="text-h2 font-h2 text-on-surface">{stats.pendingApprovals}</div>
              <div className="text-label-sm font-label-sm text-gray-500 uppercase tracking-wider mt-1">Pending / Draft</div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <section className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-h2 text-h2 text-on-surface">Recent Workflows</h2>
                <button className="text-violet-400 text-body-md hover:underline" onClick={() => navigate('/workflows')}>View all</button>
              </div>
              <div className="bg-[#1A1D23] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="px-6 py-4">Workflow Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Updated</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-body-md font-body-md">
                    {stats.recentWorkflows.map((wf) => {
                      const sc = statusConfig[wf.status] ?? statusConfig.draft;
                      return (
                        <tr key={wf.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-violet-400 text-sm">account_tree</span>
                              </div>
                              <span className="font-semibold">{wf.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-2 ${sc.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{formatRelativeTime(wf.updated_at)}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-1 hover:text-violet-400 transition-colors" onClick={() => navigate('/designer')}>
                              <span className="material-symbols-outlined">edit</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {stats.recentWorkflows.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No workflows yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-h2 text-h2 text-on-surface">Activity Timeline</h2>
              </div>
              <div className="bg-[#1A1D23] rounded-xl border border-white/5 p-card_padding relative overflow-hidden">
                <div className="absolute left-[39px] top-8 bottom-8 w-px bg-white/10"></div>
                <div className="space-y-8 relative">
                  {stats.activityLog.map((act) => (
                    <div key={act.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-[#252932] border border-white/10 flex items-center justify-center z-10 group-hover:border-violet-500/50 transition-colors">
                        <span className={`material-symbols-outlined ${act.icon_color} text-lg`}>{act.icon}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-body-md font-semibold text-on-surface">{act.action}</span>
                        <span className="text-label-sm text-gray-500">{act.actor} &bull; {formatRelativeTime(act.created_at)}</span>
                        <span className="text-xs text-gray-400">{act.description}</span>
                      </div>
                    </div>
                  ))}
                  {stats.activityLog.length === 0 && (
                    <p className="text-gray-500 text-sm">No recent activity.</p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-stack_gap pt-8">
            <div className="md:col-span-1 bg-[#1A1D23] rounded-xl border border-white/5 p-card_padding">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-h3 text-h3 text-on-surface">System Health</h3>
                <span className="text-green-400 text-xs font-bold uppercase">Optimal</span>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Automation Uptime</span>
                    <span>99.9%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-[99%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>API Success Rate</span>
                    <span>94.2%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 relative h-[180px] bg-[#1A1D23] rounded-xl border border-white/5 overflow-hidden flex flex-col justify-center px-12">
              <div className="absolute inset-0 workflow-dot-grid opacity-20"></div>
              <div className="relative z-10">
                <h3 className="font-h3 text-h3 text-on-surface mb-2">Master Your Flows</h3>
                <p className="text-body-md text-gray-400 max-w-md">The new logic engine allows for asynchronous triggers across multiple departmental databases.</p>
                <button className="mt-4 text-violet-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all" onClick={() => navigate('/designer')}>
                  Open Designer <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};
