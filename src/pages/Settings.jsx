import { useState } from 'react';

export default function Settings() {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        locations: '',
        mode: 'remote',
        experienceLevel: 'mid'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // No logic yet - just prevent default
    };

    return (
        <div className="page-content">
            <h1 className="page-title">Preferences</h1>
            <p className="page-subtitle text-muted">
                Configure your job tracking preferences.
            </p>

            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <label className="input-label">Role Keywords</label>
                    <input
                        type="text"
                        name="roleKeywords"
                        className="input"
                        placeholder="e.g. Frontend Developer, React Engineer"
                        value={preferences.roleKeywords}
                        onChange={handleChange}
                    />
                    <p className="form-hint">Enter keywords for roles you're interested in</p>
                </div>

                <div className="form-section">
                    <label className="input-label">Preferred Locations</label>
                    <input
                        type="text"
                        name="locations"
                        className="input"
                        placeholder="e.g. San Francisco, Remote, New York"
                        value={preferences.locations}
                        onChange={handleChange}
                    />
                    <p className="form-hint">Enter cities or "Remote"</p>
                </div>

                <div className="form-section">
                    <label className="input-label">Work Mode</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="mode"
                                value="remote"
                                checked={preferences.mode === 'remote'}
                                onChange={handleChange}
                            />
                            <span>Remote</span>
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="mode"
                                value="hybrid"
                                checked={preferences.mode === 'hybrid'}
                                onChange={handleChange}
                            />
                            <span>Hybrid</span>
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="mode"
                                value="onsite"
                                checked={preferences.mode === 'onsite'}
                                onChange={handleChange}
                            />
                            <span>Onsite</span>
                        </label>
                    </div>
                </div>

                <div className="form-section">
                    <label className="input-label">Experience Level</label>
                    <select
                        name="experienceLevel"
                        className="input"
                        value={preferences.experienceLevel}
                        onChange={handleChange}
                    >
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior (6-10 years)</option>
                        <option value="lead">Lead/Principal (10+ years)</option>
                    </select>
                </div>

                <button type="submit" className="btn btn--primary">
                    Save Preferences
                </button>
            </form>
        </div>
    );
}
