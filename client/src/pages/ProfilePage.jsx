import { getProfile, updateProfile, uploadProfilePicture } from '../api/profile';
import Modal from '../components/common/Modal';
import './profile.css';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const [profileData, setProfileData] = useState(null);
    const [tempData, setTempData] = useState({});

    React.useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfileData(data);
            setTempData({
                phone: data.phone || '',
                address: data.privateInfo?.address || '',
                personalEmail: data.privateInfo?.personalEmail || '',
                gender: data.privateInfo?.gender || '',
                maritalStatus: data.privateInfo?.maritalStatus || ''
            });
            setError(null);
        } catch (err) {
            console.error("Fetch profile error:", err);
            setError("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const updated = await updateProfile({
                phone: tempData.phone,
                address: tempData.address,
                personalEmail: tempData.personalEmail,
                gender: tempData.gender,
                maritalStatus: tempData.maritalStatus
            });
            setProfileData(updated.employee || updated);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            console.error("Update profile error:", err);
            setError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleProfilePictureUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // For simplicity, we convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            try {
                setSaving(true);
                const result = await uploadProfilePicture(reader.result);
                setProfileData({ ...profileData, profilePicture: result.profilePicture });
            } catch (err) {
                console.error("Upload error:", err);
                setError("Failed to upload picture");
            } finally {
                setSaving(false);
            }
        };
    };

    const handleCancel = () => {
        setTempData({
            phone: profileData.phone || '',
            address: profileData.privateInfo?.address || '',
            personalEmail: profileData.privateInfo?.personalEmail || '',
            gender: profileData.privateInfo?.gender || '',
            maritalStatus: profileData.privateInfo?.maritalStatus || ''
        });
        setIsEditing(false);
    };

    if (loading) return <div className="loading-state">Loading profile...</div>;
    if (error && !profileData) return <div className="error-state">{error}</div>;


    return (
        <div className="profile-container">
            {/* 1. PROFILE OVERVIEW (TOP SECTION) */}
            <motion.div
                className="profile-overview-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="avatar-wrapper">
                    <img
                        src={profileData.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.firstName}`}
                        alt="Avatar"
                        className="avatar-large"
                    />
                    <label className="avatar-upload-overlay">
                        <Upload size={20} />
                        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} hidden />
                    </label>
                    <div className="status-indicator status-active"></div>
                </div>

                <div className="overview-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1>{profileData.firstName} {profileData.lastName}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                <Briefcase size={16} /> {profileData.role === 'ADMIN' ? 'Administrator' : 'Employee'}
                            </div>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => setIsEditing(true)}
                            disabled={saving}
                        >
                            <Edit3 size={16} style={{ marginRight: '0.5rem' }} /> Edit Profile
                        </button>
                    </div>

                    <div className="overview-meta">
                        <div className="meta-item"><Layers size={16} /> Engineering</div>
                        <div className="meta-item"><Info size={16} /> ID: {profileData.employeeId}</div>
                        <div className="meta-item"><Users size={16} /> Full-time</div>
                        <div className="meta-item"><Calendar size={16} /> Joined {profileData.privateInfo?.dateOfJoining ? new Date(profileData.privateInfo.dateOfJoining).toLocaleDateString() : 'N/A'}</div>
                    </div>
                </div>
            </motion.div>

            {error && <div className="error-banner">{error}</div>}

            <div className="profile-grid">
                {/* Left Column: Personal & Job */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 2. PERSONAL INFORMATION */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><User size={20} /> Personal Information</h2>
                            {isEditing && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="view-btn" onClick={handleCancel} disabled={saving}><X size={16} /> Cancel</button>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={handleSave} disabled={saving}>
                                        {saving ? 'Saving...' : <><Save size={16} /> Save</>}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="fields-grid">
                            <ProfileField label="Full Name" value={`${profileData.firstName} ${profileData.lastName}`} readOnly />
                            <ProfileField label="Email Address" value={profileData.email} readOnly />
                            <ProfileField label="Personal Email" value={tempData.personalEmail} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, personalEmail: v })} />
                            <ProfileField label="Phone Number" value={tempData.phone} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, phone: v })} />
                            <ProfileField label="Date of Birth" value={profileData.privateInfo?.dateOfBirth ? new Date(profileData.privateInfo.dateOfBirth).toISOString().split('T')[0] : ''} readOnly type="date" />
                            <ProfileField label="Gender" value={tempData.gender} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, gender: v })} />
                            <ProfileField label="Marital Status" value={tempData.maritalStatus} isEditing={isEditing} onChange={(v) => setTempData({ ...tempData, maritalStatus: v })} />
                            <ProfileField label="Home Address" value={tempData.address} isEditing={isEditing} colSpan={2} onChange={(v) => setTempData({ ...tempData, address: v })} />
                        </div>
                    </section>

                    {/* 3. JOB & EMPLOYMENT DETAILS (READ-ONLY) */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><Shield size={20} /> Job & Employment</h2>
                        </div>
                        <div className="fields-grid">
                            <ProfileField label="Role" value={profileData.role} readOnly />
                            <ProfileField label="Department" value="Engineering" readOnly />
                            <ProfileField label="Employee ID" value={profileData.employeeId} readOnly />
                            <ProfileField label="Date of Joining" value={profileData.privateInfo?.dateOfJoining ? new Date(profileData.privateInfo.dateOfJoining).toLocaleDateString() : 'N/A'} readOnly />
                        </div>
                    </section>
                </div>

                {/* Right Column: Salary & Documents */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 4. BANK DETAILS SNAPSHOT */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2 className="section-title"><TrendingUp size={20} /> Bank Details</h2>
                        </div>
                        <div className="fields-grid">
                            <ProfileField label="Account Number" value={profileData.bankDetails?.accountNumber} readOnly />
                            <ProfileField label="Bank Name" value={profileData.bankDetails?.bankName} readOnly />
                            <ProfileField label="IFSC Code" value={profileData.bankDetails?.ifscCode} readOnly />
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
