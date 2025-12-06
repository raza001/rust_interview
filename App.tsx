import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CodeBlock } from './components/CodeBlock';
import { GeneratorModal } from './components/GeneratorModal';
import { RUST_DATA } from './constants';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  // Filter logic
  const filteredCategories = useMemo(() => {
    let cats = activeCategory === 'all' 
      ? RUST_DATA 
      : RUST_DATA.filter(c => c.id === activeCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      cats = cats.map(cat => ({
        ...cat,
        snippets: cat.snippets.filter(s => 
          s.title.toLowerCase().includes(query) || 
          s.description.toLowerCase().includes(query) ||
          s.tags.some(t => t.toLowerCase().includes(query)) ||
          s.code.toLowerCase().includes(query)
        )
      })).filter(cat => cat.snippets.length > 0);
    }
    return cats;
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f1012] selection:bg-rust-500/30">
      <Sidebar 
        categories={RUST_DATA}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full w-full relative min-w-0">
        <Header 
          onSearch={setSearchQuery} 
          onMenuClick={() => setMobileMenuOpen(true)}
          onGenerateClick={() => setShowGenerator(true)}
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            
            {/* Hero Section */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="mb-12 pt-4 relative animate-in fade-in slide-in-from-top-4 duration-700">
                 <div className="absolute -top-10 -left-10 w-48 h-48 bg-rust-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                 <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust-500 to-yellow-500">Rust</span> Patterns
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                        The essential reference for production-grade Rust. 
                        Curated idioms, syntax, and advanced concepts for interviews and daily development.
                    </p>
                 </div>
              </div>
            )}

            {filteredCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-[#1e2329] rounded-2xl border border-white/5 flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-4xl">🔭</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No patterns found</h3>
                <p className="text-gray-500 max-w-md">We couldn't find a match for "{searchQuery}". Ask our AI to generate a custom example for you.</p>
                <button 
                  onClick={() => setShowGenerator(true)}
                  className="mt-8 px-6 py-2.5 bg-rust-600 hover:bg-rust-500 text-white rounded-full font-medium transition-all shadow-lg shadow-rust-500/20"
                >
                  Generate Example
                </button>
              </div>
            ) : (
              <div className="space-y-16 pb-20">
                {filteredCategories.map(category => (
                  <div key={category.id} className="scroll-mt-24" id={category.id}>
                    <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0f1012]/95 backdrop-blur-sm z-10 py-4 -mx-4 px-4 border-b border-transparent">
                       <h3 className="text-xl md:text-2xl font-bold text-gray-200 tracking-tight flex items-center gap-3">
                          <span className="text-rust-500/50">#</span> {category.title}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {category.snippets.map(snippet => (
                        <CodeBlock 
                          key={snippet.id} 
                          {...snippet} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        {/* Floating AI FAB for mobile */}
        <button
          onClick={() => setShowGenerator(true)}
          className="sm:hidden absolute bottom-6 right-6 w-14 h-14 bg-rust-600 text-white rounded-full shadow-[0_4px_20px_rgba(234,88,12,0.4)] flex items-center justify-center z-30 active:scale-95 transition-transform border border-white/10"
        >
          <Sparkles size={24} className="fill-white/20" />
        </button>
      </div>

      {showGenerator && <GeneratorModal onClose={() => setShowGenerator(false)} />}
    </div>
  );
}

export default App;