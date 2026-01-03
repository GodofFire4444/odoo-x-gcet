import React from 'react';
import { motion } from 'framer-motion';

export const GradientButton = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className={`gradient-button ${className}`}
        >
            {children}
        </motion.button>
    );
};

export const SecondaryButton = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            className={`secondary-button ${className}`}
        >
            {children}
        </motion.button>
    );
};
