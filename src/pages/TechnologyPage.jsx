import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sliders, 
  Eye, 
  Layers, 
  Cpu, 
  Binary, 
  ShieldCheck, 
  Search, 
  FileText, 
  ScanLine, 
  Copy, 
  Scissors, 
  AlertTriangle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TechnologyPage() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Workflow steps
  const workflowSteps = [
    {
      step: "01",
      title: "Image Acquisition",
      badge: "DATA INTEGRITY",
      desc: "The digital specimen is ingested in volatile memory without bitstream mutation. An immutable FIPS 180-4 SHA-256 cryptographic digest is computed immediately to establish legal chain-of-custody.",
      specs: ["Zero Byte Alteration", "SHA-256 & MD5 Digests", "ISO/IEC 27037 Compliant"]
    },
    {
      step: "02",
      title: "Image Preprocessing",
      badge: "SPECTRAL NORMALIZATION",
      desc: "Extracts underlying Discrete Cosine Transform (DCT) coefficient lattices, unpacks color filter arrays (CFA), and measures ambient high-frequency sensor noise baselines across all color channels.",
      specs: ["8×8 Macroblock Grids", "Chroma De-interleaving", "Sensor PRNU Calibration"]
    },
    {
      step: "03",
      title: "Forensic Examination",
      badge: "ALGORITHMIC AUDITING",
      desc: "Executes multi-spectral forensic routines including Error Level Analysis (ELA), copy-move keypoint clustering, and demosaicing regularity audits to mathematically isolate manipulated regions.",
      specs: ["Multi-Compression ELA", "Affine Invariant SIFT", "CFA Bilinearity Checks"]
    },
    {
      step: "04",
      title: "Evidence Visualization",
      badge: "REPORT GENERATION",
      desc: "Transforms complex mathematical differentials into calibrated visual heatmaps, pixel coordinate overlays, and comprehensive court-admissible diagnostic audit dossiers.",
      specs: ["Calibrated Anomaly Overlays", "Integrity Confidence Meter", "Exportable PDF Dossier"]
    }
  ];

  // Technical cards
  const technicalCards = [
    {
      title: "Error Level Analysis (ELA)",
      code: "TECH-01 // COMPRESSION",
      icon: Layers,
      summary: "Isolates differing lossy compression levels across adjacent pixel macroblocks.",
      deepDive: "Images saved in lossy formats like JPEG degrade at a known, uniform rate across the entire canvas. When an external element is spliced from another source, its compression history differs, causing it to display a distinct error residual gradient when re-saved under calibrated compression.",
      highlight: "Exposes spliced elements, resaved text, and localized content erasure.",
      metrics: ["Quantization Step Divergence", "8×8 DCT Residual Variance", "Peak Signal-to-Noise Ratio (PSNR)"]
    },
    {
      title: "Metadata & Provenance Analysis",
      code: "TECH-02 // STRUCTURE",
      icon: FileText,
      summary: "Audits EXIF, XMP, and IPTC header structures for software manipulation signatures.",
      deepDive: "Digital cameras embed intricate capture parameters including shutter speed, lens serials, and firmware versions into the binary header. Photo editing suites inevitably inject revision history states, alter quantization tables, or leave mismatched timestamps between DateTimeOriginal and DateTimeDigitized.",
      highlight: "Detects software save stamps (e.g. Adobe Photoshop), stripped metadata, and thumbnail disparities.",
      metrics: ["XMP Packet History Revisions", "Timestamp Discrepancy Audits", "EXIF Thumbnail Bitstream Parity"]
    },
    {
      title: "Copy-Move Forgery Detection",
      code: "TECH-03 // GEOMETRIC",
      icon: Copy,
      summary: "Identifies duplicated image patches used to conceal evidence or fabricate elements.",
      deepDive: "Copy-move manipulation copies an area within the same image to cover an unwanted feature (e.g. a vehicle, defect, or individual). Because camera noise and color balance match, human eyes cannot perceive the edit. Scale-Invariant Feature Transform (SIFT) detects identical geometric keypoint clusters.",
      highlight: "Uncovers cloned textures, duplicated crowd members, and concealed physical damage.",
      metrics: ["Euclidean Keypoint Distance", "Affine Transform Matrix Clustering", "Block-Matching Redundancy"]
    },
    {
      title: "Image Splicing Detection",
      code: "TECH-04 // HARDWARE",
      icon: Scissors,
      summary: "Verifies sensor noise patterns and lighting geometry between disparate images.",
      deepDive: "Every camera sensor possesses microscopic silicon imperfections known as Photo-Response Non-Uniformity (PRNU) noise—a unique fingerprint. Merging imagery from two cameras creates mathematical noise boundaries, while conflicting shadow angles expose composite lighting contradictions.",
      highlight: "Isolates elements merged from different cameras, times of day, or synthetic generators.",
      metrics: ["PRNU Sensor Correlation Factor", "Illumination Vector Divergence", "Color Filter Demosaicing Invariance"]
    }
  ];

  // Drag handlers for A/B comparison slider
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-24 border-b border-[#E5E7E3] bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7EEE7] border border-[#47765B]/20 text-[#47765B] text-xs font-mono tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                <span>FORENSIC METHODOLOGY</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#202622] tracking-tight leading-[1.12] mb-6">
                Inside the Science of Image Authenticity.
              </h1>

              {/* Short Introduction */}
              <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed mb-8">
                Digital image forensics is the computational discipline of inspecting microscopic sensor signatures, compression residues, and pixel lattice relationships to establish non-destructive, verifiable authenticity without relying on subjective observation.
              </p>

              {/* Action Strip */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm border border-[#385F48]"
                >
                  <span>Test in Investigation Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FFFFFF] text-[#202622] text-sm font-medium hover:bg-[#E7EEE7]/40 transition-colors border border-[#E5E7E3] shadow-xs"
                >
                  <span>Explore 4-Step Pipeline</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FOUR-STEP WORKFLOW */}
        <section id="workflow" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                END-TO-END PIPELINE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight mb-4">
                Four-Step Verification Protocol
              </h2>
              <p className="text-base text-[#58615A] leading-relaxed">
                From bitstream ingestion to court-admissible dossiers, every specimen undergoes a rigorous, deterministic analytical pipeline.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#F7F7F2] rounded-2xl border border-[#E5E7E3] p-7 flex flex-col justify-between hover:border-[#47765B]/50 transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E3] mb-5">
                      <span className="font-mono text-2xl font-bold text-[#47765B]">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-mono text-[#58615A] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E5E7E3]">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#202622] mb-3 group-hover:text-[#47765B] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed mb-6">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7E3] space-y-1.5">
                    {step.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[11px] font-mono text-[#202622]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FOUR TECHNICAL CARDS EXPLAINING CORE TECHNIQUES */}
        <section className="py-20 md:py-28 bg-[#F7F7F2] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                FORENSIC TECHNIQUES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight mb-4">
                Core Computational Analysis Methods
              </h2>
              <p className="text-base text-[#58615A] leading-relaxed">
                Modern manipulation leaves subtle physical and mathematical fingerprints. We combine four distinct methodologies to evaluate integrity.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-8 shadow-xs flex flex-col justify-between hover:border-[#47765B]/60 transition-all duration-200 group"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E3] mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#E7EEE7] text-[#47765B] flex items-center justify-center border border-[#47765B]/20">
                            <Icon className="w-5 h-5 stroke-[1.75]" />
                          </div>
                          <span className="text-xs font-mono font-bold text-[#47765B]">
                            {card.code}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#58615A] bg-[#F7F7F2] px-2.5 py-1 rounded border border-[#E5E7E3]">
                          VERIFIED ALGORITHM
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h3 className="font-serif text-2xl font-bold text-[#202622] mb-2 group-hover:text-[#47765B] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm font-medium text-[#202622] mb-3">
                        {card.summary}
                      </p>

                      {/* Deep Dive Description */}
                      <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed mb-5">
                        {card.deepDive}
                      </p>

                      {/* Highlight Notice */}
                      <div className="p-3 bg-[#F7F7F2] rounded-xl border border-[#E5E7E3] mb-6 text-xs text-[#202622]">
                        <strong className="text-[#47765B] font-mono block text-[10px] uppercase mb-0.5">Primary Target</strong>
                        <span>{card.highlight}</span>
                      </div>
                    </div>

                    {/* Metric Badges */}
                    <div className="pt-4 border-t border-[#E5E7E3] flex flex-wrap gap-2 text-[10px] font-mono text-[#58615A]">
                      {card.metrics.map((m, mIdx) => (
                        <span key={mIdx} className="bg-[#F7F7F2] px-2.5 py-1 rounded border border-[#E5E7E3]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. VISUAL COMPARISON SECTION: ORIGINAL VS ELA */}
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                VISUAL DEMONSTRATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight mb-4">
                Original Image vs. ELA Error Map
              </h2>
              <p className="text-base text-[#58615A] leading-relaxed">
                Drag the center divider to observe how Error Level Analysis highlights compression discrepancies in spliced and tampered image sections.
              </p>
            </div>

            {/* A/B Split Comparison Viewport */}
            <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] shadow-xs overflow-hidden">
              {/* Header */}
              <div className="bg-[#F7F7F2] px-6 py-3.5 border-b border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs font-mono text-[#58615A] gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#47765B]"></span>
                  <span className="font-semibold text-[#202622]">DEMONSTRATION SPECIMEN: SPLICED_EXHIBIT_082.RAW</span>
                </div>
                <div>
                  DIVIDER RATIO: <strong className="text-[#202622]">{Math.round(sliderPos)}%</strong> ORIGINAL / <strong className="text-[#202622]">{Math.round(100 - sliderPos)}%</strong> ELA
                </div>
              </div>

              {/* Comparison Canvas Area */}
              <div
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                className="relative h-[380px] sm:h-[460px] bg-[#F7F7F2] select-none overflow-hidden flex items-center justify-center cursor-ew-resize"
              >
                {/* Background Grid */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #E5E7E3 1px, transparent 1px), linear-gradient(to bottom, #E5E7E3 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                ></div>

                {/* Layer A: Original Image (Left Side) */}
                <div className="absolute inset-4 rounded-xl overflow-hidden border border-[#E5E7E3] bg-[#FFFFFF] flex items-center justify-center">
                  <div className="w-full max-w-lg p-6 bg-[#FFFFFF] flex flex-col justify-between h-72 border border-[#E5E7E3] rounded-lg shadow-xs">
                    <div className="flex justify-between items-center border-b border-[#E5E7E3] pb-2 text-[11px] font-mono text-[#58615A]">
                      <span className="font-semibold text-[#202622]">LEGAL CERTIFICATE // EXHIBIT 082</span>
                      <span>ORIGINAL SOURCE</span>
                    </div>

                    <div className="flex-1 flex items-center justify-around py-3">
                      {/* Document stamp A */}
                      <div className="w-32 h-32 rounded-lg bg-[#F7F7F2] border border-[#E5E7E3] p-3 flex flex-col items-center justify-center text-center">
                        <div className="w-8 h-8 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mb-2">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#202622]">OFFICIAL SEAL</span>
                        <span className="text-[9px] font-mono text-[#58615A]">PASSED VERIFICATION</span>
                      </div>

                      {/* Spliced Signature Box (Looks normal to human eyes) */}
                      <div className="w-44 h-32 rounded-lg bg-[#FFFFFF] border border-[#E5E7E3] p-3 flex flex-col justify-between shadow-xs">
                        <span className="text-[10px] font-mono text-[#58615A]">AUTHORIZED SIGNATURE:</span>
                        <div className="py-2 text-center">
                          <span className="font-serif italic text-lg text-[#202622]">J. R. Harrington</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#47765B] bg-[#E7EEE7] px-1.5 py-0.5 rounded text-center">
                          VISUALLY CONVINCING
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-[#58615A] border-t border-[#E5E7E3] pt-2">
                      <span>SCALE: 1:1.0</span>
                      <span>COLORSPACE: sRGB IEC61966-2.1</span>
                    </div>
                  </div>
                </div>

                {/* Layer B: ELA Visualization (Right Side Clipped) */}
                <div
                  className="absolute inset-4 rounded-xl overflow-hidden border border-[#E5E7E3] pointer-events-none"
                  style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                >
                  <div className="w-full h-full bg-[#202622] flex items-center justify-center p-4">
                    <div className="w-full max-w-lg p-6 bg-[#202622] flex flex-col justify-between h-72 border border-[#47765B]/40 rounded-lg text-[#F7F7F2]">
                      <div className="flex justify-between items-center border-b border-[#47765B]/30 pb-2 text-[11px] font-mono text-[#E7EEE7]">
                        <span className="font-semibold text-[#FFFFFF]">FORENSIC ERROR LEVEL MAP (ELA)</span>
                        <span className="bg-[#47765B] text-[#FFFFFF] px-2 py-0.5 rounded text-[10px]">
                          DISCONTINUITY ISOLATED
                        </span>
                      </div>

                      <div className="flex-1 flex items-center justify-around py-3">
                        {/* Baseline Seal Area (Uniform dark error rate) */}
                        <div className="w-32 h-32 rounded-lg bg-[#202622] border border-[#58615A] p-3 flex flex-col items-center justify-center text-center opacity-60">
                          <div className="w-8 h-8 rounded-full bg-[#58615A]/40 flex items-center justify-center text-[#E7EEE7] mb-2">
                            <CheckCircle2 className="w-5 h-5 text-[#E7EEE7]" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#E7EEE7]">UNIFORM BASELINE</span>
                          <span className="text-[9px] font-mono text-[#58615A]">DELTA: 0.8 dB</span>
                        </div>

                        {/* Spliced Signature Box (Fluorescing bright under ELA) */}
                        <div className="w-44 h-32 rounded-lg bg-[#47765B]/30 border-2 border-dashed border-[#E7EEE7] p-3 flex flex-col justify-between shadow-md">
                          <div className="flex justify-between text-[10px] font-mono text-[#FFFFFF]">
                            <span>FLAGGED BLOCK</span>
                            <span className="font-bold text-[#FFFFFF]">+88% ERR</span>
                          </div>
                          <div className="py-1 text-center bg-[#202622]/80 rounded p-1">
                            <span className="font-mono text-xs font-bold text-[#FFFFFF] block">
                              COMPRESSION MISMATCH
                            </span>
                            <span className="text-[9px] font-mono text-[#E7EEE7]">
                              Spliced from External JPEG
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-[#FFFFFF] bg-[#47765B] px-1.5 py-0.5 rounded text-center font-bold">
                            ANOMALY: 34.2 dB
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-[#E7EEE7] border-t border-[#47765B]/30 pt-2">
                        <span>ALGORITHM: 8×8 DCT RESIDUAL</span>
                        <span>CERTAINTY: 96.4%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Draggable Divider Line */}
                <div
                  className="absolute top-4 bottom-4 w-1 bg-[#47765B] z-20 cursor-ew-resize flex items-center justify-center pointer-events-auto shadow-sm"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#47765B] shadow-md flex items-center justify-center text-[#47765B] -ml-0.5">
                    <Sliders className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* Badges on Viewport */}
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                  <span className="bg-[#FFFFFF]/95 text-[#202622] text-[10px] font-mono px-3 py-1 rounded-md border border-[#E5E7E3] shadow-xs">
                    ORIGINAL SPECIMEN
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-10 pointer-events-none">
                  <span className="bg-[#202622]/95 text-[#FFFFFF] text-[10px] font-mono px-3 py-1 rounded-md border border-[#58615A] shadow-xs">
                    FORENSIC ELA MAP
                  </span>
                </div>
              </div>

              {/* Viewport Instructions */}
              <div className="bg-[#FFFFFF] px-6 py-4 border-t border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs text-[#58615A] gap-4">
                <span>
                  Notice how the signature block glows intensely in the ELA map, exposing that it was pasted from another source with higher compression.
                </span>
                <span className="font-mono text-[#202622] font-semibold">
                  Resolution: 1920 × 1080 px
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SHORT DISCLAIMER SECTION */}
        <section className="py-16 bg-[#F7F7F2]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E7EEE7] flex items-center justify-center text-[#47765B] shrink-0 border border-[#47765B]/20">
                  <Info className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#202622]">
                    Platform Demonstration Notice & Methodological Scope
                  </h4>
                  <span className="text-xs font-mono text-[#58615A]">
                    SIMULATED EVALUATION ENVIRONMENT
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed">
                The current VERIFAI web platform provides a simulated demonstration of digital image forensics principles for educational, architectural, and workflow review purposes. Actual evidential forensic detection requires computationally intensive server-side pipelines and raw bitstream extraction compliant with judicial protocols.
              </p>

              <div className="pt-4 border-t border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs font-mono text-[#58615A] gap-4">
                <span>STANDARDS BENCHMARK: ISO/IEC 27037 & NIST SP 800-86</span>
                <Link
                  to="/analyze"
                  className="text-[#47765B] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Launch Interactive Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

