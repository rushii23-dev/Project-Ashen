import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollTextReveal from './ScrollTextReveal';
import BreakdownSection from './BreakdownSection';
import VoicesEvidence from './VoicesEvidence';
import CarbonCalculator from './CarbonCalculator';
import FinalSections from './FinalSections';

export default function InternalSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div className="w-full flex flex-col pt-[128px] bg-[#000000]">
      
      {/* 1. THE EXHIBIT (Standard Flow + Image Parallax) */}
      <section ref={containerRef} className="w-full bg-black px-6 flex flex-col items-center">
        <ScrollTextReveal
          as="h2"
          text="What the invisible leaves behind."
          wordsClassName={["", "", "italic font-light pr-1", "", ""]}
          className="font-serif text-[32px] md:text-[58px] leading-[1.1] tracking-[-0.03em] text-center text-white pb-[64px]"
        />
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-[24px] w-full max-w-[1280px] mx-auto"
        >
          {/* Card 1 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 80, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative rounded-[10px] aspect-[4/5] overflow-hidden shadow-[rgba(0,0,0,0.35)_0px_10px_30px_0px,rgba(255,255,255,0.08)_0px_1px_0px_0px_inset]"
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop" 
              alt="Vast expanse of dark water" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[150%] object-cover transform-gpu -top-[25%]"
              style={{ y: backgroundY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-[24px] left-[24px] right-[24px] z-20">
              <ScrollTextReveal
                as="span"
                text="1.7B"
                className="font-sans font-light text-[58px] text-white leading-none block"
              />
              <p className="font-sans font-light text-[15px] md:text-[16px] text-[#e0e0e0] leading-[1.5] mt-3 max-w-[95%]">
                Gallons of fresh water consumed annually to cool global data centers.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 80, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative rounded-[10px] aspect-[4/5] overflow-hidden shadow-[rgba(0,0,0,0.35)_0px_10px_30px_0px,rgba(255,255,255,0.08)_0px_1px_0px_0px_inset]"
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop" 
              alt="High voltage power grid" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[150%] object-cover transform-gpu -top-[25%]"
              style={{ y: backgroundY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-[24px] left-[24px] right-[24px] z-20">
              <ScrollTextReveal
                as="span"
                text="3%"
                className="font-sans font-light text-[58px] text-white leading-none block"
              />
              <p className="font-sans font-light text-[15px] md:text-[16px] text-[#e0e0e0] leading-[1.5] mt-3 max-w-[95%]">
                Of global electricity is devoured by cloud infrastructure, rivaling the aviation industry.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 80, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative rounded-[10px] aspect-[4/5] overflow-hidden shadow-[rgba(0,0,0,0.35)_0px_10px_30px_0px,rgba(255,255,255,0.08)_0px_1px_0px_0px_inset]"
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800&auto=format&fit=crop" 
              alt="Pile of discarded electronic waste" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[150%] object-cover transform-gpu -top-[25%]"
              style={{ y: backgroundY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-[24px] left-[24px] right-[24px] z-20">
              <ScrollTextReveal
                as="span"
                text="53M"
                className="font-sans font-light text-[58px] text-white leading-none block"
              />
              <p className="font-sans font-light text-[15px] md:text-[16px] text-[#e0e0e0] leading-[1.5] mt-3 max-w-[95%]">
                Metric tons of electronic waste discarded yearly to sustain hardware upgrades.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE BREAKDOWN */}
      <BreakdownSection />

      {/* 6. VOICES & EVIDENCE */}
      <VoicesEvidence />

      {/* INTERACTIVE CARBON MATRIX */}
      <CarbonCalculator />

      {/* FINAL SECTIONS: PREVENTION & FOOTER */}
      <FinalSections />

    </div>
  );
}
