import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileImage, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw, 
  Trash2, 
  FileCheck, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SAMPLE_SPECIMENS, getSpecimenWithPreview } from '../utils/sampleSpecimens';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function AnalyzePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState(null);

  const handleSelectSpecimen = (sample) => {
    const item = getSpecimenWithPreview(sample);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile({
      name: item.name,
      size: 2.4 * 1024 * 1024,
      type: item.type,
      verdict: item.verdict,
    });
    setPreviewUrl(item.previewUrl);
    setSelectedSampleId(item.id);
    setDimensions({ width: 1920, height: 1080 });
    setErrorMessage('');
  };

  // Clean up Object URL on unmount or replace
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateAndProcessFile = (selectedFile) => {
    setErrorMessage('');

    if (!selectedFile) return;

    // Validate type
    const isTypeValid = ALLOWED_TYPES.includes(selectedFile.type) || 
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);
    
    if (!isTypeValid) {
      setErrorMessage('Unsupported file format. Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate size
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setErrorMessage(`File exceeds 10 MB limit (${sizeMB} MB). Please upload a smaller image.`);
      return;
    }

    // Generate preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(objectUrl);

    // Read image dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      setDimensions(null);
    };
    img.src = objectUrl;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      validateAndProcessFile(selected);
    }
    // reset input value so re-selecting same file triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndProcessFile(droppedFile);
    }
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setSelectedSampleId(null);
    setDimensions(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReplace = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const handleAnalyze = () => {
    if (!file || !previewUrl) return;

    setIsAnalyzing(true);

    const imagePayload = {
      name: file.name,
      size: formatFileSize(file.size),
      dimensions: dimensions ? `${dimensions.width} × ${dimensions.height} px` : '1920 × 1080 px',
      type: file.type || 'image/jpeg',
      lastModified: file.lastModified ? new Date(file.lastModified).toISOString() : new Date().toISOString(),
      previewUrl: previewUrl,
      verdict: file.verdict || 'manipulated',
    };

    // Store in sessionStorage as fallback
    try {
      sessionStorage.setItem('verifai_specimen', JSON.stringify({
        name: imagePayload.name,
        size: imagePayload.size,
        dimensions: imagePayload.dimensions,
        type: imagePayload.type,
      }));
    } catch {
      // Ignore storage errors if quota is exceeded
    }

    // Simulate 2-second forensic processing pipeline
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/results', { state: { specimen: imagePayload } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#58615A] hover:text-[#202622] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
          <span className="text-xs font-mono text-[#47765B] bg-[#E7EEE7] px-3 py-1 rounded border border-[#47765B]/20">
            SECURE WORKSPACE
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono uppercase tracking-wider mb-3 border border-[#47765B]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
            <span>FORENSIC INTAKE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202622] tracking-tight mb-3">
            Image Investigation
          </h1>
          <p className="text-base sm:text-lg text-[#58615A] leading-relaxed">
            Upload an image to begin a digital forensic examination.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <strong className="font-semibold block mb-0.5">Validation Notice</strong>
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage('')}
              className="text-xs font-medium text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* LEFT SECTION – IMAGE UPLOAD */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E3] mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#58615A]">
                SPECIMEN ACQUISITION
              </span>
              <span className="text-xs font-mono text-[#47765B] font-semibold">
                {file ? "SPECIMEN LOADED" : "AWAITING INPUT"}
              </span>
            </div>

            {!file ? (
              /* Drag-and-drop Upload Area */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleReplace}
                className={`border-2 border-dashed rounded-xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                  isDragging 
                    ? 'border-[#47765B] bg-[#E7EEE7]/40' 
                    : 'border-[#E5E7E3] bg-[#F7F7F2]/60 hover:bg-[#E7EEE7]/20 hover:border-[#47765B]/60'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[#E7EEE7] text-[#47765B] flex items-center justify-center mb-5 border border-[#47765B]/20">
                  <UploadCloud className="w-8 h-8 stroke-[1.75]" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#202622] mb-1.5">
                  Drop your image here
                </h3>
                <p className="text-sm text-[#58615A] mb-6 max-w-sm">
                  or select an exhibit from your local filesystem for forensic review
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplace();
                  }}
                  className="px-6 py-2.5 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors shadow-sm"
                >
                  Browse Files
                </button>

                <div className="mt-8 pt-6 border-t border-[#E5E7E3] w-full flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-[#58615A]">
                  <span>Formats: JPG, JPEG, PNG, WEBP</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Maximum file size: 10 MB</span>
                </div>
              </div>
            ) : (
              /* Uploaded Image Preview & Metadata */
              <div className="space-y-6">
                {/* Visual Image Preview */}
                <div className="relative rounded-xl border border-[#E5E7E3] bg-[#F7F7F2] overflow-hidden flex items-center justify-center min-h-[300px] max-h-[440px]">
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="max-h-[400px] max-w-full object-contain mx-auto"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 text-[#202622] text-[11px] font-mono px-2.5 py-1 rounded border border-[#E5E7E3] shadow-xs">
                    ACTIVE PREVIEW
                  </div>
                </div>

                {/* File Details Bar */}
                <div className="bg-[#F7F7F2] rounded-xl border border-[#E5E7E3] p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E7EEE7] flex items-center justify-center text-[#47765B] shrink-0 border border-[#47765B]/20">
                      <FileImage className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#202622] truncate">
                        {file.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#58615A] mt-0.5">
                        <span>Size: <strong className="text-[#202622]">{formatFileSize(file.size)}</strong></span>
                        <span>•</span>
                        <span>
                          Dimensions: <strong className="text-[#202622]">
                            {dimensions ? `${dimensions.width} × ${dimensions.height} px` : 'Reading dimensions...'}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions: Replace / Remove Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleReplace}
                    className="px-4 py-2 rounded-md border border-[#E5E7E3] bg-[#FFFFFF] text-xs font-medium text-[#202622] hover:bg-[#E7EEE7]/40 transition-colors cursor-pointer"
                  >
                    Replace Image
                  </button>

                  <button
                    type="button"
                    onClick={handleRemove}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}

            {/* 1-Click Pre-Calibrated Forensic Specimen Gallery */}
            <div className="mt-8 pt-6 border-t border-[#E5E7E3]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#58615A] uppercase font-bold tracking-wider">
                  Or load pre-calibrated test exhibits (1-Click):
                </span>
                <span className="text-[10px] font-mono text-[#47765B] bg-[#E7EEE7] px-2 py-0.5 rounded font-semibold">
                  INSTANT SCAN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_SPECIMENS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSpecimen(sample)}
                    className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                      selectedSampleId === sample.id
                        ? 'border-[#47765B] bg-[#E7EEE7]/40 shadow-xs ring-1 ring-[#47765B]'
                        : 'border-[#E5E7E3] bg-[#F7F7F2] hover:bg-[#E7EEE7]/20 hover:border-[#47765B]/50'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#47765B] block mb-1">
                        {sample.statusTag.toUpperCase()}
                      </span>
                      <h5 className="text-xs font-bold text-[#202622] truncate" title={sample.name}>
                        {sample.name}
                      </h5>
                      <p className="text-[10px] text-[#58615A] line-clamp-2 mt-1 leading-snug">
                        {sample.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#E5E7E3]/60 flex items-center justify-between text-[9px] font-mono text-[#58615A]">
                      <span>{sample.dimensions}</span>
                      <span className="text-[#47765B] font-semibold">
                        {selectedSampleId === sample.id ? "SELECTED ✓" : "LOAD →"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION – INVESTIGATION DETAILS */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-xs font-mono uppercase mb-3">
                <span>SYSTEM SPECIFICATION</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#202622] mb-2">
                Investigation Overview
              </h2>
              <p className="text-sm text-[#58615A] leading-relaxed">
                The VERIFAI platform examines digital image integrity through a non-destructive mathematical audit, verifying whether the underlying pixel lattice and compression structures are authentic or modified.
              </p>
            </div>

            {/* Three Stages of Examination */}
            <div className="space-y-4 pt-4 border-t border-[#E5E7E3]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block">
                Analysis Pipeline Stages
              </span>

              {/* Stage 1 */}
              <div className="p-4 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#47765B]">STAGE 01</span>
                  <span className="text-[10px] font-mono text-[#58615A]">HASH VERIFICATION</span>
                </div>
                <h4 className="text-sm font-bold text-[#202622]">Image Acquisition</h4>
                <p className="text-xs text-[#58615A] leading-relaxed">
                  Extracts binary bitstream, computes SHA-256 fingerprint, and preserves EXIF/XMP metadata structure.
                </p>
              </div>

              {/* Stage 2 */}
              <div className="p-4 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#47765B]">STAGE 02</span>
                  <span className="text-[10px] font-mono text-[#58615A]">SPECTRAL NORM</span>
                </div>
                <h4 className="text-sm font-bold text-[#202622]">Image Preprocessing</h4>
                <p className="text-xs text-[#58615A] leading-relaxed">
                  Calculates Discrete Cosine Transform (DCT) coefficients, color-channel matrices, and noise-floor baseline.
                </p>
              </div>

              {/* Stage 3 */}
              <div className="p-4 rounded-xl bg-[#F7F7F2] border border-[#E5E7E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#47765B]">STAGE 03</span>
                  <span className="text-[10px] font-mono text-[#58615A]">ERROR MAPPING</span>
                </div>
                <h4 className="text-sm font-bold text-[#202622]">Forensic Examination</h4>
                <p className="text-xs text-[#58615A] leading-relaxed">
                  Executes Error Level Analysis (ELA), CFA demosaicing check, and pixel disparity mapping to isolate spliced regions.
                </p>
              </div>
            </div>

            {/* Supported Formats Information Section */}
            <div className="pt-4 border-t border-[#E5E7E3] bg-[#F7F7F2] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 rounded-b-2xl space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#58615A] font-semibold block">
                Supported Formats & Constraints
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#58615A]">
                <div>
                  <span className="block text-[10px] text-[#58615A]/70">SUPPORTED TYPES</span>
                  <span className="text-[#202622] font-semibold">JPG, JPEG, PNG, WEBP</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#58615A]/70">MAXIMUM FILE SIZE</span>
                  <span className="text-[#202622] font-semibold">10 MB Per Exhibit</span>
                </div>
              </div>
              <p className="text-[11px] text-[#58615A] pt-2 border-t border-[#E5E7E3]">
                Zero-Retention: Specimen data is processed in local volatile memory and is never permanently archived.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: ANALYZE IMAGE BUTTON & RESET */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#58615A]">
            {file ? (
              <span className="flex items-center gap-2 text-[#47765B] font-medium font-mono text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ready for forensic execution: {file.name}</span>
              </span>
            ) : (
              <span className="text-xs font-mono text-[#58615A]">
                Please upload an image specimen before initiating examination.
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {file && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={isAnalyzing}
                className="px-5 py-3 rounded-md text-sm font-medium text-[#58615A] hover:text-[#202622] hover:bg-[#F7F7F2] transition-colors border border-[#E5E7E3] cursor-pointer"
              >
                Reset
              </button>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-md text-sm font-medium transition-all duration-200 shadow-sm border ${
                !file || isAnalyzing
                  ? 'bg-[#E5E7E3] text-[#58615A]/60 border-[#E5E7E3] cursor-not-allowed'
                  : 'bg-[#47765B] text-[#FFFFFF] border-[#385F48] hover:bg-[#385F48] cursor-pointer'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FFFFFF]" />
                  <span>Processing Forensic Pipeline...</span>
                </>
              ) : (
                <>
                  <span>Analyze Image</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
