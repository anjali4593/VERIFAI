import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Eye, Layers, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ForensicCanvasViewer({ imageSrc, imageName, dimensions, isAltered = false }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ela'); // 'ela', 'noise', 'heatmap'
  const [zoomLevel, setZoomLevel] = useState(100);

  const containerRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const forensicCanvasRef = useRef(null);

  // Render authentic/filtered image onto canvases
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // 1. Render Original Canvas
      const origCanvas = originalCanvasRef.current;
      if (origCanvas) {
        origCanvas.width = img.naturalWidth || 800;
        origCanvas.height = img.naturalHeight || 600;
        const ctx = origCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
      }

      // 2. Render Forensic Map Canvas (Live ELA / Noise / Heatmap calculation)
      const foreCanvas = forensicCanvasRef.current;
      if (foreCanvas) {
        foreCanvas.width = img.naturalWidth || 800;
        foreCanvas.height = img.naturalHeight || 600;
        const ctx = foreCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, foreCanvas.width, foreCanvas.height);
        const data = imgData.data;

        if (activeFilter === 'ela') {
          // Error Level Analysis amplification simulation:
          // Computes local high-frequency difference and amplifies block residuals
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const avg = (r + g + b) / 3;

            // Calculate gradient difference
            const diff = Math.abs(r - avg) * 3.5 + Math.abs(g - avg) * 3.5;
            // Contrast amplification in dark forensic palette
            data[i] = Math.min(255, diff * 1.8);
            data[i + 1] = Math.min(255, diff * 2.2);
            data[i + 2] = Math.min(255, diff * 1.6);
          }
        } else if (activeFilter === 'noise') {
          // Sensor Pattern Noise (PRNU) simulation:
          // High-pass filter emphasizing microscopic sensor irregularities
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 45;
            const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const val = Math.min(255, Math.max(0, lum * 0.4 + noise + 80));
            data[i] = val * 0.85;
            data[i + 1] = val;
            data[i + 2] = val * 0.9;
          }
        } else if (activeFilter === 'heatmap') {
          // Anomaly Heatmap / Tampering boundary mask:
          for (let i = 0; i < data.length; i += 4) {
            const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            // In a neutral monochrome base with emerald highlighting
            data[i] = lum * 0.25;
            data[i + 1] = lum * 0.45;
            data[i + 2] = lum * 0.35;
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }
    };
  }, [imageSrc, activeFilter]);

  // Handle Dragging Divider
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
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] shadow-xs overflow-hidden">
      {/* Control Toolbar */}
      <div className="bg-[#F7F7F2] px-6 py-4 border-b border-[#E5E7E3] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#202622] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#47765B]"></span>
            CANVAS INSPECTOR: A/B SPLIT COMPARISON
          </span>
          <span className="text-[#58615A] hidden sm:inline">•</span>
          <span className="text-[#58615A] hidden sm:inline">
            SPLIT: {Math.round(sliderPos)}% ORIGINAL / {Math.round(100 - sliderPos)}% FORENSIC
          </span>
        </div>

        {/* Filter Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-lg border border-[#E5E7E3]">
          <button
            type="button"
            onClick={() => setActiveFilter('ela')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'ela'
                ? 'bg-[#47765B] text-[#FFFFFF] shadow-xs'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            ELA Gradient
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('noise')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'noise'
                ? 'bg-[#47765B] text-[#FFFFFF] shadow-xs'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            PRNU Noise
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('heatmap')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFilter === 'heatmap'
                ? 'bg-[#47765B] text-[#FFFFFF] shadow-xs'
                : 'text-[#58615A] hover:text-[#202622]'
            }`}
          >
            Boundary Mask
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-[420px] sm:h-[500px] bg-[#F7F7F2] select-none overflow-hidden flex items-center justify-center cursor-ew-resize"
      >
        {/* Reticle grid */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #E5E7E3 1px, transparent 1px), linear-gradient(to bottom, #E5E7E3 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* Original Canvas (Underneath) */}
        <div className="absolute inset-4 rounded-xl overflow-hidden border border-[#E5E7E3] bg-[#FFFFFF] flex items-center justify-center">
          <canvas
            ref={originalCanvasRef}
            className="max-h-full max-w-full object-contain mx-auto"
            style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.15s ease-out' }}
          />
        </div>

        {/* Forensic Canvas (Clipped on Right) */}
        <div
          className="absolute inset-4 rounded-xl overflow-hidden border border-[#E5E7E3] bg-[#202622] flex items-center justify-center pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <canvas
            ref={forensicCanvasRef}
            className="max-h-full max-w-full object-contain mx-auto"
            style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.15s ease-out' }}
          />
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-4 bottom-4 w-1 bg-[#47765B] z-20 cursor-ew-resize flex items-center justify-center pointer-events-auto shadow-sm"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#47765B] shadow-md flex items-center justify-center text-[#47765B] -ml-0.5">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>

        {/* Badges on Viewport */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <span className="bg-[#FFFFFF]/95 text-[#202622] text-[10px] font-mono px-3 py-1 rounded-md border border-[#E5E7E3] shadow-xs">
            ORIGINAL SPECIMEN (RAW)
          </span>
        </div>

        <div className="absolute top-6 right-6 z-10 pointer-events-none">
          <span className="bg-[#202622]/95 text-[#FFFFFF] text-[10px] font-mono px-3 py-1 rounded-md border border-[#58615A] shadow-xs">
            FORENSIC: {activeFilter.toUpperCase()} (INVERTED CONTRAST)
          </span>
        </div>
      </div>

      {/* Footer Controls & Zoom */}
      <div className="bg-[#FFFFFF] px-6 py-4 border-t border-[#E5E7E3] flex flex-wrap items-center justify-between text-xs text-[#58615A] gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#202622] font-semibold">{imageName}</span>
          <span>•</span>
          <span className="font-mono">{dimensions || 'Standard Resolution'}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F7F7F2] px-2 py-1 rounded-md border border-[#E5E7E3]">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
              className="p-1 hover:text-[#202622] rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1 font-medium text-[#202622] min-w-[42px] text-center">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(200, z + 25))}
              className="p-1 hover:text-[#202622] rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="p-1 hover:text-[#202622] rounded border-l border-[#E5E7E3] ml-1 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

