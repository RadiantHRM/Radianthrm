import React, { useEffect } from 'react';
import { 
  Quote, ArrowRight, Linkedin, Twitter, Mail, Award, 
  Target, Zap, Shield, Sparkles, ChevronRight, Globe, 
  Cpu, LayoutGrid, MessageCircle, PlayCircle
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const Founder: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://picsum.photos/seed/executive/1920/1080?blur=2" 
            alt="Founder Background" 
            className="w-full h-full object-cover opacity-10"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
           <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
             <Sparkles size={14} className="animate-pulse" />
             <span>The Founder</span>
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-black text-slate-950 leading-[0.85] tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             Meet the <br />
             <span className="text-blue-600">Architect.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium italic animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
             Not just a service. The strategic career architect behind high-authority executive placements.
          </p>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Isaac Ademola */}
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-5/12 relative group">
              <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] -rotate-2 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200" 
                  alt="Isaac Ademola" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="w-full lg:w-7/12 space-y-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter mb-2">Isaac Ademola</h2>
                <div className="text-slate-400 text-lg md:text-xl font-medium italic mb-3">10+ years executive search veteran. Strategic placement specialist.</div>
                <div className="text-blue-600 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Founder & Chief Architect</div>
              </div>
              <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                <p>
                  After working with multiple high-growth startups and building Cabana, a design system used by thousands of professionals worldwide, I know firsthand what moves the needle in executive careers.
                </p>
                <p>
                  This experience, plus strategic insights I've shared as a thought-leader for over a decade, shows that success isn't just about pretty resumes; it's about solving real business problems through smart positioning.
                </p>
                <p>
                  I started Hireable Co. to help leaders turn their professional identity into a growth engine instead of just a cost. Having been a founder myself, I tackle every project with both a designer's eye and a focus on the numbers that grow your career.
                </p>
              </div>
              <div className="flex items-center space-x-4 pt-6">
                <a href="mailto:hello@hireableco.com" className="p-4 bg-slate-950 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg"><Mail size={24} /></a>
                <a href="#" className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"><Linkedin size={24} /></a>
                <a href="#" className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"><Twitter size={24} /></a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 md:py-48 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black tracking-tighter select-none">MANIFESTO</div>
         </div>
         
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center space-x-6 mb-20">
               <div className="w-20 h-1 bg-blue-600" />
               <h2 className="text-2xl md:text-4xl font-black uppercase tracking-[0.4em] text-blue-500">The Strategic Manifesto</h2>
            </div>
            
            <div className="space-y-16 md:space-y-24">
               <p className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight">
                  "In a world of noise, <span className="text-blue-600">authority</span> is the only currency that matters. We don't just fix resumes; we architect career legacies."
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 text-slate-400 text-lg md:text-2xl font-medium leading-relaxed">
                  <p>
                     For over a decade, I've watched brilliant professionals stall in their careers not because of a lack of talent, but because of a lack of strategic positioning. The market doesn't reward hard work in isolation; it rewards the perception of high-value impact.
                  </p>
                  <p>
                     Hireable Co. was born from a single realization: the tools used by elite executive search firms could be democratized for the individual. We apply forensic analysis to every touchpoint of your professional identity.
                  </p>
               </div>

               <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="flex items-center space-x-8">
                     <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">15k+</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-2">Careers Transformed</div>
                     </div>
                     <div className="w-px h-16 bg-white/10" />
                     <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">$2B+</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-2">Salary Increases</div>
                     </div>
                  </div>
                  <button onClick={() => sounds.play('click')} className="group flex items-center space-x-4 bg-white text-slate-950 px-12 py-6 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">
                     <span>Join the Movement</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Core Philosophies */}
      <section className="py-24 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-32">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">Core Philosophies.</h2>
            <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-3xl mx-auto">The foundational principles that drive every strategic engagement at Hireable Co.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Cpu size={48} className="text-blue-600" />,
                title: "Forensic Precision",
                desc: "We analyze your career through the lens of data and algorithms, ensuring every word serves a strategic purpose."
              },
              {
                icon: <Shield size={48} className="text-purple-600" />,
                title: "Unapologetic Authority",
                desc: "We believe in positioning our clients as the definitive solution to a company's most complex problems."
              },
              {
                icon: <Zap size={48} className="text-orange-600" />,
                title: "Dynamic Evolution",
                desc: "The market changes daily. Our strategies are built to adapt, ensuring you remain at the cutting edge of your industry."
              }
            ].map((item, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
                 <div className="mb-10 p-6 bg-white rounded-3xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{item.title}</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                 <div className="mt-10 flex items-center text-blue-600 font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep Dive <ChevronRight size={16} className="ml-1" />
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 bg-blue-600 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="border-r border-white h-full" />
               ))}
            </div>
         </div>
         
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-9xl font-black text-white leading-none tracking-tighter mb-16">
               Ready to <br />
               Architect Your <br />
               <span className="text-slate-950">Legacy?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
               <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="w-full sm:w-auto bg-slate-950 text-white px-16 py-8 rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-2xl active:scale-95">
                  Book a Strategic Audit
               </button>
               <button onClick={() => sounds.play('click')} className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-16 py-8 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all active:scale-95">
                  Read the Full Manifesto
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Founder;
