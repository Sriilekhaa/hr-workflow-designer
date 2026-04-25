import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#030305] text-white relative overflow-hidden font-['Outfit'] selection:bg-violet-500/30 flex flex-col">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-[20%] w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-8 md:px-16 py-8 w-full max-w-[1800px] mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-500">
              <span className="material-symbols-outlined text-white text-2xl">account_tree</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">HR Flow</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/[0.05] backdrop-blur-md">
          <button onClick={() => navigate('/workflows')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Workflows</button>
          <button onClick={() => navigate('/automations')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Automations</button>
          <button onClick={() => navigate('/logs')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Logs</button>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <button 
            onClick={() => navigate('/designer')}
            className="group relative flex items-center gap-2 text-white text-sm font-bold tracking-wide transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 rounded-lg flex items-center gap-2 border border-white/10">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Workflow
            </div>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full max-w-[1800px] mx-auto px-8 md:px-16 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center w-full">
          
          {/* Left Column: Hero Text */}
          <div className="flex flex-col items-start gap-8 z-20 w-full max-w-2xl">
            
            {/* Sleek Badge */}
            <div className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full flex items-center gap-2.5 backdrop-blur-md shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
              <span className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.25em]">Tredence Studio</span>
            </div>

            {/* Main Typography */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Shape the future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                HR Automation.
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl mt-[-8px]">
              The ultimate agentic platform to visually map, simulate, and deploy complex human resources logic across your entire corporate ecosystem.
            </p>

            {/* Premium Buttons */}
            <div className="flex flex-wrap items-center gap-5 mt-2">
              <button 
                onClick={() => navigate('/workflows')}
                className="group px-8 py-3.5 bg-white text-black rounded-full font-bold text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
              >
                Open Dashboard
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>

            {/* Restored Value Props List */}
            <div className="mt-6 w-full max-w-xl relative p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-indigo-500 rounded-l-2xl"></div>
              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-gray-500 text-sm font-medium w-36 uppercase tracking-wider">Core Engine:</span>
                  <span className="text-white text-sm font-semibold tracking-wide">Zero-to-One Agentic Deployment</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-gray-500 text-sm font-medium w-36 uppercase tracking-wider">Execution:</span>
                  <span className="text-white text-sm font-semibold tracking-wide">Asynchronous Node Logic</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-gray-500 text-sm font-medium w-36 uppercase tracking-wider">Integration:</span>
                  <span className="text-white text-sm font-semibold tracking-wide">Native HRIS & Database Sync</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Visualization Mock */}
          <div className="relative w-full aspect-square max-w-[700px] ml-auto flex items-center justify-center mt-12 xl:mt-0">
            
            {/* Soft Glass Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] rounded-[40px] backdrop-blur-3xl shadow-[0_0_80px_rgba(139,92,246,0.1)]"></div>
            
            <div className="absolute top-8 left-8 px-4 py-2 bg-white/[0.05] border border-white/[0.05] rounded-full text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg backdrop-blur-xl">
              Workflow Sandbox
            </div>

            {/* Nodes Container */}
            <div className="relative w-full flex flex-col items-center gap-8 z-10">
              
              {/* Central Dashed Line */}
              <div className="absolute top-[5%] bottom-[5%] w-px border-l border-dashed border-white/15 z-0" style={{ left: 'calc(50% - 138px)' }}></div>

              {/* Start Node */}
              <div className="group relative z-10 w-[340px] bg-[#0A0A0F]/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-2 shadow-2xl flex items-center gap-4 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] shrink-0">
                  <span className="material-symbols-outlined text-emerald-400 text-[22px]">play_arrow</span>
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-widest">Start Trigger</span>
              </div>

              {/* Task Node */}
              <div className="group relative z-10 w-[340px] bg-[#0A0A0F]/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-2 shadow-2xl flex items-center gap-4 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] shrink-0">
                  <span className="material-symbols-outlined text-blue-400 text-[22px]">code</span>
                </div>
                <div className="flex flex-col justify-center py-1">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Evaluation Logic</span>
                  <p className="text-[11px] text-gray-500 mt-1 font-light">Running automated script validation</p>
                </div>
              </div>

              {/* Approval Node */}
              <div className="group relative z-10 w-[340px] bg-[#0A0A0F]/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-2 shadow-2xl flex items-center gap-4 hover:border-amber-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] shrink-0">
                  <span className="material-symbols-outlined text-amber-400 text-[22px]">person</span>
                </div>
                <div className="flex flex-col justify-center py-1">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Manager Approval</span>
                  <p className="text-[11px] text-gray-500 mt-1 font-light">Awaiting manual sign-off from HR</p>
                </div>
              </div>

              {/* End Node */}
              <div className="group relative z-10 w-[340px] bg-[#0A0A0F]/90 backdrop-blur-xl border border-red-500/20 rounded-2xl p-2 shadow-2xl flex items-center gap-4 hover:border-red-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] shrink-0">
                  <span className="material-symbols-outlined text-red-400 text-[22px]">stop_circle</span>
                </div>
                <span className="text-white text-xs font-bold uppercase tracking-widest">End Process</span>
              </div>

            </div>

            {/* Execution Log Panel - Floating Overlap */}
            <div className="absolute right-[-24px] bottom-[-24px] z-30 w-[340px] bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-white/20 transition-colors duration-300">
              <div className="bg-white/[0.02] px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Execution Terminal</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
              <div className="p-5 font-code text-xs text-gray-500 space-y-2.5 leading-relaxed">
                <p className="flex gap-3"><span className="text-gray-700">›</span> Initiating sequence...</p>
                <p className="flex gap-3 text-emerald-400/90"><span className="text-emerald-500/50">›</span> Evaluation successful (14ms)</p>
                <p className="flex gap-3 text-violet-400 font-medium"><span className="text-violet-500/50">›</span> Status: STANDBY_APPROVAL</p>
                <p className="flex gap-3 animate-pulse"><span className="text-gray-700">›</span> <span className="w-2 h-4 bg-white/20"></span></p>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};
