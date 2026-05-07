import React, { useState } from 'react';
import { 
  Lock, Mail, ArrowRight, Shield, 
  Zap, Sparkles, Loader2, CheckCircle, 
  AlertCircle, Key, UserCheck, Fingerprint
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Credentials, 2: Biometric/Verification

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.play('click');
    setIsSubmitting(true);
    setError(null);

    // Simulate forensic authentication
    setTimeout(() => {
      if (email && password) {
        setStep(2);
        setIsSubmitting(false);
        sounds.play('notify');
      } else {
        setError("Invalid credentials. Strategic access denied.");
        setIsSubmitting(false);
        sounds.play('error');
      }
    }, 1500);
  };

  const handleFinalVerify = () => {
    sounds.play('click');
    setIsSubmitting(true);
    
    // Simulate biometric/final handshake
    setTimeout(() => {
      const mockUser = { id: '1', name: email.split('@')[0], email };
      onLogin(mockUser);
      sounds.play('success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10 font-inter">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100">
        
        {/* Left Side: Visual/Branding */}
        <div className="hidden lg:flex flex-col justify-between p-20 bg-slate-950 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black tracking-tighter select-none rotate-12">AUTH</div>
           </div>
           
           <div className="relative z-10">
              <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-10">
                 <Shield size={14} className="animate-pulse" />
                 <span>Secure Access Protocol</span>
              </div>
              <h2 className="text-6xl font-black leading-none tracking-tighter mb-8">
                 Strategic <br />
                 Command <br />
                 <span className="text-blue-600">Center.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
                 Access your forensic career pipeline and high-authority strategic dossiers.
              </p>
           </div>

           <div className="relative z-10 space-y-8">
              <div className="flex items-center space-x-6 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                    <Fingerprint size={24} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">Security Layer</div>
                    <div className="font-bold text-lg">AES-256 Encryption</div>
                 </div>
              </div>
              <div className="flex items-center space-x-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                 <Lock size={14} />
                 <span>Verified Strategic Link</span>
              </div>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-20 flex flex-col justify-center">
           {step === 1 ? (
             <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-12">
                   <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Initiate Link.</h1>
                   <p className="text-slate-500 font-medium text-lg">Enter your credentials to access the strategic archive.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Strategic Identity</label>
                      <div className="relative">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                         <input 
                          type="email" 
                          placeholder="email@domain.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none font-bold transition-all"
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Key</label>
                      <div className="relative">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                         <input 
                          type="password" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none font-bold transition-all"
                         />
                      </div>
                   </div>

                   {error && (
                     <div className="flex items-center space-x-3 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 animate-in shake duration-500">
                        <AlertCircle size={20} />
                        <span className="text-sm font-bold">{error}</span>
                     </div>
                   )}

                   <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                   >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <span>Authorize Access</span>
                          <ArrowRight size={24} />
                        </>
                      )}
                   </button>
                </form>

                <div className="mt-12 text-center">
                   <p className="text-slate-400 font-medium">New to the strategic circle?</p>
                   <button onClick={() => sounds.play('click')} className="mt-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Apply for Strategic Membership</button>
                </div>
             </div>
           ) : (
             <div className="text-center animate-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-blue-200">
                   <Fingerprint size={48} className="animate-pulse" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Identity Verified.</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12 max-w-sm mx-auto">Perform final biometric handshake to complete the strategic link to your command center.</p>
                
                <button 
                  onClick={handleFinalVerify}
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                >
                   {isSubmitting ? (
                     <Loader2 className="animate-spin" size={24} />
                   ) : (
                     <>
                        <UserCheck size={24} />
                        <span>Complete Handshake</span>
                     </>
                   )}
                </button>
                
                <button onClick={() => { setStep(1); sounds.play('click'); }} className="mt-10 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors">Abort & Return</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Login;
