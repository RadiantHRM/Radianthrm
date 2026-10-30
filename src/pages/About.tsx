import React, { useEffect } from 'react';
import {
  ArrowRight, Sparkles, Target, Eye, Compass, ShieldCheck, TrendingUp,
  Users, Search, PenTool, Rocket, Handshake, GraduationCap, Briefcase,
  Crown, Quote, CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio.ts';

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '500+', label: 'Clients Hired' },
    { value: '98%', label: 'Interview Rate' },
    { value: '38%', label: 'Avg Salary Jump' },
    { value: '24h', label: 'Audit Turnaround' }
  ];

  const values = [
    {
      icon: <Target size={28} />,
      title: 'Results Over Rhetoric',
      desc: 'Every resume, profile and outreach message is measured by one thing: whether it gets you in the room with decision-makers.'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Radical Integrity',
      desc: 'We never fabricate experience. We uncover the real impact you have created and present it with clarity and confidence.'
    },
    {
      icon: <Users size={28} />,
      title: 'Personal Partnership',
      desc: 'No templates and no assembly lines. Each client works with a strategist who learns their story, goals and market.'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Market Intelligence',
      desc: 'We track hiring trends, ATS behaviour and compensation data so your strategy reflects how hiring works today.'
    }
  ];

  const process = [
    {
      icon: <Search size={24} />,
      step: '01',
      title: 'Discovery & Audit',
      desc: 'We review your documents, career history and targets, then deliver a forensic audit showing exactly where you are losing opportunities.',
      image: img('1551836022-d5d88e9218df', 800)
    },
    {
      icon: <PenTool size={24} />,
      step: '02',
      title: 'Narrative Engineering',
      desc: 'Your resume, LinkedIn and cover letters are rebuilt around quantified impact and the keywords hiring systems prioritise.',
      image: img('1552664730-d307ca884978', 800)
    },
    {
      icon: <Rocket size={24} />,
      step: '03',
      title: 'Market Launch',
      desc: 'We position you in front of the right roles, from targeted applications to VIP reverse recruiting where we run the search for you.',
      image: img('1522071820081-009f0129c71c', 800)
    },
    {
      icon: <Handshake size={24} />,
      step: '04',
      title: 'Interview & Offer',
      desc: 'Coaching on interviews and salary negotiation so you walk into every conversation prepared and leave with the offer you deserve.',
      image: img('1600880292203-757bb62b4baf', 800)
    }
  ];

  const audiences = [
    {
      icon: <GraduationCap size={26} />,
      title: 'Early-Career Talent',
      desc: 'Graduates and career starters who need a sharp first impression and a clear path into competitive roles.'
    },
    {
      icon: <Briefcase size={26} />,
      title: 'Mid-Level Professionals',
      desc: 'Specialists and managers ready for a promotion, an industry switch or a meaningful jump in compensation.'
    },
    {
      icon: <Crown size={26} />,
      title: 'Senior Leaders & Executives',
      desc: 'Directors and C-suite leaders who need high-authority positioning and discreet access to the hidden job market.'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-inter overflow-hidden">

      {/* Hero */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-36 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={img('1497366216548-37526070297c', 1920)}
            alt="Hireable Co. workspace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-400 text-[10px] md:text-xs font-black mb-10 tracking-widest uppercase animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles size={14} />
            <span>About Hireable Co.</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            We Turn Talent <br className="hidden md:block" />
            <span className="text-blue-500">Into Offers.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Hireable Co. is a career strategy firm helping professionals at every stage get seen, get interviewed and get hired by the companies they want to work for.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 mt-20 md:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-14">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{s.value}</div>
                <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.4em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              <img
                src={img('1556761175-5973dc0f32e7', 800)}
                alt="Career strategy workshop"
                className="rounded-[2rem] shadow-2xl object-cover w-full h-72 md:h-96"
              />
              <img
                src={img('1531482615713-2afd69097998', 800)}
                alt="Strategists reviewing a client profile"
                className="rounded-[2rem] shadow-2xl object-cover w-full h-72 md:h-96 mt-12"
              />
            </div>
            <div className="absolute -bottom-8 left-6 md:left-10 bg-blue-600 text-white px-8 py-6 rounded-3xl shadow-2xl shadow-blue-900/30">
              <div className="text-3xl md:text-4xl font-black tracking-tighter">10+ Years</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Of Hiring Insight</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-blue-600 text-xs font-black uppercase tracking-[0.4em]">Our Story</div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[1.05]">
              Built for the people the hiring process overlooks.
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
              <p>
                Hireable Co. began with a simple observation: brilliant professionals were being filtered out before a human ever read their application. Not because they lacked ability, but because their experience was not positioned in the language employers and screening software look for.
              </p>
              <p>
                Our founder, Boluwatife Isaac Ademola, spent more than a decade inside executive search and talent strategy watching this happen. He set out to give individuals the same tools and insight that elite recruiting firms use, and Hireable Co. was born.
              </p>
              <p>
                Today we partner with job seekers around the world, from first-time applicants to senior executives, combining ATS-optimised documents, personal branding and hands-on job search support to turn careers around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-36 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass size={30} />,
                label: 'Our Mission',
                text: 'To give every professional a clear, compelling story and a strategy that gets them hired faster, at the level and pay they deserve.'
              },
              {
                icon: <Eye size={30} />,
                label: 'Our Vision',
                text: 'A hiring world where talent is recognised on merit, and no qualified candidate is lost to a poorly written resume or a broken process.'
              },
              {
                icon: <Target size={30} />,
                label: 'Our Promise',
                text: 'Honest advice, personal attention and work we stand behind. If it does not move your career forward, it does not leave our desk.'
              }
            ].map((item) => (
              <div key={item.label} className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">{item.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight mb-4">{item.label}</h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-blue-600 text-xs font-black uppercase tracking-[0.4em] mb-6">How We Work</div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter mb-6">From Audit to Offer.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">A proven four-step process that takes you from overlooked to in demand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p) => (
              <div key={p.step} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white text-4xl font-black tracking-tighter">{p.step}</div>
                </div>
                <div className="p-8 flex-grow">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">{p.icon}</div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight mb-3">{p.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] bg-blue-600/20 blur-[180px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="text-blue-500 text-xs font-black uppercase tracking-[0.4em]">What We Stand For</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05]">The values behind every engagement.</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Our clients trust us with their livelihoods. These principles guide how we earn and keep that trust.
            </p>
            <img
              src={img('1542744173-8e7e53415bb0', 1000)}
              alt="Hireable Co. strategy session"
              className="rounded-[2rem] shadow-2xl object-cover w-full h-64 border border-white/10"
            />
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">{v.icon}</div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight mb-3">{v.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div>
              <div className="text-blue-600 text-xs font-black uppercase tracking-[0.4em] mb-6">Who We Serve</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[1.05]">Careers at every stage.</h2>
            </div>
            <div className="space-y-6">
              {audiences.map((a) => (
                <div key={a.title} className="flex items-start gap-6 p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">{a.icon}</div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950 tracking-tight mb-2">{a.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <img
              src={img('1573497019940-1c28c88b4f3e', 1000)}
              alt="Confident professional after landing a new role"
              className="rounded-[2.5rem] shadow-2xl object-cover w-full h-[28rem] md:h-[36rem]"
            />
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest mb-2">
                <CheckCircle2 size={16} /> Placed
              </div>
              <p className="text-slate-900 font-bold leading-snug">Clients hired at Google, Deloitte, J.P. Morgan, Amazon and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-24 md:py-36 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-5/12">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white aspect-[4/5]">
              <img src="/images/founder.jpg" alt="Boluwatife Isaac Ademola" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full md:w-7/12 space-y-8">
            <Quote size={48} className="text-blue-600" />
            <p className="text-2xl md:text-4xl font-black text-slate-950 tracking-tight leading-snug">
              "Your career is your most valuable asset. My job is to make sure the market sees its true worth."
            </p>
            <div>
              <div className="text-xl font-black text-slate-950">Boluwatife Isaac Ademola</div>
              <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mt-1">Founder & Chief Architect</div>
            </div>
            <a
              href="#/founder"
              onClick={() => sounds.play('click')}
              className="inline-flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg"
            >
              Meet the Founder <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-blue-600 text-xs font-black uppercase tracking-[0.4em] mb-6">Life at Hireable Co.</div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter">Where careers get rebuilt.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <img src={img('1515187029135-18ee286d815b', 900)} alt="Career seminar" className="col-span-2 row-span-2 rounded-[2rem] object-cover w-full h-full min-h-[18rem]" />
            <img src={img('1517245386807-bb43f82c33c4', 600)} alt="Team collaborating" className="rounded-[2rem] object-cover w-full h-44 md:h-60" />
            <img src={img('1450101499163-c8848c66ca85', 600)} alt="Signing an offer letter" className="rounded-[2rem] object-cover w-full h-44 md:h-60" />
            <img src={img('1507679799987-c73779587ccf', 600)} alt="Executive ready for the next role" className="rounded-[2rem] object-cover w-full h-44 md:h-60" />
            <img src={img('1486406146926-c627a92ad1ab', 600)} alt="Corporate headquarters" className="rounded-[2rem] object-cover w-full h-44 md:h-60" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white h-full" />
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-10">
            Your next role <br />
            <span className="text-slate-950">starts here.</span>
          </h2>
          <p className="text-blue-100 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-14">
            Tell us where you want to go. We will build the strategy to get you there.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="#/contact"
              onClick={() => sounds.play('click')}
              className="w-full sm:w-auto bg-slate-950 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl active:scale-95"
            >
              Book a Strategy Call
            </a>
            <a
              href="#/resume-services"
              onClick={() => sounds.play('click')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-white/20 transition-all active:scale-95"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
