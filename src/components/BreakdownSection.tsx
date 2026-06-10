import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ScrollTextReveal Component (Kinetic Animation Logic) ---
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
  as = "div"
}: { 
  text: string; 
  className?: string; 
  as?: keyof typeof motion | string; 
}) {
  const lines = text.split("\n");
  const MotionComponent = (motion as any)[as as string];

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
      variants={textContainerVariant}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/);
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, i) => {
              if (!word) return null;
              return (
                <motion.span 
                  key={i}
                  variants={textChildVariant} 
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </MotionComponent>
  );
}

const SHADOW_LAYERS = [
  {
    id: '01',
    title: 'Direct Emissions',
    description: 'Everyday fuel combustion, gas connections, and immediate vehicle emissions that occur directly from sources that are owned or controlled by us.',
    video: 'https://storage.googleapis.com/ashen-cinematic-media-499011/1st_card.mp4',
    startTime: 0,
  },
  {
    id: '02',
    title: 'Electricity & Power',
    description: 'Purchased electricity, heating, and grid cooling infrastructure used to power everyday life, representing our indirect impact on power generation.',
    video: 'https://storage.googleapis.com/ashen-cinematic-media-499011/2nd_card.mp4',
    startTime: 0,
  },
  {
    id: '03',
    title: 'The Embodied Shadow',
    description: 'The massive hidden emissions created during manufacturing, global shipping, logistics, and the vast digital cloud usage required to sustain modern services.',
    video: 'https://storage.googleapis.com/ashen-cinematic-media-499011/videoplayback.mp4#t=57',
    startTime: 57,
  }
];

export default function BreakdownSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const handleCardInteraction = (index: number) => {
    setHoveredIndex(index);
    const video = videoRefs.current[index];
    if (video) {
      // Only restart the video for the 3rd card (which jumps to 57s).
      // The 1st and 2nd cards will just seamlessly continue playing.
      if (index === 2) {
        video.currentTime = SHADOW_LAYERS[index].startTime;
      }
      video.play().catch(() => {});
    }
  };

  return (
    <section className="w-full bg-[#000000] flex flex-col py-[128px] relative z-10">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        
        {/* Header Typography */}
        <div className="flex flex-col mb-16">
          <ScrollTextReveal
            as="h2"
            text="The Breakdown of a Shadow."
            className="font-serif text-[48px] md:text-[72px] leading-[1.1] tracking-[-0.03em] text-white"
          />
          <ScrollTextReveal
            as="p"
            text="Understanding the direct, indirect, and hidden layers of emissions that define our modern ecological impact."
            className="font-sans text-[16px] md:text-[18px] text-[#999999] max-w-[600px] mt-4 font-light"
          />
        </div>

        {/* The Expanding Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-[750px] lg:h-[600px] w-full" onMouseLeave={() => setHoveredIndex(0)}>
          {SHADOW_LAYERS.map((layer, index) => {
            const isActive = hoveredIndex === index;
            
            return (
              <motion.div
                key={layer.id}
                onMouseEnter={() => handleCardInteraction(index)}
                onClick={() => handleCardInteraction(index)}
                className="relative overflow-hidden rounded-[20px] bg-[#111] border border-white/10 cursor-pointer flex flex-col min-h-[120px] lg:min-w-[140px]"
                initial={false}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 0.8 : 0.3,
                    filter: isActive ? "blur(0px) grayscale(20%)" : "blur(4px) grayscale(100%)"
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <video 
                      ref={(el) => { videoRefs.current[index] = el; }}
                    src={layer.video} 
                    className="w-full h-full object-cover" 
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Overlay Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                </motion.div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-8 lg:p-10 pointer-events-none">
                  
                  {/* Top Identifier */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8">
                    <span className="font-sans font-light text-[14px] text-white/50 tracking-widest">
                      {layer.id}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <motion.div
                    className="flex flex-col"
                    animate={{ y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className={`font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.1] mb-4 drop-shadow-md ${!isActive && 'lg:rotate-0'} transition-all duration-500`}>
                      {layer.title}
                    </h3>
                    
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                          animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                          exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.4 } }}
                        >
                          <p className="font-sans text-[16px] md:text-[18px] text-[#e0e0e0] font-light leading-[1.6] max-w-[500px] drop-shadow-sm">
                            {layer.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
