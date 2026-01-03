import React from 'react';
import { Users, UserCheck, Calendar, DollarSign, Activity } from 'lucide-react';
import MetricCard from '../../components/common/MetricCard';
import { mockKPIs, recentActivity } from '../../data/mockAdminData';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* KPI Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <MetricCard 
                    title="Total Employees" 
                    value={mockKPIs.totalEmployees} 
                    icon={Users} 
                    trend="+12%"
                    color="var(--primary)"
                />
                <MetricCard 
                    title="Present Today" 
                    value={mockKPIs.presentToday} 
                    icon={UserCheck} 
                    trend="+5%"
                    color="var(--success)"
                />
                <MetricCard 
                    title="Leave Requests" 
                    value={mockKPIs.leaveRequests} 
                    icon={Calendar} 
                    trend="-2%"
                    color="var(--warning)"
                />
                <MetricCard 
                    title="Payroll Processed" 
                    value={`${mockKPIs.payrollProcessed}%`} 
                    icon={DollarSign} 
                    trend="+100%"
                    color="#6366f1"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Charts Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                        backgroundColor: 'var(--surface)', 
                        padding: '1.5rem', 
                        borderRadius: 'var(--radius-lg)', 
                        border: '1px solid var(--border)' 
                    }}
                >
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Attendance Overview</h2>
                    <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem' }}>
                        {/* Dummy Bar Chart */}
                        {[65, 78, 90, 85, 92, 88, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ 
                                    width: '100%', 
                                    height: `${h}%`, 
                                    backgroundColor: 'var(--primary)', 
                                    opacity: 0.8,
                                    borderRadius: '4px 4px 0 0',
                                    transition: 'height 0.5s ease'
                                }}></div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ 
                        backgroundColor: 'var(--surface)', 
                        padding: '1.5rem', 
                        borderRadius: 'var(--radius-lg)', 
                        border: '1px solid var(--border)' 
                    }}
                >
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Recent Activity</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {recentActivity.map((activity, index) => (
                            <div key={activity.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                                {/* Timeline Line */}
                                {index !== recentActivity.length - 1 && (
                                    <div style={{ 
                                        position: 'absolute', 
                                        left: '19px', 
                                        top: '40px', 
                                        bottom: '-24px', 
                                        width: '2px', 
                                        backgroundColor: 'var(--border)' 
                                    }}></div>
                                )}
                                
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'var(--surface-hover)',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Activity size={18} color="var(--primary)" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-main)' }}>
                                        {activity.message}
                                    </p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {activity.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
