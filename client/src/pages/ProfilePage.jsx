import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Briefcase,
    Shield, Download, Eye, Upload, Edit3, Save, X,
    FileText, Award, Layers, Users, TrendingUp, Info
} from 'lucide-react';
import Modal from '../components/common/Modal';
import './profile.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    // Dummy Profile Data
    const [profileData, setProfileData] = useState({
        personal: {
            fullName: "Raj",
            email: "raj.kiran@dayflow.com",
            phone: "+91 98765 43210",
            address: "123 Tech Park, Hitech City, Hyderabad",
            dob: "1995-06-15",
            emergencyContact: "Anjali Sharma (+91 98000 11122)"
        },
        job: {
            role: "Senior Frontend Engineer",
            department: "Engineering",
            employeeId: "DF-2024-089",
            status: "Full-time",
            joinDate: "August 12, 2024",
            manager: "Arun Varma",
            location: "Hyderabad Office (Remote)"
        },
        salary: {
            current: "$95,000",
            cycle: "Monthly",
            lastIncrement: "Dec 01, 2024"
        }
    });

    const [tempData, setTempData] = useState({ ...profileData.personal });

    const handleSave = () => {
        setProfileData({ ...profileData, personal: { ...tempData } });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData({ ...profileData.personal });
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            {/* 1. PROFILE OVERVIEW (TOP SECTION) */}
            <motion.div
                className="profile-overview-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="avatar-wrapper">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" alt="Avatar" className="avatar-large" />
                    <div className="status-indicator status-active"></div>
                </div>

                <div className="overview-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1>{profileData.personal.fullName}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                <Briefcase size={16} /> {profileData.job.role}
                            </div>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit3 size={16} style={{ marginRight: '0.5rem' }} /> Edit Profile
                        </button>
                    </div>

                    <div className="overview-meta">
                        <div className="meta-item"><Layers size={16} /> {profileData.job.department}</div>
                        <div className="meta-item"><Info size={16} /> ID: {profileData.job.employeeId}</div>
                        <div className="meta-item"><Users size={16} /> {profileData.job.status}</div>
                        <div className="meta-item"><Calendar size={16} /> Joined {profileData.job.joinDate}</div>
                    </div>
                </div>
            </motion.div>

            <div className="profile-grid">
                {/* Left Column: Personal & Job */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 2. PERSONAL INFORMATION */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><User size={20} /> Personal Information</h2>
                            {isEditing && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="view-btn" onClick={handleCancel}><X size={16} /> Cancel</button>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={handleSave}><Save size={16} /> Save</button>
                                </div>
                            )}
                        </div>

                        <div className="fields-grid">
                            <ProfileField label="Full Name" value={tempData.fullName} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, fullName: v })} />
                            <ProfileField label="Email Address" value={tempData.email} readOnly />
                            <ProfileField label="Phone Number" value={tempData.phone} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, phone: v })} />
                            <ProfileField label="Date of Birth" value={tempData.dob} isEditing={isEditing} type="date" onChange={(v) => setTempData({ ...tempData, dob: v })} />
                            <ProfileField label="Home Address" value={tempData.address} isEditing={isEditing} colSpan={2} onChange={(v) => setTempData({ ...tempData, address: v })} />
                            <ProfileField label="Emergency Contact" value={tempData.emergencyContact} isEditing={isEditing} colSpan={2} onChange={(v) => setTempData({ ...tempData, emergencyContact: v })} />
                        </div>
                    </section>

                    {/* 3. JOB & EMPLOYMENT DETAILS (READ-ONLY) */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><Shield size={20} /> Job & Employment</h2>
                        </div>
                        <div className="fields-grid">
                            <ProfileField label="Role" value={profileData.job.role} readOnly />
                            <ProfileField label="Department" value={profileData.job.department} readOnly />
                            <ProfileField label="Reporting Manager" value={profileData.job.manager} readOnly />
                            <ProfileField label="Employment Type" value={profileData.job.status} readOnly />
                            <ProfileField label="Work Location" value={profileData.job.location} readOnly />
                            <ProfileField label="Employee ID" value={profileData.job.employeeId} readOnly />
                        </div>
                    </section>
                </div>

                {/* Right Column: Salary & Documents */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 4. SALARY SNAPSHOT */}
                    <section className="profile-section salary-snapshot-card">
                        <div className="section-header">
                            <h2 className="section-title"><TrendingUp size={20} /> Salary Snapshot</h2>
                        </div>
                        <div className="salary-info">
                            <div className="field-label">Current Monthly Salary</div>
                            <div className="salary-amount">{profileData.salary.current}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Pay Cycle: <b>{profileData.salary.cycle}</b></span>
                                <span style={{ color: 'var(--text-muted)' }}>Last Hike: <b>{profileData.salary.lastIncrement}</b></span>
                            </div>
                            <button className="view-btn" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
                                View Payroll Details
                            </button>
                        </div>
                    </section>

                    {/* 5. DOCUMENTS SECTION */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><FileText size={20} /> My Documents</h2>
                        </div>
                        <div className="document-list">
                            <DocumentCard
                                name="Professional Resume.pdf"
                                date="Uploaded 2 days ago"
                                isResume
                                onView={() => setIsResumeModalOpen(true)}
                            />
                            <DocumentCard name="Offer Letter.pdf" date="Aug 10, 2024" />
                            <DocumentCard name="ID Proof_Aadhar.jpg" date="Aug 12, 2024" />
                        </div>
                    </section>
                </div>
            </div>

            {/* Resume Preview Modal */}
            <Modal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                title="Resume Preview"
                footer={(
                    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <button className="view-btn" style={{ flex: 1, justifyContent: 'center' }}><Download size={18} /> Download PDF</button>
                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}><Upload size={18} /> Replace Resume</button>
                    </div>
                )}
            >
                <div style={{ height: '500px', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)' }}>
                    <FileText size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
                    <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>Resume Template Viewer</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>[ Digital Preview Content Rendering... ]</p>
                </div>
            </Modal>
        </div>
    );
};

// Sub-components
const ProfileField = ({ label, value, isEditing, readOnly, type = "text", onChange, colSpan = 1 }) => (
    <div className="profile-field" style={{ gridColumn: `span ${colSpan}` }}>
        <label className="field-label">{label}</label>
        {isEditing && !readOnly ? (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ marginTop: '0.25rem' }}
            />
        ) : (
            <div className={`field-value ${readOnly ? 'read-only' : ''}`}>
                {value || "-"}
            </div>
        )}
    </div>
);

const DocumentCard = ({ name, date, isResume, onView }) => (
    <div className={`document-card ${isResume ? 'resume-highlight' : ''}`}>
        <div className="doc-icon">
            {isResume ? <Award size={20} /> : <FileText size={20} />}
        </div>
        <div className="doc-info">
            <div className="doc-name">{name}</div>
            <div className="doc-meta">{date}</div>
        </div>
        <div className="doc-actions">
            <button className="icon-btn-sm" onClick={onView} title="View"><Eye size={16} /></button>
            <button className="icon-btn-sm" title="Download"><Download size={16} /></button>
            <button className="icon-btn-sm" title="Replace"><Upload size={16} /></button>
        </div>
    </div>
);

export default ProfilePage;
