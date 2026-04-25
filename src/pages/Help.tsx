import React from 'react';
import { Layout } from '../components/Layout';

export const Help: React.FC = () => {
  return (
    <Layout>
      <div className="flex-1 p-8 h-[calc(100vh-64px)] overflow-y-auto bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-h1 text-h1 text-on-surface mb-2">Help Center</h2>
          <p className="text-on-surface-variant font-body-lg mb-8">Find answers to your questions.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack_gap">
            <div className="bg-[#1A1D23] border border-white/5 rounded-xl p-card_padding">
              <span className="material-symbols-outlined text-primary mb-2 text-3xl">book</span>
              <h3 className="text-xl font-semibold text-white mb-2">Documentation</h3>
              <p className="text-sm text-gray-400">Read detailed guides on setting up your HR workflows.</p>
            </div>
            <div className="bg-[#1A1D23] border border-white/5 rounded-xl p-card_padding">
              <span className="material-symbols-outlined text-primary mb-2 text-3xl">support_agent</span>
              <h3 className="text-xl font-semibold text-white mb-2">Contact Support</h3>
              <p className="text-sm text-gray-400">Get in touch with our technical support team.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
