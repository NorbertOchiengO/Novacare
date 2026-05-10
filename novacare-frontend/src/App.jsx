import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Staff from './pages/staff/StaffPage';

import Dashboard from './pages/dashboard/Dashboard';

// Placeholder components for disabled platforms
const ComingSoon = ({ title }) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>{title} Platform</h1>
    <p>This module is currently disabled. We are working on it!</p>
    <button onClick={() => window.history.back()} style={{ color: '#0072ff', cursor: 'pointer' }}>Go Back</button>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Private Routes */}
      <Route path="/staff" element={< Staff />} />
      

      {/* Active Admin Platform */}
      <Route path="/admin-dashboard" element={<Dashboard />} />

      {/* Disabled Platforms - Ready for later */}
      
      <Route path="/inventory" element={<ComingSoon title="Inventory" />} />

      {/* Navigation Logic */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;