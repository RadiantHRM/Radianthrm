import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Instagram, MessageCircle, LogIn, User as UserIcon, Search, UserCheck, CheckCircle2, Loader2, Send, Home as HomeIcon, FileText, Target, Award, Phone, Zap, ArrowRight, HelpCircle, Briefcase, LifeBuoy } from 'lucide-react';
import { CONTACT_INFO, COLORS, RadiantLogo } from '../constants.tsx';
import { sounds } from '../utils/audio.ts';
import AIAssistant from './AIAssistant.tsx';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleMenu = () => {
    sounds.play('click');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.play('click');
    setIsSubscribing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubscribing(false);
    setIsSubscribed(true);
    sounds.play('success');
    setEmail('');
  };

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Portfolio', href: '#/portfolio' },
    { label: 'ATS Scanner', href: '#/scanner' },
    { label: 'Resume', href: '#/resume-services' },
    { label: 'VIP Recruiting', href: '#/reverse-recruiting' },
    { label: 'Results', href: '#/results' },
    { label: 'Blog', href: '#/blog' },
    { label: 'Support', href: '#/support' },
    { label: 'Contact', href: '#/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-inter bg-white">
      <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#/" className="flex items-center" onClick={() => sounds.play('click')}>
              <RadiantLogo />
            </a>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="text-slate-700 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              
              {user ? (
                <a href="#/dashboard" className="flex items-center space-x-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl">
                  <UserIcon size={16} />
                  <span>Portal</span>
                </a>
              ) : (
                <a href="#/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm">
                  Login
                </a>
              )}
            </nav>

            <button onClick={toggleMenu} className="lg:hidden text-slate-900">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 py-6 px-4 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="block text-slate-900 font-bold text-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <AIAssistant />

      <footer className="bg-slate-950 text-white pt-24 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-8">
              <a href="#/" onClick={() => sounds.play('click')}>
                <RadiantLogo dark className="!h-6 md:!h-8" />
              </a>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                Engineering high-authority professional narratives. We empower high-achievers to bypass algorithms and dominate the modern job market through data-driven branding.
              </p>
              <div className="flex items-center space-x-6">
                <a href={CONTACT_INFO.whatsappLink} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                  <MessageCircle size={20} />
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                  <Mail size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8">SERVICE SUITE</h4>
              <ul className="space-y-4">
                <li><a href="#/portfolio" className="text-slate-300 hover:text-white transition-colors text-base font-bold">Forensic Portfolio</a></li>
                <li><a href="#/resume-services" className="text-slate-300 hover:text-white transition-colors text-base font-bold">Resume Engineering</a></li>
                <li><a href="#/reverse-recruiting" className="text-slate-300 hover:text-white transition-colors text-base font-bold">VIP Recruiting</a></li>
                <li><a href="#/support" className="text-slate-300 hover:text-white transition-colors text-base font-bold">Help & Support</a></li>
                <li>
                  <a href="#faq" onClick={() => { if(window.location.hash !== '#/') window.location.hash = '#/'; }} className="text-blue-400 hover:text-white transition-colors text-base font-black flex items-center">
                    <HelpCircle size={16} className="mr-2" />
                    Strategic FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform">
                   <Zap size={150} />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6">WEEKLY GROWTH HUB</h4>
                 <p className="text-white text-xl md:text-2xl font-black tracking-tight mb-10 max-w-md leading-relaxed">
                   Join 5,000+ executives receiving high-paying job alerts and negotiation strategies every Tuesday.
                 </p>
                 
                 {isSubscribed ? (
                   <div className="p-6 bg-blue-600/20 border border-blue-600/30 rounded-2xl flex items-center space-x-4 text-blue-400 animate-in fade-in zoom-in">
                      <CheckCircle2 size={24} />
                      <span className="font-black uppercase tracking-widest text-xs">Uplink Verified. Welcome to the Collective.</span>
                   </div>
                 ) : (
                   <form onSubmit={handleSubscribe} className="space-y-4">
                     <div className="relative">
                       <input 
                        type="email" 
                        placeholder="Work Email Address" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-slate-500 font-bold outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                       />
                     </div>
                     <button 
                      type="submit" 
                      disabled={isSubscribing}
                      className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3"
                     >
                        {isSubscribing ? <Loader2 className="animate-spin" size={24} /> : (
                          <>
                            <span className="text-lg">Secure Access</span>
                            <ArrowRight size={20} />
                          </>
                        )}
                     </button>
                   </form>
                 )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} Radianthrm Collective. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <a href="#/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#/policy/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#/policy/integrity" className="hover:text-white transition-colors">Forensic Integrity</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
