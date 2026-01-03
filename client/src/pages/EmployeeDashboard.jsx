import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import './dashboard.css';

const StatCard = ({ title, value, label, icon: Icon, color }) => (
  <div className="stat-card">
    <div className="stat-header">
      {title}
      <Icon size={20} color={color || 'var(--text-muted)'} />
    </div>
    <div className="stat-value">{value}</div>
    {label && <div className="stat-label" style={{ color: color }}>{label}</div>}
  </div>
);

const EmployeeDashboard = () => {
  return (
    <div>
      <div className="stats-grid">
        <StatCard
          title="Attendance"
          value="92%"
          label="Present this month"
          icon={CheckCircle}
          color="var(--success)"
        />
        <StatCard
          title="Leave Balance"
          value="12 Days"
          label="Available"
          icon={Calendar}
          color="var(--primary)"
        />
        <StatCard
          title="Next Payroll"
          value="Jan 31"
          label="Estimated"
          icon={DollarSign}
          color="var(--warning)"
        />
        <StatCard
          title="Hours Logged"
          value="142h"
          label="This month"
          icon={Clock}
          color="var(--text-muted)"
        />
      </div>

      <h2 className="section-title">Recent Activity</h2>
      <div className="recent-activity-list">
        <div className="activity-item">
          <div className="activity-icon">
            <CheckCircle size={20} />
          </div>
          <div className="activity-content">
            <div className="activity-text">Checked in at 09:02 AM</div>
            <div className="activity-time">Today</div>
          </div>
        </div>
        <div className="activity-item">
          <div className="activity-icon" style={{ color: 'var(--warning)' }}>
            <Calendar size={20} />
          </div>
          <div className="activity-content">
            <div className="activity-text">Leave request approved: Sick Leave</div>
            <div className="activity-time">Yesterday</div>
          </div>
        </div>
        <div className="activity-item">
          <div className="activity-icon" style={{ color: 'var(--success)' }}>
            <DollarSign size={20} />
          </div>
          <div className="activity-content">
            <div className="activity-text">Salary credited for December</div>
            <div className="activity-time">Jan 1, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;