import React, { useState, useRef, useEffect } from 'react';
import { Eye, Layers, ZoomIn, ZoomOut, RotateCcw, Sliders, Maximize2, AlertCircle } from 'lucide-react';

export default function ImageSplitViewer({ specimen, activeMode, setActiveMode }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7E3] shadow-xs overflow-hidden">
      {/* Viewer Header / Toolbar */}
      <div className="bg-[#F7F7F2] px-5 py-3 border-b border-[#E5E7E3] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#202622] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#47765B]"></span>
            VIEWPORT: DUAL-CANVAS COMPARISON
          </span>
          <span className="text-[#58615A] hidden sm:inline">|</span>
          <span className="text-[#58615A] hidden sm:inline">
            SPLIT RATIO: {Math.round(sliderPos)}% / {Math.round(100 - sliderPos)}%
          </span>
        </div>

        {/* Layer Mode Selector */}
        <div className="flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-md border border-[#E5E7E3]">
          <button
            type="button"
            onClick={() => setActiveMode('ela')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeMode === 'ela'
                ? 'bg-[#47765B] text-[#FFFFFF]'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            ELA Overlay
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('noise')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeMode === 'noise'
                ? 'bg-[#47765B] text-[#FFFFFF]'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            Noise Invariance
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('luminance')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeMode === 'luminance'
                ? 'bg-[#47765B] text-[#FFFFFF]'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            Luminance Gradient
          </button>
        </div>
      </div>

      {/* Split Comparison Canvas Viewport */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[380px] sm:h-[440px] bg-[#F7F7F2] select-none overflow-hidden flex items-center justify-center cursor-ew-resize"
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #E5E7E3 1px, transparent 1px), linear-gradient(to bottom, #E5E7E3 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* Layer A (Base Specimen - Left Side) */}
        <div className="absolute inset-4 rounded-lg overflow-hidden border border-[#E5E7E3] bg-[#FFFFFF] flex items-center justify-center">
          {/* Specimen visual container */}
          <div className="w-full h-full relative flex items-center justify-center p-6 bg-[#FFFFFF]">
            {/* Visual Specimen rendering */}
            <div className="w-full max-w-lg h-64 rounded border border-[#E5E7E3] bg-[#F7F7F2] p-5 flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-[#E5E7E3] pb-2 text-[11px] font-mono text-[#58615A]">
                <span className="font-semibold text-[#202622]">EXHIBIT SPECIMEN: {specimen.name}</span>
                <span>ORIGINAL VISUAL</span>
              </div>

              <div className="flex-1 flex items-center justify-around py-4">
                <div className="w-28 h-28 rounded bg-[#FFFFFF] border border-[#E5E7E3] p-3 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-mono text-[#58615A] mb-1">REFERENCE A</span>
                  <div className="w-12 h-1 bg-[#47765B]/30 rounded mb-1"></div>
                  <div className="w-16 h-1 bg-[#47765B]/20 rounded mb-2"></div>
                  <span className="text-[9px] font-mono text-[#47765B] bg-[#E7EEE7] px-1.5 py-0.5 rounded">UNTOUCHED</span>
                </div>

                <div className="w-36 h-28 rounded bg-[#FFFFFF] border border-[#E5E7E3] p-3 flex flex-col justify-between">
                  <div className="flex justify-between text-[10px] font-mono text-[#58615A]">
                    <span>TARGET ZONE</span>
                    <span className="text-[#47765B]">SEC 04</span>
                  </div>
                  <div className="py-2 text-center">
                    <span className="text-xs font-serif font-bold text-[#202622]">{specimen.subject}</span>
                    <p className="text-[10px] text-[#58615A]">{specimen.dimensions}</p>
                  </div>
                  <div className="text-[9px] font-mono text-[#58615A] text-right">Focal: 35mm</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#58615A] border-t border-[#E5E7E3] pt-2">
                <span>COLORSPACE: sRGB IEC61966-2.1</span>
                <span>COMPRESSION: {specimen.compression}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer B (Forensic Analysis Overlay - Right Side clipped by slider) */}
        <div 
          className="absolute inset-4 rounded-lg overflow-hidden border border-[#E5E7E3] pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="w-full h-full relative flex items-center justify-center p-6 bg-[#202622]">
            {/* Forensic representation inside clipped overlay */}
            <div className="w-full max-w-lg h-64 rounded border border-[#47765B]/40 bg-[#202622] p-5 flex flex-col justify-between text-[#F7F7F2]">
              <div className="flex justify-between items-center border-b border-[#47765B]/30 pb-2 text-[11px] font-mono text-[#E7EEE7]">
                <span className="font-semibold text-[#FFFFFF]">
                  FORENSIC OVERLAY: {activeMode.toUpperCase()}
                </span>
                <span className="text-[#E7EEE7] bg-[#47765B] px-2 py-0.5 rounded text-[10px]">
                  {specimen.altered ? "DISCONTINUITY FOUND" : "UNIFORM SURFACE"}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-around py-4">
                <div className="w-28 h-28 rounded bg-[#202622] border border-[#58615A] p-3 flex flex-col justify-center items-center text-center opacity-60">
                  <span className="text-[10px] font-mono text-[#E7EEE7] mb-1">BASELINE</span>
                  <div className="w-12 h-1 bg-[#E7EEE7]/40 rounded mb-1"></div>
                  <div className="w-16 h-1 bg-[#E7EEE7]/20 rounded mb-2"></div>
                  <span className="text-[9px] font-mono text-[#E7EEE7] bg-[#58615A] px-1.5 py-0.5 rounded">0.02 dB</span>
                </div>

                {/* Spliced / Anomaly Highlight Box */}
                <div className={`w-36 h-28 rounded p-3 flex flex-col justify-between border-2 ${
                  specimen.altered 
                    ? 'border-[#E7EEE7] bg-[#47765B]/40 shadow-sm'
                    : 'border-[#58615A] bg-[#202622] opacity-80'
                }`}>
                  <div className="flex justify-between text-[10px] font-mono text-[#FFFFFF]">
                    <span>{specimen.altered ? "RESAMPLE ANOMALY" : "HOMOGENEOUS"}</span>
                    <span className="font-bold text-[#FFFFFF]">{specimen.altered ? "34.8 dB" : "1.2 dB"}</span>
                  </div>
                  <div className="text-center py-1">
                    <span className="text-xs font-mono font-bold text-[#FFFFFF]">
                      {specimen.altered ? "ERR LEVEL +82%" : "BASELINE ERROR"}
                    </span>
                    <p className="text-[9px] font-mono text-[#E7EEE7]">
                      {specimen.altered ? "Block Grid Inconsistency" : "Standard Quantization"}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-[#E7EEE7] text-right">
                    {specimen.altered ? "SPLICED AT [X:240, Y:180]" : "UNIFORM NOISE"}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#E7EEE7] border-t border-[#47765B]/30 pt-2">
                <span>FILTER: MULTI-SPECTRAL DISPARITY</span>
                <span>CERTAINTY: {specimen.altered ? "94.8%" : "99.1%"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div 
          className="absolute top-4 bottom-4 w-1 bg-[#47765B] z-20 cursor-ew-resize flex items-center justify-center pointer-events-auto"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#47765B] shadow-md flex items-center justify-center text-[#47765B] text-xs font-bold -ml-0.5">
            <Sliders className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>

        {/* Badges on Bottom Corners */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
          <span className="bg-[#FFFFFF]/90 text-[#202622] text-[10px] font-mono px-2.5 py-1 rounded border border-[#E5E7E3] shadow-xs">
            ORIGINAL SPECIMEN
          </span>
        </div>
        <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
          <span className="bg-[#202622]/90 text-[#FFFFFF] text-[10px] font-mono px-2.5 py-1 rounded border border-[#58615A] shadow-xs">
            FORENSIC MAP ({activeMode.toUpperCase()})
          </span>
        </div>
      </div>

      {/* Viewer Footer Explanation */}
      <div className="bg-[#FFFFFF] px-5 py-3 border-t border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs text-[#58615A] gap-2">
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#47765B]" />
          <span>Drag the center divider left/right to compare raw pixels against the calculated forensic error gradient.</span>
        </span>
        <span className="font-mono text-[11px] text-[#202622]">
          Resolution: <strong>{specimen.dimensions}</strong>
        </span>
      </div>
    </div>
  );
}

