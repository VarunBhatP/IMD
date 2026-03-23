import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Army from './pages/Army.jsx';
import Airforce from './pages/Airforce.jsx';
import Navy from './pages/Navy.jsx';
import Architecture from './pages/Architecture.jsx';
import Login from './pages/Login.jsx';
import { useAuth } from './context/AuthContext.jsx';
import ScrollToTop from "./ScrollToTop";
import { allPortfolioItems } from './data/portfolioData';
import GallerySection from './components/Gallery';



const customStyles = {
  clipSlantRight: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)'
  },
  clipSlantLeft: {
    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
  },
  bgPattern: {
    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  },
  spinAnimation: {
    animation: 'spin 60s linear infinite'
  }
};

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'font-heading font-bold uppercase tracking-widest transition-all duration-300';
  const variants = {
    primary: 'px-8 py-4 bg-[#FF6600] hover:bg-[#e65c00] text-white shadow-lg',
    secondary: 'px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white hover:text-black hover:border-white text-white',
    dark: 'px-10 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ServiceCard = ({ icon, title, description, link, borderColor = 'border-[#FF6600]' }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className={`bg-white p-8 shadow-xl border-t-4 ${borderColor} group hover:-translate-y-2 transition-transform duration-300 cursor-pointer`}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#FF6600] group-hover:text-white transition-colors duration-300 text-gray-700">
        <i className={`${icon} text-3xl`}></i>
      </div>
      <h3 className="text-2xl font-heading font-bold text-gray-800 mb-3 group-hover:text-[#FF6600] transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
      <div className="inline-flex items-center text-xs font-bold text-[#FF6600] uppercase tracking-widest hover:text-black transition-colors">
        Explore {title.split(' ')[0]} <i className="fas fa-long-arrow-alt-right ml-2"></i>
      </div>
    </div>
  );
};

