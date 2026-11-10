import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Crosshair, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7E3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#E5E7E3]">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded border border-[#47765B]/30 bg-[#F7F7F2] flex items-center justify-center text-[#47765B]">
                <Crosshair className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-xl font-bold text-[#202622]">
                  VERIFAI
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#58615A] font-medium -mt-1">
                  Digital Image Forensics
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#58615A] leading-relaxed max-w-sm">
              VERIFAI is a digital image forensics platform providing deterministic verification, manipulation detection, and evidence auditing for legal, journalistic, and institutional analysis.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#47765B] bg-[#E7EEE7] px-3 py-1.5 rounded border border-[#47765B]/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Forensic Analysis Suite</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#202622] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#58615A]">
              <li>
                <Link to="/" className="hover:text-[#202622] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="hover:text-[#202622] transition-colors flex items-center gap-1">
                  <span>Analyze Specimen</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/technology"
                  className="hover:text-[#202622] transition-colors"
                >
                  Forensic Technology
                </Link>
              </li>
              <li>
                <Link 
                  to="/about"
                  className="hover:text-[#202622] transition-colors"
                >
                  About Authenticity
                </Link>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => scrollTo('features')} 
                  className="hover:text-[#202622] transition-colors text-left"
                >
                  Features & Capabilities
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#202622] font-bold">
              Forensic Standards
            </h4>
            <div className="p-4 rounded-lg bg-[#F7F7F2] border border-[#E5E7E3] space-y-2 text-xs text-[#58615A]">
              <div className="flex justify-between font-mono">
                <span>SPECIMEN CHAIN:</span>
                <span className="text-[#202622] font-semibold">ISO/IEC 27037</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>DIGEST ALGORITHM:</span>
                <span className="text-[#202622] font-semibold">FIPS 180-4 SHA-256</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>DATA INTEGRITY:</span>
                <span className="text-[#47765B] font-semibold">ZERO-RETENTION AUDIT</span>
              </div>
            </div>
            <p className="text-[11px] text-[#58615A] leading-normal">
              Images analyzed via the platform are processed in ephemeral memory without persistent cloud storage unless explicit archiving is requested.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#58615A] gap-4">
          <p>© {new Date().getFullYear()} VERIFAI Forensics Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>CONFIDENTIAL & FORENSIC USE</span>
            <span className="w-1 h-1 rounded-full bg-[#E5E7E3]"></span>
            <span>BUILD 2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

