import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Reusable VideoCard Component with complex interaction logic
const VideoCard = ({ 
  src, 
  name, 
  title,
  objectPosition = "object-center"
}: { 
  src: string; 
  name: string; 
  title: string;
  objectPosition?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFocusEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      // Ensure playback in case autoplay policies block it initially
      videoRef.current.play().catch(() => {});
    }
  };

  const handleBlurLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <button
      className="relative w-full aspect-[4/5] rounded-[10px] bg-[#202020] border border-[#333333] overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer text-left block"
      onMouseEnter={handleFocusEnter}
      onMouseLeave={handleBlurLeave}
      onFocus={handleFocusEnter}
      onBlur={handleBlurLeave}
      aria-label={`Play video from ${name}`}
      type="button"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-110 ${objectPosition}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
      
      <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none flex flex-col gap-1">
        <h3 className="font-sans text-[20px] md:text-[24px] text-white font-medium leading-[1.2]">
          {name}
        </h3>
        <span className="font-sans text-[14px] text-[#c0c0c0]">
          {title}
        </span>
      </div>
    </button>
  );
};

const textContainerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const textChildVariant = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

function ScrollTextReveal({ 
  text, 
  className, 
  as = "div", 
  wordsClassName = [],
  once = false
}: { 
  text: string; 
  className?: string; 
  as?: keyof typeof motion | string; 
  wordsClassName?: string[];
  once?: boolean;
}) {
  const lines = text.split("\n");
  const MotionComponent = motion[as as keyof typeof motion] as React.ElementType;

  let wordIndexCounter = 0;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, margin: "-10%" }}
      variants={textContainerVariant}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/);
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, i) => {
              if (!word) return null;
              const currentIndex = wordIndexCounter++;
              return (
                <motion.span 
                  key={i}
                  variants={textChildVariant} 
                  className={`inline-block mr-[0.25em] ${wordsClassName[currentIndex] || ""}`}
                >
                  {word}
                </motion.span>
              );
            })}
            {lineIndex < lines.length - 1 && <br className="hidden md:block" />}
          </React.Fragment>
        );
      })}
    </MotionComponent>
  );
}

const QuoteCard = ({ tag, quote, author }: { tag: string; quote: string; author: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-[160px] lg:min-h-[200px] rounded-[10px] bg-gradient-to-br from-[#202020] to-[#121212] border border-[#333333] relative overflow-hidden p-6 flex flex-col justify-between group hover:border-[#444444] transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-white w-max mb-6"
        >
          {tag}
        </motion.div>
        
        <ScrollTextReveal 
          as="p"
          text={`"${quote}"`}
          once={true}
          className="font-sans font-medium text-[18px] md:text-[22px] leading-[1.3] text-white"
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="font-sans font-light text-[12px] uppercase tracking-[0.05em] text-[#999999] mt-6 relative z-10 flex items-center gap-2"
      >
        <span className="w-4 h-[1px] bg-[#999999]"></span>
        {author}
      </motion.div>
    </motion.div>
  );
};

export default function VoicesEvidence() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="the-invisible" ref={containerRef} className="w-full bg-[#000000] pt-[48px] pb-[128px] flex flex-col items-center scroll-mt-[100px]">
      
      {/* Section Header */}
      <div className="w-full max-w-[1280px] px-6 flex justify-center text-center">
        <ScrollTextReveal 
          as="h2"
          text={`We bring clarity to\nan invisible crisis.`}
          className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] tracking-[-0.03em] text-white max-w-[700px]"
          wordsClassName={["", "", "", "", "", "italic font-light pr-1", ""]}
        />
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-[64px]">
        
        {/* Column 1 (Left) */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <VideoCard 
            src="https://storage.googleapis.com/ashen-cinematic-media-499011/CarbonFootprint.mp4" 
            name="Sephra's Green Show" 
            title="Lead Climatologist" 
            objectPosition="object-[center_20%]"
          />
          <QuoteCard 
            tag="THE REALITY"
            quote="We are the first generation to feel the impact of climate change, and the last generation that can do something about it."
            author="Barack Obama"
          />
        </div>

        {/* Column 2 (Right) */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <QuoteCard 
            tag="THE IMPACT"
            quote="The era of global warming has ended; the era of global boiling has arrived."
            author="António Guterres, Secretary-General of the UN"
          />
          <VideoCard 
            src="https://storage.googleapis.com/ashen-cinematic-media-499011/CarbonFootprintGuide.mp4" 
            name="Parcham Classes" 
            title="Youtuber, 3.6 Million subscribers" 
          />
        </div>

      </div>
    </section>
  );
}
