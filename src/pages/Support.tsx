import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, HelpCircle, Search, ChevronDown, 
  ArrowRight, Mail, Phone, Globe, Shield, 
  Zap, Sparkles, MessageSquare, Send, Loader2,
  CheckCircle, LifeBuoy, Clock, Terminal
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "How does the forensic ATS scan work?",
      a: "Our proprietary engine deconstructs your resume using the same parsing logic as enterprise ATS platforms. It analyzes keyword proximity, semantic density, and formatting integrity to ensure 99% compatibility."
    },
    {
      q: "What is the timeline for a VIP Reverse Recruiting engagement?",
      a: "Typically, a full engagement spans 4-8 weeks. This includes strategic architecting, market intelligence gathering, and active placement facilitation."
    },
    {
      q: "Is my data secure during the forensic audit?",
      a: "Absolute security is our baseline. All documents are processed via AES-256 encrypted channels and are automatically purged from our forensic buffers after 24 hours unless otherwise requested."
    },
    {
      q: "Can I upgrade my service package mid-engagement?",
      a: "Yes. Strategic pivots are common in high-authority career transitions. You can scale your engagement level at any point through your dedicated consultant."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.play('click');
    setIsSubmitting(true);
    
    // Simulate tactical transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sounds.play('success');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-inter py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24 md:mb-40 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
           <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-widest mb-10">
              <LifeBuoy size={14} className="animate-spin-slow" />
              <span>Strategic Support Command</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-10">How can we <span className="text-blue-600">assist?</span></h1>
           
           <div className="max-w-2xl mx-auto relative mt-16">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={28} />
              <input 
                type="text" 
                placeholder="Search the strategic knowledge base..." 
                className="w-full pl-20 pr-10 py-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 font-bold text-lg outline-none focus:ring-4 focus:ring-blue-600/10 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
           
           {/* FAQ Section */}
           <div className="lg:col-span-7 space-y-12">
              <div className="flex items-center space-x-5 mb-12">
                 <HelpCircle size={48} className="text-blue-600" />
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Forensic Intel.</h2>
              </div>

              <div className="space-y-6">
                 {faqs.map((faq, i) => (
                   <div 
                    key={i} 
                    className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${activeFaq === i ? 'border-blue-600 shadow-2xl shadow-blue-100' : 'border-slate-100 shadow-sm hover:border-blue-200'}`}
                   >
                      <button 
                        onClick={() => { setActiveFaq(activeFaq === i ? null : i); sounds.play('click'); }}
                        className="w-full px-10 py-8 text-left flex justify-between items-center group"
                      >
                         <span className={`text-xl font-black transition-colors ${activeFaq === i ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{faq.q}</span>
                         <ChevronDown className={`text-slate-300 transition-transform duration-500 ${activeFaq === i ? 'rotate-180 text-blue-600' : ''}`} size={28} />
                      </button>
                      <div className={`px-10 transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-96 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                         <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed border-t border-slate-50 pt-8">
                            {faq.a}
                         </p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                 <div className="bg-slate-950 p-10 rounded-[3rem] text-white group hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                    <Mail className="text-blue-400 mb-8" size={40} />
                    <h4 className="text-2xl font-black mb-4 tracking-tight">Strategic Email</h4>
                    <p className="text-slate-400 font-medium mb-8">Direct line to our executive support team.</p>
                    <a href="mailto:support@radianthrm.com" className="text-blue-400 font-black uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform">
                       support@radianthrm.com <ArrowRight size={14} className="ml-2" />
                    </a>
                 </div>
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-100 group hover:-translate-y-2 transition-all duration-500 shadow-xl">
                    <Phone className="text-blue-600 mb-8" size={40} />
                    <h4 className="text-2xl font-black mb-4 tracking-tight">Global Command</h4>
                    <p className="text-slate-500 font-medium mb-8">Priority voice support for VIP engagements.</p>
                    <a href="tel:+1234567890" className="text-blue-600 font-black uppercase tracking-widest text-xs flex items-center group-hover:translate-x-2 transition-transform">
                       +1 (234) 567-890 <ArrowRight size={14} className="ml-2" />
                    </a>
                 </div>
              </div>
           </div>

           {/* Contact Form */}
           <div className="lg:col-span-5">
              <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32">
                 {submitted ? (
                   <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                      <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-blue-200">
                         <CheckCircle size={48} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Transmission Received.</h3>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">Our strategic team has been alerted. Expect a forensic response within 4 tactical hours.</p>
                      <button onClick={() => { setSubmitted(false); sounds.play('click'); }} className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Log New Request</button>
                   </div>
                 ) : (
                   <>
                     <div className="flex items-center space-x-4 mb-12">
                        <MessageSquare className="text-blue-600" size={32} />
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Direct Link.</h3>
                     </div>
                     <form onSubmit={handleContactSubmit} className="space-y-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity</label>
                           <input type="text" placeholder="Full Name" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none font-bold transition-all" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Email</label>
                           <input type="email" placeholder="email@domain.com" className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none font-bold transition-all" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Strategic Inquiry</label>
                           <textarea rows={5} placeholder="Describe your objective..." className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none font-medium transition-all resize-none" required />
                        </div>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <Loader2 className="animate-spin" size={24} />
                          ) : (
                            <>
                              <span>Transmit Inquiry</span>
                              <Send size={24} />
                            </>
                          )}
                        </button>
                     </form>
                     
                     <div className="mt-12 pt-10 border-t border-slate-50">
                        <div className="flex items-center space-x-4 text-slate-400">
                           <Shield size={20} />
                           <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Encrypted Transmission</span>
                        </div>
                     </div>
                   </>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
