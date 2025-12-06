import React from 'react';
import { Search, Menu, Sparkles, Command } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
  onMenuClick: () => void;
  onGenerateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onMenuClick, onGenerateClick }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#0f1012]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0f1012]/60">
      <div className="flex h-16 items-center px-4 lg:px-8 max-w-7xl mx-auto gap-4">
        
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Logo (Visible on mobile/tablet or if sidebar is collapsed) */}
        <div className="lg:hidden flex items-center gap-2 font-bold text-white">
            <div className="w-6 h-6 bg-rust-500 rounded flex items-center justify-center text-[10px]">R</div>
            <span>RustAce</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-2xl mx-auto w-full">
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500 group-focus-within:text-rust-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search for concepts..."
                    className="block w-full pl-10 pr-12 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rust-500/50 focus:border-rust-500/50 focus:bg-[#161b22] transition-all"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-500">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
             <button
                onClick={onGenerateClick}
                className="hidden sm:flex items-center gap-2 bg-rust-600 hover:bg-rust-500 text-white pl-3 pr-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-lg shadow-rust-500/20 active:scale-95 border border-white/10"
            >
                <Sparkles size={14} className="fill-white/20" />
                <span>Ask AI</span>
            </button>
        </div>
      </div>
    </header>
  );
};