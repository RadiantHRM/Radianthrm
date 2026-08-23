
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, User, ShieldCheck, 
  ChevronRight, Loader2, Phone, Briefcase, Zap, Info, 
  Key, AlertCircle, LayoutGrid, MessageCircle, ArrowRight,
  Target, Award, FileSearch
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { sounds } from '../utils/audio.ts';
import { CONTACT_INFO } from '../constants.tsx';

interface Message {
  role: 'user' | 'model';
  text: string;
  isOffer?: boolean;
  isAuthError?: boolean;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello 👋, I am your Senior Career Strategist at Hireable Co. How can I help you engineer your professional narrative today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const toggleOpen = () => {
    sounds.play('click');
    setIsOpen(!isOpen);
  };

  const handleAuthorize = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        sounds.play('click');
        await window.aistudio.openSelectKey();
        setMessages(prev => [...prev, { role: 'model', text: "Strategic link authorized. Forensic intelligence core is now online." }]);
      } else {
        window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank');
      }
    } catch (e) {
      console.error("Auth Error:", e);
    }
  };

  const suggestedChips = [
    { label: "ATS Resume Audit", action: "How does your ATS Forensic Audit work?" },
    { label: "VIP Recruiting", action: "Tell me about the 'Done-For-You' VIP Recruiting." },
    { label: "Pricing Plans", action: "What are your service tiers and pricing?" },
    { label: "Talk to Isaac", action: "I want to speak with Isaac Ademola directly." },
    { label: "Success Stories", action: "Can you share some recent client results?" },
    { label: "Career Pivot", action: "How do you help with industry pivots?" }
  ];

  // Helper function to render Markdown-style text correctly
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((paragraph, i) => {
      if (!paragraph.trim()) return <div key={i} className="h-4" />;

      let processed = paragraph;
      
      // Handle Headers (### Header)
      if (processed.startsWith('### ')) {
        const headerText = processed.replace('### ', '');
        return (
          <h4 key={i} className="text-blue-600 font-black text-sm uppercase tracking-wider mt-4 mb-2">
            {headerText}
          </h4>
        );
      }

      // Handle Bold (**text**)
      // We use a safe approach by splitting and inserting <strong> elements
      const parts = processed.split(/(\*\*.*?\*\*)/g);
      const elements = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-black text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <p key={i} className="mb-3 last:mb-0 leading-relaxed text-slate-700">
          {elements}
        </p>
      );
    });
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault();
    const messageText = customText || input;
    if (!messageText.trim() || isLoading) return;

    sounds.play('click');
    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const history = messages.filter(m => !m.isAuthError).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: messageText }] }],
        config: {
          systemInstruction: `You are Hireable Co.'s Senior AI Career Strategist, inspired by elite forensic intelligence. 
          
          CORE KNOWLEDGE BASE:
          - BRAND: Hireable Co., led by Founding Architect Isaac Ademola.
          - VISION: Executive Career Architecture & Placement. Branding is the bridge between identity and capital.
          - SERVICE 1 (ATS Resumes): Forensic keyword mapping. Tiers: Kickstart ($99), Professional Pivot ($189), Executive Authority ($349).
          - SERVICE 2 (VIP Reverse Recruiting): "Done-for-you" job search. Sourcing hidden roles.
          - PHILOSOPHY: We engineer "Business Cases" that justify high salaries.

          COMMUNICATION PROTOCOL:
          1. Answer with forensic depth.
          2. Use Markdown: Use **double asterisks** for emphasis and ### for section headers.
          3. Ensure text is structured with clear paragraphs for readability.
          4. If the user asks about human support, Isaac, or pricing, offer the handover briefing.`,
        }
      });

      const modelText = response.text || "I apologize, the encrypted connection was interrupted. Let's restart the briefing.";
      
      const shouldOfferHandover = /whatsapp|isaac|human|talk to|speak with|pricing|cost|pay|help|support|start|ready/i.test(modelText) || 
                                 /whatsapp|isaac|human|talk to|speak with|pricing|cost|pay|help|support|start|ready/i.test(messageText);

      setMessages(prev => [
        ...prev, 
        { role: 'model', text: modelText, isOffer: shouldOfferHandover }
      ]);
      sounds.play('notify');
    } catch (error: any) {
      console.error("AI Error:", error);
      sounds.play('error');
      
      const isAuthIssue = error?.message?.toLowerCase().includes('permission') || 
                         error?.message?.toLowerCase().includes('not found') ||
                         error?.message?.toLowerCase().includes('api_key');

      if (isAuthIssue) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "Strategic link denied. An authorized API Key from a paid project is required to access the Gemini 3 Intelligence core.",
          isAuthError: true 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "The Intelligence Core is currently regenerating. Please try your request again in 30 seconds." }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-inter">
      {/* Launcher Button */}
      <button
        onClick={toggleOpen}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_15px_50px_-10px_rgba(7,25,51,0.5)] transition-all duration-500 hover:scale-110 active:scale-95 group relative ${
          isOpen ? 'bg-[#071933] text-white' : 'bg-[#071933] text-white hover:bg-[#0A254C]'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        {isOpen ? <X size={28} /> : <MessageCircle size={28} className="relative z-10 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-20 left-0 w-[calc(100vw-3rem)] sm:w-[480px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden transition-all duration-500 transform origin-bottom-left flex flex-col ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-[#050E1A] p-6 text-white flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-[#1D4ED8] rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#050E1A] rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-lg tracking-tight">Sasha • AI Agent</h3>
              <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">Forensic Intelligence Active</div>
            </div>
          </div>
          <button onClick={toggleOpen} className="p-2 text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-grow h-[480px] overflow-y-auto p-6 space-y-8 bg-slate-50/50 custom-scrollbar">
          <div className="flex flex-col items-center mb-4">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                Session Briefing
             </span>
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              {m.role === 'model' && (
                <div className="flex items-center space-x-2 mb-2 ml-2">
                  <div className="w-5 h-5 bg-[#071933] rounded-lg flex items-center justify-center text-[8px] font-black text-white">H</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hireable Co. Strategist</span>
                </div>
              )}
              
              <div className={`group relative max-w-[90%] p-6 rounded-[1.8rem] text-sm md:text-base leading-loose shadow-sm whitespace-pre-wrap ${
                m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 
                m.isAuthError ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-none' :
                'bg-white text-slate-800 border border-slate-100 rounded-bl-none font-medium'
              }`}>
                {renderFormattedText(m.text)}
              </div>
              
              {m.role === 'model' && m.isAuthError && (
                <div className="mt-4 w-full px-2">
                  <button 
                    onClick={handleAuthorize}
                    className="w-full flex items-center justify-center space-x-3 bg-slate-950 hover:bg-black text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 border border-white/10"
                  >
                    <Key size={14} />
                    <span>Authorize Forensic Link</span>
                  </button>
                </div>
              )}

              {m.role === 'model' && m.isOffer && (
                <div className="mt-4 w-full px-2 animate-in slide-in-from-left-4 duration-500">
                   <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl space-y-4">
                      <div className="flex items-center space-x-3 text-blue-600">
                         <MessageCircle size={20} />
                         <span className="text-xs font-black uppercase tracking-widest">Priority Handover</span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed">
                         For deep strategy and pricing analysis, a private briefing with our founding architect is required.
                      </p>
                      <a 
                        href={CONTACT_INFO.whatsappLink}
                        target="_blank"
                        className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 group"
                        onClick={() => sounds.play('click')}
                      >
                         <span>Start Human Briefing</span>
                         <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                   </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-3 text-blue-600 ml-2">
               <Loader2 className="animate-spin" size={18} />
               <span className="text-[10px] font-black uppercase tracking-widest">Analyzing career trajectory...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips Area */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
           <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar scroll-smooth">
              {suggestedChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(undefined, chip.action)}
                  className="whitespace-nowrap bg-white border border-slate-200 px-6 py-3 rounded-full text-xs font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm active:scale-95 flex-shrink-0"
                >
                  {chip.label}
                </button>
              ))}
           </div>
        </div>

        {/* Input Footer */}
        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <div className="flex-grow relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Brief your strategist..."
                className="w-full bg-slate-50 rounded-[1.5rem] px-6 py-4 text-sm font-bold outline-none border border-slate-200 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-slate-400"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-30 active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center space-x-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
             <ShieldCheck size={10} />
             <span>Secured Executive Transmission</span>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
