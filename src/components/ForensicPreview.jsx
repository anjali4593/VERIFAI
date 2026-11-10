import React, { useState } from 'react';
import { Eye, ShieldAlert, Cpu, ZoomIn, FileCheck, Layers, AlertCircle, Sparkles } from 'lucide-react';

export default function ForensicPreview() {
  const [activeLayer, setActiveLayer] = useState('ela'); // 'original', 'ela', 'noise'

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Editorial Frame Badge */}
      <div className="absolute -top-3.5 right-6 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#47765B] text-[#FFFFFF] text-[11px] font-mono tracking-wider uppercase rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7EEE7] animate-pulse"></span>
          Forensic Inspection Engine v2.4
        </span>
      </div>

      {/* Main Inspection Canvas Card */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] shadow-sm overflow-hidden">
        {/* Terminal / Metadata Top Bar */}
        <div className="bg-[#F7F7F2] px-5 py-3 border-b border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs font-mono text-[#58615A]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7E3] border border-[#58615A]/40 inline-block"></span>
            <span className="font-semibold text-[#202622]">EXHIBIT_0921_FORENSIC.TIF</span>
          </div>
          <div className="flex items-center gap-3">
            <span>HASH: 8e4c...9f21</span>
            <span className="px-2 py-0.5 rounded bg-[#E7EEE7] text-[#47765B] font-semibold text-[10px]">
              TAMPERING DETECTED
            </span>
          </div>
        </div>

        {/* Inspection Display Window */}
        <div className="p-5">
          {/* Layer View Mode Switcher */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E3] mb-4">
            <div className="flex items-center gap-1 bg-[#F7F7F2] p-1 rounded-md border border-[#E5E7E3]">
              <button
                type="button"
                onClick={() => setActiveLayer('original')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeLayer === 'original'
                    ? 'bg-[#FFFFFF] text-[#202622] shadow-xs'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                Standard Visual
              </button>
              <button
                type="button"
                onClick={() => setActiveLayer('ela')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeLayer === 'ela'
                    ? 'bg-[#FFFFFF] text-[#47765B] shadow-xs font-semibold'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                <span>ELA Map</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLayer('noise')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeLayer === 'noise'
                    ? 'bg-[#FFFFFF] text-[#202622] shadow-xs'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                Noise Invariance
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#58615A] hidden sm:block">
              ZOOM: <span className="font-semibold text-[#202622]">320%</span>
            </div>
          </div>

          {/* Visual Analysis Viewport with CSS-drawn specimen & forensic markers */}
          <div className="relative h-64 rounded-lg border border-[#E5E7E3] bg-[#F7F7F2] overflow-hidden flex items-center justify-center">
            {/* Forensic Grid Reticle */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #E5E7E3 1px, transparent 1px), linear-gradient(to bottom, #E5E7E3 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            ></div>

            {/* Specimen Representation */}
            <div className="relative w-4/5 h-4/5 rounded bg-[#FFFFFF] border border-[#E5E7E3] p-4 flex flex-col justify-between shadow-xs">
              {/* Document / Architectural Sample Mock */}
              <div className="flex items-center justify-between border-b border-[#E5E7E3] pb-2">
                <div className="space-y-1">
                  <div className="h-2 w-28 bg-[#58615A]/20 rounded"></div>
                  <div className="h-1.5 w-16 bg-[#58615A]/15 rounded"></div>
                </div>
                <span className="text-[10px] font-mono text-[#58615A]">SEC-88</span>
              </div>

              {/* Center Specimen Elements */}
              <div className="relative flex-1 py-3 flex items-center justify-center">
                <div className="w-full flex items-center justify-around px-2">
                  <div className="h-16 w-20 rounded bg-[#F7F7F2] border border-[#E5E7E3] flex flex-col items-center justify-center p-2">
                    <div className="w-6 h-6 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mb-1">
                      <FileCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-[#58615A]">AUTH_SIG</span>
                  </div>

                  {/* Spliced / Tampered Region Indicator */}
                  <div className="relative h-20 w-32 rounded bg-[#E7EEE7]/40 border-2 border-dashed border-[#47765B] p-2 flex flex-col justify-between">
                    {/* Crosshair corners */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#47765B]"></span>
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#47765B]"></span>

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#47765B] bg-[#FFFFFF] px-1 rounded border border-[#47765B]/30">
                        ANOMALY #01
                      </span>
                      <span className="text-[9px] font-mono text-[#47765B] font-semibold">98.4%</span>
                    </div>

                    <div className="text-[10px] text-[#202622] font-mono leading-tight">
                      {activeLayer === 'ela' && 'Error Level Inconsistency'}
                      {activeLayer === 'noise' && 'Sensor PRNU Mismatch'}
                      {activeLayer === 'original' && 'Inserted Seal Stamp'}
                    </div>

                    <div className="flex items-center gap-1 text-[8px] font-mono text-[#58615A]">
                      <span>X: 240.5</span>
                      <span>Y: 182.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Specimen Hash String */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#58615A] pt-2 border-t border-[#E5E7E3]">
                <span>SCALE: 1:1.0</span>
                <span>COLOR PROFILE: Adobe RGB (1998)</span>
                <span>INTEGRITY: FAILED</span>
              </div>
            </div>

            {/* Target Crosshair Centered on Anomaly */}
            <div className="absolute pointer-events-none w-12 h-12 rounded-full border border-[#47765B]/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#47765B]"></div>
            </div>
          </div>

          {/* Forensic Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-[#F7F7F2] rounded-lg border border-[#E5E7E3]">
              <div className="text-[10px] uppercase tracking-wider text-[#58615A] font-medium mb-1">
                Compression Level
              </div>
              <div className="text-sm font-semibold text-[#202622] flex items-center gap-1.5">
                <span>Resaved 2x</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
              </div>
              <p className="text-[10px] text-[#58615A] mt-0.5 font-mono">Q-Matrix Divergence</p>
            </div>

            <div className="p-3 bg-[#F7F7F2] rounded-lg border border-[#E5E7E3]">
              <div className="text-[10px] uppercase tracking-wider text-[#58615A] font-medium mb-1">
                Lighting Consistency
              </div>
              <div className="text-sm font-semibold text-[#202622] flex items-center gap-1.5">
                <span>Divergent</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
              </div>
              <p className="text-[10px] text-[#58615A] mt-0.5 font-mono">14.8° Vector Tilt</p>
            </div>

            <div className="p-3 bg-[#F7F7F2] rounded-lg border border-[#E5E7E3]">
              <div className="text-[10px] uppercase tracking-wider text-[#58615A] font-medium mb-1">
                Metadata Validity
              </div>
              <div className="text-sm font-semibold text-[#202622] flex items-center gap-1.5">
                <span>Modified</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
              </div>
              <p className="text-[10px] text-[#58615A] mt-0.5 font-mono">Stripped EXIF Header</p>
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="bg-[#FFFFFF] px-5 py-3 border-t border-[#E5E7E3] flex items-center justify-between text-xs text-[#58615A]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#47765B]" />
            <span>Evidentiary Confidence: <strong className="text-[#202622]">High Certainty Tampering</strong></span>
          </div>
          <span className="text-[11px] font-mono text-[#47765B] font-medium">VERIFAI Certified Protocol</span>
        </div>
      </div>
    </div>
  );
}

