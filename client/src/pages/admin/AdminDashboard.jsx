import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, DollarSign, Activity } from 'lucide-react';
import MetricCard from '../../components/common/MetricCard';
import { motion } from 'framer-motion';
import { getAllEmployees, getAllLeaves } from '../../api/admin';
import { getAllAttendance } from '../../api/attendance';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        leaveRequests: 0,
        payrollProcessed: 92
    });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [employees, attendance, leaves] = await Promise.all([
                    getAllEmployees(),
                    getAllAttendance(),
                    getAllLeaves()
                ]);

                const today = new Date().toLocaleDateString();
                const present = attendance.filter(a => new Date(a.date).toLocaleDateString() === today && a.checkIn).length;
                const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;

                setStats({
                    totalEmployees: employees.length,
                    presentToday: present,
                    leaveRequests: pendingLeaves,
                    payrollProcessed: 92
                });

                const newActivities = [];
                employees.forEach(e => newActivities.push({
                    id: `emp-${e._id}`,
                    message: `New employee ${e.firstName} joined`,
                    time: new Date(e.createdAt).toLocaleDateString(),
                    date: new Date(e.createdAt)
                }));
                leaves.forEach(l => newActivities.push({
                    id: `leave-${l._id}`,
                    message: `Leave request from ${l.employeeId ? l.employeeId.firstName : 'Unknown'} (${l.status})`,
                    time: new Date(l.createdAt).toLocaleDateString(),
                    date: new Date(l.createdAt)
                }));

                const sorted = newActivities.sort((a, b) => b.date - a.date).slice(0, 5);
                setActivities(sorted);

            } catch (error) {
                console.error("Error fetching dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* KPI Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <MetricCard
                    title="Total Employees"
                    value={stats.totalEmployees}
                    icon={Users}
                    trend="+12%"
                    color="var(--primary)"
                />
                <MetricCard
                    title="Present Today"
                    value={stats.presentToday}
                    icon={UserCheck}
                    trend="+5%"
                    color="var(--success)"
                />
                <MetricCard
                    title="Leave Requests"
                    value={stats.leaveRequests}
                    icon={Calendar}
                    trend="-2%"
                    color="var(--warning)"
                />
                <MetricCard
                    title="Payroll Processed"
                    value={`${stats.payrollProcessed}%`}
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
                        {activities.map((activity, index) => (
                            <div key={activity.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                                {/* Timeline Line */}
                                {index !== activities.length - 1 && (
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
                        {activities.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
                                No recent activity
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
