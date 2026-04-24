import React from 'react';

export const AdvancedCanvas: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      <aside className="fixed left-0 top-0 h-full w-[260px] border-r border-white/10 bg-[#1A1D23] shadow-2xl shadow-black/50 z-50 flex flex-col font-inter antialiased tracking-tight overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-black tracking-tighter text-violet-500 mb-1">Aether</h1>
          <p className="text-xs text-gray-400 opacity-70">HR Systems Arch</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-violet-400 bg-violet-500/10 border-l-4 border-violet-500 font-semibold transition-all" href="/">
            <span className="material-symbols-outlined">account_tree</span>
            Workflows
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200" href="/">
            <span className="material-symbols-outlined">description</span>
            Templates
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200" href="/">
            <span className="material-symbols-outlined">group</span>
            Directory
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200" href="/">
            <span className="material-symbols-outlined">monitoring</span>
            Analytics
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200" href="/">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="w-full bg-primary-container text-on-primary-container font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-sm">add</span>
            Create New Flow
          </button>
        </div>
        <div className="p-4 flex items-center gap-3 border-t border-white/10">
          <img
            className="w-10 h-10 rounded-full border border-white/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxeK90-rroQMJCyB3ICQXwxBbMZsgQSAbAslqITvyWdbhPUXLFzUmJcu0ihTJdInyK9Jh1JP8vmkVUYw_CZMZrF6g0-j7Nm-Zw5tGIHZ427IuC8DYNmbzfsXF7uI3XTgkiBz2ZVSWUkyyu06pB8aid_dkVBf9oeWOJnDtthOoRwMSkIjrJhjPQeGsJ_qp6MWaIFDWGPnEl8xgs2Q8c5eXyoR7n_j2bc3dstM2B_Kl0yARPoVcO4RnfYcp31CzGSDA8rpbtEsZH3eEV"
            alt="avatar"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Marcus Chen</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Lead Architect</p>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-[260px] h-16 border-b border-white/10 bg-[#1A1D23]/80 backdrop-blur-xl z-40 flex justify-between items-center px-6 shadow-md font-inter text-sm font-medium">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400">hub</span>
            <h2 className="text-lg font-bold text-white">Workflow Designer</h2>
          </div>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <nav className="flex gap-6 h-full items-center">
            <a className="text-violet-400 border-b-2 border-violet-500 py-5 transition-all" href="/">Editor</a>
            <a className="text-gray-400 hover:text-white py-5 transition-all" href="/">Variables</a>
            <a className="text-gray-400 hover:text-white py-5 transition-all" href="/">Versions</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0B0E14] rounded-lg border border-white/10 focus-within:ring-2 focus-within:ring-violet-500/50 transition-all">
            <span className="material-symbols-outlined text-gray-400 text-sm">search</span>
            <input className="bg-transparent border-none p-0 text-xs w-48 focus:ring-0 text-white placeholder-gray-500 outline-none" placeholder="Search nodes..." type="text" />
          </div>
          <div className="flex gap-2">
            <button className="material-symbols-outlined text-gray-400 hover:text-violet-400 transition-all p-2">notifications</button>
            <button className="material-symbols-outlined text-gray-400 hover:text-violet-400 transition-all p-2">history</button>
            <button className="material-symbols-outlined text-gray-400 hover:text-violet-400 transition-all p-2">help</button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all active:scale-95">Save Draft</button>
            <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-violet-500/20 active:scale-95 transition-all">Deploy Flow</button>
          </div>
        </div>
      </header>

      <main className="ml-[260px] pt-16 h-screen flex flex-col overflow-hidden relative">
        <div className="flex-1 workflow-dot-grid relative overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 p-12 flex flex-col items-start gap-12 scale-90 origin-top-left overflow-visible">

            <div className="flex items-center gap-24">
              <div className="w-64 bg-[#252932] border border-white/10 rounded-xl p-4 workflow-node-glow group cursor-grab active:cursor-grabbing relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400 text-lg">play_arrow</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Trigger</h4>
                    <p className="text-[10px] text-gray-400">Greenhouse: New Hire</p>
                  </div>
                  <div className="ml-auto w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[11px] text-gray-400 bg-black/20 p-2 rounded border border-white/5">
                  Filter: Dept = "Engineering"
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#101319] cursor-crosshair"></div>
              </div>

              <div className="w-24 h-[2px] bg-violet-500/40 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-violet-500/40"></div>
              </div>

              <div className="w-64 bg-[#252932] border border-white/10 rounded-xl p-4 workflow-node-glow group relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-violet-400 text-lg">database</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Workday</h4>
                    <p className="text-[10px] text-gray-400">Create Worker Profile</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-full"></div>
                  </div>
                  <p className="text-[9px] text-right text-violet-400 font-code">SYNCED</p>
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#101319]"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#101319]"></div>
              </div>

              <div className="w-12 h-12 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 text-4xl">call_split</span>
              </div>

              <div className="w-64 bg-[#252932] border border-white/10 rounded-xl p-4 workflow-node-glow group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-400 text-lg">alt_route</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Logic Branch</h4>
                    <p className="text-[10px] text-gray-400">Check Location</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] text-gray-300 px-2 py-1 bg-white/5 rounded border border-white/5">
                    <span>If "Remote"</span>
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-300 px-2 py-1 bg-white/5 rounded border border-white/5">
                    <span>Else (Onsite)</span>
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-12 ml-[450px]">
              <div className="flex flex-col gap-8">
                <div className="w-64 bg-[#252932] border border-white/10 rounded-xl p-4 workflow-node-glow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">#</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Slack</h4>
                      <p className="text-[10px] text-gray-400">Notify Team Lead</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">"Welcome to the team!"</p>
                </div>

                <div className="w-64 bg-[#252932] border border-white/10 rounded-xl p-4 workflow-node-glow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400 text-lg">task</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Jira</h4>
                      <p className="text-[10px] text-gray-400">Create IT Ticket</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pt-12">
                <div className="w-72 bg-[#2D323C] border-2 border-violet-500/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 bg-violet-500 text-[9px] font-bold text-white rounded">SUB-PROCESS</span>
                    <span className="material-symbols-outlined text-gray-500 text-sm">open_in_new</span>
                  </div>
                  <h4 className="text-md font-bold text-white mb-2">Compliance Check-list</h4>
                  <div className="space-y-3 opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-white/20"></div>
                      <div className="h-2 w-32 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-white/20"></div>
                      <div className="h-2 w-40 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-white/20"></div>
                      <div className="h-2 w-24 bg-white/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[500px] left-[100px] grid grid-cols-4 gap-8 opacity-20 pointer-events-none">
              <div className="w-48 h-48 border border-white/5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="w-48 h-48 border border-white/5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="w-48 h-48 border border-white/5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="w-48 h-48 border border-white/5 rounded-3xl bg-gradient-to-br from-white/5 to-transparent"></div>
            </div>
          </div>

          <aside className="absolute top-6 left-6 w-64 glass-panel border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 max-h-[calc(100%-48px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Node Library</h3>
              <span className="material-symbols-outlined text-gray-500 text-sm">filter_list</span>
            </div>
            <div className="space-y-4">
              <section>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Core Logic</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#0B0E14] border border-white/5 rounded-lg hover:border-violet-500/50 cursor-grab transition-all">
                    <span className="material-symbols-outlined text-orange-400 text-sm mb-1">alt_route</span>
                    <p className="text-[10px] font-medium">Split</p>
                  </div>
                  <div className="p-2 bg-[#0B0E14] border border-white/5 rounded-lg hover:border-violet-500/50 cursor-grab transition-all">
                    <span className="material-symbols-outlined text-blue-400 text-sm mb-1">timer</span>
                    <p className="text-[10px] font-medium">Delay</p>
                  </div>
                </div>
              </section>
              <section>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Integrations</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-[#0B0E14] border border-white/5 rounded-lg hover:bg-white/5 cursor-grab">
                    <img className="w-5 h-5 rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsKYSLD9BAsTvprD2KKEy7K5PfbKCAfvyBkUo61kzF8EyAsH0kFStrPRxzGuLOPAEJOWph-5SqxXrM1HPfOCF1WPsAgYSSPOam2DBloiY94bInhD1fhamVsP3sC_4ZoydazIyYMRxxgplR8SKNwt9JPshe1gogPAt4xfSpXeHC7Wcj3FnYuCwA5XS0Htt4fI2qOM3kH8oqdVKIQejx9FXsF8ijlgRBeNL35HlP5nXATNo-6p5euGrL-154mVuM0fD0-4RXer8a9eyp" alt="icon" />
                    <span className="text-[11px] font-medium">Workday API</span>
                    <span className="material-symbols-outlined ml-auto text-gray-600 text-xs">drag_indicator</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-[#0B0E14] border border-white/5 rounded-lg hover:bg-white/5 cursor-grab">
                    <img className="w-5 h-5 rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPQCutcg6ZLlfIY9uIC80SoPsRmmC6TQtXak5xH1dtfvjIm66E6QNpPHwOu4EYsOr1anus6U1C7SeOYLoI-tueVQp84fhqdYhDcF_OHwRWKiN9kFpkbcHAHIaKd_9JIXul-hx8X8UPbGNva5w2iU3zHLA6nPL4JDq_xiz9s1JfzFN1WyJkaP9GIQhJ26VbsfLZR69cSCWkvNeJ4g4T93JJbGDH5OCHttFEteSdfO63kL3zccW8tK1c60g8ok7hY6DkHjmmaSaBDYNO" alt="icon" />
                    <span className="text-[11px] font-medium">Slack Post</span>
                    <span className="material-symbols-outlined ml-auto text-gray-600 text-xs">drag_indicator</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-[#0B0E14] border border-white/5 rounded-lg hover:bg-white/5 cursor-grab">
                    <img className="w-5 h-5 rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApXS7Ht9wbXRb78mVQi7cBhQmn4vtDqNE_plufyQFGUiXMRCk1CLrYjJOEInyca1LHl_iFnp6DbfZMrKA5R-TdwtRBc5PYxbAFXQD0l3mYCiSx4KxvMq8jbSFzDWlFJcp2Tqfy6yhijBbkJN9GgoOUxkWNpFcNPaO7sHTF14V-j0Ck0M6HCtWSDUXrLfWfFofdgGEXs98SJGXyJAtxtSytWJUji2UxUNAOlkMOpb5JlKL_DnGjm7OTtsia0QuV6k580QwJl38b8WmM" alt="icon" />
                    <span className="text-[11px] font-medium">Jira Issue</span>
                    <span className="material-symbols-outlined ml-auto text-gray-600 text-xs">drag_indicator</span>
                  </div>
                </div>
              </section>
            </div>
          </aside>

          <div className="absolute bottom-6 right-6 w-48 h-32 glass-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="w-full h-full p-2 relative opacity-50">
              <div className="absolute top-2 left-2 w-8 h-2 bg-green-400 rounded-full"></div>
              <div className="absolute top-4 left-12 w-12 h-4 bg-violet-400 rounded-lg"></div>
              <div className="absolute top-8 left-24 w-12 h-6 bg-orange-400 rounded-lg"></div>
              <div className="absolute top-16 left-32 w-16 h-8 bg-blue-400 rounded-lg"></div>
              <div className="absolute inset-4 border-2 border-white/30 rounded shadow-[0_0_20px_rgba(255,255,255,0.1)]"></div>
            </div>
            <div className="absolute bottom-0 w-full bg-black/40 px-3 py-1.5 flex justify-between items-center">
              <span className="text-[9px] font-bold text-white/70">MAP VIEW</span>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[10px] text-white">zoom_in</span>
                <span className="material-symbols-outlined text-[10px] text-white">zoom_out</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-[284px] flex gap-2 glass-panel border border-white/10 rounded-full p-2 shadow-xl">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="w-[1px] h-6 bg-white/10 self-center"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <div className="w-[1px] h-6 bg-white/10 self-center"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all">
              <span className="material-symbols-outlined">center_focus_weak</span>
            </button>
          </div>
        </div>

        <footer className="h-10 bg-[#0B0E14] border-t border-white/5 flex items-center px-6 justify-between text-[11px] font-medium text-gray-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">account_tree</span>
              <span>14 Active Nodes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              <span>3 Parallel Paths</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Auto-save enabled</span>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <span className="text-violet-400">v2.4.12-stable</span>
          </div>
        </footer>
      </main>
    </div>
  );
};
