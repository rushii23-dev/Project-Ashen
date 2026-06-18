import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  INITIAL_AQI,
  MAX_AQI,
  MIN_AQI,
  AQI_UPDATE_INTERVAL_MS,
  AQI_FLUCTUATION_RANGE,
  AQI_FLUCTUATION_OFFSET,
} from '../utils/constants';

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'invisible', label: 'The Invisible', href: '#the-invisible' },
  { id: 'calculator', label: 'Calculator', href: '#carbon-calculator' },
  { id: 'manifesto', label: 'Manifesto', href: '#manifesto' }
];

export default React.memo(function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [aqi, setAqi] = useState(INITIAL_AQI);

  // Simulate a live telemetry feed for India AQI
  useEffect(() => {
    const interval = setInterval(() => {
      setAqi(prev => {
        const change = Math.floor(Math.random() * AQI_FLUCTUATION_RANGE) - AQI_FLUCTUATION_OFFSET;
        return Math.max(MIN_AQI, Math.min(MAX_AQI, prev + change));
      });
    }, AQI_UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 px-8 bg-black/5 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left: The Brand */}
        <div className="flex-1 flex items-center">
          <a href="#" className="flex items-center gap-3 group" aria-label="Ashen — home">
            <span className="font-serif text-[24px] text-white tracking-tight leading-none block pt-1">
              Ashen.
            </span>
          </a>
        </div>

        {/* Center: Magnetic Navigation */}
        <nav 
          className="hidden md:flex items-center gap-2"
          aria-label="Primary navigation"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.id)}
              className="relative px-4 py-2 flex items-center justify-center"
            >
              <span className={`relative z-10 font-sans text-[13px] uppercase tracking-widest transition-colors duration-300 ${
                hoveredLink === link.id ? 'text-white' : 'text-[#999999]'
              }`}>
                {link.label}
              </span>
              
              {/* The Magnetic Pill */}
              {hoveredLink === link.id && (
                <motion.div
                  layoutId="header-magnetic-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right: The Live Metric */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3" aria-live="polite" aria-atomic="true">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[6px] h-[6px] bg-white rounded-full"
              aria-hidden="true"
            />
            <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-[#999999] tabular-nums">
              INDIA AQI: {aqi}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
});
