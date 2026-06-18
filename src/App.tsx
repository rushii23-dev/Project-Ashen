import { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import { ANCHOR_SCROLL_DELAY_MS } from './utils/constants';

const InternalSections = lazy(() => import('./components/InternalSections'));
const Manifesto = lazy(() => import('./components/Manifesto'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'manifesto' | 'privacy'>('home');

  // Simple hash router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#manifesto') {
        setCurrentPage('manifesto');
        window.scrollTo(0, 0);
      } else if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else {
        // Unconditionally set to home. React will ignore if it's already 'home'.
        setCurrentPage('home');

        // If it's a pure root visit, scroll to top. Otherwise, let browser handle the anchor jump (or help it slightly if rendering takes time)
        if (hash === '' || hash === '#') {
          window.scrollTo(0, 0);
        } else {
          setTimeout(() => {
            const id = hash.replace('#', '');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, ANCHOR_SCROLL_DELAY_MS);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Keyboard users can jump straight past the nav to the content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main
        id="main-content"
        className="min-h-screen flex flex-col bg-black w-full overflow-x-hidden selection:bg-white selection:text-black relative"
      >
        {/* Global Navigation */}
        <Header />

        <Suspense
          fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans tracking-widest text-[12px] uppercase">
              Loading...
            </div>
          }
        >
          {currentPage === 'home' ? (
            <>
              {/* 1. Hero Page Re-Alignment */}
              <HeroVideo />
              {/* Internal "Ashen" Carbon Footprint Sections (Page 2) */}
              <InternalSections />
            </>
          ) : currentPage === 'manifesto' ? (
            <Manifesto />
          ) : (
            <PrivacyPolicy />
          )}
        </Suspense>
      </main>
    </MotionConfig>
  );
}

export default App;
