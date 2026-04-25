import React from 'react';
import { Layout } from '../components/Layout';

export const Settings: React.FC = () => {
  return (
    <Layout>
      <div className="flex-1 p-8 h-[calc(100vh-64px)] overflow-y-auto bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-h1 text-h1 text-on-surface mb-2">Settings</h2>
          <p className="text-on-surface-variant font-body-lg mb-8">Manage your account and preferences.</p>
          
          <div className="bg-[#1A1D23] border border-white/5 rounded-xl p-card_padding">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input type="text" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-2 text-white" defaultValue="sriii" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Role</label>
                <input type="text" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-2 text-white" defaultValue="Architect" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
