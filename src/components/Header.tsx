import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'invisible', label: 'The Invisible', href: '#the-invisible' },
  { id: 'calculator', label: 'Calculator', href: '#carbon-calculator' },
  { id: 'manifesto', label: 'Manifesto', href: '#manifesto' }
];

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [aqi, setAqi] = useState(168);

  // Simulate a live telemetry feed for India AQI
  useEffect(() => {
    const interval = setInterval(() => {
      setAqi(prev => {
        // Fluctuate by -2, -1, 0, 1, or 2 to make it feel alive
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(0, Math.min(500, prev + change));
      });
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 px-8 bg-black/5 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left: The Brand */}
        <div className="flex-1 flex items-center">
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-serif text-[24px] text-white tracking-tight leading-none block pt-1">
              Ashen.
            </span>
          </a>
        </div>

        {/* Center: Magnetic Navigation (The Viral Interaction) */}
        <nav 
          className="hidden md:flex items-center gap-2" 
          onMouseLeave={() => setHoveredLink(null)}
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

        {/* Right: The Live Metric (Replacing the Button) */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[6px] h-[6px] bg-white rounded-full"
            />
            <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-[#999999] tabular-nums">
              INDIA AQI: {aqi}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
