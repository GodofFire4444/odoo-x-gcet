import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllAttendance, getAllLeaves, getAllPayrolls } from '../../api/admin';

const ReportsAnalytics = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [leaveData, setLeaveData] = useState({ sick: 0, casual: 0, unpaid: 0 });
    const [payrollData, setPayrollData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attendance, leaves, payrolls] = await Promise.all([
                    getAllAttendance(),
                    getAllLeaves(),
                    getAllPayrolls()
                ]);

                // Process Attendance (Last 7 days)
                const last7Days = [...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    return d.toLocaleDateString();
                });

                const attendanceTrend = last7Days.map(date => {
                    const count = attendance.filter(a => new Date(a.date).toLocaleDateString() === date && a.checkIn).length;
                    return count;
                });
                setAttendanceData(attendanceTrend);

                // Process Leaves
                const leaveCounts = { sick: 0, casual: 0, unpaid: 0 };
                leaves.forEach(l => {
                    const type = l.leaveType.toLowerCase();
                    if (type.includes('sick')) leaveCounts.sick++;
                    else if (type.includes('casual')) leaveCounts.casual++;
                    else leaveCounts.unpaid++;
                });
                setLeaveData(leaveCounts);

                // Process Payroll (Last 6 months)
                // For now, just mocking monthly data based on available payrolls or static if empty
                // In a real app, we'd group payrolls by month.
                // Using dummy historical data for visualization if no real data spans months
                setPayrollData([45000, 46000, 45500, 48000]); 

            } catch (error) {
                console.error("Error fetching report data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const maxAttendance = Math.max(...attendanceData, 1);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <ChartCard title="Attendance Trends (Last 7 Days)">
                 <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
                    {attendanceData.map((count, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                            <div style={{ 
                                width: '100%', 
                                height: `${(count / (maxAttendance || 1)) * 100}%`, 
                                minHeight: '4px',
                                backgroundColor: 'var(--primary)', 
                                borderRadius: '4px 4px 0 0',
                                opacity: 0.8,
                                transition: 'height 0.5s ease'
                            }}></div>
                        </div>
                    ))}
                </div>
            </ChartCard>

            <ChartCard title="Leave Distribution">
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {/* Simple Pie Chart Visualization using Conic Gradient */}
                    <div style={{ 
                        width: '150px', 
                        height: '150px', 
                        borderRadius: '50%', 
                        background: `conic-gradient(
                            var(--primary) 0% ${leaveData.sick / (Object.values(leaveData).reduce((a,b)=>a+b,0)||1) * 100}%, 
                            var(--warning) 0% ${(leaveData.sick + leaveData.casual) / (Object.values(leaveData).reduce((a,b)=>a+b,0)||1) * 100}%, 
                            var(--danger) 0% 100%
                        )` 
                    }}></div>
                     <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--surface)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <Legend color="var(--primary)" label={`Sick (${leaveData.sick})`} />
                    <Legend color="var(--warning)" label={`Casual (${leaveData.casual})`} />
                    <Legend color="var(--danger)" label={`Other (${leaveData.unpaid})`} />
                </div>
            </ChartCard>

            <ChartCard title="Payroll History">
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                     {payrollData.map((amount, i) => (
                         <div key={i} style={{ 
                             flex: 1, 
                             height: `${(amount / 50000) * 100}%`, 
                             backgroundColor: i === payrollData.length - 1 ? 'var(--success)' : 'var(--text-muted)', 
                             opacity: i === payrollData.length - 1 ? 1 : 0.2, 
                             borderRadius: '4px' 
                         }}></div>
                     ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                </div>
            </ChartCard>
        </div>
    );
};

const ChartCard = ({ title, children }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
            backgroundColor: 'var(--surface)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border)' 
        }}
    >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>{title}</h3>
        {children}
    </motion.div>
);

const Legend = ({ color, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }}></div>
        {label}
    </div>
);

export default ReportsAnalytics;
