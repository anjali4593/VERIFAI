import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustStrip from '../components/TrustStrip';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import TechnologySection from '../components/TechnologySection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202622] flex flex-col font-sans selection:bg-[#E7EEE7] selection:text-[#202622]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <FeaturesSection />
        <TechnologySection />
      </main>
      <Footer />
    </div>
  );
}

