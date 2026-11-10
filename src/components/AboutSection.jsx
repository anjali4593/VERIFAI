import React from 'react';
import { Fingerprint, Scale, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Scale,
      title: "Legal & Evidentiary Integrity",
      description: "In judicial proceedings and investigations, visual evidence must withstand rigorous scrutiny. VERIFAI produces auditable trails confirming whether an exhibit is pristine or manipulated."
    },
    {
      icon: Fingerprint,
      title: "Synthetic Media & Splicing",
      description: "Modern generative diffusion and clone-stamp manipulations leave microscopic traces. Our algorithms detect compression variance and sensor noise mismatches invisible to human review."
    },
    {
      icon: FileText,
      title: "Journalistic Truth Verification",
      description: "Newsrooms and verification desks rely on tamper-proof verification to prevent disinformation campaigns from compromising public trust and investigative reporting."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#F7F7F2] border-b border-[#E5E7E3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono tracking-widest uppercase mb-4 border border-[#47765B]/20">
            <span>The Authenticity Mandate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202622] tracking-tight leading-[1.15] mb-6">
            Beyond What the Eye Can See
          </h2>
          <p className="text-lg text-[#58615A] leading-relaxed">
            In an era where synthetic generation and sophisticated editing tools can seamlessly fabricate reality, visual appearance is no longer proof of truth. VERIFAI bridges the gap between observation and forensic science, providing deterministic verification for every pixel.
          </p>
        </div>

        {/* Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#202622] mb-4">
              Why Forensic Verification Is Critical
            </h3>
            <p className="text-sm text-[#58615A] leading-relaxed mb-6">
              Digital images are not just static pictures; they are complex records comprising sensor patterns, color filter arrays, quantization matrices, and metadata histories. When an image is altered, resaved, or cloned, it disrupts these delicate mathematical relationships.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E5E7E3]">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-[#58615A]">
                  <strong className="text-[#202622] block font-medium">Non-destructive Analysis:</strong>
                  Your original source files remain intact with cryptographic verification.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-[#58615A]">
                  <strong className="text-[#202622] block font-medium">Scientific Repeatability:</strong>
                  Every forensic metric corresponds to peer-reviewed digital forensics methodologies.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-[#58615A]">
                  <strong className="text-[#202622] block font-medium">Clear Evidentiary Grading:</strong>
                  Instant classification of pristine vs altered exhibits with certainty scores.
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E7E3] bg-[#F7F7F2] -mx-8 -mb-8 p-6 rounded-b-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#58615A] block">Methodology Standard</span>
                <span className="text-sm font-semibold text-[#202622]">ISO/IEC 27037 Compliant</span>
              </div>
              <span className="text-xs font-mono text-[#47765B] bg-[#FFFFFF] px-3 py-1 rounded border border-[#E5E7E3]">
                Strict Adherence
              </span>
            </div>
          </div>

          {/* Right Pillar Cards */}
          <div className="lg:col-span-7 space-y-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] p-7 transition-all duration-200 hover:border-[#47765B]/50 hover:shadow-sm"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-[#E7EEE7] flex items-center justify-center text-[#47765B] shrink-0 border border-[#47765B]/20">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[#202622] mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-[#58615A] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

