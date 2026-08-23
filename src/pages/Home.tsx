import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  Minus,
  Quote,
  Zap,
  Info
} from 'lucide-react';
import { SERVICE_PILLARS, TESTIMONIALS, CountUp } from '../constants.tsx';
import { sounds } from '../utils/audio';

const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'INTERVIEW RATE', value: 98, suffix: '%' },
    { label: 'AVG SALARY JUMP', value: 38, suffix: '%' },
    { label: 'CLIENTS HIRED', value: 500, suffix: '+' },
    { label: 'QUICK TURNAROUND', value: 24, suffix: 'h' }
  ];

  const faqs = [
    { q: "How does the VIP Reverse Recruiting service work?", a: "Our team acts as your dedicated career agents. We source hidden roles, handle the aggressive outbound applications, and network directly with decision-makers to land you interviews while you focus on your current role. We effectively become your outsourced job search department." },
    { q: "Are your resumes truly ATS-optimized?", a: "Yes. We use forensic keyword mapping and semantic intent analysis based on current FAANG-grade screening algorithms. Unlike basic 'stuffing', we align your achievements with the specific data points that internal hiring software is programmed to prioritize." },
    { q: "What makes Hireable Co. different from standard resume writers?", a: "Standard writers provide summaries; we provide business cases. We re-engineer your professional narrative to focus on impact quantification and high-authority positioning. We treat your career as a revenue-generating asset that needs a compelling ROI presentation." },
    { q: "How do I securely transmit my current documents?", a: "You can use our 'Direct Briefing' portal on the Contact page. All documents are processed via an encrypted link and stored in an isolated registry accessible only by our founding architect." },
    { q: "Do you offer coaching for salary negotiation?", a: "Our Executive and VIP tiers include intensive negotiation sessions where we teach you the Anchor Protocol. This framework ensures you enter conversations with a pre-calculated market value that commands respect and maximizes total compensation packages." },
    { q: "What is the typical turnaround time?", a: "Our standard forensic audit is delivered within 24-48 hours. Full narrative re-engineering typically takes 5-7 business days to ensure the quality required for high-stakes executive placement." }
  ];

  return (
    <div className="overflow-hidden bg-white">
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-drift {
          animation: drift 25s infinite ease-in-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-48 md:pb-40 bg-slate-950 text-white text-center overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/20 blur-[180px] rounded-full animate-drift"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full animate-drift" style={{ animationDelay: '-12s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-xs font-black mb-10 tracking-widest uppercase animate-in fade-in slide-in-from-top-4 duration-1000">
            <Star size={14} className="fill-current" />
            <span>GLOBAL CAREER ARCHITECTS</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            We Engineer Careers <br className="hidden md:block" />
            <span className="text-blue-500">at Every Stage.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-14 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            From first-job kickstarts to high-stakes VIP hiring takeovers. Stop applying blindly—start dominating the market.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <a href="#/resume-services" className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-2xl shadow-blue-900/40 active:scale-95">
              Explore Services
            </a>
            <a href="#/contact" className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition active:scale-95">
              Book Strategy Call
            </a>
          </div>
        </div>

        {/* Executive Stats Bar - Refined with CountUp Animation */}
        <div ref={statsRef} className="mt-24 md:mt-32 max-w-6xl mx-auto px-4 animate-in fade-in duration-1000 delay-700">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                   <div className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter transition-transform group-hover:scale-110 duration-500">
                     <CountUp end={stat.value} suffix={stat.suffix} shouldAnimate={statsVisible} />
                   </div>
                   <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                     {stat.label}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Corporate Ecosystem - Logo Cloud Marquee */}
      <section className="py-14 border-b border-slate-100 overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <p className="text-center text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.5em]">HELPING CLIENTS GET HIRED AT</p>
        </div>
        
        <div className="relative flex overflow-x-hidden w-full select-none">
          <motion.div 
            className="flex items-center gap-12 md:gap-20 py-2 whitespace-nowrap opacity-40 hover:opacity-90 grayscale hover:grayscale-0 transition-opacity duration-500 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ willChange: "transform" }}
          >
            {[
              "GOOGLE", "AMAZON", "MICROSOFT", "DELOITTE", "META", "APPLE", 
              "GOLDMAN SACHS", "McKinsey", "NVIDIA", "TESLA", "SPOTIFY", "IBM", 
              "PWC", "ACCENTURE", "J.P. MORGAN", "MORGAN STANLEY", "SALESFORCE", "NETFLIX"
            ].concat([
              "GOOGLE", "AMAZON", "MICROSOFT", "DELOITTE", "META", "APPLE", 
              "GOLDMAN SACHS", "McKinsey", "NVIDIA", "TESLA", "SPOTIFY", "IBM", 
              "PWC", "ACCENTURE", "J.P. MORGAN", "MORGAN STANLEY", "SALESFORCE", "NETFLIX"
            ]).map((company, idx) => (
              <span key={idx} className="text-xl md:text-3xl font-black italic tracking-tighter inline-block text-slate-800">
                {company}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section - Restored Card Aesthetic */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter">Our Core Methodology</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-bold leading-relaxed">End-to-end career acceleration through authority branding and strategic placement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SERVICE_PILLARS.map((pillar, idx) => (
              <div key={idx} className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-blue-100 hover:-translate-y-3 transition-all duration-700 flex flex-col group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 mb-6 tracking-tight">{pillar.title}</h3>
                <p className="text-slate-600 mb-10 text-base leading-relaxed flex-grow font-medium">{pillar.description}</p>
                <a href={pillar.link} className="inline-flex items-center text-blue-600 font-black uppercase tracking-widest text-xs group-hover:translate-x-3 transition-transform">
                  EXPLORE PROTOCOL <ChevronRight size={16} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Reports Carousel - Horizontal Marquee for Rhythm */}
      <section className="py-20 md:py-36 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
           <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-700 text-[10px] md:text-xs font-black mb-4 tracking-widest uppercase">
             <TrendingUp size={14} className="text-blue-600" />
             <span>VERIFIED CLIENT IMPACT</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-4 tracking-tighter">Impact Reports</h2>
           <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">Real placement outcomes, compensation leaps, and executive trajectory shifts.</p>
        </div>

        {/* Smooth Framer-Motion Hardware-Accelerated Marquee */}
        <div className="relative flex overflow-x-hidden w-full select-none py-4">
          <motion.div 
            className="flex items-stretch gap-6 md:gap-8 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 48,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ willChange: "transform" }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`}
                className="w-[310px] sm:w-[380px] md:w-[440px] flex-shrink-0 bg-white p-7 sm:p-8 rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                 <div>
                   {/* Top Header Row: Profile Avatar + Name/Role */}
                   <div className="flex items-center space-x-3.5 mb-4">
                     <div className="relative flex-shrink-0">
                       <img 
                         src={t.image} 
                         alt={t.name} 
                         className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm" 
                       />
                       <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-lg shadow-sm">
                         <ShieldCheck size={12} />
                       </div>
                     </div>
                     <div className="min-w-0 flex-1">
                       <div className="text-base sm:text-lg font-black text-slate-900 leading-tight truncate">{t.name}</div>
                       <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 truncate">{t.role}</div>
                     </div>
                   </div>

                   {/* Dedicated Star Rating Row - Safely nested inside card with ample padding */}
                   <div className="flex items-center space-x-1 text-amber-400 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={15} fill="currentColor" />)}
                   </div>

                   {/* Quote Text */}
                   <p className="text-slate-700 text-sm sm:text-[15px] md:text-base font-normal leading-relaxed italic line-clamp-4">
                     "{t.content}"
                   </p>
                 </div>

                 {/* Bottom Footer */}
                 <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                    {t.salaryIncrease ? (
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-xl font-black text-xs tracking-tight">
                        <TrendingUp size={14} className="text-blue-600 flex-shrink-0" />
                        <span>{t.salaryIncrease} Increase</span>
                      </div>
                    ) : <div />}
                    
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span>Verified Result</span>
                    </div>
                 </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter mb-6">Strategic Briefing</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">FREQUENTLY ASKED PROTOCOLS</p>
           </div>

           <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden transition-all duration-300 hover:border-blue-200 shadow-sm hover:shadow-lg">
                   <button 
                    onClick={() => { sounds.play('click'); setActiveFaq(activeFaq === i ? null : i); }}
                    className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
                   >
                     <span className={`text-lg md:text-xl font-black tracking-tight transition-colors ${activeFaq === i ? 'text-blue-600' : 'text-slate-900'}`}>{faq.q}</span>
                     <div className={`transition-transform duration-500 ${activeFaq === i ? 'rotate-180 text-blue-600' : 'text-slate-300'}`}>
                        {activeFaq === i ? <Minus size={28} /> : <Plus size={28} />}
                     </div>
                   </button>
                   <div className={`transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="px-8 md:px-10 pb-10">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                          <p className="text-slate-600 font-medium text-lg leading-relaxed">{faq.a}</p>
                          <div className="mt-6 flex items-center text-blue-600 text-xs font-black uppercase tracking-widest">
                            <Info size={14} className="mr-2" />
                            <span>Protocol Verified Information</span>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-16 text-center">
             <p className="text-slate-400 font-bold mb-6">Still have questions about our specific engagement models?</p>
             <a href="#/contact" className="inline-flex items-center space-x-3 text-blue-600 font-black uppercase tracking-[0.2em] text-sm hover:translate-x-2 transition-transform">
               <span>Request Private Briefing</span>
               <ChevronRight size={18} />
             </a>
           </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative">
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-20">
            <div className="w-full md:w-5/12 max-w-md">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl relative group">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200" alt="Isaac Ademola" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-6">
                    <div className="text-2xl font-black tracking-tighter">ISAAC ADEMOLA</div>
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">FOUNDER & CHIEF ARCHITECT</div>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-7/12 text-center md:text-left">
              <Quote className="text-blue-600 mb-8 mx-auto md:mx-0" size={56} />
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tighter">"Every professional deserves a <span className="text-blue-500">voice</span> that commands respect."</h2>
              <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed italic font-medium">"Your value shouldn't be trapped in a document. We set your narrative free and align it with market reality."</p>
              <a href="#/founder" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition shadow-xl inline-flex items-center space-x-3 active:scale-95">
                <span>Meet the Founder</span>
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
