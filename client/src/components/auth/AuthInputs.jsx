import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedInput = ({ label, type = "text", value, onChange, placeholder, error, name, icon: Icon }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <div className="input-inner">
                {Icon && <div className="input-icon-left">{Icon}</div>}
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`auth-input ${error ? 'error' : ''} ${Icon ? 'with-icon' : ''}`}
                />
                <motion.div
                    className="input-focus-glow"
                    initial={false}
                    animate={{ scale: 1, opacity: 0 }}
                    whileFocus={{ scale: 1.05, opacity: 1 }}
                />
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export const ImageUpload = ({ label, value, onChange, error, name, icon: Icon }) => {
    const [preview, setPreview] = React.useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onChange({ target: { name, value: file } });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <label className={`image-upload-wrapper glass ${error ? 'error' : ''}`}>
                <input
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {preview ? (
                    <div className="image-preview">
                        <img src={preview} alt="Logo Preview" />
                        <div className="preview-overlay">
                            {Icon}
                            <span>Change Logo</span>
                        </div>
                    </div>
                ) : (
                    <div className="upload-placeholder">
                        <div className="upload-icon-circle">
                            {Icon}
                        </div>
                        <div className="upload-text">
                            <span className="primary-text">Upload Company Logo</span>
                            <span className="secondary-text">PNG, JPG up to 5MB</span>
                        </div>
                    </div>
                )}
            </label>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};
