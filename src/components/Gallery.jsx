import React, { useState } from 'react';

export const Lightbox = ({ item, onClose }) => {
  if (!item) return null;

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 transition-all duration-300 animate-in fade-in select-none"
      onClick={onClose}
      onContextMenu={handleContextMenu}
    >
      <button 
        className="absolute top-6 right-6 text-white text-3xl hover:text-[#FF6600] transition-colors z-[110]"
        onClick={onClose}
      >
        <i className="fas fa-times"></i>
      </button>

      <div 
        className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group overflow-hidden rounded-sm shadow-2xl border border-white/10 bg-black">
          {item.type === 'video' ? (
            <video 
              src={item.image} 
              className="max-w-full max-h-[80vh] object-contain pointer-events-auto"
              controls
              autoPlay
              onContextMenu={handleContextMenu}
              controlsList="nodownload"
            />
          ) : (
            <img 
              src={item.image} 
              alt={item.title} 
              className="max-w-full max-h-[80vh] object-contain pointer-events-none"
              onContextMenu={handleContextMenu}
              draggable="false"
            />
          )}
          
          {/* Dynamic Watermark Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-40 pointer-events-none select-none">
            <div className="w-10 h-10 rounded-full border border-white/30 p-1 bg-black/20 backdrop-blur-sm">
              <img src="/media/home/Logo.png" alt="IMD Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-white text-[10px] font-bold tracking-widest uppercase">IMD</span>
              <span className="text-gray-400 text-[6px] tracking-tighter uppercase">Innovative Model Designers</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center max-w-3xl">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wider">{item.title}</h3>
          <p className="text-[#FF6600] text-[10px] uppercase font-bold tracking-[0.3em] mt-2">© Innovative Model Designers • All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export const ScrollingGallery = ({ items }) => {
  const imageOnlyItems = items.filter(item => item.type !== 'video');
  
  if (imageOnlyItems.length === 0) return null;

  // We ensure exactly 20 items for a consistent animation speed across all categories
  // regardless of how many original photos each category has.
  const totalDisplayItems = 20;
  const repeatedItems = [];
  for (let i = 0; i < totalDisplayItems; i++) {
    repeatedItems.push(imageOnlyItems[i % imageOnlyItems.length]);
  }

  return (
    <div className="w-full bg-[#1a1a1a] overflow-hidden border-y border-gray-800 py-8 relative">
       <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
       <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>
       
      <div className="flex gap-8 px-4 animate-scroll-left-fixed w-max">
        {/* We double the array to ensure seamless looping */}
        {[...repeatedItems, ...repeatedItems].map((item, index) => (
          <div key={index} className="w-[400px] h-[250px] relative rounded-sm overflow-hidden group shadow-2xl flex-shrink-0 cursor-default">
            <img 
              src={item.image} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
              alt={item.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 z-20">
              <span className="text-white font-heading font-bold uppercase tracking-widest text-lg drop-shadow-lg">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes scroll-left-fixed {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left-fixed {
            animation: scroll-left-fixed 60s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export const ProjectCard = ({ item, onClick }) => {
  const isVideo = item.type === 'video';
  return (
    <div 
      className="group relative bg-white shadow-xl overflow-hidden border-b-4 border-[#FF6600] cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      onClick={() => onClick(item)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={item.image} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={item.title} 
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-[2px]">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {isVideo ? (
              <div className="w-16 h-16 rounded-full border-2 border-[#FF6600] flex items-center justify-center text-white bg-[#FF6600]/20 shadow-lg shadow-[#FF6600]/20">
                <i className="fas fa-play ml-1 text-2xl"></i>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-white/10 shadow-lg">
                <i className="fas fa-search-plus text-2xl"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-heading font-bold uppercase text-gray-900 tracking-tight leading-tight">{item.title}</h4>
          <span className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-widest rounded-sm ${isVideo ? 'bg-[#FF6600] text-white shadow-md shadow-[#FF6600]/20' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
            {isVideo ? 'Video' : 'Image'}
          </span>
        </div>
      </div>
    </div>
  );
};

const GallerySection = ({ items, title, subtitle }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = activeFilter === 'all' 
    ? items 
    : items.filter(i => i.type === activeFilter);

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b-2 border-gray-200 pb-8 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-[#FF6600] font-bold uppercase tracking-widest text-sm mb-2">{subtitle}</h3>
              <h2 className="text-4xl font-heading font-bold text-[#1a1a1a] uppercase tracking-tight">{title}</h2>
            </div>
            <div className="flex bg-white p-1 rounded-sm shadow-sm border border-gray-200">
              {['all', 'video', 'image'].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)} 
                  className={`px-8 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm ${
                    activeFilter === filter 
                      ? 'bg-[#1a1a1a] text-white shadow-md' 
                      : 'text-gray-500 hover:text-[#FF6600]'
                  }`}
                >
                  {filter === 'all' ? 'All Assets' : filter === 'video' ? 'Videos' : 'Photos'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((item) => (
              <ProjectCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-sm border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-heading text-xl uppercase tracking-widest">No assets found for this filter</p>
            </div>
          )}
        </div>
      </section>

      <Lightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
};

export default GallerySection;
