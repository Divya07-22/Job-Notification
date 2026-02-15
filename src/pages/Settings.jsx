import { useState, useEffect } from 'react';

export default function Settings() {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    const [saved, setSaved] = useState(false);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                const parsed = JSON.parse(savedPrefs);
                setPreferences(parsed);
            } catch (e) {
                console.error('Failed to load preferences:', e);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreferences(prev => ({
            ...prev,
            [name]: value
        }));
        setSaved(false);
    };

    const handleLocationToggle = (location) => {
        setPreferences(prev => ({
            ...prev,
            preferredLocations: prev.preferredLocations.includes(location)
                ? prev.preferredLocations.filter(l => l !== location)
                : [...prev.preferredLocations, location]
        }));
        setSaved(false);
    };

    const handleModeToggle = (mode) => {
        setPreferences(prev => ({
            ...prev,
            preferredMode: prev.preferredMode.includes(mode)
                ? prev.preferredMode.filter(m => m !== mode)
                : [...prev.preferredMode, mode]
        }));
        setSaved(false);
    };

    const handleSliderChange = (e) => {
        setPreferences(prev => ({
            ...prev,
            minMatchScore: parseInt(e.target.value)
        }));
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save to localStorage
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        setSaved(true);

        // Hide success message after 3 seconds
        setTimeout(() => setSaved(false), 3000);
    };

    const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai', 'Noida', 'Remote'];
    const modes = ['Remote', 'Hybrid', 'Onsite'];

    return (
        <div className="page-content">
            <h1 className="page-title">Preferences</h1>
            <p className="page-subtitle text-muted">
                Configure your job matching preferences to get personalized recommendations.
            </p>

            {saved && (
                <div className="banner banner--success">
                    ✓ Preferences saved successfully! Your match scores will update automatically.
                </div>
            )}

            <form className="settings-form" onSubmit={handleSubmit}>
                {/* Role Keywords */}
                <div className="form-section">
                    <label className="input-label">Role Keywords</label>
                    <input
                        type="text"
                        name="roleKeywords"
                        className="input"
                        placeholder="e.g. Frontend Developer, React Engineer, SDE"
                        value={preferences.roleKeywords}
                        onChange={handleChange}
                    />
                    <p className="form-hint">
                        Comma-separated keywords to match in job titles and descriptions (+25 for title, +15 for description)
                    </p>
                </div>

                {/* Preferred Locations */}
                <div className="form-section">
                    <label className="input-label">Preferred Locations (+15 points per match)</label>
                    <div className="multi-select">
                        {locations.map(location => (
                            <button
                                key={location}
                                type="button"
                                className={`multi-select__option ${preferences.preferredLocations.includes(location) ? 'multi-select__option--selected' : ''
                                    }`}
                                onClick={() => handleLocationToggle(location)}
                            >
                                {location}
                            </button>
                        ))}
                    </div>
                    <p className="form-hint">Select one or more preferred locations</p>
                </div>

                {/* Preferred Mode */}
                <div className="form-section">
                    <label className="input-label">Work Mode (+10 points per match)</label>
                    <div className="checkbox-group">
                        {modes.map(mode => (
                            <label key={mode} className="checkbox-option">
                                <input
                                    type="checkbox"
                                    checked={preferences.preferredMode.includes(mode)}
                                    onChange={() => handleModeToggle(mode)}
                                />
                                <span>{mode}</span>
                            </label>
                        ))}
                    </div>
                    <p className="form-hint">Select one or more work modes</p>
                </div>

                {/* Experience Level */}
                <div className="form-section">
                    <label className="input-label">Experience Level (+10 points for exact match)</label>
                    <select
                        name="experienceLevel"
                        className="input"
                        value={preferences.experienceLevel}
                        onChange={handleChange}
                    >
                        <option value="">Any Experience Level</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                    </select>
                </div>

                {/* Skills */}
                <div className="form-section">
                    <label className="input-label">Skills (+15 points for any overlap)</label>
                    <input
                        type="text"
                        name="skills"
                        className="input"
                        placeholder="e.g. React, JavaScript, TypeScript, Node.js"
                        value={preferences.skills}
                        onChange={handleChange}
                    />
                    <p className="form-hint">Comma-separated skills you have or want to work with</p>
                </div>

                {/* Minimum Match Score */}
                <div className="form-section">
                    <label className="input-label">
                        Minimum Match Score: {preferences.minMatchScore}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={preferences.minMatchScore}
                        onChange={handleSliderChange}
                        className="slider"
                    />
                    <p className="form-hint">
                        Jobs below this threshold can be hidden using the "Show only matches" toggle on the dashboard
                    </p>
                </div>

                {/* Scoring Info */}
                <div className="form-section">
                    <div className="scoring-info">
                        <h3 className="scoring-info__title">How Match Scores Work</h3>
                        <ul className="scoring-info__list">
                            <li>+25 points: Role keyword in job title</li>
                            <li>+15 points: Role keyword in description</li>
                            <li>+15 points: Location match</li>
                            <li>+10 points: Work mode match</li>
                            <li>+10 points: Experience level match</li>
                            <li>+15 points: Skills overlap</li>
                            <li>+5 points: Posted within 2 days</li>
                            <li>+5 points: LinkedIn source</li>
                        </ul>
                        <p className="scoring-info__note">Maximum score: 100 points</p>
                    </div>
                </div>

                <button type="submit" className="btn btn--primary btn--large">
                    Save Preferences
                </button>
            </form>
        </div>
    );
}
