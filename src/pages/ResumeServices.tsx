import React, { useEffect } from 'react';
import { 
  FileText, Zap, Target, Shield, 
  Sparkles, ChevronRight, ArrowRight, 
  Globe, Cpu, LayoutGrid, MessageCircle, 
  PlayCircle, Award, TrendingUp, Users
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const ResumeServices: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <FileText className="text-blue-600" />,
      title: "Executive Dossier",
      desc: "A complete deconstruction and rebuild of your professional narrative for C-suite and board-level roles."
    },
    {
      icon: <Zap className="text-purple-600" />,
      title: "Forensic Optimization",
      desc: "Technical alignment with enterprise ATS algorithms to ensure 99% compatibility and high-authority parsing."
    },
    {
      icon: <Shield className="text-emerald-600" />,
      title: "Strategic Positioning",
      desc: "Repositioning your career legacy to align with high-growth industries and future-proof roles."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-inter">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-xs font-black mb-10">
            <FileText size={14} className="fill-current" />
            <span>FORENSIC ARCHITECTING v4.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">Resume <span className="text-blue-600">Services.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Deconstructing your professional legacy to architect a high-authority narrative that commands the executive market.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
             <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
                Book a Strategic Audit
             </button>
             <button onClick={() => sounds.play('click')} className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95">
                View Service Tiers
             </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((item, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
                 <div className="mb-10 p-6 bg-white rounded-3xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 md:py-48 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">Service Tiers.</h2>
               <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-3xl mx-auto">Select the level of strategic engagement required for your career objective.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: "Strategic", price: "$499", features: ["Forensic Audit", "ATS Optimization", "1-on-1 Consultation"] },
                 { title: "Executive", price: "$999", features: ["Full Dossier Rebuild", "LinkedIn Optimization", "Priority Support"], popular: true },
                 { title: "Elite", price: "$1,999", features: ["Board-Level Strategy", "Market Intelligence", "Unlimited Revisions"] }
               ].map((tier, i) => (
                 <div key={i} className={`bg-white p-12 md:p-16 rounded-[4rem] border transition-all duration-700 flex flex-col ${tier.popular ? 'border-blue-600 shadow-2xl shadow-blue-100 scale-105 relative' : 'border-slate-100 shadow-sm hover:shadow-xl'}`}>
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                         Most Strategic
                      </div>
                    )}
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{tier.title}</h3>
                    <div className="text-5xl font-black text-blue-600 mb-10 tracking-tighter">{tier.price}</div>
                    <ul className="space-y-6 mb-12 flex-grow">
                       {tier.features.map((f, fi) => (
                         <li key={fi} className="flex items-center space-x-3 text-slate-500 font-medium">
                            <Zap size={16} className="text-blue-600" />
                            <span>{f}</span>
                         </li>
                       ))}
                    </ul>
                    <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 ${tier.popular ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700' : 'bg-slate-950 text-white hover:bg-black'}`}>
                       Select Tier
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-9xl font-black leading-none tracking-tighter mb-16">
               Ready to <br />
               Architect Your <br />
               <span className="text-blue-600">Dossier?</span>
            </h2>
            <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="bg-blue-600 text-white px-16 py-8 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
               Initiate Strategic Audit
            </button>
         </div>
      </section>
    </div>
  );
};

export default ResumeServices;
