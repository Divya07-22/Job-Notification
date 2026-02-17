import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Settings() {
    const [formData, setFormData] = useState({
        roleKeywords: '',
        preferredLocations: [], // Array of strings
        preferredMode: {
            Remote: false,
            Hybrid: false,
            Onsite: false
        },
        experienceLevel: 'Fresher',
        skills: '',
        minMatchScore: 40
    });

    const [isSaved, setIsSaved] = useState(false);

    // Load preferences on mount
    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                const parsed = JSON.parse(savedPrefs);
                // Merge with default to handle potential schema changes
                setFormData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
    }, []);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setIsSaved(false);
    };

    const handleModeChange = (mode) => {
        setFormData(prev => ({
            ...prev,
            preferredMode: {
                ...prev.preferredMode,
                [mode]: !prev.preferredMode[mode]
            }
        }));
        setIsSaved(false);
    };

    const handleLocationChange = (e) => {
        // Multi-select logic or just simple text for now? 
        // User requested "multi-select dropdown". 
        // For simplicity in this non-UI-lib env, we will use a native multi-select
        // OR a simple comma list if complex UI is too much. 
        // BUT request said "multi-select dropdown".
        // Let's simulate it with a standard <select multiple> or just checkboxes for locations.
        // Actually, let's stick to a predefined list to be safe.

        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        handleChange('preferredLocations', value);
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(formData));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="page-content">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle text-muted mb-lg">
                Configure your job preferences to get precision-matched recommendations.
            </p>

            <div className="settings-form">
                <Card title="Job Preferences">
                    {/* Role Keywords */}
                    <div className="form-section">
                        <Input
                            label="Role Keywords"
                            placeholder="e.g. Frontend Developer, ReactJS, UI Engineer"
                            value={formData.roleKeywords}
                            onChange={(e) => handleChange('roleKeywords', e.target.value)}
                        />
                        <p className="form-hint">Comma-separated keys to match against job titles.</p>
                    </div>

                    {/* Preferred Locations */}
                    <div className="form-section">
                        <label className="input-label">Preferred Locations (Hold Ctrl to select multiple)</label>
                        <select
                            multiple
                            className="input"
                            style={{ height: '120px' }}
                            value={formData.preferredLocations}
                            onChange={handleLocationChange}
                        >
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Noida">Noida</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>

                    {/* Work Mode */}
                    <div className="form-section">
                        <label className="input-label">Work Mode</label>
                        <div className="input-group" style={{ display: 'flex', gap: '16px' }}>
                            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.preferredMode[mode]}
                                        onChange={() => handleModeChange(mode)}
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className="form-section">
                        <label className="input-label">Experience Level</label>
                        <select
                            className="input"
                            value={formData.experienceLevel}
                            onChange={(e) => handleChange('experienceLevel', e.target.value)}
                        >
                            <option value="Fresher">Fresher (0 years)</option>
                            <option value="0-1 Years">0-1 Years</option>
                            <option value="1-3 Years">1-3 Years</option>
                            <option value="3+ Years">3+ Years</option>
                        </select>
                    </div>

                    {/* Skills */}
                    <div className="form-section">
                        <Input
                            label="Your Skills"
                            placeholder="e.g. React, Java, Python, SQL"
                            value={formData.skills}
                            onChange={(e) => handleChange('skills', e.target.value)}
                        />
                        <p className="form-hint">Comma-separated skills to match against job requirements.</p>
                    </div>

                    {/* Minimum Match Score */}
                    <div className="form-section">
                        <label className="input-label">Minimum Match Score: {formData.minMatchScore}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="input"
                            value={formData.minMatchScore}
                            onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                        />
                        <p className="form-hint">Jobs below this score will be hidden when filtered.</p>
                    </div>

                    <div className="form-actions mt-lg">
                        <Button onClick={handleSave} variant={isSaved ? "secondary" : "primary"}>
                            {isSaved ? "Saved Successfully" : "Save Preferences"}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
