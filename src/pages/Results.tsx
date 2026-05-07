import React, { useEffect } from 'react';
import { 
  Trophy, TrendingUp, Users, Globe, 
  Award, Target, Zap, Shield, 
  Sparkles, ChevronRight, ArrowRight, 
  BarChart3, PieChart, Activity, CheckCircle
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const Results: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const metrics = [
    { label: "Average Salary Increase", value: "42%", icon: <TrendingUp className="text-blue-600" /> },
    { label: "Executive Placements", value: "12k+", icon: <Users className="text-purple-600" /> },
    { label: "Fortune 500 Network", value: "94%", icon: <Globe className="text-emerald-600" /> },
    { label: "Client Satisfaction", value: "9.8/10", icon: <Award className="text-orange-600" /> }
  ];

  const caseStudies = [
    {
      title: "The $250k Pivot",
      role: "VP of Engineering",
      impact: "110% Salary Increase",
      desc: "Repositioned a senior engineer as a strategic tech architect, securing a C-suite role at a top-tier AI lab.",
      tags: ["Tech Strategy", "Negotiation", "Authority Branding"]
    },
    {
      title: "Global COO Transition",
      role: "Operations Director",
      impact: "Fortune 100 Placement",
      desc: "Architected a global leadership narrative that bypassed traditional HR filters and landed directly on the CEO's desk.",
      tags: ["Global Ops", "Executive Search", "Legacy Building"]
    },
    {
      title: "The Silent Promotion",
      role: "Senior Manager",
      impact: "Internal C-Suite Elevation",
      desc: "Engineered an internal authority campaign that resulted in a double-promotion to Managing Director within 6 months.",
      tags: ["Internal Strategy", "Political Navigation", "Impact Audit"]
    }
  ];

  return (
    <div className="bg-white min-h-screen font-inter">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-xs font-black mb-10">
            <Trophy size={14} className="fill-current" />
            <span>THE IMPACT REPORT v4.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">Forensic <span className="text-blue-600">Proof.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Data-driven validation of our strategic career architecting and high-authority placements.
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {metrics.map((m, i) => (
             <div key={i} className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 group">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform">
                   {m.icon}
                </div>
                <div className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">{m.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{m.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 md:py-40 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
               <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">Strategic Victories.</h2>
                  <p className="text-slate-500 text-xl md:text-2xl font-medium">Real-world deconstructions of high-stakes career transitions.</p>
               </div>
               <button onClick={() => sounds.play('click')} className="flex items-center space-x-3 text-blue-600 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                  <span>View All Case Studies</span>
                  <ArrowRight size={20} />
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {caseStudies.map((cs, i) => (
                 <div key={i} className="bg-white rounded-[4rem] p-12 md:p-16 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                       <Zap size={14} />
                       <span>{cs.impact}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{cs.title}</h3>
                    <div className="text-slate-400 font-black text-xs uppercase tracking-widest mb-10">{cs.role}</div>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">{cs.desc}</p>
                    <div className="flex flex-wrap gap-2">
                       {cs.tags.map((tag, ti) => (
                         <span key={ti} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{tag}</span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-24 md:py-48 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <Sparkles size={64} className="mx-auto text-blue-600 mb-16 animate-pulse" />
         <blockquote className="text-3xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-16">
            "Radiant HRM didn't just help me find a job; they helped me realize my <span className="text-blue-600">true market value</span> and architected a narrative that commanded it."
         </blockquote>
         <div className="flex flex-col items-center">
            <img src="https://picsum.photos/seed/exec1/150/150" alt="Executive" className="w-24 h-24 rounded-full border-4 border-slate-100 shadow-xl mb-6" />
            <div className="font-black text-2xl text-slate-900">Sarah Jenkins</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Chief Technology Officer, Global SaaS</div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-9xl font-black leading-none tracking-tighter mb-16">
               Ready for <br />
               Your Own <br />
               <span className="text-blue-600">Victory?</span>
            </h2>
            <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="bg-blue-600 text-white px-16 py-8 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
               Initiate Strategic Engagement
            </button>
         </div>
      </section>
    </div>
  );
};

export default Results;
