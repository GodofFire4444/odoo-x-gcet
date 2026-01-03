import React from 'react';
import { motion } from 'framer-motion';

const ReportsAnalytics = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <ChartCard title="Attendance Trends">
                 <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
                    {[40, 60, 55, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} style={{ 
                            width: '8%', 
                            height: `${h}%`, 
                            backgroundColor: 'var(--primary)', 
                            borderRadius: '4px 4px 0 0',
                            opacity: 0.8
                        }}></div>
                    ))}
                </div>
            </ChartCard>

            <ChartCard title="Leave Distribution">
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                        width: '150px', 
                        height: '150px', 
                        borderRadius: '50%', 
                        background: 'conic-gradient(var(--primary) 0% 60%, var(--warning) 60% 80%, var(--danger) 80% 100%)' 
                    }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <Legend color="var(--primary)" label="Sick" />
                    <Legend color="var(--warning)" label="Casual" />
                    <Legend color="var(--danger)" label="Unpaid" />
                </div>
            </ChartCard>

            <ChartCard title="Payroll History">
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                     <div style={{ flex: 1, height: '60%', backgroundColor: 'var(--text-muted)', opacity: 0.2, borderRadius: '4px' }}></div>
                     <div style={{ flex: 1, height: '70%', backgroundColor: 'var(--text-muted)', opacity: 0.2, borderRadius: '4px' }}></div>
                     <div style={{ flex: 1, height: '65%', backgroundColor: 'var(--text-muted)', opacity: 0.2, borderRadius: '4px' }}></div>
                     <div style={{ flex: 1, height: '80%', backgroundColor: 'var(--success)', borderRadius: '4px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
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
