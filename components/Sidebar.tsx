import React from 'react';
import { Category } from '../types';
import { Terminal, ShieldCheck, Box, Layers, Cpu, Briefcase, Hash, AlertTriangle, Zap } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const IconMap: Record<string, React.ReactNode> = {
  'Terminal': <Terminal size={18} />,
  'ShieldCheck': <ShieldCheck size={18} />,
  'Box': <Box size={18} />,
  'Layers': <Layers size={18} />,
  'Cpu': <Cpu size={18} />,
  'Briefcase': <Briefcase size={18} />,
  'Hash': <Hash size={18} />,
  'AlertTriangle': <AlertTriangle size={18} />,
  'Zap': <Zap size={18} />,
};

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onSelectCategory, isOpen, onCloseMobile }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#09090b] border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand */}
        <div className="p-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rust-500 to-rust-600 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(240,107,20,0.4)]">
                <span className="text-lg">R</span>
            </div>
            <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                    Rust<span className="text-rust-500">Ace</span>
                </h1>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">Cheat Sheet</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-0.5 custom-scrollbar">
          <button
             onClick={() => { onSelectCategory('all'); onCloseMobile(); }}
             className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group mb-4 ${
               activeCategory === 'all' 
                 ? 'bg-gradient-to-r from-rust-500/10 to-transparent text-rust-500 border-l-2 border-rust-500' 
                 : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
             }`}
          >
            <Layers size={18} className={activeCategory === 'all' ? 'text-rust-500' : 'text-gray-500 group-hover:text-white'} />
            All Patterns
          </button>

          <div className="px-3 pb-2 pt-2">
            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Core Modules</h3>
          </div>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { onSelectCategory(cat.id); onCloseMobile(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                activeCategory === cat.id
                  ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`transition-colors duration-200 ${activeCategory === cat.id ? 'text-rust-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                {IconMap[cat.icon] || <Hash size={18} />}
              </span>
              {cat.title}
            </button>
          ))}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-white/5">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                    Need more patterns? Use the AI generator.
                </p>
                 <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Gemini Powered
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};