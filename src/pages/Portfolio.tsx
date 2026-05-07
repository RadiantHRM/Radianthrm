import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, LayoutGrid, Target, Award, 
  ChevronRight, ArrowRight, Zap, Shield, 
  Sparkles, Globe, Cpu, MessageCircle, 
  Filter, Search, X
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Executive' | 'Operations' | 'Tech' | 'Finance' | 'Sales' | 'Healthcare'>('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Fortune 500 COO Placement",
      category: "Executive",
      client: "Global Logistics Leader",
      impact: "$1.2M Compensation Package",
      desc: "Architected a high-authority dossier for a COO transition, resulting in a 45% salary increase and board-level visibility.",
      image: "https://picsum.photos/seed/corp1/800/600",
      tags: ["Strategic Positioning", "Board Readiness", "Executive Branding"]
    },
    {
      id: 2,
      title: "FinTech VP Operations",
      category: "Operations",
      client: "Series D Unicorn",
      impact: "40% Salary Increase",
      desc: "Deconstructed the client's operational legacy to align with high-growth FinTech requirements, securing a top-tier placement.",
      image: "https://picsum.photos/seed/corp2/800/600",
      tags: ["Scale-up Strategy", "Operational Excellence", "Impact Narrative"]
    },
    {
      id: 3,
      title: "CTO Digital Transformation",
      category: "Tech",
      client: "Legacy Retail Giant",
      impact: "Direct Board Access",
      desc: "Repositioned a technical leader as a strategic business architect, facilitating a transition into a global CTO role.",
      image: "https://picsum.photos/seed/corp3/800/600",
      tags: ["Tech Leadership", "Digital Strategy", "Authority Building"]
    },
    {
      id: 4,
      title: "Investment Banking MD",
      category: "Finance",
      client: "Tier 1 Global Bank",
      impact: "$850k Base + Bonus",
      desc: "Forensic audit of a Managing Director's portfolio, highlighting high-stakes deal-making authority for a lateral move.",
      image: "https://picsum.photos/seed/corp4/800/600",
      tags: ["Deal Narrative", "Market Intel", "High-Stakes Negotiation"]
    },
    {
      id: 5,
      title: "VP Product Strategy",
      category: "Tech",
      client: "AI Research Lab",
      impact: "Equity Stake Optimization",
      desc: "Optimized the professional narrative for a product leader entering the AI space, securing significant equity and authority.",
      image: "https://picsum.photos/seed/corp5/800/600",
      tags: ["AI Positioning", "Product Authority", "Equity Strategy"]
    },
    {
      id: 6,
      title: "Chief People Officer",
      category: "Executive",
      client: "Global Tech Conglomerate",
      impact: "Global Remit",
      desc: "Architected a CPO transition focused on cultural transformation and strategic HR governance for a 50k+ employee org.",
      image: "https://picsum.photos/seed/corp6/800/600",
      tags: ["HR Governance", "Culture Strategy", "C-Suite Branding"]
    },
    {
      id: 7,
      title: "Senior Account Manager & Sales Leader",
      category: "Sales",
      client: "Global Tech Firm",
      impact: "23% Revenue Growth",
      desc: "Strategic account management narrative for a senior sales leader, focusing on revenue growth and client retention.",
      image: "https://picsum.photos/seed/sales1/800/600",
      tags: ["Account Management", "Revenue Growth", "Sales Strategy"]
    },
    {
      id: 8,
      title: "Senior Executive Assistant",
      category: "Operations",
      client: "High-Growth Startup",
      impact: "15+ Years Excellence",
      desc: "Detailed administrative support narrative highlighting efficiency, coordination, and executive partnership.",
      image: "https://picsum.photos/seed/admin1/800/600",
      tags: ["Exec Support", "Ops Efficiency", "Coordination"]
    },
    {
      id: 9,
      title: "Business Development Expert",
      category: "Sales",
      client: "Digital Media Agency",
      impact: "234% Quota Achievement",
      desc: "High-impact business development narrative for a senior professional with nearly two decades of experience.",
      image: "https://picsum.photos/seed/bizdev1/800/600",
      tags: ["Biz Dev", "Market Expansion", "Quota Crushing"]
    },
    {
      id: 10,
      title: "Registered Nurse & Senior Case Manager",
      category: "Healthcare",
      client: "Healthcare Institution",
      impact: "Emergency Medicine Expert",
      desc: "Specialized healthcare narrative for a senior nurse and case manager, focusing on patient advocacy and operational efficiency.",
      image: "https://picsum.photos/seed/health1/800/600",
      tags: ["Case Management", "Patient Advocacy", "Clinical Ops"]
    },
    {
      id: 11,
      title: "CEO & Co-Founder (Non-Profit)",
      category: "Executive",
      client: "KD Hall Foundation",
      impact: "15+ Years Impact",
      desc: "Non-profit leadership narrative highlighting community outreach, philanthropic initiatives, and developmental services.",
      image: "https://picsum.photos/seed/nonprofit1/800/600",
      tags: ["Philanthropy", "Community Outreach", "Non-Profit Leadership"]
    },
    {
      id: 12,
      title: "Chief Operating Officer",
      category: "Executive",
      client: "Investment Management Firm",
      impact: "Strategic Growth",
      desc: "Elite COO narrative for a seasoned investment management leader, focusing on business development and strategic growth.",
      image: "https://picsum.photos/seed/coo1/800/600",
      tags: ["Strategic Ops", "Investment Growth", "Executive Leadership"]
    },
    {
      id: 13,
      title: "Security Architect & Expert",
      category: "Tech",
      client: "Global Cloud Security Firm",
      impact: "20+ Years Experience",
      desc: "Technical cybersecurity narrative for a senior architect, focusing on cloud security, engineering, and risk management.",
      image: "https://picsum.photos/seed/cyber1/800/600",
      tags: ["Cybersecurity", "Cloud Security", "Risk Management"]
    },
    {
      id: 14,
      title: "Visionary Tech-Engineering Leader",
      category: "Tech",
      client: "AI Innovation Lab",
      impact: "$300M Revenue Drive",
      desc: "High-level data science and machine learning leadership narrative for a visionary tech executive.",
      image: "https://picsum.photos/seed/ai1/800/600",
      tags: ["Data Science", "Machine Learning", "Tech Leadership"]
    },
    {
      id: 15,
      title: "Government Contract Specialist",
      category: "Operations",
      client: "State Authority",
      impact: "Opportunity Programs",
      desc: "Specialized government contracting narrative focusing on compliance, program management, and strategic oversight.",
      image: "https://picsum.photos/seed/gov1/800/600",
      tags: ["Gov Contracts", "Compliance", "Program Management"]
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: any) => {
    sounds.play('click');
    setSelectedProject(project);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-sm font-black mb-10">
            <Award size={14} className="fill-current" />
            <span>THE STRATEGIC ARCHIVE v2.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">Impact <span className="text-blue-600">Gallery.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            A forensic showcase of high-authority career transformations and elite executive placements.
          </p>
          
          {/* Category Filter */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
             {['All', 'Executive', 'Operations', 'Tech', 'Finance', 'Sales', 'Healthcare'].map((cat) => (
               <button 
                key={cat}
                onClick={() => { setActiveCategory(cat as any); sounds.play('click'); }}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-900/40 scale-110' : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {filteredProjects.map((project) => (
             <div 
              key={project.id} 
              onClick={() => handleProjectClick(project)}
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-8"
             >
                <div className="relative h-80 overflow-hidden">
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                      <div className="text-white font-black text-sm uppercase tracking-widest flex items-center">
                         View Case Study <ChevronRight className="ml-2" />
                      </div>
                   </div>
                   <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                      {project.category}
                   </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                   <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">{project.client}</div>
                   <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{project.title}</h3>
                   <div className="mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Strategic Impact</div>
                      <div className="text-lg font-black text-blue-700">{project.impact}</div>
                   </div>
                   <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{tag}</span>
                      ))}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[4rem] w-full max-w-6xl max-h-full overflow-y-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative custom-scrollbar">
              <button 
                onClick={() => { setSelectedProject(null); sounds.play('click'); }}
                className="absolute top-10 right-10 p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all z-10"
              >
                <X size={24} className="text-slate-900" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                 <div className="h-[400px] lg:h-auto overflow-hidden">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="p-10 md:p-20 space-y-12">
                    <div>
                       <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full text-blue-600 text-xs font-black uppercase tracking-widest mb-8">
                          <Zap size={14} />
                          <span>Case Study Log #{selectedProject.id}</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-8">{selectedProject.title}</h2>
                       <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">{selectedProject.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Entity</div>
                          <div className="text-xl font-black text-slate-900">{selectedProject.client}</div>
                       </div>
                       <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-200">
                          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Impact</div>
                          <div className="text-xl font-black">{selectedProject.impact}</div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Strategic Vectors</h4>
                       <div className="flex flex-wrap gap-3">
                          {selectedProject.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-6 py-3 bg-slate-100 rounded-xl text-xs font-black text-slate-900 uppercase tracking-widest border border-slate-200">{tag}</span>
                          ))}
                       </div>
                    </div>

                    <button onClick={() => { window.location.href = '#/contact'; sounds.play('click'); }} className="w-full bg-slate-950 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-black transition-all flex items-center justify-center space-x-4 shadow-2xl shadow-slate-900/20 active:scale-95">
                       <span>Request Similar Strategy</span>
                       <ArrowRight size={24} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default Portfolio;
