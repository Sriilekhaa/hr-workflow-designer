import React, { useCallback } from 'react';
import { nodeRegistry, getNodeTypes } from '../../services/nodeRegistry';

const NodePalette: React.FC = () => {
  const handleDragStart = useCallback(
    (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  return (
    <section className="bg-[#1A1D23] border-r border-white/10 flex flex-col z-20">
      <div className="p-6 border-b border-white/5">
        <h2 className="font-h2 text-h3 text-white">Node Library</h2>
        <p className="text-xs text-gray-500 mt-1">Drag components to canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {getNodeTypes().map((type) => {
          const entry = nodeRegistry[type];
          return (
            <div
              key={type}
              className="p-4 bg-surface-container rounded-xl border border-white/5 cursor-grab active:cursor-grabbing hover:border-violet-500/50 transition-all group"
              onDragStart={(event) => handleDragStart(event, type)}
              draggable
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 ${entry.iconBg} rounded-lg`}>
                  <span className={`material-symbols-outlined ${entry.iconColor} text-xl`}>
                    {entry.icon}
                  </span>
                </div>
                <span className="font-semibold text-sm text-on-surface">{entry.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">{entry.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NodePalette;
