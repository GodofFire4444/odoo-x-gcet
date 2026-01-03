import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, icon: Icon, trend, color = "var(--primary)", onClick }) => {
    return (
        <motion.div 
            whileHover={{ y: -5, boxShadow: 'var(--shadow-md)' }}
            className="metric-card"
            style={{
                backgroundColor: 'var(--surface)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: onClick ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden'
            }}
            onClick={onClick}
        >
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '4px', 
                height: '100%', 
                backgroundColor: color 
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: 600, 
                        color: 'var(--text-muted)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                    }}>
                        {title}
                    </h3>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {value}
                    </div>
                </div>
                <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '12px', 
                    backgroundColor: `color-mix(in srgb, ${color}, transparent 90%)`,
                    color: color
                }}>
                    {Icon && <Icon size={24} />}
                </div>
            </div>

            {trend && (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.875rem',
                    color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' 
                }}>
                    <span style={{ fontWeight: 600 }}>{trend}</span>
                    <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
                </div>
            )}
        </motion.div>
    );
};

export default MetricCard;
