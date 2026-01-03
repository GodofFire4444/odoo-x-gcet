import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Lock, Phone, Image as ImageIcon, CheckCircle2, ArrowLeft } from 'lucide-react';
import { adminSignup } from '../api/auth';
import AuthLayout from '../components/auth/AuthLayout';
import { AnimatedInput, ImageUpload } from '../components/auth/AuthInputs';
import { GradientButton } from '../components/auth/AuthButtons';

const RegistrationAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    companyLogo: null
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
    if (!formData.adminName) newErrors.adminName = "Name is required";
    if (!formData.companyName) newErrors.companyName = "Company is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await adminSignup({
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password
      });

      navigate('/login/admin');

    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'Registration failed' });
    }
  };

  return (
    <AuthLayout wide>
      <div className="auth-card glass green-glow">
        <button
          onClick={() => navigate('/')}
          className="back-btn"
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
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
          <h2 className="auth-title text-gradient">Register Admin</h2>
          <p className="auth-subtitle">Set up your organization on Dayflow</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <ImageUpload
            label="Company Logo"
            name="companyLogo"
            onChange={handleInputChange}
            error={errors.companyLogo}
            icon={<ImageIcon size={24} />}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <AnimatedInput
              label="Admin Name"
              name="adminName"
              placeholder="John Doe"
              value={formData.adminName}
              onChange={handleInputChange}
              error={errors.adminName}
              icon={<User size={18} />}
            />
            <AnimatedInput
              label="Company Name"
              name="companyName"
              placeholder="Acme Corp"
              value={formData.companyName}
              onChange={handleInputChange}
              error={errors.companyName}
              icon={<Building2 size={18} />}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
            <AnimatedInput
              label="Work Email"
              name="email"
              type="email"
              placeholder="admin@company.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon={<Mail size={18} />}
            />
            <AnimatedInput
              label="Phone Number"
              name="phoneNumber"
              placeholder="+1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
              icon={<Phone size={18} />}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
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
            <AnimatedInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              icon={<Lock size={18} />}
            />
          </div>

          <GradientButton type="submit" style={{ marginTop: '0.5rem' }}>
            <CheckCircle2 size={20} />
            Create Organization
          </GradientButton>
        </form>

        <footer>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Already have an account? <button onClick={() => navigate('/login/employee')} style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</button>
          </p>
        </footer>
      </div>
    </AuthLayout>
  );
};

export default RegistrationAdmin;
