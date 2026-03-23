import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Background Technical Grid & Scanning Effect */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FF6600] animate-scan-line"></div>
      </div>

      <div className="bg-[#111]/80 backdrop-blur-md text-gray-400 py-2 border-b border-gray-800 text-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-8">
          <div className="flex items-center space-x-6 mb-2 sm:mb-0">
            <a href="mailto:Babunr95@gmail.com" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-[11px] uppercase tracking-tighter">
              <i className="fas fa-envelope text-[#FF6600]"></i>
              <span>Babunr95@gmail.com</span>
            </a>
            <a href="tel:+918123380090" className="hover:text-[#FF6600] transition-colors flex items-center gap-2 text-[11px] uppercase tracking-tighter">
              <i className="fas fa-phone text-[#FF6600]"></i>
              <span>+91 81233-80090</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] uppercase tracking-[0.2em] mr-2 opacity-50">Secure Communication Line</span>
          </div>
        </div>
      </div>

      <div className="flex-grow relative z-10 flex items-center justify-center p-4 sm:p-8">
        {/* Large Decorative Gears - Fixed to ensure they don't shift layout */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <i className="fas fa-cog absolute -left-40 -top-40 text-[600px] text-[#FF6600]/5 animate-spin" style={{ animationDuration: '80s' }}></i>
          <i className="fas fa-cog absolute -right-40 -bottom-40 text-[500px] text-white/5 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }}></i>
        </div>

        <div className="w-full max-w-md relative">
          {/* Main Access Portal */}
          <div className="bg-[#111] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm p-1">
            <div className="border border-white/10 p-10 relative overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF6600]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF6600]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FF6600]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF6600]"></div>

              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#FF6600]/30 p-2 bg-black shadow-[0_0_30px_rgba(255,102,0,0.15)] group transition-all duration-700 hover:scale-110">
                    <img 
                      src="/media/home/Logo.png" 
                      alt="IMD Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h2 className="text-white font-heading font-bold text-4xl uppercase tracking-tighter mb-2">
                  Secure <span className="text-[#FF6600]">Access</span>
                </h2>
                <div className="h-1 w-20 bg-[#FF6600] mx-auto mb-4"></div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-bold">Innovative Model Designers</p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-500/5 border-l-4 border-red-500 text-red-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-3">
                  <i className="fas fa-exclamation-triangle text-lg"></i>
                  {error}
                </div>
              )}

              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-gray-400 text-xs font-medium mb-8 leading-relaxed max-w-sm mx-auto">
                    Welcome to the IMD Technical Portal. To view classified archives and request secure quotes, please verify your identity using your authorized Google account.
                  </p>
                  
                  <button 
                    onClick={handleGoogleLogin} 
                    disabled={loading}
                    className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm rounded-sm transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    <span>{loading ? 'Processing...' : 'Continue with Google'}</span>
                  </button>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-[#FF6600]/60">
                    <i className="fas fa-lock text-[10px]"></i>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">End-to-End Encrypted Authentication</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0a0a0a] border-t border-white/5 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold mb-4">
            © 2026 Innovative Model Designers • Defense Procurement Division
          </p>
          <div className="flex justify-center space-x-8 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-[#FF6600]"></i> SSL SECURED</span>
            <span className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-[#FF6600]"></i> AES-256</span>
            <span className="flex items-center gap-2"><i className="fas fa-circle text-[6px] text-[#FF6600]"></i> PRIVACY COMPLIANT</span>
          </div>
        </div>
      </footer>

      <style>
        {`
          @keyframes scan-line {
            0% { transform: translateY(-100vh); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .animate-scan-line {
            animation: scan-line 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
