import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Zap, Terminal, Maximize2 } from 'lucide-react';
import { explainCode } from '../services/geminiService';

interface CodeBlockProps {
  code: string;
  title: string;
  description: string;
  tags: string[];
  id: string;
}

const SyntaxHighlighter: React.FC<{ code: string }> = ({ code }) => {
  const tokens = code.split(/(\s+|[(){}[\]<>,;:.=&|!?])/g);

  const keywords = new Set([
    'fn', 'let', 'mut', 'struct', 'enum', 'impl', 'use', 'mod', 'pub', 'crate',
    'match', 'if', 'else', 'while', 'for', 'loop', 'return', 'break', 'continue',
    'where', 'type', 'trait', 'const', 'static', 'unsafe', 'async', 'await', 'move', 'dyn', 'ref'
  ]);
  
  const types = new Set([
    'i32', 'i64', 'u8', 'u32', 'u64', 'f32', 'f64', 'bool', 'char', 'str', 'String', 
    'Vec', 'Option', 'Result', 'Box', 'Rc', 'Arc', 'Mutex', 'Self', '&str', 'usize',
    'HashMap', 'BTreeMap', 'Cell', 'RefCell', 'Some', 'None', 'Ok', 'Err', 'Duration', 'Thread'
  ]);

  const literals = /^\d+(_\d+)*(\.\d+)?$|^".*"$|^'.*'$|^true$|^false$/;
  const lifetime = /^'[a-z]+$/;
  const functionCall = /^[a-z_]+(?=\()/;

  return (
    <pre className="font-mono text-[13px] leading-6 whitespace-pre">
      {tokens.map((token, i) => {
        if (keywords.has(token)) return <span key={i} className="text-[#ff7b72] font-medium">{token}</span>; // Red/Pink
        if (types.has(token) || /^[A-Z]/.test(token)) return <span key={i} className="text-[#d2a8ff]">{token}</span>; // Purple
        if (literals.test(token)) return <span key={i} className="text-[#a5d6ff]">{token}</span>; // Light Blue
        if (lifetime.test(token)) return <span key={i} className="text-[#79c0ff] italic">{token}</span>; // Blue
        if (token.startsWith('//')) return <span key={i} className="text-[#8b949e] italic">{token}</span>; // Gray
        if (token.startsWith('macro_rules!') || token.endsWith('!')) return <span key={i} className="text-[#7ee787]">{token}</span>; // Green
        if (functionCall.test(token)) return <span key={i} className="text-[#d2a8ff]">{token}</span>;
        return <span key={i} className="text-[#c9d1d9]">{token}</span>; // Default FG
      })}
    </pre>
  );
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title, description, tags, id }) => {
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExplain = async () => {
    if (explanation) {
      setExplanation(null);
      return;
    }
    setLoading(true);
    const result = await explainCode(code, description);
    setExplanation(result);
    setLoading(false);
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:border-rust-500/40">
      
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#0d1117] border-b border-[#30363d] flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            <h3 className="font-semibold text-gray-300 text-xs truncate font-mono">
                {title}
            </h3>
        </div>
        <div className="flex gap-2">
            {tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1e2329] text-gray-400 border border-white/5">
                {tag}
                </span>
            ))}
        </div>
      </div>

      {/* Code Area */}
      <div className="p-5 bg-[#0d1117] flex-grow relative overflow-x-auto custom-scrollbar group-hover:bg-[#0d1117]/80 transition-colors">
        <SyntaxHighlighter code={code} />
      </div>

      {/* Description & Footer */}
      <div className="px-4 py-3 bg-[#161b22] border-t border-[#30363d]">
         <p className="text-xs text-gray-400 mb-3 leading-relaxed">{description}</p>
         
         <div className="flex items-center justify-between gap-3">
            <button 
                onClick={handleExplain}
                disabled={loading}
                className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-medium
                ${explanation ? 'bg-rust-500/10 text-rust-400 ring-1 ring-rust-500/30' : 'bg-[#21262d] text-gray-300 hover:text-white hover:bg-[#30363d]'}
                `}
            >
                {loading ? <Zap className="w-3.5 h-3.5 animate-pulse text-yellow-500" /> : <MessageSquare className="w-3.5 h-3.5" />}
                {loading ? 'Analyzing...' : explanation ? 'Close Analysis' : 'Explain Logic'}
            </button>

            <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-[#21262d]"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
            </button>
        </div>
      </div>

      {/* AI Panel - Animated Overlay */}
      {explanation && (
        <div className="absolute inset-0 z-20 bg-[#0d1117]/98 backdrop-blur-xl p-0 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200">
           <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#161b22]">
              <div className="flex items-center gap-2 text-rust-400">
                  <Terminal size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">AI Analysis</span>
              </div>
              <button onClick={() => setExplanation(null)} className="text-gray-500 hover:text-white p-1 hover:bg-white/5 rounded">
                  <Maximize2 size={14} className="rotate-45" /> 
              </button>
           </div>
           <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
             <div className="prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-code:text-rust-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-strong:text-white">
                <p className="whitespace-pre-wrap leading-relaxed text-[13px]">{explanation}</p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};