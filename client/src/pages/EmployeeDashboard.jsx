import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';
import './dashboard.css';
import { getMyProfile } from '../api/employee';
import { getMyPayroll } from '../api/payroll';

const StatCard = ({ title, value, icon: IconComponent, color, children, label, trend }) => (
  <div className="stat-card">
    <div className="stat-header">
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
      <IconComponent size={20} color={color || 'var(--text-muted)'} />
    </div>
    <div className="stat-value">{value}</div>
    {children}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {label && <div className="stat-label" style={{ color: color }}>{label}</div>}
      {trend && (
        <div className="trend-indicator" style={{ color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
          {trend}
        </div>
      )}
    </div>
  </div>
);

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await getMyProfile();
        setEmployee(empData);
        // const payrollData = await getMyPayroll(); // Assuming this endpoint exists or will be implemented
        // setPayroll(payrollData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ color: 'var(--text-main)', textAlign: 'center', marginTop: '2rem' }}>Loading dashboard...</div>;

  return (
    <div className="dashboard-wrapper">
      <header style={{ marginBottom: '2rem' }}>
         <h1 className="text-2xl font-bold text-white">Welcome back, {employee?.firstName || 'Employee'}</h1>
         <p className="text-gray-400">Here's what's happening today.</p>
      </header>

      <div className="stats-grid">
        <StatCard
          title="Attendance"
          value="92%"
          label="Present this month"
          icon={CheckCircle}
          color="var(--success)"
        >
          <div className="circular-progress">
            <svg width="60" height="60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="var(--surface-hover)" strokeWidth="5" />
              <circle cx="30" cy="30" r="25" fill="none" stroke="var(--success)" strokeWidth="5"
                strokeDasharray="157" strokeDashoffset="12.5" strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
            </svg>
            <span className="progress-text">92%</span>
          </div>
        </StatCard>

        <StatCard
          title="Leave Balance"
          value={`${employee?.leaveBalance || 0} Days`}
          label="Available"
          icon={Calendar}
          color="var(--primary)"
        >
          <div className="progress-bar-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '60%', backgroundColor: 'var(--primary)' }}></div>
            </div>
            <div className="progress-text">{employee?.leaveBalance || 0}/20 Days</div>
          </div>
        </StatCard>

        <StatCard
          title="Next Payroll"
          value="Jan 31"
          label="Estimated"
          icon={DollarSign}
          color="var(--warning)"
          trend="+4.1%"
        />

        <StatCard
          title="Hours Logged"
          value="142h"
          label="Goal: 160h"
          icon={Clock}
          color="var(--text-main)"
        >
          <div className="progress-bar-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '88%', backgroundColor: 'var(--text-main)' }}></div>
            </div>
            <div className="progress-text">88% of target</div>
          </div>
        </StatCard>
      </div>

      <section className="timeline-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div className="timeline-icon" style={{ backgroundColor: 'var(--primary)' }}>
              <Clock size={20} />
            </div>
            <div className="timeline-content">
              <div className="timeline-text">Checked in at 09:02 AM</div>
              <div className="timeline-time">Today</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div className="timeline-icon" style={{ backgroundColor: 'var(--success)' }}>
              <CheckCircle size={20} />
            </div>
            <div className="timeline-content">
              <div className="timeline-text">Leave request approved: Sick Leave</div>
              <div className="timeline-time">Yesterday</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div className="timeline-icon" style={{ backgroundColor: 'var(--warning)' }}>
              <AlertCircle size={20} />
            </div>
            <div className="timeline-content">
              <div className="timeline-text">Reminder: Weekly Team Meeting</div>
              <div className="timeline-time">2 hours ago</div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div className="timeline-icon" style={{ backgroundColor: '#6366f1' }}>
              <DollarSign size={20} />
            </div>
            <div className="timeline-content">
              <div className="timeline-text">Salary credited for December</div>
              <div className="timeline-time">Jan 1, 2026</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDashboard;