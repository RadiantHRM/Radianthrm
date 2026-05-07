import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Plus, Search, Filter, Briefcase, Calendar, CheckCircle, Clock, XCircle, MoreVertical, 
  ChevronUp, ChevronDown, ArrowUpDown, HelpCircle, Trash2, X, Target, Circle, 
  PieChart as PieChartIcon, Activity, RotateCcw, Sparkles, Send, Loader2, PlayCircle, Award, Lightbulb, Zap,
  Mic, UserCheck, FileCheck, PartyPopper, Key
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { JobApplication, JobStatus } from '../types.ts';
import { sounds } from '../utils/audio.ts';

const JOB_STATUSES: JobStatus[] = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Pending'];
const STATUS_COLORS: Record<string, string> = {
  Applied: '#3B82F6', 
  Interviewing: '#A855F7', 
  Offer: '#10B981', 
  Rejected: '#EF4444', 
  Pending: '#94A3B8',
};

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [view, setView] = useState<'tracker' | 'lab'>('tracker');
  
  // Tracker States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'All'>('All');
  const [sortConfig, setSortConfig] = useState<{key: keyof JobApplication, direction: 'asc'|'desc'}>({ key: 'dateApplied', direction: 'desc' });

  // Market Pulse State
  const [dailyPulse, setDailyPulse] = useState<{mission: string, intel: string, score: number} | null>(null);
  const [isGeneratingPulse, setIsGeneratingPulse] = useState(false);

  // Interview Lab States
  const [labJob, setLabJob] = useState<JobApplication | null>(null);
  const [chatMessages, setChatMessages] = useState<{role: 'ai'|'user', text: string, isAuthError?: boolean}[]>([]);
  const [labInput, setLabInput] = useState('');
  const [labLoading, setLabLoading] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    generateDailyPulse();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthorize = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        sounds.play('click');
        await window.aistudio.openSelectKey();
        setChatMessages(prev => [...prev, { role: 'ai', text: "Strategic link authorized. Intelligence core online." }]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const generateDailyPulse = async () => {
    setIsGeneratingPulse(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a 'Daily Career Mission' and one sentence of 'Market Intel' for a high-achieving professional. The mission should be an actionable advice for job searching. Provide in JSON format: {mission: string, intel: string, score: number}.",
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text);
      setDailyPulse(data);
      sounds.play('notify');
    } catch (e) {
      setDailyPulse({
        mission: "Review your top 3 applications and identify the silent friction points.",
        intel: "Market volatility in tech is creating a high demand for 'agile specialists'.",
        score: 85
      });
    } finally {
      setIsGeneratingPulse(false);
    }
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.play('click');
    const target = e.target as any;
    const job: JobApplication = {
      id: Math.random().toString(36).substr(2, 9),
      companyName: target.companyName.value,
      jobTitle: target.jobTitle.value,
      dateApplied: target.dateApplied.value,
      status: target.status.value as JobStatus
    };
    setJobs([job, ...jobs]);
    setShowAddModal(false);
    sounds.play('success');
  };

  const sortedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    return [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [jobs, sortConfig, searchQuery, filterStatus]);

  const startLab = (job: JobApplication) => {
    sounds.play('click');
    setLabJob(job);
    setChatMessages([{ role: 'ai', text: `Welcome to the Interview Lab. I am simulating a Lead Recruiter for ${job.companyName}. We are considering you for the ${job.jobTitle} position. Let's begin: Why are you interested in this role today?` }]);
    setView('lab');
    sounds.play('notify');
  };

  const handleLabMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labInput.trim() || labLoading) return;
    
    sounds.play('click');
    const userText = labInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLabInput('');
    setLabLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatMessages.filter(m => !m.isAuthError).map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: `You are a tough, forensic recruiter for ${labJob?.companyName}. Your goal is to interview the user for a ${labJob?.jobTitle} role. Be critical but professional. Challenge their answers. Ask follow up questions.`,
        }
      });
      setChatMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection lost. Please re-state." }]);
      sounds.play('notify');
    } catch (e: any) {
      sounds.play('error');
      const isAuthIssue = e?.message?.toLowerCase().includes('permission') || 
                         e?.message?.toLowerCase().includes('not found');
      
      if (isAuthIssue) {
        setChatMessages(prev => [...prev, { 
          role: 'ai', 
          text: "Strategic link denied. Authorization from an elite API Key project is required for high-stakes interview simulations.",
          isAuthError: true
        }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', text: "Strategic uplink failed. Try again." }]);
      }
    } finally {
      setLabLoading(false);
    }
  };

  const changeView = (v: 'tracker' | 'lab') => {
    sounds.play('click');
    setView(v);
  }

  const getStatusIcon = (status: JobStatus) => {
    const size = 14;
    switch (status) {
      case 'Applied': return <Send size={size} />;
      case 'Interviewing': return <Mic size={size} />;
      case 'Offer': return <Award size={size} />;
      case 'Rejected': return <XCircle size={size} />;
      case 'Pending': return <Clock size={size} />;
      default: return <Circle size={size} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-32 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Daily Market Pulse Widget */}
        <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-top-6 duration-1000">
           <div className="bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 right-0 p-16 opacity-10 -rotate-12 pointer-events-none">
                 <Zap size={250} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20">
                 <div className="flex-grow space-y-6 md:space-y-8 text-center md:text-left">
                    <div className="inline-flex items-center space-x-3 bg-blue-500/20 border border-blue-500/30 px-5 py-2 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
                       <Sparkles size={14} className="animate-pulse" />
                       <span>Daily Strategic Pulse</span>
                    </div>
                    {isGeneratingPulse ? (
                      <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 font-black italic text-xl">
                         <Loader2 className="animate-spin" size={24} />
                         <span>Generating daily mission...</span>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                          Today's Mission: <br className="hidden md:block" />
                          <span className="text-blue-500">{dailyPulse?.mission}</span>
                        </h2>
                        <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-400 font-medium italic text-base md:text-xl">
                           <Lightbulb size={24} className="text-yellow-500 flex-shrink-0" />
                           <span>{dailyPulse?.intel}</span>
                        </div>
                      </>
                    )}
                 </div>
                 <div className="flex-shrink-0 text-center bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
                    <div className="text-6xl md:text-8xl font-black text-blue-500 mb-2 tracking-tighter">
                      <CountUp end={dailyPulse?.score || 0} />%
                    </div>
                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Market Readiness Index</div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                       <div className="bg-blue-600 h-full transition-all duration-1000 ease-out" style={{ width: `${dailyPulse?.score || 0}%` }} />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-16 md:mb-24 bg-white p-2 rounded-3xl w-fit shadow-2xl shadow-slate-200 border border-slate-100 mx-auto md:mx-0">
          <button 
            onClick={() => changeView('tracker')}
            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${view === 'tracker' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}
          >
            Pipeline Tracker
          </button>
          <button 
            onClick={() => changeView('lab')}
            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${view === 'lab' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}
          >
            AI Interview Lab
          </button>
        </div>

        {view === 'tracker' ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-20 gap-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Strategic Pipeline.</h1>
                <p className="text-slate-500 font-bold text-lg md:text-xl mt-3">Managing high-authority career transitions in real-time.</p>
              </div>
              <button 
                onClick={() => { setShowAddModal(true); sounds.play('click'); }}
                className="bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black hover:bg-blue-700 transition flex items-center justify-center space-x-3 shadow-2xl shadow-blue-200 active:scale-95"
              >
                <Plus size={28} />
                <span className="text-lg">Log New Entry</span>
              </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-100 overflow-hidden">
              <div className="p-10 md:p-14 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-8">
                 <div className="relative flex-grow max-w-xl">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      placeholder="Filter by company, role, or segment..." 
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[1.5rem] font-bold text-base outline-none focus:ring-4 focus:ring-blue-600/10 transition-all"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {['Applied', 'Interviewing', 'Offer'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => { setFilterStatus(s as JobStatus); sounds.play('click'); }}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${filterStatus === s ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                        {s}
                      </button>
                    ))}
                    {filterStatus !== 'All' && (
                      <button onClick={() => { setFilterStatus('All'); sounds.play('click'); }} className="p-3 text-slate-400 hover:text-red-500 bg-slate-50 rounded-xl transition-colors">
                        <RotateCcw size={20}/>
                      </button>
                    )}
                 </div>
              </div>
              
              {sortedJobs.length === 0 ? (
                <div className="py-32 text-center">
                   <Briefcase size={64} className="mx-auto text-slate-100 mb-8" />
                   <p className="text-slate-400 font-black text-xl">No strategic data points found in this segment.</p>
                   <button onClick={() => { setShowAddModal(true); sounds.play('click'); }} className="mt-6 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Add Your First Application</button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.3em]">
                        <th className="px-10 py-6">Entity</th>
                        <th className="px-10 py-6">Objective</th>
                        <th className="px-10 py-6">Status</th>
                        <th className="px-10 py-6">Timeline</th>
                        <th className="px-10 py-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sortedJobs.map(job => (
                        <tr key={job.id} className="hover:bg-slate-50/80 transition-all group cursor-default">
                          <td className="px-10 py-8 font-black text-slate-900 text-lg md:text-xl">
                            <div className="flex items-center space-x-3">
                               <div className="w-2 h-8 bg-blue-600/10 rounded-full group-hover:bg-blue-600 transition-colors" />
                               <span>{job.companyName}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-slate-500 font-bold text-base md:text-lg">{job.jobTitle}</td>
                          <td className="px-10 py-8">
                            <div className="inline-flex items-center px-4 py-2 rounded-2xl border shadow-sm" style={{ 
                              borderColor: `${STATUS_COLORS[job.status]}30`,
                              backgroundColor: `${STATUS_COLORS[job.status]}10`
                            }}>
                              <div className="mr-3 transition-transform group-hover:scale-110" style={{ color: STATUS_COLORS[job.status] }}>
                                {getStatusIcon(job.status)}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: STATUS_COLORS[job.status] }}>
                                {job.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-slate-400 font-black text-xs uppercase tracking-widest">{job.dateApplied}</td>
                          <td className="px-10 py-8 text-right">
                             <button 
                              onClick={() => startLab(job)}
                              className="inline-flex items-center space-x-3 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                             >
                               <PlayCircle size={18} />
                               <span>Initiate Lab</span>
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="bg-slate-950 rounded-[4rem] p-10 md:p-20 text-white min-h-[700px] flex flex-col shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
                {!labJob ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-12">
                     <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.4)]">
                        <Sparkles size={48} />
                     </div>
                     <div>
                       <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Select an Objective.</h2>
                       <p className="text-slate-400 max-w-md mx-auto text-lg md:text-xl font-medium">You must have an active application in your pipeline to initiate a forensic interview simulation.</p>
                     </div>
                     <button onClick={() => { setView('tracker'); sounds.play('click'); }} className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs hover:text-blue-300 transition-colors">Return to Pipeline Command</button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:row justify-between items-center mb-12 border-b border-white/10 pb-10 gap-6">
                       <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                             <Award size={32} className="text-blue-400" />
                          </div>
                          <div>
                             <h3 className="font-black text-2xl md:text-3xl tracking-tight">{labJob.companyName}</h3>
                             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">{labJob.jobTitle} Forensic Prep</p>
                          </div>
                       </div>
                       <button onClick={() => { setLabJob(null); sounds.play('click'); }} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                          <X size={24} className="text-slate-400" />
                       </button>
                    </div>

                    <div className="flex-grow space-y-8 overflow-y-auto mb-10 pr-4 custom-scrollbar">
                       {chatMessages.map((m, i) => (
                         <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-6 md:p-8 rounded-[2rem] text-base md:text-lg leading-relaxed shadow-2xl ${
                              m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 
                              m.isAuthError ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-none' :
                              'bg-white/5 text-slate-300 border border-white/10 rounded-bl-none font-medium'
                            }`}>
                               {m.text}
                            </div>
                            {m.role === 'ai' && m.isAuthError && (
                              <button 
                                onClick={handleAuthorize}
                                className="mt-4 flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95"
                              >
                                <Key size={14} />
                                <span>Authorize Lab Access</span>
                              </button>
                            )}
                         </div>
                       ))}
                       {labLoading && <div className="flex items-center space-x-4 text-blue-400 animate-pulse font-black text-xs uppercase tracking-[0.3em] ml-6"><Loader2 className="animate-spin" size={18}/><span>Intelligence Protocol analyzing response...</span></div>}
                    </div>

                    <form onSubmit={handleLabMessage} className="relative mt-auto">
                       <input 
                        type="text" 
                        placeholder="Deliver your high-authority tactical response..." 
                        value={labInput}
                        onChange={e => setLabInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 pr-20 outline-none focus:ring-4 focus:ring-blue-600/30 transition-all font-medium text-base md:text-lg"
                       />
                       <button 
                        type="submit" 
                        disabled={labLoading}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-900/20"
                       >
                         <Send size={24} />
                       </button>
                    </form>
                  </>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 max-w-2xl w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tighter">Track New Narrative.</h3>
            <form onSubmit={handleAddJob} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity Name</label>
                   <input name="companyName" placeholder="e.g. OpenAI" className="w-full px-6 py-5 rounded-2xl bg-slate-50 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 border border-transparent focus:border-blue-600 transition-all" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Objective Role</label>
                   <input name="jobTitle" placeholder="e.g. VP Operations" className="w-full px-6 py-5 rounded-2xl bg-slate-50 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 border border-transparent focus:border-blue-600 transition-all" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Timeline Start</label>
                   <input name="dateApplied" type="date" className="w-full px-6 py-5 rounded-2xl bg-slate-50 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 border border-transparent focus:border-blue-600 transition-all" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Status</label>
                   <select name="status" className="w-full px-6 py-5 rounded-2xl bg-slate-50 font-bold outline-none focus:ring-4 focus:ring-blue-600/10 border border-transparent focus:border-blue-600 transition-all appearance-none cursor-pointer">
                      {JOB_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <button type="button" onClick={() => { setShowAddModal(false); sounds.play('click'); }} className="w-full py-5 text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors">Abort</button>
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">Verify & Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

// Simple CountUp for Dashboard scores
const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = easeOutQuad(progress) * end;
      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{Math.round(count)}</span>;
};

export default Dashboard;
