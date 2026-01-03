import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { AnimatedInput } from '../components/auth/AuthInputs';
import { GradientButton } from '../components/auth/AuthButtons';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    // Simulate sending email
    setIsSent(true);
  };

  return (
    <AuthLayout>
      <div className="auth-card glass green-glow">
        <button
          onClick={() => navigate('/login/employee')}
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
          <ArrowLeft size={16} /> Back to Login
        </button>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="request"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <header>
                <h2 className="auth-title text-gradient">Forgot Password?</h2>
                <p className="auth-subtitle">No worries, we'll send you recovery instructions.</p>
              </header>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <AnimatedInput
                  label="Registered Email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  error={error}
                  icon={<Mail size={18} />}
                />

                <GradientButton type="submit">
                  <Send size={20} />
                  Send Reset Link
                </GradientButton>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
            >
              <div className="logo-icon-wrapper" style={{ marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle2 size={40} color="var(--primary)" />
              </div>
              <h2 className="auth-title text-gradient">Email Sent</h2>
              <p className="auth-subtitle">Check your inbox for the link to reset your password.</p>

              <button
                onClick={() => navigate('/login/employee')}
                style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '1rem' }}
              >
                Back to Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
