import React from 'react';
import { ShieldCheck, SearchCheck, Eye, Binary } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Image Integrity",
      subtitle: "Cryptographic validation and file structure verification to identify structural alterations.",
      tag: "Verification Protocol"
    },
    {
      icon: SearchCheck,
      title: "Digital Forensics",
      subtitle: "Multi-layered inspection detecting cloned pixels, resampling anomalies, and ELA artifacts.",
      tag: "Algorithmic Analysis"
    },
    {
      icon: Eye,
      title: "Evidence Visualization",
      subtitle: "Definitive visual heatmaps and forensic overlays for verifiable and auditable reporting.",
      tag: "Audit Readout"
    }
  ];

  return (
    <section className="border-y border-[#E5E7E3] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#E5E7E3]">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`${idx !== 0 ? 'pt-8 md:pt-0 md:pl-10' : ''} flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E7EEE7] flex items-center justify-center text-[#47765B] border border-[#47765B]/20 group-hover:border-[#47765B] transition-colors">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#58615A] bg-[#F7F7F2] px-2 py-1 rounded border border-[#E5E7E3]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#202622] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#58615A] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7E3]/60 flex items-center gap-2 text-xs font-mono text-[#47765B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                  <span>Forensic Standard Assured</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

