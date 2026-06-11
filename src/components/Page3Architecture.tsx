import React from 'react';
import { motion } from 'framer-motion';

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
  wordsClassName = [] 
}: { 
  text: string; 
  className?: string; 
  as?: keyof typeof motion | string; 
  wordsClassName?: string[]; 
}) {
  // Handle newlines by splitting text into lines first
  const lines = text.split("\n");
  const MotionComponent = motion[as as keyof typeof motion] as React.ElementType;

  let wordIndexCounter = 0;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-20%" }}
      variants={textContainerVariant}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <React.Fragment key={lineIndex}>
            {words.map((word, i) => {
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
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </MotionComponent>
  );
}

export default function Page3Architecture() {
  return (
    <section className="w-full min-h-screen bg-[#000000] flex flex-col items-center justify-center py-[128px] px-6">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
        {/* Main Heading & Power Statement */}
        <ScrollTextReveal
          as="h2"
          text="We bring clarity to an invisible crisis."
          className="font-serif text-[48px] md:text-[82px] leading-[1.05] tracking-[-0.04em] text-white"
        />

        {/* Sub-statement */}
        <ScrollTextReveal
          as="p"
          text={`Because you cannot reverse what you refuse to measure.\nAccountable architecture for a digital world.`}
          className="font-sans text-[18px] md:text-[22px] text-[#999999] mt-6 font-light"
        />
      </div>
    </section>
  );
}
