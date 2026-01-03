import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCircle2, Rocket } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { GradientButton, SecondaryButton } from '../components/auth/AuthButtons';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="auth-card glass green-glow">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="brand-section"
        >
          <div className="logo-icon-wrapper">
            <Rocket size={48} className="primary-icon" />
          </div>
          <h1 className="auth-title text-gradient">Dayflow</h1>
          <p className="auth-subtitle">Every workday, perfectly aligned.</p>
        </motion.div>

        <motion.div
          className="action-group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <GradientButton onClick={() => navigate('/login/employee')}>
            <UserCircle2 size={20} />
            Employee Login
          </GradientButton>

          <SecondaryButton onClick={() => navigate('/register/admin')}>
            <ShieldCheck size={20} />
            Admin Registration
          </SecondaryButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
          className="auth-footer-text"
          style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}
        >
          Secure workforce management for modern teams.
        </motion.p>
      </div>
    </AuthLayout>
  );
};

export default LandingPage;