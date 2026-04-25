import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { templatesData } from '../data/templatesData';

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const displayedTemplates = showAll ? templatesData : templatesData.slice(0, 12);

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
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-medium text-primary hover:text-primary-fixed hover:bg-primary/10 px-4 py-2 rounded-lg transition-all flex items-center gap-1 border border-transparent hover:border-primary/20"
            >
              {showAll ? "Show Less" : "Show More"}
              <span className="material-symbols-outlined text-[16px]">
                {showAll ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedTemplates.map((template) => (
              <div key={template.id} className="bg-[#1A1D23] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/40 transition-all flex flex-col h-[320px]">
                <div className="h-36 bg-[#252932] relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
                    src={template.image}
                    alt={template.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D23] to-transparent"></div>
                  {template.isPopular && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded border border-primary/30 backdrop-blur-md">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-h3 text-h3 text-white line-clamp-1">{template.title}</h4>
                  <p className="text-sm text-gray-400 mt-1.5 flex-1 line-clamp-3 leading-relaxed">{template.description}</p>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex -space-x-2">
                      {template.icons.map((icon, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full border-2 border-[#1A1D23] ${icon.bg} flex items-center justify-center text-[10px] shadow-lg`}>
                          <span className="material-symbols-outlined text-[12px] text-white">{icon.name}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => navigate('/designer')}
                      className="text-xs font-semibold text-white bg-white/5 hover:bg-white/10 hover:text-primary transition-all px-4 py-2 rounded-lg border border-white/5 hover:border-primary/30"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};
