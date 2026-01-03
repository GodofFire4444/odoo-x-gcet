import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { AnimatedInput } from '../components/auth/AuthInputs';
import { GradientButton } from '../components/auth/AuthButtons';

const LoginPageEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login redirect
    navigate('/employee/dashboard');
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

        <header style={{ marginBottom: '1rem' }}>
          <h2 className="auth-title text-gradient">Welcome Back</h2>
          <p className="auth-subtitle">Log in to your employee account</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnimatedInput
            label="Work Email"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            icon={<Mail size={18} />}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              style={{
                alignSelf: 'flex-end',
                fontSize: '0.8125rem',
                color: 'var(--primary)',
                fontWeight: 600
              }}
            >
              Forgot Password?
            </button>
          </div>

          <GradientButton type="submit">
            <LogIn size={20} />
            Login Securely
          </GradientButton>
        </form>

        <footer style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Don't have an account? <button onClick={() => navigate('/register/admin')} style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact Admin</button>
          </p>
        </footer>
      </div>
    </AuthLayout>
  );
};

export default LoginPageEmployee;