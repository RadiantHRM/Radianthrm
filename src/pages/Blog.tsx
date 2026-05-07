import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ArrowLeft, MessageCircle, User, Calendar, Clock, Send, Share2, Bookmark, LayoutGrid, Quote, ChevronDown, Loader2, Filter } from 'lucide-react';
import { BLOG_POSTS } from '../constants.tsx';
import { BlogPost, Comment } from '../types.ts';
import { sounds } from '../utils/audio.ts';

type CategoryFilter = 'All' | 'Educational' | 'Motivational' | 'Insightful' | 'Informational';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [readingProgress, setReadingProgress] = useState(0);

  const categories: CategoryFilter[] = ['All', 'Educational', 'Motivational', 'Insightful', 'Informational'];

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  // Reading progress logic
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPost) {
        setReadingProgress(0);
        return;
      }
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  // Persistence logic for comments
  const getStoredComments = (postId: string): Comment[] => {
    const stored = localStorage.getItem(`blog_comments_${postId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const saveComment = (postId: string, comment: Comment) => {
    const existing = getStoredComments(postId);
    const updated = [comment, ...existing];
    localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(updated));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedPost) {
      const stored = getStoredComments(selectedPost.id);
      // Merge static comments from constants with local user comments
      setLocalComments([...stored, ...selectedPost.comments]);
    }
  }, [selectedPost]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim() || !selectedPost) return;
    
    sounds.play('click');
    setIsSubmitting(true);

    // Simulate forensic validation
    setTimeout(() => {
      const newComment: Comment = {
        user: commentName,
        text: commentText,
        date: 'Just now'
      };

      saveComment(selectedPost.id, newComment);
      setLocalComments(prev => [newComment, ...prev]);
      setCommentText('');
      setCommentName('');
      setIsSubmitting(false);
      sounds.play('success');
    }, 800);
  };

  const handlePostSelection = (post: BlogPost) => {
    sounds.play('click');
    setSelectedPost(post);
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    sounds.play('click');
    setActiveCategory(cat);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Educational': return 'bg-blue-100 text-blue-600';
      case 'Motivational': return 'bg-orange-100 text-orange-600';
      case 'Insightful': return 'bg-purple-100 text-purple-600';
      case 'Informational': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen font-inter relative">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-150" 
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header Hero */}
        <div className="relative h-[60vh] md:h-[85vh] bg-slate-900 flex items-end">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 md:pb-24">
            <button 
              onClick={() => { sounds.play('click'); setSelectedPost(null); }}
              className="mb-10 flex items-center space-x-3 text-white/80 hover:text-white transition group bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">Return to Library</span>
            </button>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-8 ${getCategoryColor(selectedPost.category)}`}>
              {selectedPost.category}
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-10 max-w-4xl">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/70 text-xs md:text-sm font-black uppercase tracking-widest">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white/20">
                   <User size={18} />
                </div>
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Clock size={18} />
                <span>Strategic Deep Read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="mb-20">
            <p className="text-2xl md:text-4xl text-slate-900 font-bold leading-tight mb-24 italic text-center px-4 md:px-12 border-l-4 border-blue-600 bg-blue-50/50 py-12 rounded-r-[3rem]">
               "{selectedPost.excerpt}"
            </p>
            
            <div className="space-y-32">
              {selectedPost.sections.map((section, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${i * 150}ms` }}>
                  {section.heading && (
                    <h2 className="text-3xl md:text-6xl font-black text-slate-950 mb-12 tracking-tight leading-none">
                      {section.heading}
                    </h2>
                  )}
                  
                  <div className="flex flex-col gap-16">
                    <div className="text-slate-700 leading-relaxed text-lg md:text-2xl font-medium space-y-8 max-w-4xl">
                       {section.text.split('\n').map((para, pi) => (
                         <p key={pi}>{para}</p>
                       ))}
                    </div>
                    
                    {section.imageUrl && (
                      <div className="relative group w-full">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
                        <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100">
                          <img 
                            src={section.imageUrl} 
                            alt={section.heading || 'Article Visual'} 
                            className="w-full object-cover group-hover:scale-[1.03] transition-all duration-1000 max-h-[700px]"
                          />
                        </div>
                        <div className="mt-8 flex items-center justify-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                           <LayoutGrid size={14} />
                           <span>Strategic Intelligence Asset #{i + 1}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Footer */}
          <div className="mt-40 pt-16 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-10">
            <div className="flex items-center space-x-6">
              <button onClick={() => sounds.play('click')} className="flex items-center space-x-3 bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-black transition shadow-xl active:scale-95">
                <Share2 size={18} />
                <span>Distribute Intelligence</span>
              </button>
              <button onClick={() => sounds.play('click')} className="p-5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-2xl transition shadow-sm">
                <Bookmark size={24} />
              </button>
            </div>
            <div className="flex items-center space-x-6">
               <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Engagement</div>
                  <div className="text-xl font-black text-slate-900">12.5k Strategic Readers</div>
               </div>
               <div className="flex -space-x-5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <img key={i} className="h-14 w-14 rounded-full ring-4 ring-white shadow-lg" src={`https://picsum.photos/seed/reader${i}/150/150`} alt="reader" />
                  ))}
               </div>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mt-40">
            <div className="flex items-center space-x-5 mb-20">
              <MessageCircle size={56} className="text-blue-600" />
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">The Briefing Log.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-5">
                <div className="bg-slate-50 p-12 rounded-[4rem] sticky top-32 border border-slate-100 shadow-sm">
                  <h4 className="text-2xl font-black mb-10 tracking-tight">Add Your Perspective</h4>
                  <form onSubmit={handleCommentSubmit} className="space-y-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity/Title</label>
                       <input 
                        type="text" 
                        placeholder="e.g. Executive Director" 
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                        className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-600/10 outline-none text-base font-bold shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Tactical Review</label>
                       <textarea 
                        rows={6}
                        placeholder="Contribute your findings..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                        className="w-full px-8 py-5 rounded-3xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-600/10 outline-none text-base font-medium resize-none shadow-sm transition-all"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl hover:bg-blue-700 transition flex items-center justify-center space-x-3 shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <span className="text-lg">Transmit Response</span>
                          <Send size={24} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-12">
                {localComments.length === 0 ? (
                  <div className="text-center py-32 border-4 border-dashed border-slate-100 rounded-[4rem]">
                    <p className="text-slate-400 font-black text-xl uppercase tracking-widest">No strategic intel logged yet.</p>
                  </div>
                ) : (
                  localComments.map((comment, i) => (
                    <div key={i} className="flex space-x-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                      <div className="w-16 h-16 rounded-[2rem] bg-slate-950 text-white flex items-center justify-center flex-shrink-0 shadow-2xl">
                        <Quote size={28} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-black text-slate-900 text-xl tracking-tight">{comment.user}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{comment.date}</span>
                        </div>
                        <div className="bg-slate-50 p-10 rounded-[3rem] rounded-tl-none border border-slate-100 shadow-sm">
                          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium italic">
                            "{comment.text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      {/* Header */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-[10px] md:text-sm font-black mb-10">
            <MessageCircle size={14} className="fill-current" />
            <span>STRATEGIC BRIEFING v3.0</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">Strategic <span className="text-blue-600">Library.</span></h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Forensic analysis on career trajectory, negotiation psychology, and high-stakes market positioning.
          </p>
          
          {/* Category Filter */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
             {categories.map((cat) => (
               <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-900/40 scale-110' : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'}`}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="mt-12 flex justify-center">
             <ChevronDown className="animate-bounce text-blue-500" size={32} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => handlePostSelection(post)}
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-8"
            >
              <div className="relative h-80 md:h-[450px] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                />
                <div className={`absolute top-8 left-8 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ${getCategoryColor(post.category)}`}>
                  {post.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                   <div className="text-white font-black text-xl flex items-center">
                      Initiate Strategic Read <ChevronRight className="ml-2" />
                   </div>
                </div>
              </div>

              <div className="p-10 md:p-14 flex-grow flex flex-col">
                <div className="flex items-center space-x-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>Long-Form Deep Dive</span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 mb-6 text-base md:text-xl leading-relaxed font-medium line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mb-10 inline-flex items-center text-blue-600 font-black uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                   Read Full Strategic Briefing <ChevronRight size={16} className="ml-1" />
                </div>
                
                <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center text-slate-900 font-black text-sm uppercase tracking-widest">
                  <span className="inline-flex items-center group-hover:text-blue-600 transition-colors">
                    Access Intel <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-40 text-center">
               <Filter size={64} className="mx-auto text-slate-200 mb-8" />
               <p className="text-slate-400 font-black text-2xl uppercase tracking-widest">No entries found for this category.</p>
               <button onClick={() => setActiveCategory('All')} className="mt-8 text-blue-600 font-black hover:underline uppercase tracking-widest text-sm">View All Strategic Intel</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
