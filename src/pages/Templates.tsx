import React from 'react';
import { Layout } from '../components/Layout';

export const Templates: React.FC = () => {
  return (
    <Layout>
      <div className="flex-1 workflow-dot-grid p-8 h-[calc(100vh-64px)] overflow-y-auto bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-10">
            <h2 className="font-h1 text-h1 text-on-surface">Template Library</h2>
            <p className="text-on-surface-variant font-body-lg mt-2">Start with pre-built HR workflows and customize them to your needs.</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">library_books</span>
              <h3 className="font-h2 text-h2 text-on-surface">Available Templates</h3>
            </div>
            <button 
              onClick={() => alert("Loading full template library (24 items)...")}
              className="text-sm font-medium text-primary hover:text-primary-fixed hover:bg-primary/10 px-4 py-2 rounded-lg transition-all flex items-center gap-1 border border-transparent hover:border-primary/20"
            >
              View All 24 Templates
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-[#1A1D23] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/40 transition-all flex flex-col">
              <div className="h-48 bg-[#252932] relative">
                <img
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBirCSlkm4li8kBxXm_pPydCjVhezUfizahj8BmStJ8Q7GhGuCCSickNIU9RSD7BTgpnBd3iQd17WlYMb6-L8JTyk9-6eh9oOzAoHWh_1bx2meGnt73Hd2EIbOB1SSejPXuh462G1Oy4PiCB5BWXWCTLPWrl2wtUi1R2yROcAosLRgW7V90UKNJpH9gORxOB2vhjZGl91C5dezDhr_jl0HMl6wuhEtpP6XHuKEUkboOaXVhAlDtxtXCkcqf4khdnj5XjAUzo0-KvtpI"
                  alt="office"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] to-transparent"></div>
                <span className="absolute top-4 right-4 px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded border border-primary/30">POPULAR</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-h3 text-h3 text-white">Employee Onboarding</h4>
                <p className="text-sm text-gray-400 mt-2 flex-1">Complete multi-stage flow including document signing, account provisioning, and welcome sequences.</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-blue-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">mail</span></div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-amber-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">description</span></div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-pink-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">chat</span></div>
                  </div>
                  <button className="text-sm font-semibold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Use Template</button>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1D23] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/40 transition-all flex flex-col">
              <div className="h-48 bg-[#252932] relative">
                <img
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYljLh1wXdsizPTA3MORA4bdpiz9Pr1tzMobnM4MYTazC4K7v9se-l3MtXVMzS9ZwHbiCmTEITM52ALUhCIEJ57IT5BAGaoT7sXlEAMD7erJY7On5b1OTXX3_bOLK1OLKIlySk782oRhNJpcx2L34WxYIifjF4npH1fHjXL02nSyqPTJcuCy0wYXlMJXtlWw8ynb2ujJbGU4Q3xfvlI4L7kY3cH3_FsY3bn309oZ6acsNObnTG4Ila_SmShOhEqBnpvMcEcHqk4wyL"
                  alt="ocean"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] to-transparent"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-h3 text-h3 text-white">Leave Approval</h4>
                <p className="text-sm text-gray-400 mt-2 flex-1">Manager approval chain with automated calendar sync and balance deduction logic.</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-indigo-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">database</span></div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-blue-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">mail</span></div>
                  </div>
                  <button className="text-sm font-semibold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Use Template</button>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1D23] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/40 transition-all flex flex-col">
              <div className="h-48 bg-[#252932] relative">
                <img
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_3wufRZ-EeDD6aQFsFOti5Sx_uHUyMyIk7QyKi7pQspqT6JpOImV4krnrxgSggbM9p1HGUZCpD4oGaugCyMd0U_ZmlmXSt1O46qeloNwmKo9pmpCcM5H4qP6oD1dPDKB-prcG67gCN-Qc4E8XZlbdOyNTGMqjkyiDDdyGiAU-eEhDJ843u0r__WWXl1igLBuln_c58jwzhC7SBmY3OGWzqD5nrBHXJMAFgptmTzjLqbbUafj_SsuoZxXoFL_fUlSxG4DPVpaEAW9K"
                  alt="tech"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] to-transparent"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-h3 text-h3 text-white">Document Verification</h4>
                <p className="text-sm text-gray-400 mt-2 flex-1">Automated OCR and compliance check for IDs, certifications, and legal documents.</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-amber-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">description</span></div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-pink-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">chat</span></div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#1A1D23] bg-emerald-500 flex items-center justify-center text-[10px]"><span className="material-symbols-outlined text-[12px]">verified_user</span></div>
                  </div>
                  <button className="text-sm font-semibold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Use Template</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
