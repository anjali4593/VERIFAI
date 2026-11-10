import React from 'react';
import { Layers, Cpu, Scan, FileSearch, Shield, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechnologySection() {
  const methods = [
    {
      title: "Error Level Analysis (ELA)",
      code: "METHOD_01 // COMPRESSION",
      desc: "Images saved in lossy formats like JPEG degrade predictably. When parts of an image are spliced in from another source, their error rate differs noticeably from the surrounding area.",
      tag: "Spatial Analysis"
    },
    {
      title: "Discrete Cosine Transform (DCT)",
      code: "METHOD_02 // FREQUENCY",
      desc: "Quantization matrix discrepancies reveal double compression, common when an image is altered and re-exported in photo manipulation software.",
      tag: "Spectral Domain"
    },
    {
      title: "Sensor Noise Uniformity (PRNU)",
      code: "METHOD_03 // HARDWARE",
      desc: "Every camera sensor introduces unique, microscopic Photo-Response Non-Uniformity noise. Merging images from two sensors exposes immediate mathematical discontinuities.",
      tag: "Silicon Fingerprinting"
    },
    {
      title: "Clonal Keypoint Mapping",
      code: "METHOD_04 // PATTERN",
      desc: "Locates duplicate or near-duplicate pixel patches used to cover unwanted objects, duplicate crowd members, or fabricate textures in forged photographs.",
      tag: "Geometric Search"
    }
  ];

  return (
    <section id="technology" className="py-24 bg-[#F7F7F2] border-b border-[#E5E7E3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono tracking-widest uppercase mb-4 border border-[#47765B]/20">
              <span>Scientific Foundations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202622] tracking-tight">
              Forensic Science Meets Modern Computing
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#58615A] max-w-md">
            Our pipeline combines classical image processing mathematics with modern computer vision algorithms to ensure unbiased, replicable evidence.
          </p>
        </div>

        {/* 4-Card Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, idx) => (
            <div 
              key={idx}
              className="bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] p-8 transition-all duration-200 hover:border-[#47765B]/50 hover:shadow-xs group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#47765B] font-semibold">
                  {method.code}
                </span>
                <span className="text-[11px] font-mono text-[#58615A] bg-[#F7F7F2] px-2.5 py-0.5 rounded border border-[#E5E7E3]">
                  {method.tag}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#202622] mb-3 group-hover:text-[#47765B] transition-colors">
                {method.title}
              </h3>

              <p className="text-sm text-[#58615A] leading-relaxed mb-6">
                {method.desc}
              </p>

              <div className="pt-4 border-t border-[#E5E7E3] flex items-center justify-between text-xs font-mono text-[#58615A]">
                <span>Status: <strong className="text-[#202622]">Operational</strong></span>
                <span className="text-[#47765B] font-medium flex items-center gap-1">
                  <span>Peer-Reviewed</span>
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Strip */}
        <div className="mt-12 bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#202622] mb-1">
              Ready to verify a specimen?
            </h4>
            <p className="text-sm text-[#58615A]">
              Upload any digital photo or document to generate an immediate forensic integrity breakdown.
            </p>
          </div>
          <Link
            to="/analyze"
            className="shrink-0 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm"
          >
            Launch Investigation Workspace
          </Link>
        </div>
      </div>
    </section>
  );
}

