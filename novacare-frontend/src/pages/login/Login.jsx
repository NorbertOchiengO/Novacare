import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import docImage from '../../assets/doc.png';
import logo from '../../assets/logo.png';
import { signIn } from '../../api/axios'; 

const Login = () => {
  const [role, setRole] = useState('staff'); // Default role
  const [identifier, setIdentifier] = useState(''); // Email or Staff ID
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // We send 'email' as the key to the backend, but it holds either ID or Email
      const { data } = await signIn({ email: identifier, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userName', data.user.name);

      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard'); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid Credentials";
      alert(errorMsg);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 }}>
      <div style={{ width: '1000px', maxWidth: '95vw', minHeight: '550px', background: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', boxShadow: '0 30px 80px rgba(0,100,255,0.25)', position: 'relative' }}>

        {/* Left Panel - Form */}
        <div style={{ width: '45%', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px' }}>
              <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#0a1f44' }}>NovaCare</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#0a1f44', marginBottom: '10px', textAlign: 'center' }}>Sign In</h2>
          
          {/* Role Switcher */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
            <button 
              onClick={() => setRole('staff')}
              style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.3s', background: role === 'staff' ? 'white' : 'transparent', color: role === 'staff' ? '#0072ff' : '#64748b', boxShadow: role === 'staff' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
            >Staff Login</button>
            <button 
              onClick={() => setRole('admin')}
              style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.3s', background: role === 'admin' ? 'white' : 'transparent', color: role === 'admin' ? '#0072ff' : '#64748b', boxShadow: role === 'admin' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
            >Admin Login</button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type={role === 'admin' ? 'email' : 'text'}
              placeholder={role === 'admin' ? "Work Email / Admin ID" : "Employee Staff ID"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8faff', outline: 'none' }}
            />
            
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '13px 44px 13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8faff', outline: 'none' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ accentColor: '#0072ff' }} />
                Keep me logged in
              </label>
              <a href="#" style={{ fontSize: '13px', color: '#0072ff', textDecoration: 'none', fontWeight: '500' }}>Need help?</a>
            </div>

            <button type="submit"
              style={{ marginTop: '10px', width: '100%', padding: '14px', background: 'linear-gradient(90deg, #0072ff, #00c6ff)', color: 'white', border: 'none', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,114,255,0.35)' }}>
              Sign In to NovaCare
            </button>
          </form>
        </div>

        {/* Right Panel */}
        <div style={{ width: '55%', position: 'relative', background: 'linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, transparent 40%, #0072ff 40%)', opacity: 0.12 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <svg width="280" height="300" viewBox="0 0 260 280">
              <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.85" />
                </linearGradient>
                <clipPath id="hexClip">
                  <polygon points="130,10 240,72.5 240,197.5 130,260 20,197.5 20,72.5" />
                </clipPath>
              </defs>
              <polygon points="130,10 240,72.5 240,197.5 130,260 20,197.5 20,72.5" fill="url(#hexGrad)" />
              <foreignObject x="20" y="10" width="220" height="250" clipPath="url(#hexClip)">
                <img src={docImage} alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;