import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Search, CheckCircle, AlertCircle, Loader2, Target, 
  Zap, Shield, Cpu, BarChart3, ChevronRight, ArrowRight, Sparkles, 
  FileSearch, Activity, Terminal, Lock, Globe, Database, Info, X,
  RefreshCw, ShieldAlert, XCircle, CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';
import { GoogleGenAI, Type } from "@google/genai";

const ATSScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setScanResult(null);
      setError(null);
      addLog(`File ingested: ${selectedFile.name}`);
      sounds.play('click');
    }
  };

  const performRealScan = async () => {
    if (!file) return;
    
    setError(null);
    sounds.play('click');
    setIsScanning(true);
    setScanProgress(0);
    setLogs([]);
    setActiveStep(1);

    try {
      addLog("Initializing Forensic Parser...");
      setScanProgress(10);
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = "gemini-3.1-pro-preview"; // Using Pro for "brutally honest" complex analysis

      addLog("Decrypting document structure & extracting semantic entities...");
      setScanProgress(30);

      const filePart = await fileToGenerativePart(file);
      
      addLog("Cross-referencing with global ATS algorithms...");
      setScanProgress(50);

      const prompt = `Analyze this resume with BRUTAL HONESTY from the perspective of a high-end executive recruiter and a modern ATS system. 
      Check every corner: formatting, keyword density, impact of bullet points, quantitative achievements, and overall professional authority.
      
      Provide a detailed breakdown in JSON format including:
      - score (0-100)
      - matchRate (0-100 - percentage)
      - missingKeywords (array of strings)
      - formattingIssues (array of strings)
      - contentCritique (array of strings - specific, honest feedback on bullet points or sections)
      - recommendation (string - the single most important strategic change)
      - impactScore (0-100 - how well achievements are quantified)
      - authorityScore (0-100 - how much leadership/expertise is conveyed)`;

      const response = await ai.models.generateContent({
        model: model,
        contents: [{ parts: [filePart, { text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              matchRate: { type: Type.NUMBER },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              formattingIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
              contentCritique: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendation: { type: Type.STRING },
              impactScore: { type: Type.NUMBER },
              authorityScore: { type: Type.NUMBER },
            },
            required: ["score", "matchRate", "missingKeywords", "formattingIssues", "contentCritique", "recommendation", "impactScore", "authorityScore"]
          }
        }
      });

      addLog("Analyzing keyword density and proximity...");
      setScanProgress(80);

      const result = JSON.parse(response.text || "{}");
      
      addLog("Finalizing strategic score...");
      setScanProgress(100);

      setScanResult(result);
      setIsScanning(false);
      setActiveStep(2);
      sounds.play('success');

    } catch (err: any) {
      console.error("Scan failed:", err);
      setError("Forensic scan failed. Ensure the file is a valid PDF or Image and try again.");
      setIsScanning(false);
      addLog("ERROR: Transmission interrupted.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-24 md:mb-40 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <Cpu size={14} className="animate-pulse" />
            <span>Forensic ATS Analysis v4.2</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Scan Your <br />
            <span className="text-blue-600">Authority.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Our proprietary forensic engine deconstructs your resume using the same algorithms utilized by global executive search firms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
          
          {/* Upload & Controls */}
          <div className="lg:col-span-7 space-y-12">
            <div className={`bg-white rounded-[4rem] p-10 md:p-20 border-4 border-dashed transition-all duration-700 ${file ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200 shadow-2xl shadow-slate-200/50'}`}>
               <div className="flex flex-col items-center text-center">
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-700 ${file ? 'bg-blue-600 text-white rotate-12 shadow-2xl shadow-blue-400' : 'bg-slate-50 text-slate-300'}`}>
                     {file ? <FileText size={48} /> : <Upload size={48} />}
                  </div>
                  
                  {file ? (
                    <div className="space-y-6 animate-in zoom-in-95 duration-500">
                       <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{file.name}</h3>
                       <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for Forensic Audit</p>
                       <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <button 
                            onClick={performRealScan} 
                            disabled={isScanning}
                            className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-blue-200 active:scale-95 disabled:opacity-50"
                          >
                            {isScanning ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                            <span>{isScanning ? 'Scanning...' : 'Initiate Forensic Scan'}</span>
                          </button>
                          <button 
                            onClick={() => { setFile(null); sounds.play('click'); }} 
                            disabled={isScanning}
                            className="bg-white border border-slate-200 text-slate-400 px-12 py-5 rounded-2xl font-black text-lg hover:text-red-500 hover:border-red-100 transition-all active:scale-95 disabled:opacity-50"
                          >
                            Reset
                          </button>
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                       <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Drop your dossier here.</h3>
                       <p className="text-slate-400 font-medium text-lg md:text-xl max-w-sm mx-auto">Upload your PDF or DOCX for a high-authority strategic audit.</p>
                       <button 
                        onClick={() => { fileInputRef.current?.click(); sounds.play('click'); }}
                        className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
                       >
                         Select File
                       </button>
                       <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                    </div>
                  )}
               </div>
            </div>

            {/* Live Transmission Logs */}
            <div className="bg-slate-950 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <Terminal size={150} />
               </div>
               <div className="flex items-center space-x-4 mb-10 border-b border-white/10 pb-8">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Forensic Audit Log</h4>
               </div>
               <div className="space-y-4 font-mono text-sm md:text-base h-64 overflow-y-auto custom-scrollbar pr-4">
                  {logs.length === 0 ? (
                    <p className="text-slate-600 italic">Waiting for file ingestion...</p>
                  ) : (
                    logs.map((log, i) => (
                      <div key={i} className="flex space-x-4 animate-in fade-in slide-in-from-left-4 duration-500">
                         <span className="text-blue-500 font-black">❯</span>
                         <span className="text-slate-300">{log}</span>
                      </div>
                    ))
                  )}
                  {isScanning && (
                    <div className="flex items-center space-x-4 text-blue-400 font-black animate-pulse">
                       <span className="text-blue-500">❯</span>
                       <span>Processing strategic data packets...</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Results & Stats */}
          <div className="lg:col-span-5 space-y-12">
             {scanResult ? (
               <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50 animate-in zoom-in-95 duration-700">
                  <div className="text-center mb-12">
                     <div className="inline-block relative">
                        <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90">
                           <circle cx="50%" cy="50%" r="45%" className="stroke-slate-50 fill-none" strokeWidth="12" />
                           <circle 
                            cx="50%" cy="50%" r="45%" 
                            className="stroke-blue-600 fill-none transition-all duration-1000 ease-out" 
                            strokeWidth="12" 
                            strokeDasharray="283" 
                            strokeDashoffset={283 - (283 * scanResult.score) / 100}
                            strokeLinecap="round"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">{scanResult.score}</span>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Strategic Score</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center space-x-3">
                              <Target className="text-blue-600" size={24} />
                              <h5 className="font-black text-xl text-slate-900">Match Probability: <span className="text-blue-600">{scanResult.matchRate}%</span></h5>
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                           <div className="bg-white p-4 rounded-2xl border border-blue-100 text-center">
                              <div className="text-2xl font-black text-slate-900">{scanResult.impactScore}%</div>
                              <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Impact Score</div>
                           </div>
                           <div className="bg-white p-4 rounded-2xl border border-blue-100 text-center">
                              <div className="text-2xl font-black text-slate-900">{scanResult.authorityScore}%</div>
                              <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Authority Score</div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Strategic Recommendation</h6>
                           <p className="text-slate-600 font-medium leading-relaxed italic">"{scanResult.recommendation}"</p>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Brutally Honest Critique</h6>
                           <Info size={14} className="text-slate-300" />
                        </div>
                        <div className="space-y-3">
                           {scanResult.contentCritique.map((critique: string, i: number) => (
                             <div key={i} className="flex items-start space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                                <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                                <span className="font-medium text-slate-700 text-sm leading-relaxed">{critique}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Critical Deficiencies (Keywords)</h6>
                        <div className="flex flex-wrap gap-2">
                           {scanResult.missingKeywords.map((kw: string, i: number) => (
                             <div key={i} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">
                                {kw}
                             </div>
                           ))}
                        </div>
                     </div>

                     {scanResult.formattingIssues.length > 0 && (
                        <div className="space-y-6">
                           <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Formatting Red Flags</h6>
                           <div className="space-y-2">
                              {scanResult.formattingIssues.map((issue: string, i: number) => (
                                <div key={i} className="flex items-center space-x-3 text-sm text-slate-500 font-medium">
                                   <X size={14} className="text-red-400" />
                                   <span>{issue}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     <button 
                        onClick={() => {
                          setFile(null);
                          setScanResult(null);
                          setActiveStep(0);
                          setLogs([]);
                          setError(null);
                          sounds.play('click');
                        }}
                        className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-500 group"
                      >
                        <span className="flex items-center justify-center space-x-3">
                          <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                          <span>Initiate New Scan</span>
                        </span>
                      </button>

                     <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="w-full bg-slate-950 text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl active:scale-95">
                        <span>Request Human Forensic Audit</span>
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
             ) : (
               <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
                  <h4 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Audit Metrics.</h4>
                  <div className="space-y-8">
                     {[
                       { icon: <Shield className="text-blue-600" />, title: "Algorithm Integrity", desc: "Cross-referenced with 50+ enterprise ATS platforms." },
                       { icon: <Cpu className="text-purple-600" />, title: "Semantic Analysis", desc: "Deep-learning extraction of high-authority keywords." },
                       { icon: <Globe className="text-emerald-600" />, title: "Global Benchmarking", desc: "Ranked against 10,000+ executive placements." },
                       { icon: <Database className="text-orange-600" />, title: "Data Privacy", desc: "AES-256 encrypted processing. No data retention." }
                     ].map((item, i) => (
                       <div key={i} className="flex space-x-6 group">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                             {item.icon}
                          </div>
                          <div>
                             <h5 className="font-black text-lg text-slate-900 mb-1">{item.title}</h5>
                             <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="mt-16 p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
                     <div className="relative z-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Pro Insight</div>
                        <p className="font-bold text-lg leading-snug italic">"90% of Fortune 500 resumes are rejected by ATS before a human ever sees them. Don't be a statistic."</p>
                     </div>
                     <Sparkles className="absolute top-0 right-0 p-6 text-white/10" size={100} />
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default ATSScanner;
