import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, AlertTriangle, Cpu, Camera, Clock, Info } from 'lucide-react';

export default function MetadataInspector({ specimen, isAltered = false }) {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera', 'software', 'structure', 'hash'

  const metadataGroups = {
    camera: [
      { label: "Camera Make", value: "Canon", status: "VERIFIED" },
      { label: "Camera Model", value: "EOS 5D Mark IV", status: "VERIFIED" },
      { label: "Lens Specification", value: "EF 24-70mm f/2.8L II USM", status: "VERIFIED" },
      { label: "Focal Length", value: "50.0 mm (35mm equivalent: 50mm)", status: "VERIFIED" },
      { label: "Exposure & Aperture", value: "1/250 sec at f/4.0, ISO 200", status: "VERIFIED" },
      { label: "Metering Mode", value: "Multi-segment Evaluative", status: "VERIFIED" },
      { label: "Color Filter Array (CFA)", value: "Bayer Pattern (RGGB standard)", status: "VERIFIED" }
    ],
    software: [
      { 
        label: "Software Encoding Stamp", 
        value: isAltered ? "Adobe Photoshop 2024 (25.1 Macintosh)" : "Canon EOS Firmware Ver 1.3.3", 
        status: isAltered ? "FLAGGED_MODIFIED" : "VERIFIED",
        notice: isAltered ? "Third-party editing signature embedded in XMP packet" : "Original firmware writer intact"
      },
      { 
        label: "XMP History State Count", 
        value: isAltered ? "3 Revision Actions Recorded" : "0 Revisions (Direct Sensor Dump)", 
        status: isAltered ? "FLAGGED_MODIFIED" : "VERIFIED",
        notice: isAltered ? "Multiple save sequences detected" : "Single write cycle confirmed"
      },
      { 
        label: "ICC Color Profile", 
        value: "sRGB IEC61966-2.1 (Embedded Profile)", 
        status: "VERIFIED" 
      },
      { 
        label: "Photometric Interpretation", 
        value: "RGB (Linear Uncalibrated)", 
        status: "VERIFIED" 
      }
    ],
    structure: [
      { label: "Color Space & Bit Depth", value: "24-bit RGB (8 bits per channel)", status: "VERIFIED" },
      { label: "Chroma Subsampling", value: "4:2:2 Subsampled (Standard Camera Pipeline)", status: "VERIFIED" },
      { label: "JPEG Quantization Matrix", value: isAltered ? "Double Quantized (Q1=90, Q2=75)" : "Standard Matrix Q=98", status: isAltered ? "FLAGGED_MODIFIED" : "VERIFIED" },
      { label: "Block Grid Geometry", value: "8×8 Pixel Macroblocks", status: "VERIFIED" },
      { label: "EXIF Thumbnail Parity", value: isAltered ? "Mismatch: Thumbnail lacks edited overlay" : "Parity Confirmed (100% hash match)", status: isAltered ? "FLAGGED_MODIFIED" : "VERIFIED" }
    ],
    hash: [
      { label: "SHA-256 Digest", value: "8e4c7b80a1d3f92688001e8ca8c8ff464fa552d00b991b7852b855e3b0c44298", status: "CRYPTOGRAPHIC_LOCK" },
      { label: "MD5 Checksum", value: "4a2d8e96bf71b0235e12ca0e65c918a3", status: "CRYPTOGRAPHIC_LOCK" },
      { label: "Chain-of-Custody Timestamp", value: new Date().toISOString(), status: "RECORDED" },
      { label: "Evidence Standard", value: "ISO/IEC 27037 Digital Specimen Adherence", status: "COMPLIANT" }
    ]
  };

  const tabs = [
    { id: 'camera', label: 'Camera Hardware', icon: Camera },
    { id: 'software', label: 'Software & Provenance', icon: FileText },
    { id: 'structure', label: 'Lattice & Compression', icon: Cpu },
    { id: 'hash', label: 'Cryptographic Digest', icon: ShieldAlert }
  ];

  const currentRecords = metadataGroups[activeTab];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7E3] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#E5E7E3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#58615A] block mb-1">
            EXIF & STRUCTURAL TELEMETRY
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#202622]">
            Metadata Integrity Audit
          </h3>
        </div>

        {/* Status Chip */}
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 border ${
          isAltered 
            ? 'bg-amber-50 text-amber-900 border-amber-200' 
            : 'bg-[#E7EEE7] text-[#47765B] border-[#47765B]/20'
        }`}>
          {isAltered ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>DISCREPANCY FLAGGED</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#47765B]" />
              <span>ZERO METADATA ANOMALIES</span>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7E3] bg-[#F7F7F2] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#47765B] text-[#47765B] bg-[#FFFFFF] font-bold'
                  : 'border-transparent text-[#58615A] hover:text-[#202622] hover:bg-[#E7EEE7]/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Table of Records */}
      <div className="p-6">
        <div className="divide-y divide-[#E5E7E3]">
          {currentRecords.map((rec, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-[#58615A] block">{rec.label}</span>
                <span className="text-sm font-semibold text-[#202622]">{rec.value}</span>
                {rec.notice && (
                  <p className="text-[11px] text-[#58615A] font-mono mt-0.5">{rec.notice}</p>
                )}
              </div>

              <div className="shrink-0">
                {rec.status === 'FLAGGED_MODIFIED' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[11px] font-mono border border-amber-200">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    <span>FLAGGED</span>
                  </span>
                ) : rec.status === 'CRYPTOGRAPHIC_LOCK' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F7F7F2] text-[#202622] text-[11px] font-mono border border-[#E5E7E3]">
                    <ShieldAlert className="w-3 h-3 text-[#47765B]" />
                    <span>IMMUTABLE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E7EEE7] text-[#47765B] text-[11px] font-mono border border-[#47765B]/20">
                    <CheckCircle2 className="w-3 h-3 text-[#47765B]" />
                    <span>VERIFIED</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#F7F7F2] px-6 py-3 border-t border-[#E5E7E3] text-[11px] font-mono text-[#58615A] flex items-center justify-between">
        <span>EXIF Parsing Standard: JEITA CP-3451D</span>
        <span>Digest Encoding: Base-16 Hexadecimal</span>
      </div>
    </div>
  );
}

