import React from 'react';

export const SimulationInstance: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md overflow-hidden">
      <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-[#1A1D23] flex flex-col py-6 px-4 z-50">
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary">account_tree</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-violet-500 font-h1">HR Flow</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Systems Architect</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="relative text-white before:absolute before:left-0 before:h-full before:w-1 before:bg-violet-500 before:rounded-r-full bg-white/5 flex items-center gap-3 px-3 py-2.5 rounded-r-lg group cursor-pointer">
            <span className="material-symbols-outlined text-violet-400">dashboard</span>
            <span className="font-inter text-sm font-medium tracking-tight">Dashboard</span>
          </div>
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">account_tree</span>
            <span className="font-inter text-sm font-medium tracking-tight">Workflows</span>
          </div>
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">auto_mode</span>
            <span className="font-inter text-sm font-medium tracking-tight">Automations</span>
          </div>
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">history</span>
            <span className="font-inter text-sm font-medium tracking-tight">Logs</span>
          </div>
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">description</span>
            <span className="font-inter text-sm font-medium tracking-tight">Templates</span>
          </div>
        </nav>
        <div className="mt-auto space-y-1 border-t border-white/5 pt-4">
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-inter text-sm font-medium tracking-tight">Settings</span>
          </div>
          <div className="text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
            <span className="material-symbols-outlined">help</span>
            <span className="font-inter text-sm font-medium tracking-tight">Help</span>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-[260px] h-16 border-b border-white/10 bg-[#1A1D23]/80 backdrop-blur-md z-40 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-1.5 w-80">
            <span className="material-symbols-outlined text-gray-400 text-lg mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full outline-none" placeholder="Search simulations..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary-container text-on-primary-fixed font-inter text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition-all active:scale-95">
            Create Workflow
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-white/5 rounded-lg transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-gray-400 hover:bg-white/5 rounded-lg transition-all active:scale-95">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-violet-500/30">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHzhKXkZexqiBBc0uGbVY1ykju0-Nh9bBHqJQo9FaJyK1F_tCFsXkGhSGxpGfOZwO56e4P4xY_TEZs9B7hJg_sn2-70gJ_5dQLOs3ylZKwhfm4hi7UWAIsLvWoPJMTBfTEcEojfBScRct66p2v3AfVtO_5sV81D7BWzwWDDCyqrT3qx7pXK3zFdHm32k5lgAOEJ_LOyf8kLyAjjYb9GHYB5r0iRzm1bBcUtdP4TmTIFT0L_R7Dw2OzzavT9L3rV1TJVaclLNzCn2aP" alt="avatar" />
          </div>
        </div>
      </header>

      <main className="ml-[260px] pt-16 h-screen flex flex-col">
        <div className="px-8 py-6 flex items-center justify-between bg-surface-container-low border-b border-white/5">
          <div>
            <nav className="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
              <span>Workflows</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span>Employee Onboarding v2.4</span>
            </nav>
            <div className="flex items-center gap-3">
              <h2 className="font-h2 text-on-surface">Simulation Instance: active_run_724</h2>
              <span className="bg-secondary-container/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded border border-secondary/30 uppercase tracking-tighter">Running</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-error-container text-on-error-container rounded-lg font-semibold text-sm hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stop_circle</span>
              Stop
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-fixed rounded-lg font-semibold text-sm hover:brightness-110 transition-all purple-glow">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Re-Run Simulation
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-3/5 bg-surface-container-lowest workflow-dot-grid relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-transparent to-surface-container-lowest pointer-events-none opacity-40"></div>

            <div className="relative w-full h-full p-12">
              <div className="absolute top-1/2 left-12 -translate-y-1/2 w-48 bg-surface-container-high border border-white/10 rounded-xl p-4 purple-glow ring-1 ring-violet-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-violet-400 text-sm">rocket_launch</span>
                  <span className="font-h3 text-xs uppercase tracking-wider text-violet-300">Trigger</span>
                </div>
                <p className="text-sm font-semibold mb-1">New Hire Entry</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-emerald-400 font-medium">Completed</span>
                </div>
              </div>

              <svg className="absolute top-1/2 left-60 -translate-y-1/2 w-24 h-4 pointer-events-none">
                <line x1="0" y1="8" x2="100%" y2="8" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2" />
              </svg>

              <div className="absolute top-1/2 left-[312px] -translate-y-1/2 w-48 bg-surface-container-high border border-white/10 rounded-xl p-4 purple-glow ring-1 ring-violet-500/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-violet-400 text-sm">account_tree</span>
                  <span className="font-h3 text-xs uppercase tracking-wider text-violet-300">Condition</span>
                </div>
                <p className="text-sm font-semibold mb-1">Role Verification</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-emerald-400 font-medium">Completed</span>
                </div>
              </div>

              <svg className="absolute top-1/2 left-[504px] -translate-y-1/2 w-32 h-64 pointer-events-none overflow-visible">
                <path d="M0,32 C40,32 40,-96 128,-96" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                <path d="M0,32 C40,32 40,160 128,160" fill="none" stroke="#494454" strokeWidth="2" />
              </svg>

              <div className="absolute top-[calc(50%-128px)] left-[632px] -translate-y-1/2 w-52 bg-surface-container-highest border-2 border-violet-500 rounded-xl p-4 purple-glow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-violet-400 text-sm">mail</span>
                  <span className="font-h3 text-xs uppercase tracking-wider text-violet-300">Action</span>
                </div>
                <p className="text-sm font-semibold mb-1">IT Equipment Provision</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full w-2/3"></div>
                  </div>
                  <span className="text-[10px] text-violet-400 font-bold">Processing</span>
                </div>
              </div>

              <div className="absolute top-[calc(50%+128px)] left-[632px] -translate-y-1/2 w-52 bg-surface-container-high border border-error-container/50 rounded-xl p-4 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-error text-sm">warning</span>
                  <span className="font-h3 text-xs uppercase tracking-wider text-error">Alert</span>
                </div>
                <p className="text-sm font-semibold mb-1 text-on-surface/50">Manual HR Review</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  <span className="text-[10px] text-gray-500 font-medium">Bypassed</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 flex items-center gap-2 bg-[#1A1D23] border border-white/10 rounded-full p-1.5">
                <button className="p-2 hover:bg-white/5 rounded-full"><span className="material-symbols-outlined text-lg">zoom_in</span></button>
                <div className="h-4 w-px bg-white/10"></div>
                <button className="p-2 hover:bg-white/5 rounded-full"><span className="material-symbols-outlined text-lg">zoom_out</span></button>
                <div className="h-4 w-px bg-white/10"></div>
                <button className="p-2 hover:bg-white/5 rounded-full"><span className="material-symbols-outlined text-lg">recenter</span></button>
              </div>
            </div>
          </div>

          <div className="w-2/5 bg-[#1A1D23] border-l border-white/10 flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-h3 text-on-surface">Execution Log</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Live Stream</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hidden p-6 space-y-4">
              <div className="group border-l-2 border-emerald-500 bg-white/5 p-3 rounded-r-lg transition-all hover:bg-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Success</span>
                  <span className="text-[10px] font-code text-gray-500">14:22:01.432</span>
                </div>
                <p className="font-semibold text-sm">Node [TRIGGER_NEW_HIRE] initialized.</p>
                <p className="text-xs text-gray-400 mt-1">Found record: <span className="text-violet-400">#E-99231 (Sarah Jenkins)</span></p>
              </div>

              <div className="border-l-2 border-emerald-500 bg-white/5 p-3 rounded-r-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Success</span>
                  <span className="text-[10px] font-code text-gray-500">14:22:02.109</span>
                </div>
                <p className="font-semibold text-sm">Condition [ROLE_VERIFY] passed.</p>
                <p className="text-xs text-gray-400 mt-1">Evaluated: <span className="italic">'Engineering' matches 'Remote_Global'</span></p>
              </div>

              <div className="border-l-2 border-violet-500 bg-violet-500/10 p-3 rounded-r-lg purple-glow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-tighter">Processing</span>
                  <span className="text-[10px] font-code text-gray-500">14:22:04.001</span>
                </div>
                <p className="font-semibold text-sm">Action [IT_PROVISION] executing...</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs animate-spin">refresh</span>
                  <span className="text-[10px] text-violet-300">Connecting to Azure AD API...</span>
                </div>
              </div>

              <div className="border-l-2 border-error-container bg-error-container/10 p-3 rounded-r-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-error uppercase tracking-tighter">Failed</span>
                  <span className="text-[10px] font-code text-gray-500">14:22:04.872</span>
                </div>
                <p className="font-semibold text-sm">Node [DEPT_SYNC] validation error.</p>
                <div className="bg-surface-container-lowest p-2 rounded mt-2 border border-error-container/30">
                  <p className="text-xs font-code text-error-container">Error: 403 Forbidden. Invalid API credentials for 'Dept_Sync_Service'.</p>
                </div>
              </div>

              <div className="border-l-2 border-gray-600 bg-white/5 p-3 rounded-r-lg opacity-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Queued</span>
                  <span className="text-[10px] font-code text-gray-500">Waiting...</span>
                </div>
                <p className="font-semibold text-sm text-gray-400">Action [SEND_WELCOME_EMAIL]</p>
                <p className="text-xs text-gray-600 mt-1 italic">Awaiting completion of previous step</p>
              </div>

              <div className="border-l-2 border-gray-600 bg-white/5 p-3 rounded-r-lg opacity-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Queued</span>
                  <span className="text-[10px] font-code text-gray-500">Waiting...</span>
                </div>
                <p className="font-semibold text-sm text-gray-400">Action [FINALIZE_DOCUMENTS]</p>
              </div>
            </div>

            <div className="p-6 bg-surface-container-high border-t border-white/10">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Steps</p>
                  <p className="text-xl font-h2">12</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">Success</p>
                  <p className="text-xl font-h2 text-emerald-400">2</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-error uppercase font-bold tracking-widest">Failures</p>
                  <p className="text-xl font-h2 text-error">1</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/5 transition-all text-gray-400">
                Download Execution Report (.JSON)
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-[42%] z-50 flex items-center gap-2 bg-[#1A1D23]/90 backdrop-blur border border-white/10 rounded-xl p-3 shadow-2xl">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-[#1A1D23] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADznyJJZg-CKqfjM1YbCsVo6W7j-4iRLF5bujSZmcgoKi4XW2NFNtDRoNQTPSDOCBcZ2lTG_UURzO4YiMG7LBzha-bRLIlOwqUOWCi8wN8XAp6d2cPnFS8tuqgv5iM668JMVm9q5uqIsNfhm2OsDGw88NKqet-cLz7Jl1E7NdjDXkADb0BLE4bP3PTXXnieqJMugUEMsJ1w1Tc5LcCoRLcD6xAggVVJ03hCKIvSoxLZvA5xZDBAYYIY0heG80sKvOEvwIQRFxnhcB8" alt="avatar" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-[#1A1D23] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnuEC-YhKVrEUZ1yeHVfexSHcAt9C8_tCoIiJZLcpljWD51mJEjsX3tTQI6jZNn5n6P9HVPunr6SFt9MDZ1EI1o4Y3NaUvrUsmxASOMn0LNrDJVztCh62fATiDkGJOA0521d3YgkH7O_fjnVm3bEW0u86XCcbWXrzgnScyNwY32V3OaXc88lOMAbhsB8l25WxAr0Sttd7cfSB4nQdgeFt9jONa3hjWzUkRYBkvqUGjUtPp1ZA8KoimpJyVlbykJ5NRhwfL8EzD9jnU" alt="avatar" />
          </div>
        </div>
        <div className="h-4 w-px bg-white/10 mx-2"></div>
        <p className="text-[10px] font-medium text-gray-400">2 Architects viewing this run</p>
      </div>
    </div>
  );
};
