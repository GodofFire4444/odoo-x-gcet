import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, wide }) => {
    return (
        <div className="auth-wrapper">
            <MeshBackground />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`auth-container ${wide ? 'wide' : ''}`}
            >
                {children}
            </motion.div>
        </div>
    );
};

const MeshBackground = () => (
    <div className="mesh-container">
        <div className="mesh-gradient"></div>
        <div className="mesh-noise"></div>
    </div>
);

export default AuthLayout;
