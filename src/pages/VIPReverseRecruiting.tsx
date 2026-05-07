import React, { useEffect } from 'react';
import { 
  Zap, Target, Shield, Sparkles, 
  ChevronRight, ArrowRight, Globe, 
  Cpu, LayoutGrid, MessageCircle, 
  PlayCircle, Award, TrendingUp, Users
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const VIPReverseRecruiting: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Target className="text-blue-600" />,
      title: "Strategic Targeting",
      desc: "We identify the high-authority roles that never hit the public market, utilizing our elite executive network."
    },
    {
      icon: <Cpu className="text-purple-600" />,
      title: "Forensic Outreach",
      desc: "Our team handles all initial engagement, architecting a narrative that commands immediate attention from decision-makers."
    },
    {
      icon: <Shield className="text-emerald-600" />,
      title: "Negotiation Mastery",
      desc: "We lead the high-stakes compensation discussions, ensuring your market value is fully realized and protected."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-inter">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-xs font-black mb-10">
            <Sparkles size={14} className="fill-current" />
            <span>ELITE ENGAGEMENT v5.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">VIP Reverse <span className="text-blue-600">Recruiting.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            A high-authority, end-to-end placement service where we act as your strategic agents in the executive market.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
             <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
                Apply for VIP Access
             </button>
             <button onClick={() => sounds.play('click')} className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95">
                View Strategic Process
             </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((item, i) => (
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

      {/* Process Section */}
      <section className="py-24 md:py-48 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">The Forensic Process.</h2>
               <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-3xl mx-auto">A multi-phase strategic engagement designed for absolute market dominance.</p>
            </div>

            <div className="space-y-12">
               {[
                 { step: "01", title: "Strategic Audit", desc: "We deconstruct your entire professional legacy to identify hidden authority vectors." },
                 { step: "02", title: "Market Intelligence", desc: "Our team maps the executive landscape to find roles aligned with your strategic goals." },
                 { step: "03", title: "Forensic Outreach", desc: "We initiate high-authority engagement with key decision-makers on your behalf." },
                 { step: "04", title: "Negotiation Mastery", desc: "We lead the final high-stakes discussions to secure your maximum market value." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all duration-500">
                    <div className="text-6xl md:text-8xl font-black text-blue-600/10 group-hover:text-blue-600/20 transition-colors">{item.step}</div>
                    <div className="flex-grow text-center md:text-left">
                       <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                       <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <ChevronRight size={32} />
                    </div>
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
               Ready for <br />
               Elite <br />
               <span className="text-blue-600">Placement?</span>
            </h2>
            <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="bg-blue-600 text-white px-16 py-8 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
               Apply for VIP Engagement
            </button>
         </div>
      </section>
    </div>
  );
};

export default VIPReverseRecruiting;
