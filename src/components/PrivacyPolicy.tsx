
import { motion } from 'framer-motion';

interface PolicySection {
  num: string;
  title: string;
  content: string;
}

const POLICY_SECTIONS: readonly PolicySection[] = [
  {
    num: "01",
    title: "Data Telemetry & Collection",
    content: "Ashen operates on a principle of absolute data minimalism. We only collect mathematical footprint data necessary to calculate environmental impact. We strictly avoid personal tracking, behavioral profiling, or invasive telemetry. Your sovereignty over your digital existence is our primary directive."
  },
  {
    num: "02",
    title: "Infrastructure & Storage",
    content: "All necessary analytical data is routed through carbon-neutral data centers. We employ ephemeral storage protocols where possible, meaning your footprint calculation data degrades and deletes itself after its immediate utility has been fulfilled. No forever-logs."
  },
  {
    num: "03",
    title: "Third-Party Auditing",
    content: "Our telemetry pipelines are subject to rigorous, independent third-party auditing to ensure zero-leakage of personally identifiable information (PII). We do not broker, sell, or trade your analytical data to external entities under any circumstances."
  },
  {
    num: "04",
    title: "User Sovereignty & Deletion",
    content: "You maintain absolute dominion over your footprint data. A single command permanently erases your session metrics from our infrastructure. We believe that privacy is not a feature, but the foundational architecture of the modern web."
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-black flex flex-col min-h-screen pt-32 text-white">
      {/* Header Section */}
      <div className="w-full max-w-[1000px] mx-auto px-6 mb-24 mt-16">
        <h1 className="font-serif text-[64px] md:text-[96px] text-white tracking-tight leading-none mb-4">
          Privacy Policy.
        </h1>
        <p className="font-sans text-[12px] uppercase tracking-[0.1em] text-[#999999]">
          Effective Date: June 2026.
        </p>
      </div>

      {/* Content Grid (Asymmetrical Layout) */}
      <div className="w-full max-w-[1000px] mx-auto px-6 pb-32 flex-1">
        {POLICY_SECTIONS.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-12 mb-12"
          >
            {/* Left Column (Sticky) */}
            <div className="md:col-span-4 h-full relative">
              <div className="sticky top-32 flex flex-col">
                <span className="font-sans text-[12px] text-[#999999] mb-2">{section.num}</span>
                <h2 className="font-sans font-medium text-[20px] text-white pr-4">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-8">
              <p className="font-sans font-light text-[16px] leading-[1.8] text-[#c0c0c0]">
                {section.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto flex flex-col items-center justify-center pt-32 pb-12 px-6 bg-black border-t border-white/10">
        <nav className="w-full max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Footer navigation">
          <div className="flex flex-col">
            <a href="#" className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Home</a>
          </div>
          <div className="flex flex-col">
            <a href="#manifesto" className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Manifesto</a>
          </div>
          <div className="flex flex-col">
            <a href="#privacy" className="font-sans font-light text-white/70 hover:text-white cursor-pointer transition-colors text-[13px] uppercase tracking-[0.15em]">Privacy Policy</a>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="font-sans font-light text-white/30 text-[13px] uppercase tracking-[0.15em]">
              © {new Date().getFullYear()} Ashen
            </span>
          </div>
        </nav>
      </footer>
    </div>
  );
}
