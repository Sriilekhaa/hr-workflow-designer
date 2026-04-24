import React from 'react';

export const TopAppBar: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-[260px] h-16 bg-[#1A1D23]/80 backdrop-blur-md border-b border-white/10 z-40 flex items-center justify-between px-8 w-full font-inter text-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">search</span>
          <input
            type="text"
            placeholder="Search logic, nodes, or logs..."
            className="w-full bg-[#0B0E14] border border-[#333333] rounded-lg py-2 pl-10 pr-4 text-on-surface placeholder:text-gray-600 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:bg-white/5 rounded-lg transition-all active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-gray-400 hover:bg-white/5 rounded-lg transition-all active:scale-95">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        <div className="h-6 w-px bg-white/10 mx-2"></div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Create Workflow
        </button>
      </div>
    </header>
  );
};
