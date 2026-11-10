import React, { useState } from 'react';
import { Search, Eye, BarChart3, ScanLine, FileBarChart, Compass, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: "manipulation",
      badge: "Detection Algorithm",
      title: "Image Manipulation Analysis",
      summary: "Detect copy-move splicing, object removal, cloning, and algorithmic inpainting using multi-spectral pixel disparity.",
      bullets: [
        "Error Level Analysis (ELA) isolates compression differentials across adjacent block boundaries.",
        "Sensor Pattern Noise (PRNU) fingerprint matching identifies mixed camera source files.",
        "Color Filter Array (CFA) demosaicing inconsistency detection exposes spliced regions.",
        "Discrete Cosine Transform (DCT) coefficient analysis catches double JPEG compression."
      ],
      stats: [
        { label: "Anomaly Precision", value: "99.4%" },
        { label: "JPEG Block Grid", value: "8×8 px" },
        { label: "Processing Latency", value: "< 1.2s" }
      ]
    },
    {
      id: "evidence",
      badge: "Inspection Viewport",
      title: "Visual Evidence Review",
      summary: "Inspect manipulated exhibits through calibrated overlays, synchronized split-screens, and high-contrast anomaly heatmaps.",
      bullets: [
        "Interactive A/B opacity slider compares uncompressed original with forensic error gradient.",
        "Pixel luminance gradient vectors identify contradictory lighting and shadow angles.",
        "Color space extraction isolates chromatic aberration and boundary feathering.",
        "Exportable high-resolution forensic overlays ready for courtroom presentation."
      ],
      stats: [
        { label: "Overlay Modes", value: "6 Calibrated" },
        { label: "Zoom Capacity", value: "Up to 1600%" },
        { label: "Export Formats", value: "PDF / TIFF" }
      ]
    },
    {
      id: "insights",
      badge: "Reporting Engine",
      title: "Forensic Insights & Certification",
      summary: "Comprehensive diagnostic audit reports detailing file provenance, EXIF metadata tampering, and cryptographic integrity.",
      bullets: [
        "Cryptographic SHA-256 and MD5 hash chaining guarantees strict chain-of-custody.",
        "EXIF/XMP metadata discrepancy auditing highlights editing software stamps.",
        "Tamper Probability Score provides clear, quantifiable evidentiary confidence.",
        "Automated PDF evidentiary dossiers formatted according to forensic documentation standards."
      ],
      stats: [
        { label: "Hash Algorithms", value: "SHA-256 / MD5" },
        { label: "Confidence Index", value: "0–100 Scale" },
        { label: "Audit Trail", value: "Tamper-Proof" }
      ]
    }
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-24 bg-[#FFFFFF] border-b border-[#E5E7E3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono tracking-widest uppercase mb-4 border border-[#47765B]/20">
            <span>Core Forensic Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202622] tracking-tight mb-4">
            Built for Rigorous Investigative Standards
          </h2>
          <p className="text-base sm:text-lg text-[#58615A] leading-relaxed">
            Every analysis module in VERIFAI is grounded in verified computational forensics, providing investigators and analysts with clear, undeniable conclusions.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {features.map((feat, index) => (
            <button
              key={feat.id}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer ${
                activeTab === index
                  ? 'bg-[#47765B] text-[#FFFFFF] border-[#385F48] shadow-sm'
                  : 'bg-[#F7F7F2] text-[#58615A] border-[#E5E7E3] hover:text-[#202622] hover:bg-[#E7EEE7]'
              }`}
            >
              <span>{feat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Showcase Card */}
        <div className="bg-[#F7F7F2] rounded-2xl border border-[#E5E7E3] p-8 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                {current.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#202622]">
                {current.title}
              </h3>

              <p className="text-base text-[#58615A] leading-relaxed">
                {current.summary}
              </p>

              {/* Bullet list */}
              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E7EEE7] text-[#47765B] flex items-center justify-center mt-0.5 shrink-0 border border-[#47765B]/20">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <p className="text-sm text-[#202622] leading-snug">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm"
                >
                  <span>Test This Feature</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Telemetry & Metric Panel */}
            <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7E3] pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#58615A]">
                  Forensic Specifications
                </span>
                <span className="text-xs font-mono text-[#47765B] font-semibold">VERIFIED</span>
              </div>

              <div className="space-y-4">
                {current.stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-[#F7F7F2] rounded-lg border border-[#E5E7E3]"
                  >
                    <span className="text-xs font-medium text-[#58615A]">{stat.label}</span>
                    <span className="text-sm font-mono font-bold text-[#202622]">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Visual mini-diagnostic graphic */}
              <div className="p-4 rounded-lg border border-[#E5E7E3] bg-[#F7F7F2]/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#58615A]">
                  <span>CONFIDENCE THRESHOLD</span>
                  <span className="text-[#47765B] font-semibold">PASS (STRICT)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E5E7E3] overflow-hidden">
                  <div className="h-full bg-[#47765B] rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#58615A]">
                  <span>0.00 BASELINE</span>
                  <span>1.00 CERTAINTY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

