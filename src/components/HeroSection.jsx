import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import ForensicPreview from './ForensicPreview';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#F7F7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-8">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7EEE7] border border-[#47765B]/20 text-[#47765B] text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
              <span>DIGITAL IMAGE FORENSICS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#202622] tracking-tight leading-[1.12]">
              Every Image Has a Story. Discover If It's Authentic.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed max-w-xl font-normal">
              Investigate digital image integrity with forensic analysis tools designed to identify signs of manipulation and image tampering.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-[#47765B] text-[#FFFFFF] text-base font-medium hover:bg-[#385F48] transition-all duration-200 shadow-sm border border-[#385F48]"
              >
                <span>Analyze an Image</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => scrollTo('technology')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#FFFFFF] text-[#202622] text-base font-medium hover:bg-[#E7EEE7]/40 transition-colors border border-[#E5E7E3] cursor-pointer shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#58615A]" />
                <span>Explore Technology</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 border-t border-[#E5E7E3] flex flex-wrap items-center gap-8 text-xs font-mono text-[#58615A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#47765B]" />
                <span>Cryptographic Audit Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#47765B]"></span>
                <span>Zero Retention Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Forensic Visual Interface Preview */}
          <div className="lg:col-span-6">
            <ForensicPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

