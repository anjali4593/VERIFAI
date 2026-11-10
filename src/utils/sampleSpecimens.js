// Utility providing high-fidelity, self-contained SVG specimens for 1-click forensic testing

const createSvgDataUrl = (svgContent) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent.trim())}`;
};

export const SAMPLE_SPECIMENS = [
  {
    id: 'forged_document',
    name: 'CONTRACT_AMENDMENT_EXHIBIT_A.PNG',
    category: 'Legal Evidentiary Document',
    size: '1.8 MB',
    dimensions: '1800 × 2400 px',
    type: 'image/png',
    verdict: 'manipulated',
    statusTag: 'Spliced Signature',
    description: 'Commercial contract exhibit where an authorization signature was spliced from an external scan.',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="#FFFFFF">
        <rect width="600" height="800" fill="#FBFBF9" stroke="#E5E7E3" stroke-width="2"/>
        
        <!-- Document Header -->
        <rect x="50" y="50" width="120" height="12" rx="3" fill="#47765B"/>
        <rect x="50" y="75" width="280" height="6" rx="2" fill="#58615A" opacity="0.4"/>
        <line x1="50" y1="105" x2="550" y2="105" stroke="#E5E7E3" stroke-width="2"/>
        
        <!-- Legal Paragraph Mock Lines -->
        <g fill="#202622" opacity="0.6">
          <rect x="50" y="130" width="500" height="8" rx="2"/>
          <rect x="50" y="150" width="480" height="8" rx="2"/>
          <rect x="50" y="170" width="460" height="8" rx="2"/>
          <rect x="50" y="190" width="490" height="8" rx="2"/>
          <rect x="50" y="210" width="340" height="8" rx="2"/>

          <rect x="50" y="245" width="500" height="8" rx="2"/>
          <rect x="50" y="265" width="470" height="8" rx="2"/>
          <rect x="50" y="285" width="500" height="8" rx="2"/>
          <rect x="50" y="305" width="420" height="8" rx="2"/>

          <rect x="50" y="340" width="500" height="8" rx="2"/>
          <rect x="50" y="360" width="480" height="8" rx="2"/>
          <rect x="50" y="380" width="450" height="8" rx="2"/>
        </g>

        <!-- Official Seal / Stamp -->
        <circle cx="140" cy="520" r="50" fill="#E7EEE7" stroke="#47765B" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="140" cy="520" r="42" fill="none" stroke="#47765B" stroke-width="1"/>
        <text x="140" y="515" font-family="monospace" font-size="9" fill="#47765B" font-weight="bold" text-anchor="middle">CERTIFIED</text>
        <text x="140" y="530" font-family="monospace" font-size="8" fill="#58615A" text-anchor="middle">OFFICIAL AUDIT</text>

        <!-- Signature Section with Splicing Boundary -->
        <rect x="330" y="460" width="220" height="120" rx="8" fill="#FFFFFF" stroke="#E5E7E3"/>
        <text x="345" y="485" font-family="sans-serif" font-size="11" fill="#58615A">Authorized Signatory:</text>
        <line x1="345" y1="550" x2="530" y2="550" stroke="#202622" stroke-width="1.5"/>

        <!-- Simulated Spliced Signature Curve -->
        <path d="M 360 540 Q 380 500 410 525 T 450 515 T 490 535 T 520 520" fill="none" stroke="#202622" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Compression Artefact Marker (Subtle ELA Discontinuity) -->
        <rect x="340" y="495" width="190" height="50" fill="#47765B" opacity="0.08" stroke="#47765B" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="525" y="505" font-family="monospace" font-size="8" fill="#47765B" text-anchor="end">[SPLICED ZONE]</text>

        <!-- Document Footer -->
        <line x1="50" y1="720" x2="550" y2="720" stroke="#E5E7E3" stroke-width="1"/>
        <text x="50" y="745" font-family="monospace" font-size="10" fill="#58615A">SEC-DOC #9821-EX-A // HASH: 8e4c7b80a1d3f926</text>
        <text x="550" y="745" font-family="monospace" font-size="10" fill="#58615A" text-anchor="end">PAGE 1 OF 1</text>
      </svg>
    `
  },
  {
    id: 'cloned_landscape',
    name: 'PROPERTY_SURVEY_402.JPG',
    category: 'Architectural Real Estate',
    size: '3.4 MB',
    dimensions: '2800 × 1860 px',
    type: 'image/jpeg',
    verdict: 'manipulated',
    statusTag: 'Clone-Stamp Removal',
    description: 'Commercial exterior photograph where structural defects were covered using clone-stamp duplication.',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" viewBox="0 0 800 540" fill="#FFFFFF">
        <rect width="800" height="540" fill="#E7EEE7" opacity="0.3"/>
        
        <!-- Sky & Horizon -->
        <rect width="800" height="280" fill="#F7F7F2"/>
        <line x1="0" y1="280" x2="800" y2="280" stroke="#E5E7E3" stroke-width="2"/>

        <!-- Ground Field -->
        <rect y="280" width="800" height="260" fill="#E7EEE7" opacity="0.5"/>

        <!-- Architectural Structure Mock -->
        <rect x="180" y="120" width="440" height="260" fill="#FFFFFF" stroke="#202622" stroke-width="2" rx="4"/>
        
        <!-- Roofline -->
        <polygon points="160,120 400,40 640,120" fill="#F7F7F2" stroke="#202622" stroke-width="2"/>

        <!-- Window Lattice -->
        <g fill="#F7F7F2" stroke="#58615A" stroke-width="1.5">
          <rect x="220" y="160" width="60" height="80" rx="2"/>
          <rect x="310" y="160" width="60" height="80" rx="2"/>
          <rect x="430" y="160" width="60" height="80" rx="2"/>
          <rect x="520" y="160" width="60" height="80" rx="2"/>

          <rect x="220" y="270" width="60" height="70" rx="2"/>
          <rect x="520" y="270" width="60" height="70" rx="2"/>
        </g>

        <!-- Main Entrance Door -->
        <rect x="360" y="260" width="80" height="120" fill="#47765B" opacity="0.2" stroke="#47765B" stroke-width="2"/>

        <!-- Cloned Window Wall Patch (Simulated Alteration) -->
        <rect x="310" y="270" width="70" height="70" rx="2" fill="#FFFFFF" stroke="#47765B" stroke-width="1.5" stroke-dasharray="4 3"/>
        <circle cx="345" cy="305" r="18" fill="#47765B" opacity="0.15"/>
        <text x="345" y="309" font-family="monospace" font-size="8" fill="#47765B" font-weight="bold" text-anchor="middle">CLONED</text>

        <!-- Telemetry Reticle -->
        <circle cx="345" cy="305" r="32" fill="none" stroke="#47765B" stroke-width="1"/>
        <line x1="345" y1="265" x2="345" y2="345" stroke="#47765B" stroke-width="0.75" stroke-dasharray="2 2"/>
        <line x1="305" y1="305" x2="385" y2="305" stroke="#47765B" stroke-width="0.75" stroke-dasharray="2 2"/>

        <!-- Metadata Header Bar -->
        <rect x="20" y="20" width="760" height="30" rx="4" fill="#FFFFFF" stroke="#E5E7E3"/>
        <text x="40" y="40" font-family="monospace" font-size="11" fill="#202622" font-weight="bold">SPECIMEN #VF-402 // FOCAL: 28MM // ISO 100</text>
        <text x="760" y="40" font-family="monospace" font-size="10" fill="#47765B" font-weight="bold" text-anchor="end">ANOMALY: REPETITIVE TEXTURE</text>
      </svg>
    `
  },
  {
    id: 'pristine_camera',
    name: 'ARCHIVAL_CANON_RAW_091.CR2',
    category: 'Camera Sensor Capture',
    size: '4.2 MB',
    dimensions: '3200 × 2133 px',
    type: 'image/jpeg',
    verdict: 'authentic',
    statusTag: 'Pristine Camera RAW',
    description: 'Pristine photograph captured directly on a full-frame sensor with unbroken metadata and quantization tables.',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" viewBox="0 0 800 540" fill="#FFFFFF">
        <rect width="800" height="540" fill="#F7F7F2"/>
        
        <!-- Sensor Viewfinder Reticle Frame -->
        <rect x="30" y="30" width="740" height="480" rx="8" fill="#FFFFFF" stroke="#202622" stroke-width="1.5"/>

        <!-- Crosshair Corners -->
        <path d="M 50 80 L 50 50 L 80 50" fill="none" stroke="#47765B" stroke-width="2"/>
        <path d="M 750 80 L 750 50 L 720 50" fill="none" stroke="#47765B" stroke-width="2"/>
        <path d="M 50 460 L 50 490 L 80 490" fill="none" stroke="#47765B" stroke-width="2"/>
        <path d="M 750 460 L 750 490 L 720 490" fill="none" stroke="#47765B" stroke-width="2"/>

        <!-- Center Focus Reticle -->
        <circle cx="400" cy="270" r="45" fill="none" stroke="#47765B" stroke-width="1.5"/>
        <circle cx="400" cy="270" r="3" fill="#47765B"/>
        <line x1="380" y1="270" x2="350" y2="270" stroke="#47765B" stroke-width="1"/>
        <line x1="420" y1="270" x2="450" y2="270" stroke="#47765B" stroke-width="1"/>
        <line x1="400" y1="250" x2="400" y2="220" stroke="#47765B" stroke-width="1"/>
        <line x1="400" y1="290" x2="400" y2="320" stroke="#47765B" stroke-width="1"/>

        <!-- Subtle Landscape Composition -->
        <path d="M 100 420 Q 250 320 400 370 T 700 340 L 700 480 L 100 480 Z" fill="#E7EEE7" opacity="0.6"/>
        <circle cx="620" cy="160" r="35" fill="#E7EEE7" opacity="0.8"/>

        <!-- Optical Telemetry Badges -->
        <rect x="50" y="445" width="280" height="30" rx="4" fill="#F7F7F2" stroke="#E5E7E3"/>
        <text x="65" y="465" font-family="monospace" font-size="11" fill="#202622" font-weight="bold">1/500s • f/2.8 • ISO 100 • 50mm</text>

        <rect x="530" y="445" width="220" height="30" rx="4" fill="#E7EEE7" stroke="#47765B" stroke-width="1"/>
        <text x="640" y="465" font-family="monospace" font-size="11" fill="#47765B" font-weight="bold" text-anchor="middle">SENSOR CFA: MONOLITHIC</text>

        <!-- Viewfinder HUD -->
        <text x="400" y="80" font-family="monospace" font-size="12" fill="#58615A" text-anchor="middle">CANON EOS 5D MK IV // NATIVE BITSTREAM</text>
      </svg>
    `
  }
];

export const getSpecimenWithPreview = (specimen) => {
  return {
    ...specimen,
    previewUrl: createSvgDataUrl(specimen.svg)
  };
};

