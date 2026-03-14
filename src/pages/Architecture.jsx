import React from 'react';
import { portfolioData } from '../data/portfolioData';
import GallerySection, { ScrollingGallery } from '../components/Gallery';

const Architecture = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#111] py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/home/architecture.webp" 
            alt="Architecture Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block h-1 w-12 bg-[#FF6600] mb-4"></div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 uppercase tracking-tight">
            Architecture <span className="text-[#FF6600]">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Commercial and Industrial Model Archives, including stadiums, towers, and site workflow simulations.
          </p>
        </div>
      </section>

      <ScrollingGallery items={portfolioData.architecture} />

      <GallerySection 
        items={portfolioData.architecture} 
        title="Industrial Archives" 
        subtitle="Architecture Division" 
      />
    </div>
  );
};

export default Architecture;
