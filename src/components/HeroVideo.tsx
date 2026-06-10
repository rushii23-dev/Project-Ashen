import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PLAYLIST = [
  "https://storage.googleapis.com/ashen-cinematic-media-499011/Green_leaf_FV.mp4",
  "https://storage.googleapis.com/ashen-cinematic-media-499011/main.webm"
];

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, [videoIndex]);

  const handleEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  return (
    <section className="relative w-full h-screen bg-[#000000] flex flex-col justify-end items-start pb-16 px-8 lg:px-16 overflow-hidden">
      {/* 
        Full-screen Background Video
        Always silent, continuous playlist loop, 1.5x speed.
      */}
      <AnimatePresence mode="wait">
        <motion.video
          key={videoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          ref={videoRef}
          src={PLAYLIST[videoIndex]}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay={true}
          muted={true}
          playsInline
          preload="metadata"
          aria-hidden="true" 
          onEnded={handleEnded}
        />
      </AnimatePresence>

      {/* 
        Typography Overlay
        Anchored to bottom-left, fully readable against the dark void.
      */}
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="font-serif font-medium text-[58px] tracking-[-0.05em] leading-[1.0] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          The weight of the <span className="italic font-light pr-1">invisible</span>.
        </h1>
      </div>
    </section>
  );
}
