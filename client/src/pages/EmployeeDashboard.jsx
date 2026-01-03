import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, DollarSign, AlertCircle, TrendingUp, User } from 'lucide-react';
import './dashboard.css';

// Reusable StatCard with animations
const StatCard = ({ title, value, label, icon: Icon, color, delay = 0, children }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
  >
    <div className="stat-header">
      <span>{title}</span>
      <Icon size={20} color={color || 'var(--text-muted)'} />
    </div>
    <div className="stat-value">{value}</div>
    {label && <div className="stat-label" style={{ color }}>{label}</div>}
    {children}
  </motion.div>
);

// Circular Progress for Attendance
const CircularProgress = ({ percentage, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--success)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-text">{percentage}%</div>
    </div>
  );
};

// Progress Bar for Leave Balance
const ProgressBar = ({ used, total, color = 'var(--primary)' }) => {
  const percentage = (used / total) * 100;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <div className="progress-text">{used}/{total} days</div>
    </div>
  );
};

// Timeline Item
const TimelineItem = ({ icon: Icon, text, time, color, delay = 0 }) => (
  <motion.div
    className="timeline-item"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="timeline-line"></div>
    <div className="timeline-icon" style={{ backgroundColor: color }}>
      <Icon size={16} />
    </div>
    <div className="timeline-content">
      <div className="timeline-text">{text}</div>
      <div className="timeline-time">{time}</div>
    </div>
  </motion.div>
);

// Get greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Current date
const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const EmployeeDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
          {getGreeting()}, John!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Here's a quick look at your activity for <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Attendance"
          value="92%"
          label="Present this month"
          icon={CheckCircle}
          color="var(--success)"
          delay={0.1}
        >
          <CircularProgress percentage={92} />
        </StatCard>
        <StatCard
          title="Leave Balance"
          value="12 Days"
          label="Available"
          icon={Calendar}
          color="var(--primary)"
          delay={0.2}
        >
          <ProgressBar used={8} total={20} />
        </StatCard>
        <StatCard
          title="Next Payroll"
          value="Jan 31"
          label="Processing Payment"
          icon={DollarSign}
          color="var(--warning)"
          delay={0.3}
        />
        <StatCard
          title="Hours Logged"
          value="142h"
          label="Target: 160h"
          icon={Clock}
          color="var(--text-muted)"
          delay={0.4}
        >
          <div className="trend-indicator" style={{ marginTop: '0.5rem' }}>
            <TrendingUp size={16} color="var(--success)" />
            <span style={{ color: 'var(--success)' }}>+12%</span> vs last month
          </div>
        </StatCard>
      </div>

      {/* Recent Activity Timeline */}
      <motion.div
        className="timeline-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Recent Activity</h2>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            View All
          </button>
        </div>
        <div className="timeline">
          <TimelineItem
            icon={CheckCircle}
            text="Checked in successfully at Office Headquarters"
            time="Today, 09:02 AM"
            color="var(--success)"
            delay={0.7}
          />
          <TimelineItem
            icon={Calendar}
            text='Leave request "Sick Leave" approved by HR Manager'
            time="Yesterday, 04:30 PM"
            color="var(--warning)"
            delay={0.8}
          />
          <TimelineItem
            icon={DollarSign}
            text="December monthly payroll slip has been generated"
            time="Jan 1, 2026, 10:00 AM"
            color="var(--primary)"
            delay={0.9}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmployeeDashboard;