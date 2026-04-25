import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchAutomationsFull } from '../services/api';
import type { AutomationListItem } from '../services/api';

export const AutomationTemplates: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomationsFull().then((data) => { setAutomations(data); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 workflow-dot-grid p-8 h-[calc(100vh-64px)] overflow-y-auto bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10">
            <h2 className="font-h1 text-h1 text-on-surface">Workflow Assets</h2>
            <p className="text-on-surface-variant font-body-lg mt-2">Design and deploy automated logic across your HR ecosystem.</p>
          </div>

          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                  <h3 className="font-h2 text-h2 text-on-surface">Automation Actions</h3>
                </div>
                <span className="text-xs font-code text-gray-500 bg-white/5 px-2 py-1 rounded">{automations.length} AVAILABLE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack_gap">
                {automations.map((a, i) => (
                  <div key={a.id} className={`h-[164px] flex flex-col justify-between bg-[#1A1D23] border border-white/5 p-card_padding rounded-xl relative group hover:border-primary/50 transition-all ${i === 0 ? 'purple-glow' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 shrink-0 rounded-lg ${a.icon_bg} flex items-center justify-center ${a.icon_color}`}>
                        <span className="material-symbols-outlined">{a.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-h3 text-h3 text-white line-clamp-1">{a.label}</h4>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{a.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto space-y-3">
                      <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Required Parameters</p>
                      <div className="flex flex-wrap gap-2">
                        {a.params.map((p) => (
                          <span key={p} className="px-2 py-1 bg-[#0B0E14] border border-white/10 rounded-md text-[11px] font-code text-primary">{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:mt-[56px] space-y-stack_gap">
              <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-card_padding overflow-hidden relative group flex flex-col justify-between h-[164px]">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <span className="material-symbols-outlined text-5xl text-primary/10">monitoring</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-h3 text-h3 text-primary">Live Execution</h4>
                  <p className="text-sm text-on-surface-variant mt-1">Currently processing 127 active triggers.</p>
                </div>
                <div className="relative z-10 mt-auto w-full">
                  <div className="flex items-end gap-[2px] h-10 w-full mb-2">
                    <div className="flex-1 bg-primary/40 h-[40%] rounded-t-sm hover:bg-primary/60 transition-all"></div>
                    <div className="flex-1 bg-primary/60 h-[60%] rounded-t-sm hover:bg-primary/80 transition-all"></div>
                    <div className="flex-1 bg-primary h-[100%] rounded-t-sm animate-pulse shadow-[0_0_15px_rgba(208,188,255,0.4)]"></div>
                    <div className="flex-1 bg-primary/70 h-[75%] rounded-t-sm hover:bg-primary/90 transition-all"></div>
                    <div className="flex-1 bg-primary/30 h-[30%] rounded-t-sm hover:bg-primary/50 transition-all"></div>
                  </div>
                  <div className="flex justify-between items-center border-t border-primary/20 pt-2">
                    <p className="text-[10px] font-code text-primary uppercase tracking-wider">Throughput</p>
                    <p className="text-xs font-code text-primary-fixed">4.2 ops/s</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-card_padding flex flex-col justify-between h-[164px]">
                <h4 className="font-h3 text-h3 text-primary">System Health</h4>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Node Latency</span>
                    <span className="text-sm font-code text-white">12ms</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[12%]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Memory Load</span>
                    <span className="text-sm font-code text-white">44%</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[44%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-card_padding flex flex-col justify-between h-[164px]">
                <h4 className="font-h3 text-h3 text-primary">Active Webhooks</h4>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Endpoints Listening</span>
                    <span className="text-sm font-code text-white">45</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[80%]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Payload Delivery</span>
                    <span className="text-sm font-code text-white">99.9%</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[99%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-card_padding flex flex-col justify-between h-[164px]">
                <h4 className="font-h3 text-h3 text-primary">API Usage</h4>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Daily Quota</span>
                    <span className="text-sm font-code text-white">82%</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[82%]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Rate Limit</span>
                    <span className="text-sm font-code text-white">Stable</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[100%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
