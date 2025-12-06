import React from 'react';
import { Search, Menu, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onMenuClick: () => void;
  onGenerateClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onMenuClick, onGenerateClick }) => {
  return (
    <div className="sticky top-0 z-30 px-4 py-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-3 lg:gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2.5 text-gray-400 hover:text-white bg-[#1e2329] border border-white/10 hover:border-white/20 rounded-lg shadow-sm"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 relative flex items-center gap-2">
            <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-rust-500 transition-colors" />
                </div>
                <input
                type="text"
                placeholder="Search concepts (e.g. 'vectors', 'lifetimes')..."
                className="block w-full pl-10 pr-4 py-3 bg-[#1e2329]/80 backdrop-blur-md border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rust-500/50 focus:border-rust-500/50 sm:text-sm shadow-lg shadow-black/20 transition-all"
                onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            
            <button
                onClick={onGenerateClick}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-rust-600 to-rust-500 hover:from-rust-500 hover:to-rust-400 text-white pl-4 pr-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-rust-500/20 hover:shadow-rust-500/30 active:scale-95 border border-white/10"
            >
                <Sparkles size={16} className="fill-white/20" />
                <span>AI Generate</span>
            </button>
          </div>
      </div>
    </div>
  );
};