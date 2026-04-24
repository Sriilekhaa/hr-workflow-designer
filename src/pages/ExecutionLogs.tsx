import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchExecutionLogs } from '../services/api';
import type { ExecutionLogItem } from '../services/api';
import { formatDateTime, formatDuration } from '../utils/timeFormat';

const statusStyle: Record<string, { bg: string; text: string; dot: string; label: string; animate?: boolean }> = {
  success: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Success' },
  error:   { bg: 'bg-red-500/10',     text: 'text-red-400',     dot: 'bg-red-400',     label: 'Failure' },
  running: { bg: 'bg-blue-500/10',    text: 'text-blue-400',    dot: 'bg-blue-400',    label: 'Running', animate: true },
  pending: { bg: 'bg-gray-500/10',    text: 'text-gray-400',    dot: 'bg-gray-400',    label: 'Pending' },
};

export const ExecutionLogs: React.FC = () => {
  const [logs, setLogs] = useState<ExecutionLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchExecutionLogs().then((data) => { setLogs(data); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-violet-400 text-3xl">progress_activity</span>
        </div>
      </Layout>
    );
  }

  const filtered = statusFilter === 'all' ? logs : logs.filter((l) => l.status === statusFilter);
  const totalRuns = logs.length;
  const successCount = logs.filter((l) => l.status === 'success').length;
  const errorCount = logs.filter((l) => l.status === 'error').length;
  const successRate = totalRuns > 0 ? ((successCount / totalRuns) * 100).toFixed(1) : '0';

  return (
    <Layout>
      <div className="flex-1 workflow-dot-grid h-[calc(100vh-64px)] overflow-y-auto relative bg-surface-container-lowest">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-h2 font-h2 text-white flex items-center gap-3">
                Execution Logs
                <span className="bg-violet-500/10 text-violet-400 text-[10px] font-bold px-2 py-0.5 rounded border border-violet-500/20 uppercase tracking-tighter">Live Monitor</span>
              </h2>
              <p className="text-gray-500 text-body-md font-body-md mt-1">Audit and debug all active system orchestrations.</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex flex-col items-end">
                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Success Rate</span>
                <span className="text-emerald-400 font-mono text-lg">{successRate}%</span>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <div className="flex flex-col items-end">
                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Total Runs</span>
                <span className="text-white font-mono text-lg">{totalRuns.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 sticky top-0 z-10 glass-panel p-3 rounded-xl border border-white/10 shadow-xl">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#101319] border border-white/10 rounded-lg text-xs py-1.5 pl-3 pr-8 text-on-surface appearance-none outline-none focus:border-violet-500"
            >
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="running">Running</option>
              <option value="pending">Pending</option>
            </select>
            <span className="ml-auto text-xs text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="bg-[#1A1D23] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-[1.5fr,2fr,1.5fr,1fr,1fr,48px] items-center px-6 py-4 bg-[#252932]/50 border-b border-white/10">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-inter">Run ID</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-inter">Workflow Name</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-inter">Start Time</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-inter">Duration</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-inter">Status</span>
              <span></span>
            </div>

            <div className="divide-y divide-white/5">
              {filtered.map((log) => {
                const st = statusStyle[log.status] ?? statusStyle.pending;
                const isExpanded = expandedId === log.id;
                const isError = log.status === 'error';
                return (
                  <div key={log.id} className={isError ? 'bg-red-500/[0.02]' : ''}>
                    <div
                      className={`grid grid-cols-[1.5fr,2fr,1.5fr,1fr,1fr,48px] items-center px-6 py-4 hover:bg-white/5 cursor-pointer transition-colors duration-200 ${isError && !isExpanded ? 'border-l-2 border-red-500' : ''}`}
                      onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    >
                      <span className={`text-code font-code ${isError ? 'text-red-400' : 'text-violet-400'}`}>#{log.id.slice(0, 8).toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-violet-400 text-lg">account_tree</span>
                        <span className="text-body-md font-medium text-white">{log.workflow_name}</span>
                      </div>
                      <span className="text-body-md text-gray-400">{formatDateTime(log.created_at)}</span>
                      <span className="text-body-md text-gray-400">{formatDuration(log.duration_ms)}</span>
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${st.bg} ${st.text} text-[10px] font-bold border border-current/20 uppercase`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${st.animate ? 'animate-pulse' : ''}`}></span>
                          {st.label}
                        </span>
                      </div>
                      <span className={`material-symbols-outlined text-gray-600 transition-transform ${isExpanded ? 'rotate-180 text-white' : ''}`}>keyboard_arrow_down</span>
                    </div>

                    {isExpanded && log.steps && log.steps.length > 0 && (
                      <div className="px-12 py-6 bg-[#0B0E14]/50 border-y border-white/5 space-y-4">
                        <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Step Execution Sequence</h4>
                        <div className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                          {log.steps.map((step, idx) => {
                            const isStepError = step.status === 'error';
                            const isStepSuccess = step.status === 'success';
                            return (
                              <div key={idx} className={`relative pl-8 ${step.status === 'skipped' ? 'opacity-40' : ''}`}>
                                <span className={`absolute left-0 top-1 w-[22px] h-[22px] ${isStepError ? 'bg-red-500/20 border-red-500' : isStepSuccess ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/20'} border rounded-full flex items-center justify-center`}>
                                  <span className={`material-symbols-outlined text-[14px] ${isStepError ? 'text-red-400' : isStepSuccess ? 'text-emerald-400' : 'text-gray-400'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {isStepError ? 'close' : isStepSuccess ? 'check' : step.status === 'running' ? 'refresh' : 'block'}
                                  </span>
                                </span>
                                <div>
                                  <p className={`text-xs font-bold uppercase ${isStepError ? 'text-red-400' : 'text-white'}`}>{step.step}</p>
                                  {step.message && (
                                    <p className="text-[11px] text-gray-500 font-code mt-0.5">{step.message}</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">No execution logs found.</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="col-span-1 bg-[#1A1D23] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Success Rate</span>
                <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
              </div>
              <p className="text-h3 font-h3 text-white">{successRate}%</p>
              <p className="text-[10px] text-gray-500 mt-1">{successCount} of {totalRuns} runs</p>
            </div>
            <div className="col-span-1 bg-[#1A1D23] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Errors</span>
                <span className="material-symbols-outlined text-red-400 text-lg">error</span>
              </div>
              <p className="text-h3 font-h3 text-white">{errorCount}</p>
              <p className="text-[10px] text-gray-500 mt-1">Across all workflows</p>
            </div>
            <div className="col-span-2 bg-[#1A1D23] border border-white/10 rounded-xl p-5 shadow-lg flex items-center justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Connectors</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-[#1A1D23] text-[10px] font-bold" title="Workday">W</div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#1A1D23] text-[10px] font-bold" title="Slack">S</div>
                  <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center border-2 border-[#1A1D23] text-[10px] font-bold" title="Azure AD">A</div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center border-2 border-[#1A1D23] text-[10px] font-bold" title="Jira">J</div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-[#1A1D23] text-[10px] font-bold text-gray-400">+12</div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</p>
                <p className="text-emerald-400 text-xs font-bold uppercase mt-1">Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
