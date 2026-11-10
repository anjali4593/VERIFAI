import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Search, 
  Target, 
  Lightbulb, 
  Compass, 
  Lock, 
  FileCheck, 
  AlertCircle, 
  Binary, 
  Cpu 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const keyObjectives = [
    {
      num: "01",
      title: "Identify Potential Image Manipulation",
      desc: "Provide clear, accessible detection indicators for common forms of digital tampering—including copy-move cloning, compression disparities, and pixel boundary splicing.",
      icon: Search
    },
    {
      num: "02",
      title: "Explore Digital Forensic Techniques",
      desc: "Demystify the mathematical foundations of computational forensics—such as Error Level Analysis (ELA), Discrete Cosine Transform (DCT) quantization, and sensor noise fingerprints.",
      icon: Cpu
    },
    {
      num: "03",
      title: "Improve Awareness of Image Authenticity",
      desc: "Equip analysts, journalists, legal professionals, and students with the critical framework required to evaluate visual evidence beyond surface appearances.",
      icon: Eye
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-24 border-b border-[#E5E7E3] bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7EEE7] border border-[#47765B]/20 text-[#47765B] text-xs font-mono tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                <span>ABOUT VERIFAI</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#202622] tracking-tight leading-[1.12] mb-6">
                Making Digital Image Integrity Understandable.
              </h1>

              {/* Introduction */}
              <p className="text-lg sm:text-xl text-[#58615A] leading-relaxed mb-8">
                VERIFAI is a digital image forensics and educational platform created to make the science of image verification transparent, accessible, and actionable. In an age of seamless synthetic imagery and visual editing, we bridge the gap between observation and forensic science.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm border border-[#385F48]"
                >
                  <span>Launch Investigation Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/technology"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FFFFFF] text-[#202622] text-sm font-medium hover:bg-[#E7EEE7]/40 transition-colors border border-[#E5E7E3] shadow-xs"
                >
                  <span>Explore Forensic Science</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM SECTION */}
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Problem Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block font-bold">
                  THE CONTEMPORARY CHALLENGE
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight leading-snug">
                  The Rapid Erosion of Visual Trust
                </h2>
                <p className="text-base text-[#58615A] leading-relaxed">
                  For over a century, photographs served as definitive documentary evidence of reality. Today, accessible desktop editing suites, automated cloning algorithms, and generative AI models allow anyone to modify or fabricate photographic evidence in seconds.
                </p>
                <p className="text-base text-[#58615A] leading-relaxed">
                  From altered legal contracts and fabricated insurance claims to viral political misinformation, the consequences of manipulated media are profound. Because human vision is easily misled by seamless edge-blending and harmonized lighting, visual inspection alone is fundamentally insufficient.
                </p>
              </div>

              {/* Right Column: Problem Breakdown Cards */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#202622]">DOCUMENT & CONTRACT FORGERY</span>
                    <span className="text-[10px] font-mono text-[#47765B] bg-[#E7EEE7] px-2 py-0.5 rounded">LEGAL RISK</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed">
                    Signatures and approval stamps are routinely spliced from authentic documents onto unauthorized agreements with microscopic compression differences.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#202622]">INSURANCE & EVIDENCE CLAIMS</span>
                    <span className="text-[10px] font-mono text-[#47765B] bg-[#E7EEE7] px-2 py-0.5 rounded">FINANCIAL FRAUD</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed">
                    Clone-stamp and content-aware tools conceal structural damage or fabricate property defects, costing institutions billions annually in unverified claims.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#202622]">SYNTHETIC NEWS & DISINFORMATION</span>
                    <span className="text-[10px] font-mono text-[#47765B] bg-[#E7EEE7] px-2 py-0.5 rounded">PUBLIC INTEGRITY</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed">
                    Newsrooms and open-source verification desks face thousands of unverified digital assets daily, requiring scientific methodologies to confirm provenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MISSION AND VISION */}
        <section className="py-20 md:py-28 bg-[#F7F7F2] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-8 md:p-10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E7EEE7] text-[#47765B] flex items-center justify-center mb-6 border border-[#47765B]/20">
                    <Target className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                    OUR PURPOSE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202622] mb-4">
                    The Mission
                  </h3>
                  <p className="text-sm sm:text-base text-[#58615A] leading-relaxed">
                    To make digital image forensics comprehensible and verifiable through deterministic mathematical indicators. We believe that image verification should not be an inscrutable black box; investigators must be able to inspect the exact compression, metadata, and sensor evidence behind every determination.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E7E3] text-xs font-mono text-[#58615A]">
                  PRINCIPLE: Deterministic & Explainable Verification
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-8 md:p-10 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E7EEE7] text-[#47765B] flex items-center justify-center mb-6 border border-[#47765B]/20">
                    <Compass className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                    THE HORIZON
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202622] mb-4">
                    The Vision
                  </h3>
                  <p className="text-sm sm:text-base text-[#58615A] leading-relaxed">
                    A digital ecosystem where image authenticity is verifiable by design, where legal systems have transparent standards for digital exhibit provenance, and where public discourse is insulated against visual deception through universal digital media literacy.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E7E3] text-xs font-mono text-[#58615A]">
                  GOAL: Trust Anchored in Mathematical Science
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. KEY OBJECTIVES */}
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E5E7E3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                CORE PILLARS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight mb-4">
                Key Strategic Objectives
              </h2>
              <p className="text-base text-[#58615A] leading-relaxed">
                VERIFAI focuses on three measurable objectives to transform how digital imagery is inspected and evaluated.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {keyObjectives.map((obj, idx) => {
                const Icon = obj.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#F7F7F2] rounded-2xl border border-[#E5E7E3] p-8 flex flex-col justify-between hover:border-[#47765B]/50 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E3] mb-6">
                        <span className="font-mono text-3xl font-bold text-[#47765B]">
                          {obj.num}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] text-[#47765B] flex items-center justify-center border border-[#E5E7E3]">
                          <Icon className="w-5 h-5 stroke-[1.75]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#202622] mb-3">
                        {obj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#58615A] leading-relaxed">
                        {obj.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E5E7E3] flex items-center gap-2 text-xs font-mono text-[#47765B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
                      <span>Active Focus</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. SIMPLE PROJECT OVERVIEW SECTION */}
        <section className="py-20 md:py-24 bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-8 md:p-12 shadow-xs">
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-mono text-[#47765B] uppercase tracking-wider block mb-2 font-bold">
                  ARCHITECTURE & STANDARDS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#202622] tracking-tight mb-4">
                  Project Overview & Operational Principles
                </h2>
                <p className="text-sm sm:text-base text-[#58615A] leading-relaxed">
                  VERIFAI is built according to professional forensic standards while maintaining a clean, privacy-first software architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#202622] block">Zero Retention</span>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Specimens are processed in ephemeral local memory. Files are never stored on persistent remote databases.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#202622] block">ISO/IEC 27037 Standard</span>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Digital evidence acquisition and analysis conforms to international guidelines for digital specimen handling.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#202622] block">Non-Destructive Ingest</span>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Original bitstreams remain untouched; analysis is conducted on synchronized forensic copies with cryptographic hashes.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
                  <span className="text-xs font-mono font-bold text-[#202622] block">Simulated Learning Suite</span>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Interactive demonstration models illustrate core forensic algorithms for analysts, students, and investigators.
                  </p>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="mt-10 pt-8 border-t border-[#E5E7E3] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#202622]">
                    Ready to examine a specimen?
                  </h4>
                  <p className="text-xs text-[#58615A]">
                    Upload any image to experience the VERIFAI forensic examination workflow.
                  </p>
                </div>

                <Link
                  to="/analyze"
                  className="shrink-0 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm"
                >
                  Start an Investigation
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

