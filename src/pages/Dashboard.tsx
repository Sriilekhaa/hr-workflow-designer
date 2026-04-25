import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#05050A] text-white relative overflow-hidden font-inter selection:bg-violet-500/30 flex items-center justify-center">
      {/* 16:9 Aspect Ratio Container for Cinematic Look */}
      <div className="w-full max-w-[1920px] aspect-video relative flex flex-col">
        
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 workflow-dot-grid opacity-30 pointer-events-none"></div>
        <div className="absolute top-[10%] right-[5%] w-[40%] h-[60%] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[60%] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Tech Borders */}
        <div className="absolute inset-6 border border-white/5 rounded-3xl pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-violet-500/30 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-violet-500/30 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-violet-500/30 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-violet-500/30 rounded-br-3xl"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col p-12">
          
          {/* Header */}
          <header className="flex items-center justify-between pb-6 mb-8 z-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-violet-500">account_tree</span>
                <span className="text-2xl font-bold tracking-tight text-white">HR Flow</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">Systems Architecture</span>
              </div>
            </div>
            
            <nav className="flex items-center gap-8">
              <button onClick={() => navigate('/workflows')} className="text-sm text-gray-400 hover:text-white transition-colors">Workflows</button>
              <button onClick={() => navigate('/automations')} className="text-sm text-gray-400 hover:text-white transition-colors">Automations</button>
              <button onClick={() => navigate('/logs')} className="text-sm text-gray-400 hover:text-white transition-colors">Logs</button>
              <button 
                onClick={() => navigate('/designer')}
                className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Workflow
              </button>
            </nav>
          </header>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-2 gap-12 items-center z-10">
            
            {/* Left Column: Hero Text */}
            <div className="space-y-8 pl-4">
              <div>
                <h1 className="text-6xl 2xl:text-7xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  SHAPE THE FUTURE OF <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(167,139,250,0.4)]">
                    HR AUTOMATION
                  </span>
                </h1>
                <p className="text-xl 2xl:text-2xl text-gray-300 mt-6 font-medium leading-relaxed max-w-xl">
                  The ultimate agentic platform to design, simulate, and deploy complex HR logic across your entire ecosystem.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => navigate('/workflows')}
                  className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg transition-all hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Open Dashboard
                </button>
                <button 
                  onClick={() => navigate('/designer')}
                  className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-10 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  View Case Study
                </button>
              </div>

              {/* Key Details Panel */}
              <div className="bg-[#12141A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xl shadow-2xl relative overflow-hidden group mt-12">
                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <span className="text-gray-400 w-40 font-medium">Core Engine:</span>
                    <span className="text-white font-semibold">Zero-to-One Agentic Deployment</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-gray-400 w-40 font-medium">Execution:</span>
                    <span className="text-white font-semibold">Asynchronous Node Logic</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-gray-400 w-40 font-medium">Integration:</span>
                    <span className="text-white font-semibold">Native HRIS & Database Sync</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Visualization Mock */}
            <div className="relative h-full w-full bg-[#0A0C10]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden mr-4">
              <div className="absolute inset-0 workflow-dot-grid opacity-20"></div>
              
              <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                Workflow Sandbox Panel
              </div>

              {/* Nodes Mockup */}
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-12 z-10 scale-[1.1] 2xl:scale-[1.2]">
                
                {/* Lines */}
                <div className="absolute top-[10%] bottom-[10%] left-1/2 w-0 border-l-2 border-dashed border-violet-500/40 animate-pulse z-0"></div>

                {/* Start Node */}
                <div className="relative z-10 w-56 bg-[#1A1D24] border border-emerald-500/50 rounded-xl p-4 shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400 text-xl">play_arrow</span>
                  </div>
                  <span className="text-white text-sm font-bold uppercase tracking-wider">Start Trigger</span>
                </div>

                {/* Task Node */}
                <div className="relative z-10 w-72 bg-[#1A1D24] border border-blue-500/50 rounded-xl p-4 shadow-2xl flex flex-col gap-2 translate-x-12">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400 text-lg">code</span>
                    </div>
                    <span className="text-white text-sm font-bold uppercase tracking-wider">Evaluation Logic</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-11">Running automated script validation</p>
                </div>

                {/* Approval Node */}
                <div className="relative z-10 w-72 bg-[#1A1D24] border border-amber-500/50 rounded-xl p-4 shadow-2xl flex flex-col gap-2 -translate-x-12">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-400 text-lg">person</span>
                    </div>
                    <span className="text-white text-sm font-bold uppercase tracking-wider">Manager Approval</span>
                  </div>
                  <p className="text-xs text-gray-400 ml-11">Awaiting manual sign-off from HR</p>
                </div>

                {/* End Node */}
                <div className="relative z-10 w-56 bg-[#1A1D24] border border-red-500/50 rounded-xl p-4 shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-400 text-xl">stop_circle</span>
                  </div>
                  <span className="text-white text-sm font-bold uppercase tracking-wider">End Process</span>
                </div>

              </div>

              {/* Assessment Criteria Floating Panel */}
              <div className="absolute right-6 bottom-6 z-20 w-72 bg-[#12141A]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Execution Log</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <div className="p-4 font-code text-[10px] text-gray-400 space-y-2 leading-relaxed">
                  <p>› Initiating automated sequence...</p>
                  <p className="text-emerald-400">› Evaluation successful (14ms)</p>
                  <p>› Sending webhook to slack-api</p>
                  <p className="text-violet-400 font-bold">› Status: STANDBY_APPROVAL</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
