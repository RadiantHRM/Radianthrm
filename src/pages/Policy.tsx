import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle, AlertCircle, Globe, Database, Scale, Info } from 'lucide-react';

const Policy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Data Sovereignty",
      icon: <Database className="text-blue-600" />,
      content: "At Hireable Co., we treat your professional data as a sovereign asset. We do not sell, trade, or lease your personal information to third parties. Your data is used exclusively to architect your career strategy."
    },
    {
      title: "Forensic Security",
      icon: <Lock className="text-purple-600" />,
      content: "All document processing, including our ATS Forensic Scanner, utilizes AES-256 encryption. We employ enterprise-grade security protocols to ensure your strategic dossiers remain confidential."
    },
    {
      title: "Transparency Protocol",
      icon: <Eye className="text-emerald-600" />,
      content: "We are committed to absolute transparency regarding how your data is processed. You have the right to request a full audit of the data we hold and can request its permanent deletion at any time."
    },
    {
      title: "Legal Compliance",
      icon: <Scale className="text-orange-600" />,
      content: "Our operations strictly adhere to global data protection regulations, including GDPR and CCPA. We maintain a rigorous compliance framework to protect your rights across all jurisdictions."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-inter py-24 md:py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24 md:mb-40">
           <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-widest mb-10">
              <Shield size={14} />
              <span>Governance & Protection</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10">Privacy <span className="text-blue-600">Charter.</span></h1>
           <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
              Our commitment to the security and integrity of your professional identity is absolute.
           </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
           {sections.map((section, i) => (
             <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   {section.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{section.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{section.content}</p>
             </div>
           ))}
        </div>

        {/* Detailed Policy Content */}
        <div className="bg-white rounded-[4rem] p-10 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50">
           <div className="prose prose-slate max-w-none">
              <div className="flex items-center space-x-4 mb-12 border-b border-slate-100 pb-8">
                 <FileText className="text-blue-600" size={32} />
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight m-0">Full Strategic Policy</h2>
              </div>

              <div className="space-y-16">
                 <section>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">1. Information Collection</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                       We collect information necessary to provide our high-authority career services. This includes contact details, professional history, educational background, and strategic objectives. This data is collected through direct input, document uploads, and strategic consultations.
                    </p>
                 </section>

                 <section>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">2. Use of Information</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                       Your information is used to:
                    </p>
                    <ul className="mt-6 space-y-4 text-slate-600 font-medium list-none p-0">
                       {[
                         "Architect bespoke career strategies and dossiers.",
                         "Perform forensic ATS analysis and optimization.",
                         "Facilitate high-stakes executive placements.",
                         "Communicate strategic updates and market intelligence.",
                         "Improve our proprietary forensic algorithms."
                       ].map((item, i) => (
                         <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                            <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                 </section>

                 <section>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">3. Data Retention</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                       We retain your data only as long as necessary to fulfill the strategic objectives of our engagement. You may request the permanent deletion of your data at any time through our secure support channel.
                    </p>
                 </section>

                 <section>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-6">4. Third-Party Integration</h4>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                       Our services may integrate with third-party platforms (e.g., Google for authentication). These integrations are governed by their respective privacy policies. We ensure that all integrations meet our rigorous security standards.
                    </p>
                 </section>

                 <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center space-x-3 text-slate-400">
                       <Info size={20} />
                       <span className="text-sm font-bold uppercase tracking-widest">Last Updated: March 2024</span>
                    </div>
                    <button className="text-blue-600 font-black uppercase tracking-widest text-sm hover:underline">Download PDF Version</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Contact for Privacy */}
        <div className="mt-24 text-center">
           <p className="text-slate-500 font-medium mb-8">Questions regarding our Strategic Privacy Charter?</p>
           <button onClick={() => window.location.href = '#/contact'} className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95">
              Contact Data Protection Officer
           </button>
        </div>
      </div>
    </div>
  );
};

export default Policy;
