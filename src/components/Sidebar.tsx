import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 font-inter text-sm font-medium tracking-tight',
          isActive
            ? 'relative text-white bg-white/5 before:absolute before:left-0 before:h-full before:w-1 before:bg-violet-500 before:rounded-r-full'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className={clsx("material-symbols-outlined", isActive && "text-violet-500")}>
            {icon}
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-[#1A1D23] flex flex-col py-6 px-4 z-50">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_tree
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-violet-500 leading-none">HR Flow</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Systems Architect</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem to="/" icon="dashboard" label="Dashboard" />
        <SidebarItem to="/workflows" icon="account_tree" label="Workflows" />
        <SidebarItem to="/automations" icon="auto_mode" label="Automations" />
        <SidebarItem to="/logs" icon="history" label="Logs" />
        <SidebarItem to="/templates" icon="description" label="Templates" />
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5 space-y-1">
        <SidebarItem to="/settings" icon="settings" label="Settings" />
        <SidebarItem to="/help" icon="help" label="Help" />

        <div className="flex items-center gap-3 mt-6 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
          <img
            alt="HR Operations Architect Profile"
            className="w-8 h-8 rounded-full object-cover border border-violet-500/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjD7rlMO-NsJqwROW2wb_ICroKVRVSDejFFYp__sRAiJNKk6ohFD2mG9ZF-w2jr1Cji9ZsUTUyGyntmqCPql8maTBVIv5QwVmZZZL5OPlPsaPX_AKcL5HTUWvEFsyNo7Ucrx6K0wqtYnxyTdbZExQb-iQbaYu9fte63q8ylUXiYddhdU6Efg5ikZ2SDSoMt4KwAhAyVy1ewjFShyMzYTEeIGCDTXm8xxVGO-rc1XsCUES0DAWQRGRHZr6e2PGP7o7uzOKkdvLEcKOb"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">Marcus Chen</p>
            <p className="text-[10px] text-gray-500 truncate">Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
