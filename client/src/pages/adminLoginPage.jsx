import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { API_BASE } from '../api';
import AuthLayout from '../components/auth/AuthLayout';
import { AnimatedInput } from '../components/auth/AuthInputs';
import { GradientButton } from '../components/auth/AuthButtons';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ form: data.error || 'Login failed' });
        return;
      }
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrors({ form: 'Network error' });
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card glass green-glow">
        <button
          onClick={() => navigate('/')}
          className="back-btn"
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <header>
          <h2 className="auth-title text-gradient">Admin Portal</h2>
          <p className="auth-subtitle">Log in to your organization dashboard</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnimatedInput
            label="Company Name"
            name="companyName"
            placeholder="Acme Corp"
            value={formData.companyName}
            onChange={handleInputChange}
            error={errors.companyName}
            icon={<Building2 size={18} />}
          />

          <AnimatedInput
            label="Admin Email"
            name="email"
            type="email"
            placeholder="admin@company.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            icon={<Mail size={18} />}
          />

          <AnimatedInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            icon={<Lock size={18} />}
          />

          <GradientButton type="submit" style={{ marginTop: '0.5rem' }}>
            <ShieldCheck size={20} />
            Login as Admin
          </GradientButton>
        </form>

        <footer>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Need a new organization? <button onClick={() => navigate('/register/admin')} style={{ color: 'var(--primary)', fontWeight: 600 }}>Register Now</button>
          </p>
        </footer>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
