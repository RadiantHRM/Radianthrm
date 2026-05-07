import React from 'react';
import { BlogPost } from './types';

export const COLORS = {
  CHARCOAL: '#0F172A',
  RADIANT_BLUE: '#2563EB',
  WHITE: '#FFFFFF',
  GRAY_LIGHT: '#F8FAFC',
  TEXT_PRIMARY: '#0F172A',
  TEXT_SECONDARY: '#475569',
};

// Global Animation Component for Numerical Data
export const CountUp: React.FC<{ 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
  decimals?: number; 
  shouldAnimate?: boolean;
}> = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0, shouldAnimate = true }) => {
  const [count, setCount] = React.useState(0);
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    if (!shouldAnimate || hasStarted.current) return;
    hasStarted.current = true;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = easeOutQuad(progress) * end;
      setCount(currentCount);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration, shouldAnimate]);

  return <span>{prefix}{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

// Normalized Typography Scaling
export const TXT = {
  HEADING: "text-slate-950 font-black tracking-tight leading-tight",
  BODY: "text-slate-700 font-medium leading-relaxed",
  SUB: "text-slate-500 font-black uppercase tracking-widest text-xs",
  DARK_BODY: "text-slate-200 font-medium leading-relaxed",
  DARK_HEADING: "text-white font-black tracking-tight leading-tight"
};

export const CONTACT_INFO = {
  email: 'isaac@radianthrm.com',
  whatsapp: '+18382663258',
  instagram: '@radianthrm',
  whatsappLink: 'https://wa.me/18382663258'
};

export const RadiantLogo = ({ className = "h-8 md:h-10", iconOnly = false, dark = false }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative h-full aspect-square flex-shrink-0 group">
      <div className="absolute inset-0 bg-blue-600/20 blur-lg rounded-lg group-hover:bg-blue-600/30 transition-all duration-700"></div>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10 drop-shadow-lg" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        <path d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" fill="url(#logoGrad)"/>
        <path d="M35 30H55C60.5228 30 65 34.4772 65 40C65 45.5228 60.5228 50 55 50H35V30Z" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35 30V70" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <path d="M48 50L68 72" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M75 15L80 20M85 15L80 20M80 25L80 20" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-pulse"/>
      </svg>
    </div>
    {!iconOnly && (
      <span className={`text-lg md:text-xl font-black tracking-tighter uppercase whitespace-nowrap ${dark ? 'text-white' : 'text-slate-950'}`}>
        Radiant<span className="text-blue-600">HRM</span>
      </span>
    )}
  </div>
);

const ATSResumeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group">
    <path d="M16 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CoachingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21V19C3 15.6863 5.68629 13 9 13H15C18.3137 13 21 15.6863 21 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ReverseRecruitingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8V12L15 15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SERVICE_PILLARS = [
  {
    title: 'ATS-Optimized Resumes',
    description: 'Expertly crafted resumes designed to bypass algorithms and land interviews with top-tier employers.',
    icon: <ATSResumeIcon />,
    link: '#/resume-services'
  },
  {
    title: 'Executive Coaching',
    description: '1-on-1 strategy sessions to master your narrative, negotiate higher salaries, and lead with authority.',
    icon: <CoachingIcon />,
    link: '#/coaching'
  },
  {
    title: 'VIP Reverse Recruiting',
    description: 'The "Done-For-You" job search. We find the roles, handle applications, and get you in the door.',
    icon: <ReverseRecruitingIcon />,
    link: '#/reverse-recruiting'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Senior Product Manager',
    content: 'The VIP Reverse Recruiting service changed my life. I landed a role at a FAANG company with a 45% salary increase within 6 weeks.',
    image: 'https://picsum.photos/seed/sarah/150/150',
    salaryIncrease: '+45%'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Director of Engineering',
    content: 'Radianthrm transformed my resume from a simple list of tasks into a high-impact narrative of achievements.',
    image: 'https://picsum.photos/seed/michael/150/150',
    salaryIncrease: '+$30k'
  },
  {
    id: '3',
    name: 'David Rodriguez',
    role: 'VP of Operations',
    content: 'The Forensic Audit identified clear gaps in my executive branding. Secured an offer with a $55k base increase.',
    image: 'https://picsum.photos/seed/david/150/150',
    salaryIncrease: '+$55k'
  },
  {
    id: '4',
    name: 'Dr. Elena Vance',
    role: 'Chief Nursing Officer',
    content: 'Transitioning from clinical to executive healthcare leadership felt impossible. Radianthrm re-mapped my nursing background into a high-authority operational narrative.',
    image: 'https://picsum.photos/seed/elena/150/150',
    salaryIncrease: '+$40k'
  },
  {
    id: '5',
    name: 'Marcus Thorne',
    role: 'Senior Hedge Fund Analyst',
    content: 'The forensic ATS scan revealed why I was being ghosted by Big Finance. Within two weeks of my re-brand, I had interviews at three top-tier firms and a significant comp bump.',
    image: 'https://picsum.photos/seed/marcus/150/150',
    salaryIncrease: '+$75k'
  },
  {
    id: '6',
    name: 'Aisha Kareem',
    role: 'General Counsel',
    content: 'As a legal professional, precision is everything. The forensic audit of my executive brand was the most thorough and strategic review I have ever received in my career.',
    image: 'https://picsum.photos/seed/aisha/150/150',
    salaryIncrease: '+35%'
  },
  {
    id: '7',
    name: 'Jessica Wu',
    role: 'Creative Director',
    content: 'Most resume writers don\'t understand the creative industry. Radianthrm balanced my visual portfolio with a data-driven impact narrative that justified my Senior title.',
    image: 'https://picsum.photos/seed/jwu/150/150',
    salaryIncrease: '+25%'
  },
  {
    id: '8',
    name: 'Robert Sterling',
    role: 'VP of Global Sales',
    content: 'The "Done-For-You" VIP service is worth every penny. I didn\'t touch a single application and landed a role with a $250k OTE package within a month.',
    image: 'https://picsum.photos/seed/rob/150/150',
    salaryIncrease: '+$90k'
  },
  {
    id: '9',
    name: 'James O’Connor',
    role: 'Supply Chain Director',
    content: 'Radianthrm understood the complexity of global logistics. They turned my technical oversight into a leadership story of efficiency and revenue protection.',
    image: 'https://picsum.photos/seed/james/150/150',
    salaryIncrease: '+$32k'
  },
  {
    id: '10',
    name: 'Linda Martinez',
    role: 'University Dean',
    content: 'Navigating the shift from academia to the corporate sector was daunting. The career re-engineering protocol provided the exact translation needed for corporate recruiters.',
    image: 'https://picsum.photos/seed/linda/150/150',
    salaryIncrease: '+50%'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Forensic 6-Second Scan: A Step-by-Step Guide to Passing the Recruiter Test',
    category: 'Educational',
    date: 'Oct 24, 2024',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Stop guessing what recruiters want. This guide breaks down the exact visual and psychological path a recruiter’s eye takes and how to position your most valuable information for maximum impact.',
    sections: [
      {
        heading: "1. Understanding the 'F-Pattern' and the Core Data Quadrant",
        text: "When a recruiter opens your resume, they don't read it like a book. They scan it like a map. Research shows that the human eye follows an 'F' shape: they look across the top, down the left margin, and then a quick scan across the middle.\n\nTo pass this test, you must place your 'Core Data' in the top-left quadrant. This includes your Name, current Job Title, and a clear, high-impact headline. If a recruiter has to search for what you actually do, they will move on to the next candidate in less than 6 seconds.\n\n**Action Step:** Open your resume and look at the top-left corner. Does it clearly state your target role and your biggest professional achievement? If not, move it there immediately.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. The 'Above the Fold' Strategy: Your 30% Rule",
        text: "Just like a newspaper, the most important news must be 'above the fold'—the top 30% of your resume. This section should not be a generic 'Objective' statement. Instead, use a 'Professional Summary' that highlights three specific things: your years of experience, your core industry expertise, and one massive, quantifiable win (e.g., 'Increased revenue by 40% over 12 months').\n\nAvoid 'soft' words like 'passionate' or 'hard-working.' These are filler. Use 'hard' metrics. Instead of saying 'Experienced in sales,' say 'Managed a $5M portfolio and exceeded targets for 4 consecutive years.'\n\n**Action Step:** Delete your 'Objective' section. Replace it with a 'Strategic Summary' that uses at least two hard numbers to prove your value.",
        imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "3. Bullet Points: The 'Context-Action-Result' (CAR) Framework",
        text: "Most people list their 'duties.' Recruiters want to see your 'impact.' A duty is 'Managed a team.' An impact is 'Led a team of 10 to deliver a project 2 weeks ahead of schedule, saving the company $15k.'\n\nUse the CAR framework for every single bullet point:\n- **Context:** What was the problem or situation?\n- **Action:** What specific steps did you take?\n- **Result:** What was the measurable outcome?\n\n**Action Step:** Rewrite your three most recent bullet points using this formula. Ensure every point starts with a strong action verb like 'Engineered,' 'Orchestrated,' or 'Pivoted.'",
        imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: [{ user: "Marcus T.", text: "The F-pattern analysis changed everything. I moved my metrics to the top left and got 3 calls in one week.", date: "2 days ago" }]
  },
  {
    id: '2',
    title: 'The Salary Negotiation Blueprint: How to Get Paid What You Are Actually Worth',
    category: 'Informational',
    date: 'Nov 02, 2024',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Negotiation isn’t a battle; it’s a conversation about value. Learn the exact scripts and psychological techniques to increase your offer by 20% or more without feeling awkward.',
    sections: [
      {
        heading: "1. The 'Anchor' Technique: Why You Should (Almost) Never Speak First",
        text: "The first number mentioned in a negotiation becomes the 'anchor.' If the employer says $100k, the whole conversation will revolve around that number. Your goal is to wait for them to speak first, or if you must, set an anchor that is at the very top of your market value.\n\nIf they ask for your salary expectations early, use this script: 'I’m more focused on finding the right fit and understanding the full scope of the role. I’m sure we can reach a fair agreement based on the market value for this level of responsibility.'\n\n**Action Step:** Practice this script out loud until it feels natural. Silence is your friend—don't feel the need to fill it.",
        imageUrl: "https://images.unsplash.com/photo-1573164067065-382222152621?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. Using 'Bracketing' to Protect Your Floor",
        text: "If you are forced to give a number, give a range, not a single point. This is called 'Bracketing.' The bottom of your range should be the number you actually want. For example, if you want $150k, say: 'Based on my research and the requirements of this role, I’m looking for a range between $150k and $175k, depending on the total compensation package.'\n\nThis makes you look flexible while ensuring you don't go below your target. It also signals that you are open to discussing bonuses, equity, and benefits.\n\n**Action Step:** Research your market value on sites like Glassdoor or Payscale. Set your 'floor' and your 'ceiling' before you even walk into the interview.",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "3. Negotiating the 'Hidden' Benefits",
        text: "Salary is just one part of the pie. If the base salary is non-negotiable, pivot to 'Total Rewards.' This includes:\n- Signing bonuses (one-time payments are often easier for HR to approve).\n- Performance bonuses (get the criteria in writing).\n- Additional vacation days.\n- Professional development budgets.\n- Remote work flexibility.\n\n**Action Step:** List three non-monetary benefits that would make a job more attractive to you. Be ready to ask for these if the base salary hits a hard cap.",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: []
  },
  {
    id: '5',
    title: 'The 2026 Executive Branding Protocol: How to Build a Profile That Recruits FOR You',
    category: 'Insightful',
    date: 'Jan 12, 2026',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'In 2026, your LinkedIn is your digital lobby. Learn how to optimize your profile so that high-paying roles find you, rather than you chasing them.',
    sections: [
      {
        heading: "1. The 'Authority Signal': Why Your Headline is Your Most Important Asset",
        text: "Your LinkedIn headline is the first thing people see in search results. Most people put their current job title. That’s a mistake. Your headline should be a 'Value Statement.'\n\nInstead of 'Project Manager at ABC Corp,' try: 'Senior Project Manager | Delivering $10M+ Infrastructure Projects on Time and Under Budget | Expert in Agile & Lean Methodologies.'\n\n**Action Step:** Rewrite your LinkedIn headline today. Focus on the *result* you deliver, not just the title you hold.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. Semantic SEO: How to Rank for the Right Keywords",
        text: "Recruiters use specific search terms to find candidates. If those terms aren't in your 'Skills' and 'About' sections, you won't show up. You need to identify the 'Authority Keywords' for your industry.\n\nFor example, if you are in Marketing, keywords like 'Growth Hacking,' 'ROI Optimization,' and 'Multi-Channel Strategy' are essential. Don't just list them; weave them into your experience descriptions.\n\n**Action Step:** Find three job descriptions for roles you want. Highlight the recurring keywords and add them to your LinkedIn profile in a natural way.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "3. The 'Invisible' Network: How to Get Referred Without Asking",
        text: "85% of jobs are filled through referrals. But you don't have to beg for them. By sharing one strategic insight per week on LinkedIn, you stay 'top of mind' for your network. When a role opens up, they will think of you first.\n\nShare a lesson you learned, a trend you noticed, or a project you completed. This builds your 'Authority Signal' over time.\n\n**Action Step:** Post one professional insight this week. It doesn't have to be long—just 3-4 sentences that show you know your stuff.",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: [
      { user: "Elena V.", text: "This protocol secured my C-suite transition. The 'Authority Signal' concept is a game-changer.", date: "1 week ago" }
    ]
  },
  {
    id: '6',
    title: 'AI-Driven Career Engineering: Leveraging LLMs for Market Dominance',
    category: 'Educational',
    date: 'Feb 05, 2026',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Stop using AI to write your resume. Start using it to model your career trajectory, simulate high-stakes negotiations, and identify the exact semantic gaps in your professional brand.',
    sections: [
      {
        heading: "1. The AI Career Architect: Identifying Authority Gaps",
        text: "Most professionals use AI as a glorified typewriter. The elite use it as a strategic consultant. You can use Large Language Models (LLMs) to perform forensic audits on your own career history.\n\n**Action Step:** Paste your resume into an AI and use this prompt: 'I am targeting a [Target Role] at [Target Company]. Based on my current resume, identify the top 3 semantic gaps in my experience that would prevent an executive recruiter from hiring me. Be brutally honest.'",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. Negotiation Simulation: The Digital Sparring Partner",
        text: "One of the most powerful applications of AI in 2026 is high-fidelity negotiation simulation. You can turn an LLM into a 'Hardball' CFO to practice your pitch.\n\n**Action Step:** Use this prompt: 'Act as a skeptical CFO at a Fortune 500 company. I am going to pitch you for a 20% salary increase based on my recent performance. Your goal is to find every weakness in my argument and push back on the budget. Let’s begin the simulation.'",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: [
      { user: "Marcus T.", text: "The negotiation simulation is terrifyingly accurate. It prepared me for questions I never expected.", date: "3 days ago" }
    ]
  },
  {
    id: '7',
    title: 'The Psychology of High-Stakes Ghosting: Reclaiming Your Narrative',
    category: 'Motivational',
    date: 'Mar 10, 2026',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Ghosting isn\'t a reflection of your value; it\'s a failure of the employer\'s operational integrity. Learn how to maintain your authority and pivot your energy when the silence becomes deafening.',
    sections: [
      {
        heading: "1. The Silence is a Data Point, Not a Verdict",
        text: "In the high-stakes job market of 2026, ghosting has unfortunately become a systemic issue. If a firm cannot manage the basic courtesy of a rejection, they likely have deep-seated operational friction. You haven't lost an opportunity; you've avoided a dysfunctional environment.\n\n**Action Step:** If you haven't heard back in 10 days after a final round, send one final follow-up. If there is still no response, move that company to your 'Archive' and stop checking your email for them. Your energy is better spent on new leads.",
        imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. The 'Authority Pivot' Message",
        text: "When you encounter ghosting, don't chase. Pivot. Send a message that professionally closes the door while leaving your reputation intact.\n\n**Action Step:** Use this script: 'Hi [Name], I haven’t heard back regarding the [Role], so I’m assuming the timeline has shifted or you’ve moved in another direction. I’m currently advancing with other opportunities, but I wanted to formally close this thread. Best of luck with the search.' This signals that you are a high-value asset with options.",
        imageUrl: "https://images.unsplash.com/photo-1507207611509-af012a3eba9a?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: [
      { user: "Jessica W.", text: "I needed this today. The 'Authority Pivot' message actually got me a call back and an apology!", date: "2 days ago" }
    ]
  },
  {
    id: '8',
    title: 'The 2027 Career Forecast: Engineering for the Next Decade of Work',
    category: 'Insightful',
    date: 'May 20, 2026',
    author: 'Isaac G.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'The landscape of work is shifting faster than ever. This guide provides a 5-step blueprint for future-proofing your career against the disruptions of 2027 and beyond.',
    sections: [
      {
        heading: "1. The Rise of the 'Fractional' Executive",
        text: "By 2027, the traditional 40-year career at one company will be a relic. We are seeing a massive shift toward 'Fractional' leadership—where high-authority experts manage specific outcomes for multiple firms simultaneously.\n\n**Action Step:** Identify your 'Core Outcome.' What is the one thing you can do better than 90% of the market? Start positioning yourself as the owner of that outcome, not just a holder of a job title.",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "2. Skill Liquidity: Learning to Unlearn",
        text: "The most valuable skill in 2027 isn't what you know; it's how fast you can learn something new. We call this 'Skill Liquidity.' You must be able to pivot your expertise as fast as the market demands.\n\n**Action Step:** Dedicate 5 hours a week to 'Adjacent Learning.' If you are in Finance, learn about AI-driven risk modeling. If you are in Marketing, learn about decentralized data privacy. Stay ahead of the curve.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
      },
      {
        heading: "3. Building a 'Resilient' Personal Brand",
        text: "Your brand must be independent of your employer. If your company disappeared tomorrow, would your professional reputation survive? In 2027, your personal brand is your only true job security.\n\n**Action Step:** Start a 'Value Journal.' Every week, write down one significant problem you solved and the impact it had. Use this data to update your public profiles and keep your narrative fresh and authoritative.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    comments: [
      { user: "Tom H.", text: "The 'Fractional Executive' concept is exactly where I see my industry heading. Great foresight.", date: "1 day ago" }
    ]
  }
];
