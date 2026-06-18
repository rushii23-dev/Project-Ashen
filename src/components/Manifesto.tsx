
import { motion } from 'framer-motion';

interface ManifestoScreen {
  kicker: string;
  statement: string;
  subtext: string;
}

const screens: readonly ManifestoScreen[] = [
  {
    kicker: "WE BELIEVE IN",
    statement: "We refuse to let the invisible remain unaccountable.",
    subtext: "The digital world casts a physical shadow. Every byte transferred, every pixel rendered, and every server idled extracts a measurable toll on the earth."
  },
  {
    kicker: "THE REALITY",
    statement: "The cloud is a myth. There are only industrial data centers burning through finite resources so we can scroll without friction.",
    subtext: "We have been sold the illusion of weightlessness. But the infrastructure powering our digital lives is deeply physical, demanding massive amounts of land, water, and energy."
  },
  {
    kicker: "THE ENEMY",
    statement: "Guilt is useless. Telemetry is power. You cannot reverse what you refuse to measure.",
    subtext: "Ignoring the problem solves nothing. We must build accountable architecture. By measuring our exact footprint, we gain the power to optimize, reduce, and heal."
  }
];

export default function Manifesto() {
  return (
    <div className="relative w-full bg-black text-white selection:bg-white selection:text-black min-h-screen">
      {screens.map((screen, index) => (
        <section key={index} className="min-h-screen flex flex-col justify-center items-center px-6">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[12px] uppercase tracking-[0.1em] text-[#999999] mb-8 font-sans">
              {screen.kicker}
            </span>
            <h2 className="font-serif text-[40px] md:text-[64px] lg:text-[80px] text-center leading-[1.1] tracking-tight max-w-[1000px]">
              {screen.statement}
            </h2>
            <p className="font-sans text-[16px] md:text-[20px] text-[#999999] font-light max-w-[600px] text-center mt-8 leading-[1.6]">
              {screen.subtext}
            </p>
          </motion.div>
        </section>
      ))}

      {/* Screen 4: The Goal (Footer) */}
      <section className="min-h-screen flex flex-col justify-between items-center px-6 pt-32 mt-auto">
        <div className="flex-1 flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[12px] uppercase tracking-[0.1em] text-[#999999] mb-8 font-sans">
              THE GOAL
            </span>
            <h2 className="font-serif text-[80px] md:text-[140px] lg:text-[180px] leading-[0.9] tracking-tight text-center text-white">
              Erase the shadow.<br />
              Leave <em className="italic text-[#c0c0c0] font-light">nothing</em> behind.
            </h2>
          </motion.div>
        </div>

        {/* Footer Links */}
        <nav className="w-full max-w-[1440px] mx-auto border-t border-white/10 pt-8 pb-12 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Footer navigation">
          <div className="flex flex-col">
            <a href="#" className="font-sans font-light text-white/70 hover:text-white transition-colors text-[13px] uppercase tracking-[0.15em]">
              Home
            </a>
          </div>
          <div className="flex flex-col">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} className="font-sans font-light text-white/70 hover:text-white transition-colors text-[13px] uppercase tracking-[0.15em] text-left">
              Manifesto
            </button>
          </div>
          <div className="flex flex-col">
            <a href="#privacy" className="font-sans font-light text-white/70 hover:text-white transition-colors text-[13px] uppercase tracking-[0.15em]">
              Privacy Policy
            </a>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="font-sans font-light text-white/30 text-[13px] uppercase tracking-[0.15em]">
              © {new Date().getFullYear()} Ashen
            </span>
          </div>
        </nav>
      </section>
    </div>
  );
}
