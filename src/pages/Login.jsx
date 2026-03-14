import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bg-[#0f0f0f] min-h-screen flex flex-col font-sans">
      <div className="bg-[#111] text-gray-400 py-2 border-b border-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="flex items-center space-x-6">
            <a href="mailto:info@innovativemodels.com" className="hover:text-[#FF6600] transition-colors flex items-center gap-2">
              <i className="fas fa-envelope text-[#FF6600]"></i>
              <span>info@innovativemodels.com</span>
            </a>
            <a href="tel:+15551234567" className="hover:text-[#FF6600] transition-colors flex items-center gap-2">
              <i className="fas fa-phone text-[#FF6600]"></i>
              <span>+91 78923-00726</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-wider mr-2">Follow Us:</span>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative overflow-hidden p-6" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <i className="fas fa-cog absolute -left-40 top-1/2 -translate-y-1/2 text-[400px] text-[#1a1a1a]/40 animate-spin" style={{ animationDuration: '100s' }}></i>
          <i className="fas fa-cog absolute -right-40 bottom-0 text-[300px] text-[#1a1a1a]/30 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}></i>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 group">
              <div className="text-[#FF6600] text-5xl group-hover:rotate-180 transition-transform duration-700">
                <i className="fas fa-cog"></i>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white text-3xl font-bold tracking-wider leading-none font-heading">INNOVATIVE</span>
                <span className="text-gray-400 text-[10px] tracking-[0.4em] uppercase leading-none mt-1">Model Designers</span>
              </div>
            </div>
          </div>

          <div className="border border-[#2d2d2d] shadow-2xl rounded-sm overflow-hidden" style={{ background: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(10px)' }}>
            <div className="bg-[#2d2d2d]/50 px-8 py-4 border-b border-[#2d2d2d] flex justify-between items-center">
              <h2 className="text-white font-bold uppercase tracking-widest text-lg font-heading">{isSignUp ? 'Create Account' : 'Secure Access'}</h2>
              <span className="text-[10px] text-[#FF6600] font-bold uppercase tracking-tighter">Encrypted Connection</span>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider rounded-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleGoogleLogin} 
                disabled={loading}
                className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm rounded-sm transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                <span>{loading ? 'Processing...' : 'Continue with Google'}</span>
              </button>

              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-[#2d2d2d]"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-[10px] uppercase font-bold tracking-widest">Or using email</span>
                <div className="flex-grow border-t border-[#2d2d2d]"></div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FF6600] transition-colors">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <input 
                      type="email" 
                      placeholder="john.doe@company.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                      className="w-full bg-[#0f0f0f] border border-[#2d2d2d] text-white text-sm py-3 pl-10 pr-4 focus:outline-none focus:border-[#FF6600] transition-colors rounded-sm" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Password</label>
                    {!isSignUp && <a href="#" className="text-[#FF6600] text-[10px] uppercase font-bold hover:underline">Forgot?</a>}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#FF6600] transition-colors">
                      <i className="fas fa-lock"></i>
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                      className="w-full bg-[#0f0f0f] border border-[#2d2d2d] text-white text-sm py-3 pl-10 pr-4 focus:outline-none focus:border-[#FF6600] transition-colors rounded-sm" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold py-4 px-4 rounded-sm transition-all transform active:scale-[0.98] shadow-lg shadow-[#FF6600]/20 uppercase tracking-[0.2em] text-xs disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Authenticate')}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#2d2d2d] text-center">
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">
                  {isSignUp ? 'Already have an account?' : 'Need a secure account?'}
                </p>
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white hover:text-[#FF6600] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  {isSignUp ? 'Sign In Now' : 'Request Access / Sign Up'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center items-center gap-6">
            <div className="flex items-center gap-2 grayscale opacity-50">
              <i className="fas fa-shield-alt text-gray-500"></i>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">NIST Compliant</span>
            </div>
            <div className="flex items-center gap-2 grayscale opacity-50">
              <i className="fas fa-user-secret text-gray-500"></i>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Level 4 Clearance Required</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0f0f0f] border-t border-[#2d2d2d] py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">
            © 2024 Innovative Model Designers • All Activity Monitored & Logged
          </p>
          <div className="flex justify-center space-x-6 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            <a href="#" className="hover:text-[#FF6600] transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-[#FF6600] transition-colors">Security Protocol</a>
            <a href="#" className="hover:text-[#FF6600] transition-colors">Support Desk</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
