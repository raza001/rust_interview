import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { generateExample } from '../services/geminiService';
import { CodeBlock } from './CodeBlock';

interface GeneratorModalProps {
  onClose: () => void;
}

export const GeneratorModal: React.FC<GeneratorModalProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{code: string, explanation: string} | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    setResult(null);
    const data = await generateExample(topic);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-dark-bg border border-dark-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-card/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-rust-500/20 rounded-md">
                <Sparkles className="w-5 h-5 text-rust-500" />
            </div>
            <h2 className="text-lg font-semibold text-white">AI Example Generator</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {!result && (
            <div className="mb-8 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Ask Gemini to generate a production-ready Rust code example for any topic not covered in the cheat sheet.
              </p>
            </div>
          )}

          <form onSubmit={handleGenerate} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 'Async file reading', 'Custom Iterator', 'Tokio runtime'"
                className="flex-1 bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rust-500 focus:ring-1 focus:ring-rust-500"
                autoFocus
              />
              <button 
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-rust-600 hover:bg-rust-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>

          {result && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={16} className="text-rust-500"/>
                    <span className="text-xs text-rust-500 uppercase font-bold tracking-wider">AI Generated Result</span>
                </div>
                <CodeBlock 
                    id="generated"
                    title={topic}
                    description={result.explanation}
                    tags={['AI', 'Generated']}
                    code={result.code}
                />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};