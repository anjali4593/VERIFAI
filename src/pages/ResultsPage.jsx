import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Layers, 
  Eye, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  FileQuestion, 
  FileText, 
  FileCheck, 
  Crosshair, 
  Maximize2 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve specimen from navigation state or sessionStorage
  const passedSpecimen = location.state?.specimen;
  const [specimen, setSpecimen] = useState(() => {
    if (passedSpecimen) return passedSpecimen;
    try {
      const saved = sessionStorage.getItem('verifai_specimen');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State for simulated verdict toggle (allows testing both outcomes)
  const [isManipulated, setIsManipulated] = useState(() => {
    if (passedSpecimen?.verdict) {
      return passedSpecimen.verdict !== 'authentic';
    }
    return true;
  });
  const [viewMode, setViewMode] = useState('overlay'); // 'overlay', 'ela', 'original'
  const [overlayOpacity, setOverlayOpacity] = useState(75);
  const canvasRef = useRef(null);

  // Generate real in-browser ELA canvas preview when image is available
  useEffect(() => {
    if (!specimen?.previewUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = specimen.previewUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 400;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Apply high-contrast forensic error gradient simulation
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;

        // Differential error simulation
        const diff = Math.abs(r - avg) * 4.5 + Math.abs(g - avg) * 3.5;
        
        // Render in dark forensic tone with emerald highlights
        data[i] = Math.min(255, diff * 1.5);
        data[i + 1] = Math.min(255, diff * 2.1);
        data[i + 2] = Math.min(255, diff * 1.7);
      }

      ctx.putImageData(imgData, 0, 0);
    };
  }, [specimen?.previewUrl, viewMode]);

  // Download functional text report
  const handleDownloadReport = () => {
    if (!specimen) return;

    const reportContent = `========================================================================
VERIFAI DIGITAL IMAGE FORENSICS — INVESTIGATION REPORT
========================================================================
DISCLAIMER: DEMO ANALYSIS — SIMULATED RESULTS FOR DEMONSTRATION PURPOSES ONLY

EXHIBIT IDENTIFIERS:
Specimen Filename      : ${specimen.name || 'UNKNOWN_EXHIBIT'}
Dimensions             : ${specimen.dimensions || 'N/A'}
File Size              : ${specimen.size || 'N/A'}
File Format            : ${specimen.type || 'image/jpeg'}
Examination Date       : ${new Date().toUTCString()}
Cryptographic SHA-256  : 8e4c7b80a1d3f92688001e8ca8c8ff464fa552d00b991b7852b855e3b0c44298

OVERALL DETERMINATION:
Classification         : ${isManipulated ? 'Potentially Manipulated' : 'Likely Authentic'}
Simulated Confidence   : ${isManipulated ? '92.4%' : '97.8%'}
Integrity Rating       : ${isManipulated ? 'SUSPECT (Compression & Pixel Inconsistencies)' : 'PASS (Uniform Compression)'}

FORENSIC INDICATOR BREAKDOWN:
1. Error Level Analysis (ELA) : ${isManipulated ? 'High-frequency compression gradient divergence flagged in target quadrant.' : 'Homogeneous error-level distribution across all 8x8 DCT blocks.'}
2. Metadata Consistency        : ${isManipulated ? 'Inconsistency detected between embedded XMP history and EXIF header tags.' : 'EXIF headers intact with native camera firmware signatures.'}
3. Compression Inconsistencies : ${isManipulated ? 'Dual-quantization matrix discovered, indicating secondary save state.' : 'Single uniform quantization matrix matching capture sensor profile.'}
4. Visual Manipulation Markers : ${isManipulated ? 'Clonal keypoint cluster identified; localized edge feathering detected.' : 'No clone-stamp repetitions or localized resampling boundaries observed.'}

FORENSIC OBSERVATIONS:
- Disparity detected in high-frequency discrete cosine transform (DCT) coefficients.
- Compression gradient exhibits localized variance in designated quadrant.
- Metadata structure contains markers consistent with post-capture processing.
- Luminance vector analysis indicates slight shadow divergence relative to key light source.

AUDIT TRAIL & METHODOLOGY:
Reference Standard     : ISO/IEC 27037 Digital Evidence Acquisition Standard
Execution Protocol     : Volatile In-Memory Analysis (Zero Retention)
Platform               : VERIFAI Forensic Engine v2.4 (Simulated)
========================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VERIFAI_INVESTIGATION_${(specimen.name || 'EXHIBIT').replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If no specimen was uploaded, show proper empty state
  if (!specimen) {
    return (
      <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
        <Navbar />

        <main className="flex-1 max-w-4xl mx-auto px-6 py-20 w-full flex items-center justify-center">
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-10 sm:p-14 text-center shadow-xs w-full max-w-xl">
            <div className="w-16 h-16 rounded-full bg-[#E7EEE7] text-[#47765B] flex items-center justify-center mx-auto mb-6 border border-[#47765B]/20">
              <FileQuestion className="w-8 h-8 stroke-[1.75]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202622] mb-3">
              No Specimen Uploaded
            </h2>
            <p className="text-sm text-[#58615A] leading-relaxed mb-8 max-w-md mx-auto">
              An image must be uploaded before generating a forensic investigation report. Please return to the upload workspace.
            </p>

            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go to Image Upload</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#58615A] hover:text-[#202622] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload Another Specimen</span>
          </Link>

          {/* Clearly Visible Label: DEMO ANALYSIS — SIMULATED RESULTS */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>DEMO ANALYSIS — SIMULATED RESULTS</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono uppercase tracking-wider mb-3 border border-[#47765B]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
            <span>FORENSIC EXAMINATION DOSSIER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202622] tracking-tight mb-2">
            Investigation Results
          </h1>
          <p className="text-base text-[#58615A]">
            Forensic analysis summary for specimen: <strong className="text-[#202622] font-mono">{specimen.name}</strong>
          </p>
        </div>

        {/* 1. CLASSIFICATION & CONFIDENCE BANNER */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E5E7E3] gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
                isManipulated 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/30'
              }`}>
                {isManipulated ? (
                  <ShieldAlert className="w-8 h-8 stroke-[1.75]" />
                ) : (
                  <ShieldCheck className="w-8 h-8 stroke-[1.75]" />
                )}
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#58615A] block mb-0.5">
                  CLASSIFICATION VERDICT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202622]">
                  {isManipulated ? "Potentially Manipulated" : "Likely Authentic"}
                </h2>
                <p className="text-xs sm:text-sm text-[#58615A] mt-1">
                  {isManipulated 
                    ? "Inconsistencies detected across discrete compression levels and pixel boundary lattices."
                    : "Compression structures and EXIF records are consistent with camera sensor baselines."}
                </p>
              </div>
            </div>

            {/* Score & Scenario Toggle */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <div className="text-left lg:text-right">
                <span className="text-[11px] font-mono text-[#58615A] uppercase block">
                  DEMO CONFIDENCE SCORE
                </span>
                <span className={`text-3xl font-mono font-bold tracking-tight ${
                  isManipulated ? 'text-amber-800' : 'text-[#47765B]'
                }`}>
                  {isManipulated ? "92.4%" : "97.8%"}
                </span>
              </div>

              {/* Simulation Mode Toggle Button */}
              <button
                type="button"
                onClick={() => setIsManipulated(!isManipulated)}
                className="text-[11px] font-mono px-3 py-1 rounded border border-[#E5E7E3] bg-[#F7F7F2] text-[#58615A] hover:text-[#202622] hover:bg-[#E7EEE7] transition-colors cursor-pointer"
                title="Toggle between simulated outcomes"
              >
                Toggle Demo: {isManipulated ? "Simulate Authentic" : "Simulate Manipulated"}
              </button>
            </div>
          </div>

          {/* 2. IMAGE INTEGRITY OVERVIEW */}
          <div className="pt-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block mb-3 font-semibold">
              Image Integrity Overview
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-[#F7F7F2] rounded-xl border border-[#E5E7E3]">
                <span className="text-[10px] font-mono text-[#58615A] uppercase block">EXHIBIT NAME</span>
                <span className="text-xs sm:text-sm font-semibold text-[#202622] truncate block mt-0.5" title={specimen.name}>
                  {specimen.name}
                </span>
              </div>

              <div className="p-3.5 bg-[#F7F7F2] rounded-xl border border-[#E5E7E3]">
                <span className="text-[10px] font-mono text-[#58615A] uppercase block">DIMENSIONS</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-[#202622] block mt-0.5">
                  {specimen.dimensions || "2048 × 1536 px"}
                </span>
              </div>

              <div className="p-3.5 bg-[#F7F7F2] rounded-xl border border-[#E5E7E3]">
                <span className="text-[10px] font-mono text-[#58615A] uppercase block">FILE SIZE</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-[#202622] block mt-0.5">
                  {specimen.size || "3.2 MB"}
                </span>
              </div>

              <div className="p-3.5 bg-[#F7F7F2] rounded-xl border border-[#E5E7E3]">
                <span className="text-[10px] font-mono text-[#58615A] uppercase block">CRYPTOGRAPHIC SHA-256</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-[#47765B] truncate block mt-0.5">
                  8e4c7b80a1d3f9...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. VISUAL DEMONSTRATION PANELS (ELA & TAMPER OVERLAY) */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E5E7E3] gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block mb-0.5">
                VISUAL FORENSIC INSPECTOR
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202622]">
                Artifact Mapping & Tamper Demonstration
              </h3>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center gap-1.5 bg-[#F7F7F2] p-1 rounded-lg border border-[#E5E7E3]">
              <button
                type="button"
                onClick={() => setViewMode('overlay')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === 'overlay'
                    ? 'bg-[#47765B] text-[#FFFFFF] shadow-xs'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                Tamper Overlay
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ela')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === 'ela'
                    ? 'bg-[#47765B] text-[#FFFFFF] shadow-xs'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                ELA Visual Map
              </button>
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === 'original'
                    ? 'bg-[#FFFFFF] text-[#202622] shadow-xs border border-[#E5E7E3]'
                    : 'text-[#58615A] hover:text-[#202622]'
                }`}
              >
                Raw Specimen
              </button>
            </div>
          </div>

          {/* Interactive Inspection Canvas Frame */}
          <div className="relative rounded-xl border border-[#E5E7E3] bg-[#F7F7F2] overflow-hidden flex items-center justify-center min-h-[380px] max-h-[520px]">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #E5E7E3 1px, transparent 1px), linear-gradient(to bottom, #E5E7E3 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            ></div>

            {/* Base Image Specimen */}
            {specimen.previewUrl && (
              <img
                src={specimen.previewUrl}
                alt={specimen.name}
                className={`max-h-[480px] max-w-full object-contain mx-auto transition-opacity duration-200 ${
                  viewMode === 'ela' ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}

            {/* Canvas for Live ELA Map */}
            <canvas
              ref={canvasRef}
              className={`max-h-[480px] max-w-full object-contain mx-auto absolute transition-opacity duration-200 ${
                viewMode === 'ela' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Tampered-Region Overlay Demonstration */}
            {viewMode === 'overlay' && isManipulated && (
              <div 
                className="absolute w-44 sm:w-56 h-32 sm:h-40 border-2 border-dashed border-[#47765B] bg-[#47765B]/20 rounded-lg pointer-events-none flex flex-col justify-between p-3"
                style={{
                  top: '32%',
                  left: '46%',
                  transform: 'translate(-50%, -50%)',
                  opacity: overlayOpacity / 100
                }}
              >
                {/* Crosshair markers */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#47765B]"></span>
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#47765B]"></span>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#FFFFFF] bg-[#47765B] px-2 py-0.5 rounded shadow-xs">
                    ANOMALY ZONE #01
                  </span>
                  <span className="text-[10px] font-mono text-[#202622] bg-[#FFFFFF] px-1.5 py-0.5 rounded font-bold">
                    +88% ERR
                  </span>
                </div>

                <div className="text-center bg-[#FFFFFF]/90 p-1 rounded border border-[#47765B]/30">
                  <span className="text-[10px] font-mono font-bold text-[#202622] block">
                    Resampling Discontinuity
                  </span>
                  <span className="text-[9px] font-mono text-[#58615A]">
                    Spliced Boundary Detected
                  </span>
                </div>

                <div className="flex justify-between text-[9px] font-mono text-[#202622] font-semibold bg-[#FFFFFF]/70 px-1 rounded">
                  <span>LOC: [X: 382, Y: 219]</span>
                  <span>ELA: 34.2 dB</span>
                </div>
              </div>
            )}

            {/* In-view Badges */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="bg-[#FFFFFF]/95 text-[#202622] text-[10px] font-mono px-3 py-1 rounded-md border border-[#E5E7E3] shadow-xs">
                MODE: {viewMode.toUpperCase()}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none">
              <span className="bg-[#202622]/90 text-[#FFFFFF] text-[10px] font-mono px-3 py-1 rounded-md border border-[#58615A] shadow-xs">
                {isManipulated ? "DEMO OVERLAY: ANOMALY FLAGGED" : "DEMO OVERLAY: UNIFORM"}
              </span>
            </div>
          </div>

          {/* Overlay Opacity Controls */}
          {viewMode === 'overlay' && (
            <div className="mt-4 pt-4 border-t border-[#E5E7E3] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#58615A]">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-[#47765B]" />
                <span>Overlay Opacity:</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-32 accent-[#47765B] cursor-pointer"
                />
                <span className="font-semibold text-[#202622]">{overlayOpacity}%</span>
              </div>
              <span className="text-[11px]">
                {isManipulated 
                  ? "Bounding box marks coordinates where high-frequency compression variance was detected."
                  : "Specimen demonstrates uniform pixel density without localized variance."}
              </span>
            </div>
          )}
        </div>

        {/* 4. FORENSIC INDICATORS GRID */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs mb-8">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block mb-1">
              DIAGNOSTIC TELEMETRY
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#202622]">
              Forensic Indicators
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indicator 1: Error Level Analysis (ELA) */}
            <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#202622]">1. Error Level Analysis (ELA)</span>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isManipulated
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/20'
                }`}>
                  {isManipulated ? "Discrepancy" : "Uniform"}
                </span>
              </div>
              <p className="text-xs text-[#58615A] leading-relaxed">
                {isManipulated
                  ? "High-frequency error rate diverges sharply in quadrant 3. Error level reaches 34.2 dB above baseline, indicating inserted imagery from a different compression level."
                  : "Error residuals degrade evenly across all 8x8 DCT macroblocks. No localized spikes detected."}
              </p>
            </div>

            {/* Indicator 2: Metadata Consistency */}
            <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#202622]">2. Metadata Consistency</span>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isManipulated
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/20'
                }`}>
                  {isManipulated ? "Modified" : "Intact"}
                </span>
              </div>
              <p className="text-xs text-[#58615A] leading-relaxed">
                {isManipulated
                  ? "XMP packet retains editing history with Adobe Photoshop signature. Discrepancy observed between DateTimeOriginal and DateTimeDigitized headers."
                  : "Original camera firmware EXIF tags intact. Shutter speed, focal length, and sensor quantization conform to unedited RAW capture."}
              </p>
            </div>

            {/* Indicator 3: Compression Inconsistencies */}
            <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#202622]">3. Compression Inconsistencies</span>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isManipulated
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/20'
                }`}>
                  {isManipulated ? "Dual Matrix" : "Single Pass"}
                </span>
              </div>
              <p className="text-xs text-[#58615A] leading-relaxed">
                {isManipulated
                  ? "Secondary quantization artifacts discovered. The specimen demonstrates evidence of being saved twice with differing quality factors (Q1=92, Q2=78)."
                  : "Luminance and chrominance quantization tables demonstrate a single, un-resaved JPEG compression pass."}
              </p>
            </div>

            {/* Indicator 4: Visual Manipulation Indicators */}
            <div className="p-5 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#202622]">4. Visual Manipulation Indicators</span>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isManipulated
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/20'
                }`}>
                  {isManipulated ? "Boundary Inconsistency" : "Continuous"}
                </span>
              </div>
              <p className="text-xs text-[#58615A] leading-relaxed">
                {isManipulated
                  ? "Edge feathering and clonal keypoint clustering detected around target boundary. Lighting vector angle diverges by 14.8° from natural ambient illumination."
                  : "Pixel gradient across high-contrast edges is mathematically natural. No clone-stamp duplicate patches discovered."}
              </p>
            </div>
          </div>
        </div>

        {/* 5. FORENSIC OBSERVATIONS SECTION */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs mb-8">
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block mb-1">
              INVESTIGATOR NOTES
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#202622]">
              Forensic Observations & Findings
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F7F7F2] border border-[#E5E7E3]">
              <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-[#58615A] leading-relaxed">
                <strong className="text-[#202622] block font-semibold mb-0.5">Frequency Domain Analysis:</strong>
                {isManipulated
                  ? "Discrete Cosine Transform (DCT) coefficient analysis confirms distinct frequency spikes localized within quadrant 3, characteristic of spliced composite elements."
                  : "DCT coefficient distribution follows expected Laplacian decay across all spatial frequencies."}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F7F7F2] border border-[#E5E7E3]">
              <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-[#58615A] leading-relaxed">
                <strong className="text-[#202622] block font-semibold mb-0.5">Sensor Noise Signature (PRNU):</strong>
                {isManipulated
                  ? "Photo-Response Non-Uniformity correlation fails across the flagged region, confirming pixels originated from multiple hardware sensors."
                  : "PRNU noise pattern is consistent and unbroken across the entire specimen surface."}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F7F7F2] border border-[#E5E7E3]">
              <div className="w-5 h-5 rounded-full bg-[#E7EEE7] flex items-center justify-center text-[#47765B] mt-0.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-[#58615A] leading-relaxed">
                <strong className="text-[#202622] block font-semibold mb-0.5">Evidentiary Chain-of-Custody:</strong>
                Specimen hashed upon acquisition using FIPS 180-4 compliant SHA-256 algorithm. Processed in ephemeral volatile memory with zero cloud retention.
              </div>
            </div>
          </div>
        </div>

        {/* 6. ACTION CONTROLS: DOWNLOAD REPORT & ANALYZE ANOTHER IMAGE */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#58615A]">
            Report Reference: <strong className="text-[#202622]">#VF-REP-{Math.floor(Math.random() * 90000 + 10000)}</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Download Report Button */}
            <button
              type="button"
              onClick={handleDownloadReport}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>

            {/* Analyze Another Image Button */}
            <Link
              to="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#FFFFFF] text-[#202622] text-sm font-medium hover:bg-[#E7EEE7]/40 transition-colors border border-[#E5E7E3] cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#58615A]" />
              <span>Analyze Another Image</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
