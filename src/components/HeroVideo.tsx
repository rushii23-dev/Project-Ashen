import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HERO_PLAYBACK_RATE } from '../utils/constants';

interface VideoSequence {
  src: string;
  start: number;
  end: number | null;
}

const SEQUENCE: readonly VideoSequence[] = [
  {
    src: 'https://storage.googleapis.com/ashen-cinematic-media-499011/main.webm',
    start: 0,
    end: 15,
  },
];

/**
 * Silently catches video play() promise rejections.
 * Autoplay is commonly blocked by browser policy — this is expected, not an error.
 */
function safePlay(video: HTMLVideoElement): void {
  video.play().catch(() => {
    /* autoplay blocked by browser policy — expected */
  });
}

export default React.memo(function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [seqIndex, setSeqIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentSeq = SEQUENCE[seqIndex];
    if (!currentSeq) return;

    if (video.getAttribute('src') !== currentSeq.src) {
      video.setAttribute('src', currentSeq.src);
      video.load();
    } else {
      if (video.readyState >= 1) {
        video.currentTime = currentSeq.start;
        video.playbackRate = HERO_PLAYBACK_RATE;
        safePlay(video);
      }
    }
  }, [seqIndex]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const currentSeq = SEQUENCE[seqIndex];
    if (!currentSeq) return;
    if (currentSeq.end !== null && video.currentTime >= currentSeq.end) {
      if (SEQUENCE.length === 1) {
        video.currentTime = currentSeq.start;
        safePlay(video);
      } else {
        setSeqIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    }
  };

  const handleEnded = () => {
    const currentSeq = SEQUENCE[seqIndex];
    if (!currentSeq) return;
    if (currentSeq.end === null) {
      if (SEQUENCE.length === 1) {
        const video = videoRef.current;
        if (video) {
          video.currentTime = currentSeq.start;
          safePlay(video);
        }
      } else {
        setSeqIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const currentSeq = SEQUENCE[seqIndex];
    if (!currentSeq) return;
    video.currentTime = currentSeq.start;
    video.playbackRate = HERO_PLAYBACK_RATE;
    safePlay(video);
  };

  return (
    <section className="relative w-full h-screen bg-[#000000] flex flex-col justify-end items-start pb-16 px-8 lg:px-16 overflow-hidden">
      <motion.video
        initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Typography Overlay — anchored to bottom-left */}
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="font-serif font-medium text-[58px] tracking-[-0.05em] leading-[1.0] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          The weight of the <span className="italic font-light pr-1">invisible</span>.
        </h1>
      </div>
    </section>
  );
});
