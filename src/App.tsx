import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import ResumeServices from './pages/ResumeServices.tsx';
import VIPReverseRecruiting from './pages/VIPReverseRecruiting.tsx';
import Blog from './pages/Blog.tsx';
import Results from './pages/Results.tsx';
import Contact from './pages/Contact.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import ATSScanner from './pages/ATSScanner.tsx';
import Founder from './pages/Founder.tsx';
import Policy from './pages/Policy.tsx';
import Portfolio from './pages/Portfolio.tsx';
import Support from './pages/Support.tsx'; // Import Support Page
import { User } from './types.ts';

const App: React.FC = () => {
  const getPath = () => {
    const hash = window.location.hash || '#/';
    return hash.toLowerCase().replace(/\/$/, '') || '#/';
  };

  const [currentPath, setCurrentPath] = useState(getPath());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getPath();
      const oldPath = currentPath;
      
      setCurrentPath(newPath);

      // Only scroll to top if we are navigating to a fundamentally different page/route
      // This prevents interrupting the scroll to an in-page anchor like #faq
      const isAnchorOnly = !newPath.includes('/') && newPath !== '#/' && newPath !== '';
      const isDifferentRoute = newPath.split('#')[1]?.split('/')[1] !== oldPath.split('#')[1]?.split('/')[1];

      if (!isAnchorOnly && isDifferentRoute) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    
    const savedUser = localStorage.getItem('radianthrm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPath]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('radianthrm_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('radianthrm_user');
    window.location.hash = '#/';
  };

  const renderPage = () => {
    const path = currentPath;

    // Handle routes that might contain an anchor (e.g. #/some-page#section)
    const baseRoute = path.split('#').length > 2 ? `#/${path.split('#')[2]}` : path;

    if (baseRoute === '#/' || baseRoute === '' || baseRoute.startsWith('#faq')) return <Home />;
    if (baseRoute === '#/resume-services') return <ResumeServices />;
    if (baseRoute === '#/reverse-recruiting') return <VIPReverseRecruiting />;
    if (baseRoute === '#/blog') return <Blog />;
    if (baseRoute === '#/results') return <Results />;
    if (baseRoute === '#/contact') return <Contact />;
    if (baseRoute === '#/scanner') return <ATSScanner />;
    if (baseRoute === '#/founder') return <Founder />;
    if (baseRoute === '#/portfolio') return <Portfolio />;
    if (baseRoute === '#/support') return <Support />; // Render Support Page
    if (baseRoute.startsWith('#/policy')) return <Policy />;
    if (baseRoute === '#/dashboard') return user ? <Dashboard /> : <Login onLogin={handleLogin} />;
    if (baseRoute === '#/login') return user ? <Dashboard /> : <Login onLogin={handleLogin} />;

    return <Home />;
  };

  return (
    <Layout user={user} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
};

export default App;