const PortfolioItem = ({ image, category, title, link, colSpan = '', rowSpan = '' }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => link && navigate(link)}
      className={`${colSpan} ${rowSpan} group relative overflow-hidden bg-black cursor-pointer rounded-sm shadow-lg`}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
      
      {/* Watermark Overlay for Home Page Grid */}
       <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
         <div className="w-8 h-8 rounded-full border border-white/20 p-1 bg-black/10">
           <img src="/media/home/Logo.png" alt="IMD Logo" className="w-full h-full object-contain" />
         </div>
       </div>

      <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="px-2 py-1 bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">{category}</span>
        <h4 className="text-2xl font-heading font-bold text-white uppercase">{title}</h4>
      </div>
    </div>
  );
};

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="p-2">
      <i className={`${icon} text-white/80 text-3xl mb-4`}></i>
      <div className="text-4xl font-heading font-bold text-white mb-2">{number}</div>
      <div className="text-white/80 uppercase text-xs tracking-widest font-medium">{label}</div>
    </div>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div className="bg-[#111] text-white py-2 border-b border-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-auto sm:h-10">
          <div className="flex flex-wrap justify-between items-center w-full gap-y-2">
            <a href="mailto:Babunr95@gmail.com" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-sm font-bold">
              <i className="fas fa-envelope text-[#FF6600]"></i>
              <span>Babunr95@gmail.com</span>
            </a>
            <a href="mailto:innovativemodeldesigners@gmail.com" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-sm font-bold">
              <i className="fas fa-envelope text-[#FF6600]"></i>
              <span>innovativemodeldesigners@gmail.com</span>
            </a>
            <a href="tel:+918123380090" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-sm font-bold">
              <i className="fas fa-phone text-[#FF6600]"></i>
              <span>+91 81233-80090</span>
            </a>
            <a href="tel:+917892300726" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-sm font-bold">
              <i className="fas fa-phone text-[#FF6600]"></i>
              <span>+91 78923-00726</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-[#1a1a1a] sticky top-0 z-50 shadow-2xl border-b-4 border-[#FF6600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                <img 
                  src="/media/home/Logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>

            <div className="flex flex-col justify-center">
            <span className="text-white font-bold text-3xl tracking-wide" style={{ fontFamily: "Times New Roman, serif" }}>
            INNOVATIVE MODEL DESIGNERS
            </span>
          </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="px-5 py-2 text-white font-heading font-medium tracking-wide text-sm uppercase hover:text-[#FF6600] transition-colors">Home</Link>
              <Link to="/about" className="px-5 py-2 text-white font-heading font-medium tracking-wide text-sm uppercase hover:text-[#FF6600] transition-colors">About</Link>
              
              <div className="relative group h-full flex items-center">
                <Link to="/services" className="px-5 py-2 text-white font-heading font-medium tracking-wide text-sm uppercase group-hover:text-[#FF6600] transition-colors flex items-center gap-1">
                  Services <i className="fas fa-chevron-down text-[10px] ml-1"></i>
                </Link>
                
                <div className="absolute top-full left-0 w-48 bg-[#222] shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border-t-2 border-[#FF6600]">
                  <Link to="/services/army" className="block px-4 py-3 text-sm text-white hover:bg-[#333] hover:text-[#FF6600] transition-colors border-b border-gray-800">Army & Land</Link>
                  <Link to="/services/navy" className="block px-4 py-3 text-sm text-white hover:bg-[#333] hover:text-[#FF6600] transition-colors border-b border-gray-800">Navy & Maritime</Link>
                  <Link to="/services/aerospace" className="block px-4 py-3 text-sm text-white hover:bg-[#333] hover:text-[#FF6600] transition-colors">Aerospace</Link>
                  <Link to="/architecture" className="block px-4 py-3 text-sm text-white hover:bg-[#333] hover:text-[#FF6600] transition-colors">Achitecture</Link>
                </div>
              </div>

              <Link to="/portfolio" className="px-5 py-2 text-white font-heading font-medium tracking-wide text-sm uppercase hover:text-[#FF6600] transition-colors">Portfolio</Link>
              {!user && (
                <Link to="/login" className="px-5 py-2 text-white font-heading font-medium tracking-wide text-sm uppercase hover:text-[#FF6600] transition-colors">Login</Link>
              )}
              {!!user && (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="ml-2 w-9 h-9 rounded-full bg-[#FF6600] text-white font-heading font-bold uppercase flex items-center justify-center overflow-hidden border border-white/20 hover:border-[#FF6600] transition-colors"
                    aria-label="Profile"
                  >
                    {user?.photoURL && !imgError ? (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      user?.email?.[0]?.toUpperCase() || 'U'
                    )}
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#222] text-gray-200 rounded-sm shadow-xl border border-[#333] z-[60]">
                      <div className="px-4 py-3 border-b border-[#333]">
                        <p className="text-[10px] uppercase tracking-widest text-[#FF6600] font-bold">Authenticated User</p>
                        <p className="text-xs truncate font-medium mt-1">{user.displayName || user.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-[#333] transition-colors flex items-center gap-2"
                      >
                        <i className="fas fa-sign-out-alt text-gray-500"></i>
                        <span>Logout Session</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Link to="/quote" className="ml-4 px-6 py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-heading font-bold uppercase tracking-wider text-sm rounded transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2"
              >
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-400 pt-20 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-cog text-[#FF6600] text-3xl"></i>
              <span className="text-white font-heading font-bold tracking-widest text-xl">IMD</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              Leading the industry in military and industrial scale models. Serving defense contractors, government agencies, and museums worldwide since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-[#FF6600] w-10 h-10 rounded-sm flex items-center justify-center text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="bg-gray-800 hover:bg-[#FF6600] w-10 h-10 rounded-sm flex items-center justify-center text-white transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="bg-gray-800 hover:bg-[#FF6600] w-10 h-10 rounded-sm flex items-center justify-center text-white transition-colors"><i className="fab fa-twitter"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-widest mb-6 text-sm border-l-2 border-[#FF6600] pl-3">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Our Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Project Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-widest mb-6 text-sm border-l-2 border-[#FF6600] pl-3">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/army" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Army & Land Systems</Link></li>
              <li><Link to="/services/navy" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Navy & Maritime</Link></li>
              <li><Link to="/services/aerospace" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Airforce & Aerospace</Link></li>
              <li><Link to="/architecture" className="hover:text-[#FF6600] transition-colors flex items-center"><i className="fas fa-chevron-right text-xs mr-2 text-gray-700"></i> Architecture Models</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-widest mb-6 text-sm border-l-2 border-[#FF6600] pl-3">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#FF6600] mr-3 mt-1"></i>
                <span>
                #95, 1st Main Road, 4th Cross
                MSJ Layout, Near BMTC Bus Garage, Dasana Pura Post,
                Bangalore - 562123, Karnataka, India</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-[#FF6600] mr-3"></i>
                <span>+91 81233-80090 ,  +91 78923-00726</span>
                
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[#FF6600] mr-3"></i>
                <span>innovativemodeldesigners@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[#FF6600] mr-3"></i>
                <span>Babunr95@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p className="mb-4 md:mb-0">
            © 2026 Innovative Model Designers. All Rights Reserved. Developed by <a href="https://portfolio-varunbhatp.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[#FF6600] hover:underline font-bold">Varun Bhat P</a>
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  return (
    <>
      <header className="relative w-full h-[575px] bg-black overflow-hidden">
        {/* Large High-Contrast Spinning Gear Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
          <i className="fas fa-cog absolute -left-40 -top-40 text-[650px] text-white/10 animate-spin" style={{ animationDuration: '30s' }}></i>
          <i className="fas fa-cog absolute -right-60 -bottom-60 text-[550px] text-[#FF6600]/10 animate-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }}></i>
        </div>

        <div className="absolute inset-0 z-10">
          <img 
            src="/media/airforce/15.jpeg" 
            alt="Detailed Tank Model" 
            className="w-full h-full object-cover opacity-300 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 bg-[#FF6600]/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 border-l-4 border-white">
              Official Defense Contractor
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight uppercase drop-shadow-lg">
              Precision Scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-yellow-500">Models For Defense</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-light border-l-2 border-gray-600 pl-6">
              Delivering high-fidelity technical replicas and engineering prototypes for military applications. We bridge the gap between concept and reality with unmatched detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/portfolio')}
                className="px-8 py-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-heading font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
              >
                View Portfolio
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white hover:text-black hover:border-white text-white font-heading font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Scroll Down</span>
          <i className="fas fa-chevron-down text-[#FF6600]"></i>
        </div>
      </header>

      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            icon="fas fa-shield-alt"
            title="ARMY & LAND"
            description="Tactical terrain boards, vehicle prototypes, and base infrastructure layouts designed for strategic assessment and operational training."
            link="/services/army"
          />
          <ServiceCard 
            icon="fas fa-ship"
            title="NAVY & MARINE"
            description="Detailed vessel replicas, dockyard schematics, and hydrodynamic test models for naval engineering and fleet display."
            link="/services/navy"
            borderColor="border-gray-800"
          />
          <ServiceCard 
            icon="fas fa-fighter-jet"
            title="AIRFORCE & SPACE"
            description="Wind tunnel test models, aircraft identification replicas, and airfield logistics models for aviation development."
            link="/services/aerospace"
            borderColor="border-gray-800"
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Visible Dark Gears for Content Section */}
        <i className="fas fa-cog absolute -left-40 top-10 text-[500px] text-gray-500/40 animate-spin" style={{ animationDuration: '50s' }}></i>
        <i className="fas fa-cog absolute -right-40 bottom-10 text-[400px] text-gray-200/20 animate-spin" style={{ animationDuration: '70s', animationDirection: 'reverse' }}></i>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-1 w-12 bg-[#FF6600]"></div>
                <span className="text-[#FF6600] font-bold uppercase tracking-widest text-sm">Our Expertise</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 uppercase leading-tight">
                World-Class Engineering <br />Scale Models
              </h2>
              <p className="text-xl text-gray-500 font-light italic mb-8">"Detail is not just a feature, it is the mission."</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Innovative Model Designers has provided the defense sector with high-precision scale models used for training, simulation, and strategic planning. Our team combines traditional craftsmanship with advanced 3D printing and CNC machining.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether it's a cross-sectional submarine model or a topographic airbase layout, our commitment to accuracy is unwavering. We utilize secure data handling for classified projects.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-[#FF6600] text-xl"></i>
                  <span className="text-gray-700">Defense-grade confidentiality</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-[#FF6600] text-xl"></i>
                  <span className="text-gray-700">Precision down to sub-millimeter</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-[#FF6600] text-xl"></i>
                  <span className="text-gray-700">Advanced prototyping techniques</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-[#FF6600] text-xl"></i>
                  <span className="text-gray-700">Museum-grade finishes</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="dark" onClick={() => navigate('/portfolio')}>
                  Explore Gallery
                </Button>
                <Button variant="primary" onClick={() => navigate('/quote')}>
                  Request a Quote
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-rows-2 gap-4">
                <PortfolioItem 
                  image="/media/army/53.jpeg" 
                  category="Army"
                  title="Main Battle Tank Model Designers in Bengaluru"
                  link="/services/army"
                />
                <PortfolioItem 
                  image="/media/architecture/4.jpeg" 
                  category="Industrial"
                  title="Communication System Model Designers in Bangalore"
                  link="/architecture"
                />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <PortfolioItem 
                  image="/media/airforce/16.jpeg" 
                  category="Aerospace"
                  title="Aircraft Prototype Models Bengaluru"
                  link="/services/aerospace"
                />
                <PortfolioItem 
                  image="/media/navy/1.jpeg" 
                  category="Naval"
                  title="Submarine Cutaway Model Makers Bangalore"
                  link="/services/navy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ 
          backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:border-[#FF6600]/30 transition-all duration-500 rounded-sm">
              <i className="fas fa-microchip text-[#FF6600] text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform"></i>
              <h4 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-2">Technical Precision</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">Advanced Engineering & CAD Integration</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:border-[#FF6600]/30 transition-all duration-500 rounded-sm">
              <i className="fas fa-user-shield text-[#FF6600] text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform"></i>
              <h4 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-2">Classified Protocol</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">Secure Data Handling & Confidentiality</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:border-[#FF6600]/30 transition-all duration-500 rounded-sm">
              <i className="fas fa-layer-group text-[#FF6600] text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform"></i>
              <h4 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-2">Material Science</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">High-Fidelity Composite Fabrication</p>
            </div>
            <div className="bg-[#1a1a1a] border border-white/5 p-8 text-center group hover:border-[#FF6600]/30 transition-all duration-500 rounded-sm">
              <i className="fas fa-vial text-[#FF6600] text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform"></i>
              <h4 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-2">Rapid Prototyping</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">Iterative Design & Testing Cycles</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 text-center mb-12">
            <div>
              <h2 className="text-5xl font-heading font-bold text-black uppercase mb-2">Our Clients</h2>
              <p className="text-gray-500 text-sm">Our models are trusted by contractors, agencies, and museums worldwide.</p>
            </div>
          </div>
          
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-16 animate-scroll-left w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16 items-center">
                  <img src="/media/home/BEL.jpg" alt="BEL" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/DRDO.jpg" alt="DRDO" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/HAL.jpg" alt="HAL" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/ISRO.jpg" alt="ISRO" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/OFB.jpg" alt="OFB" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/ABB.png" alt="ABB" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/ARM.png" alt="ARM" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/AV.png" alt="AV" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/BDL.png" alt="BDL" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/BEML1.jpg" alt="Beml" className="w-40 h-40 object-contain transition-all duration-300" />
                  <img src="/media/home/CMM.png" alt="CMM" className="w-40 h-40 object-contain transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              
              <h2 className="text-5xl font-heading font-bold text-black uppercase mb-2">Precision Engineering</h2>
              <p className="text-gray-500 text-sm">From concept to display, we deliver exceptional craftsmanship.</p>
           </div>
            <div className="flex gap-4">
              <Button variant="dark" onClick={() => navigate('/quote')}>
                Start Project
              </Button>
              <Button variant="primary" onClick={() => navigate('/contact')}>
                Contact Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1a] text-white py-40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/home/about.jpeg" 
            alt="About Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">About IMD</h1>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6 uppercase">
    Innovative Model Designers
  </h2>

  <p className="text-gray-600 leading-relaxed mb-6">
    Innovative Model Designers (IMD) is dedicated to providing manufacturers with static and working scale-down engineering models. Our team of highly skilled and semi-skilled workers, engineers, and technicians forms the backbone of our organization, ensuring every project is completed with precision and within the expected time.
  </p>

  <p className="text-gray-600 leading-relaxed mb-6">
    Every new invention and development in model design is readily adapted to fulfill our customers' needs. Our excellence in workmanship and prompt service has earned us clients across the nation, helping bring innovative engineering ideas into reality through detailed models.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex items-center gap-3">
      <i className="fas fa-check-circle text-[#FF6600]"></i>
      Skilled designers and technicians
    </div>

    <div className="flex items-center gap-3">
      <i className="fas fa-check-circle text-[#FF6600]"></i>
      High-quality engineering models
    </div>

    <div className="flex items-center gap-3">
      <i className="fas fa-check-circle text-[#FF6600]"></i>
      Cost-effective project solutions
    </div>

    <div className="flex items-center gap-3">
      <i className="fas fa-check-circle text-[#FF6600]"></i>
      Timely delivery without compromising quality
    </div>
  </div>
</div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/media/airforce/20.jpeg" alt="Precision 3D Scale Models" className="rounded-sm shadow-lg" />
            <img src="/media/army/31.jpeg" alt="Military Engineering Prototyping" className="rounded-sm shadow-lg" />
            <img src="/media/army/2.jpeg" alt="Industrial Model Design Workshop" className="rounded-sm shadow-lg" />
            <img src="/media/navy/3.jpeg" alt="Naval Vessel Scale Models" className="rounded-sm shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1a] text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/home/fighter.jpg" 
            alt="Services Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">Our Services</h1>
          <p className="text-gray-400 text-lg">Comprehensive Solutions for Defense Modeling</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            icon="fas fa-shield-alt"
            title="ARMY & LAND"
            description="Tactical terrain boards, vehicle prototypes, and base infrastructure layouts designed for strategic assessment and operational training."
            link="/services/army"
          />
          <ServiceCard 
            icon="fas fa-ship"
            title="NAVY & MARINE"
            description="Detailed vessel replicas, dockyard schematics, and hydrodynamic test models for naval engineering and fleet display."
            link="/services/navy"
          />
          <ServiceCard 
            icon="fas fa-fighter-jet"
            title="AIRFORCE & SPACE"
            description="Wind tunnel test models, aircraft identification replicas, and airfield logistics models for aviation development."
            link="/services/aerospace"
          />
          <ServiceCard 
            icon="fas fa-building"
            title="ARCHITECTURE"
            description="Architectural concept models, stadiums, towers and site workflow simulations."
            link="/architecture"
          />
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1a] text-white py-40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/airforce/16.jpeg" 
            alt="Portfolio Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">Project Gallery</h1>
          <p className="text-gray-400 text-lg">Archives of our technical assets and prototypes</p>
        </div>
      </div>
      
      <GallerySection 
        items={allPortfolioItems} 
        title="Project Archives" 
        subtitle="Technical Assets" 
      />
    </div>
  );
};

const QuotePage = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Replace with your EmailJS service details
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Debugging: Check if variables are loaded (look in F12 console)
    console.log("EmailJS Debug:", {
      serviceId: !!SERVICE_ID,
      adminTemplateId: !!ADMIN_TEMPLATE_ID,
      userTemplateId: !!USER_TEMPLATE_ID,
      publicKey: !!PUBLIC_KEY
    });

    if (!SERVICE_ID || !PUBLIC_KEY) {
      setError("EmailJS Configuration is missing in .env file.");
      setLoading(false);
      return;
    }

    // Send Admin Notification
    const sendAdmin = emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE_ID, formRef.current, PUBLIC_KEY);
    
    // Send Auto-Reply to User (only if USER_TEMPLATE_ID is provided)
    const sendUser = USER_TEMPLATE_ID 
      ? emailjs.sendForm(SERVICE_ID, USER_TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      : Promise.resolve();

    Promise.all([sendAdmin, sendUser])
      .then((results) => {
          console.log("Both emails sent successfully:", results);
          setSuccess(true);
          formRef.current.reset();
      })
      .catch((err) => {
          // This will log exactly what is wrong in your browser console (F12)
          console.error("Detailed Email Error:", err);
          const errorMsg = err?.text || err?.message || 'Check your Template IDs and Public Key.';
          setError(`Failed to send: ${errorMsg}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1a] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/home/contact1.webp" 
            alt="Quote Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-heading font-bold uppercase mb-4">Get A Quote</h1>
          <p className="text-gray-400 text-lg">Partner with us for your next precision modeling project</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-5xl font-heading font-bold text-gray-900 mb-8 uppercase tracking-tight">Contact US</h2>
            
            {success && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-sm flex items-center gap-3">
                <i className="fas fa-check-circle text-xl"></i>
                <p className="font-bold uppercase tracking-widest text-sm">Message Sent Successfully! We'll get back to you shortly.</p>
              </div>
            )}

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm flex items-center gap-3">
                <i className="fas fa-exclamation-circle text-xl"></i>
                <p className="font-bold uppercase tracking-widest text-sm">{error}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hidden field for the {{time}} tag in your template */}
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              
              <div>
                <label className="block text-xs font-bold text-gray-5000 uppercase tracking-widest mb-2">Name</label>
                <input 
                  type="text" 
                  name="user_name" 
                  onChange={(e) => {
                    // This ensures both {{name}} and {{user_name}} work in your template
                    const val = e.target.value;
                    formRef.current.name.value = val;
                  }}
                  required 
                  className="w-full border-b-2 border-gray-200 bg-gray-50 p-4 focus:outline-none focus:border-[#FF6600] transition-colors" 
                  placeholder="Your Name" 
                />
                <input type="hidden" name="name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-5000 uppercase tracking-widest mb-2">Email</label>
                <input type="email" name="user_email" required className="w-full border-b-2 border-gray-200 bg-gray-50 p-4 focus:outline-none focus:border-[#FF6600] transition-colors" placeholder="your@email.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-5000 uppercase tracking-widest mb-2">Description of Message</label>
                <textarea name="message" rows="6" required className="w-full border-b-2 border-gray-200 bg-gray-50 p-4 focus:outline-none focus:border-[#FF6600] transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-4 bg-[#FF6600] hover:bg-[#e65c00] text-white font-heading font-bold uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-heading font-bold text-gray-900 mb-6 uppercase border-l-4 border-[#FF6600] pl-4">Our Location</h3>
              <a 
                href="https://maps.app.goo.gl/2CQuH3kbTw9j6Cn47"
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative overflow-hidden rounded-sm shadow-xl"
              >
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=12.9985,77.5385&zoom=15&size=600x400&scale=2&maptype=roadmap&markers=color:red%7C12.9985,77.5385&key=YOUR_API_KEY_HERE" 
                  alt="Location Map" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-widest text-gray-900 shadow-lg">
                    Open in Google Maps
                  </div>
                </div>
              </a>
              <div className="mt-6 text-gray-600 text-sm space-y-2 leading-relaxed">
                <p className="font-bold text-gray-900">Office Address</p>
                <p>#171, 2nd Main Road,</p>
                <p>Vijayanandha Nagar, Nandini Layout,</p>
                <p>Bangalore - 560096, Karnataka, India</p>
                <p className="font-bold text-gray-900">Manufacturing Unit Address</p>
                <p>#95, 1st Main Road, 4th Cross</p>
                <p>MSJ Layout, Near BMTC Bus Garage, Dasana Pura Post,</p>
                <p>Bangalore - 562123, Karnataka, India</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-heading font-bold text-gray-900 mb-6 uppercase border-l-4 border-[#FF6600] pl-4">Office Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Monday - Friday</span>
                  <span className="font-bold text-gray-900">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Saturday</span>
                  <span className="font-bold text-gray-900">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="text-[#FF6600] font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <QuotePage />
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');
      
      body { 
        font-family: 'Roboto', sans-serif; 
      }
      
      h1, h2, h3, h4, h5, h6, .font-heading {
        font-family: 'Oswald', sans-serif;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontAwesome);
    };
  }, []);

  return (
  <Router basename="/">
    <ScrollToTop />
    <div className="bg-white text-zinc-800 w-full min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services/army" element={<Army />} />
          <Route path="/services/navy" element={<Navy />} />
          <Route path="/services/aerospace" element={<Airforce />} />
          <Route path="/architecture" element={<Architecture />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);
};

export default App;
