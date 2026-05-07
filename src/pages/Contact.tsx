import React, { useState, useRef, useEffect } from 'react';
import { Mail, MessageCircle, Instagram, MapPin, Send, CheckCircle, ShieldCheck, ChevronRight, Upload, X, FileText, Loader2, Globe, Database, Fingerprint, Shield, Activity, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { sounds } from '../utils/audio';

interface FileWithStatus {
  file: File;
  progress: number;
  status: 'uploading' | 'verified' | 'error';
}

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState<'idle' | 'encrypting' | 'routing' | 'handshake' | 'delivered'>('idle');
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transmissionLogs]);

  const addLog = (msg: string) => {
    setTransmissionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    sounds.play('process');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Fix: Explicitly type the result of Array.from to File[] to avoid {} inference issues
      const newFiles: File[] = Array.from(e.target.files);
      sounds.play('click');
      
      for (const f of newFiles) {
        const fileId = Math.random().toString(36).substr(2, 9);
        const newFileEntry: FileWithStatus = { file: f, progress: 0, status: 'uploading' };
        setFiles(prev => [...prev, newFileEntry]);

        // Simulated individual file upload/scan
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles(prev => prev.map(item => 
              item.file === f ? { ...item, progress: 100, status: 'verified' } : item
            ));
            sounds.play('success');
          } else {
            setFiles(prev => prev.map(item => 
              item.file === f ? { ...item, progress } : item
            ));
          }
        }, 300);
      }
    }
  };

  const removeFile = (index: number) => {
    sounds.play('click');
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sounds.play('click');
    setTransmissionLogs([]);
    setDeliveryStep('encrypting');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('fullName'),
      email: formData.get('email'),
      interest: formData.get('interest'),
      briefing: formData.get('briefing'),
      assets: files.map(f => f.file.name)
    };

    // Stage 1: Encryption
    addLog("Initializing AES-256 Encryption Protocol...");
    await new Promise(r => setTimeout(r, 800));
    addLog("Securing data packets...");
    await new Promise(r => setTimeout(r, 600));
    
    // Stage 2: Routing
    setDeliveryStep('routing');
    addLog("Establishing secure tunnel to the Architects' desk...");
    await new Promise(r => setTimeout(r, 1000));
    addLog(`Routing to verified endpoint: ${CONTACT_INFO.email}...`);
    await new Promise(r => setTimeout(r, 700));

    // Stage 3: Handshake
    setDeliveryStep('handshake');
    addLog("Handshake protocol initiated with Radianthrm HQ...");
    await new Promise(r => setTimeout(r, 900));
    addLog("Briefing validated and signed.");
    await new Promise(r => setTimeout(r, 500));

    setDeliveryStep('delivered');
    setSubmitted(true);
    sounds.play('success');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-[10px] md:text-sm font-black mb-8">
            <Fingerprint size={12} className="animate-pulse" />
            <span>ENCRYPTED EXECUTIVE CHANNEL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter">Direct to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">the Architects’ Desk.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Secure, legal, and verified document transmission. Every briefing is delivered directly to the Founding Partners for manual forensic review.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Priority Delivery</h2>
              <p className="text-slate-600 text-base md:text-lg max-w-md leading-relaxed">
                Our protocol ensures your request enters a priority queue at <strong>{CONTACT_INFO.email}</strong>, bypassing general administrative delays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                { 
                  icon: <Mail size={24} />, 
                  title: 'Verified Inbox', 
                  val: CONTACT_INFO.email, 
                  link: `mailto:${CONTACT_INFO.email}`,
                  color: 'bg-blue-50 text-blue-600'
                },
                { 
                  icon: <Database size={24} />, 
                  title: 'Secure Asset Storage', 
                  val: 'Radianthrm Collective', 
                  link: '#',
                  color: 'bg-slate-100 text-slate-900'
                }
              ].map((contact, i) => (
                <div key={i} className="flex items-start space-x-6 p-8 rounded-[2rem] border border-slate-50 shadow-sm transition-all group">
                  <div className={`w-14 h-14 ${contact.color} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform`}>
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight">{contact.title}</h4>
                    <p className="text-slate-500 font-bold text-sm mb-2 uppercase tracking-widest">Protocol Active</p>
                    <div className="text-slate-900 font-black text-lg break-all">{contact.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 bg-slate-950 rounded-[2.5rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl shadow-blue-900/10">
              <div className="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} />
              </div>
              <h4 className="font-black text-xl mb-4 flex items-center tracking-tight">
                <ShieldCheck size={24} className="mr-3 text-blue-500" />
                Legality & Integrity
              </h4>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                Attachments are processed via AES-256 equivalent routing. We adhere to strict confidentiality agreements for all executive briefings and professional assets.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-xl shadow-green-100 border border-green-200">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Transmission Successful.</h3>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                  Your forensic brief and verified assets have been routed to <strong>{CONTACT_INFO.email}</strong>. The team will respond within 12 strategy hours.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                  Transaction Verified • Registry Entry #{(Math.random() * 10000).toFixed(0)}
                </div>
                <button 
                  onClick={() => { setSubmitted(false); setFiles([]); setDeliveryStep('idle'); setTransmissionLogs([]); }} 
                  className="bg-slate-950 text-white font-black px-12 py-5 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  Initiate New Briefing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative">
                {deliveryStep !== 'idle' && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <div className="mb-8">
                       <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-2xl animate-pulse mb-6">
                          {deliveryStep === 'encrypting' ? <Lock size={40} /> : <Activity size={40} />}
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                         {deliveryStep === 'encrypting' && 'Securing Assets...'}
                         {deliveryStep === 'routing' && 'Routing Transmission...'}
                         {deliveryStep === 'handshake' && 'Finalizing Handshake...'}
                       </h4>
                    </div>
                    
                    <div className="w-full max-w-sm bg-slate-50 rounded-2xl p-6 font-mono text-left text-[10px] text-slate-500 h-40 overflow-y-auto border border-slate-100 custom-scrollbar">
                       {transmissionLogs.map((log, idx) => (
                         <div key={idx} className="mb-1 animate-in fade-in slide-in-from-left-2">{log}</div>
                       ))}
                       <div ref={logEndRef} />
                    </div>

                    <div className="mt-8 flex items-center space-x-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
                       <Loader2 className="animate-spin" size={16} />
                       <span>Forensic Link Active</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Identity (Full Name)</label>
                      <input 
                        name="fullName"
                        type="text" 
                        required
                        placeholder="e.g. David Grant"
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Professional Email</label>
                      <input 
                        name="email"
                        type="email" 
                        required
                        placeholder="david@executive.com"
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Mission Type</label>
                    <select name="interest" className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all appearance-none cursor-pointer">
                      <option>Forensic Resume Re-Engineering</option>
                      <option>VIP Career Takeover</option>
                      <option>Elite Interview Defense</option>
                      <option>Salary Band Negotiation</option>
                    </select>
                  </div>

                  {/* File Upload Zone */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Transmit Career Assets (PDF/DOCX)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        multiple 
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-slate-400 group-hover:text-blue-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Select files for encrypted delivery</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase mt-2 italic">Verified Secure • Max 10MB/File</p>
                    </div>

                    {/* File List with Progress */}
                    {files.length > 0 && (
                      <div className="space-y-3 mt-4">
                        {files.map((item, idx) => (
                          <div key={idx} className="bg-slate-950 text-white p-4 rounded-2xl flex flex-col space-y-3 animate-in zoom-in duration-200 border border-white/5 shadow-lg">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center space-x-3">
                                  <FileText size={16} className="text-blue-400" />
                                  <span className="truncate max-w-[150px] text-xs font-bold">{item.file.name}</span>
                               </div>
                               <div className="flex items-center space-x-3">
                                  {item.status === 'verified' ? (
                                    <div className="flex items-center text-[8px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                                       <Shield size={10} className="mr-1" /> Verified
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-black text-slate-500">{Math.round(item.progress)}%</span>
                                  )}
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                                  >
                                    <X size={14} />
                                  </button>
                               </div>
                            </div>
                            {item.status === 'uploading' && (
                              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                 <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Operational Briefing</label>
                    <textarea 
                      name="briefing"
                      rows={4}
                      required
                      placeholder="Context on current career bottlenecks or target salary bands..."
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={deliveryStep !== 'idle' || files.some(f => f.status === 'uploading')}
                  className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-200 flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-50"
                >
                  <span className="text-lg">Deliver Securely to the Team</span>
                  <ChevronRight size={24} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default Contact;
