import { useState } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';

const PREVENTION_CARDS = [
  {
    id: 1,
    problemTitle: "The Daily Solo Commute",
    problemDesc: "Driving alone in gas-powered vehicles every day is one of the largest single contributors to your personal carbon emissions.",
    actionText: "Shift Your Transit",
    solutionTitle: "Shared & Active Travel",
    solutionDesc: "Carpool, take public transit, or cycle just twice a week to drastically cut your daily exhaust footprint.",
    accent: "from-red-500/20 to-transparent",
    borderHover: "hover:border-red-500",
  },
  {
    id: 2,
    problemTitle: "High-Meat Diets",
    problemDesc: "Industrial meat production requires vast amounts of water and land, releasing massive amounts of methane into our atmosphere.",
    actionText: "Change Your Plate",
    solutionTitle: "Plant-Based Shifts",
    solutionDesc: "Swapping out meat for plant-based meals a few times a week can literally halve your food-related carbon footprint.",
    accent: "from-orange-500/20 to-transparent",
    borderHover: "hover:border-orange-500",
  },
  {
    id: 3,
    problemTitle: "Vampire Electronics",
    problemDesc: "Leaving chargers, TVs, and appliances plugged in 24/7 constantly drains grid energy even when they are turned off.",
    actionText: "Pull the Plug",
    solutionTitle: "Zero-Drain Habit",
    solutionDesc: "Use smart power strips or simply unplug your devices when not in use to instantly stop the invisible energy bleed.",
    accent: "from-yellow-500/20 to-transparent",
    borderHover: "hover:border-yellow-500",
  }
];

function InteractiveCard({ card }: { card: typeof PREVENTION_CARDS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-[380px]" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
      >
        {/* FRONT FACE (The Problem) */}
        <div 
          className={`absolute inset-0 w-full h-full bg-[#111] border border-white/10 rounded-[16px] p-8 flex flex-col justify-between transition-colors duration-500 ${card.borderHover}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${card.accent} rounded-[16px] pointer-events-none`} />
          <div className="relative z-10 flex flex-col">
            <span className="text-red-400 font-sans text-[12px] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Problem
            </span>
            <h3 className="font-serif text-[32px] text-white leading-[1.1] mb-4">
              {card.problemTitle}
            </h3>
            <p className="font-sans font-light text-[15px] text-[#999] leading-[1.6]">
              {card.problemDesc}
            </p>
          </div>
          
          <div className="relative z-10 flex items-center justify-between mt-8 border-t border-white/10 pt-6">
            <span className="font-sans text-[14px] text-white group-hover:text-red-400 transition-colors">
              Tap to {card.actionText}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
              →
            </div>
          </div>
        </div>

        {/* BACK FACE (The Solution) */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-[16px] p-8 flex flex-col justify-between" 
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="relative z-10 flex flex-col">
            <span className="text-green-600 font-sans text-[12px] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Solved
            </span>
            <h3 className="font-serif text-[32px] text-black leading-[1.1] mb-4">
              {card.solutionTitle}
            </h3>
            <p className="font-sans text-[16px] text-[#444] leading-[1.6]">
              {card.solutionDesc}
            </p>
          </div>
          
          <div className="relative z-10 flex items-center justify-between mt-8 border-t border-black/10 pt-6">
            <span className="font-sans text-[14px] text-black font-medium">
              Healed
            </span>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
              ✓
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function FinalSections() {
  return (
    <div className="w-full flex flex-col bg-black">
      
      {/* SECTION 1: Hover to Heal Prevention Grid */}
      <section className="w-full max-w-[1280px] mx-auto px-6 mb-32 flex flex-col">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-serif text-[48px] md:text-[64px] text-white leading-[1.1] mb-4">
            The power to rewrite it.
          </h2>
          <p className="font-sans font-light text-[18px] text-[#999] max-w-[600px]">
            Knowledge is only the beginning. Tap the cards below to actively solve and heal the largest contributors to your digital and physical footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREVENTION_CARDS.map(card => (
            <InteractiveCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* SECTION 2: Massive Sequel Ending Footer */}
      <footer className="w-full mt-auto flex flex-col items-center justify-center pt-32 md:pt-[200px] pb-12 px-6">
        
        {/* Massive Text Block */}
        <h2 className="font-serif text-[80px] md:text-[140px] lg:text-[180px] leading-[0.9] tracking-tight text-center text-white mb-8">
          Leave <em className="italic text-[#c0c0c0] font-light">nothing</em> behind.
        </h2>

        {/* Secondary Echo & CTA (Delayed Animation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="font-sans text-[16px] md:text-[20px] text-[#999999] max-w-[600px] text-center font-light leading-relaxed mb-12">
            Awareness is only the first metric. True accountability requires continuous telemetry. Build a digital life that restores more than it consumes.
          </p>

          <button 
            onClick={() => smoothScrollTo('carbon-calculator')}
            className="px-8 py-4 rounded-full bg-white text-black font-medium text-[15px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
          >
            Measure Your Shadow
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
        
        {/* Minimalist Footer Grid */}
        <div className="w-full max-w-[1440px] mx-auto border-t border-white/10 mt-32 md:mt-48 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <a href="#" className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Home</a>
          </div>
          <div className="flex flex-col">
            <a href="#manifesto" className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Manifesto</a>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Privacy Policy</span>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="font-sans font-light text-white/30 text-[13px] uppercase tracking-[0.15em]">
              © {new Date().getFullYear()} Ashen
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
