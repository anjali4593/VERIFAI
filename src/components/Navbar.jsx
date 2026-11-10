import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Crosshair, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F2]/95 backdrop-blur-sm border-b border-[#E5E7E3]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded border border-[#47765B]/30 bg-[#FFFFFF] flex items-center justify-center text-[#47765B] shadow-sm group-hover:border-[#47765B] transition-colors">
            <Crosshair className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-xl font-bold text-[#202622]">
              VERIFAI
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#58615A] font-medium -mt-1">
              Image Forensics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#58615A]">
          <Link 
            to="/" 
            className="hover:text-[#202622] transition-colors py-1"
          >
            Home
          </Link>
          <Link 
            to="/analyze" 
            className="hover:text-[#202622] transition-colors py-1 flex items-center gap-1"
          >
            Analyze
            <span className="w-1.5 h-1.5 rounded-full bg-[#47765B]"></span>
          </Link>
          <Link 
            to="/technology" 
            className="hover:text-[#202622] transition-colors py-1"
          >
            Technology
          </Link>
          <Link 
            to="/about" 
            className="hover:text-[#202622] transition-colors py-1"
          >
            About
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-all duration-200 shadow-sm border border-[#385F48]"
          >
            <span>Start Investigation</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#202622] hover:bg-[#E7EEE7] rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E5E7E3] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#202622]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#47765B]"
            >
              Home
            </Link>
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#47765B] flex items-center justify-between"
            >
              <span>Analyze</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#E7EEE7] text-[#47765B] font-semibold">Active Tool</span>
            </Link>
            <Link
              to="/technology"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#47765B]"
            >
              Technology
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#47765B]"
            >
              About
            </Link>
          </div>
          <div className="pt-4 border-t border-[#E5E7E3]">
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#47765B] text-[#FFFFFF] text-sm font-medium hover:bg-[#385F48] transition-colors"
            >
              <span>Start Investigation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

