import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobsData';
import {
    generateDigest,
    loadTodaysDigest,
    saveDigest,
    getFormattedDate,
    formatDigestForCopy,
    createEmailDraft
} from '../utils/digestEngine';

export default function Digest() {
    const [digest, setDigest] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [copied, setCopied] = useState(false);

    // Load preferences on mount
    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                setPreferences(JSON.parse(savedPrefs));
            } catch (e) {
                console.error('Failed to load preferences:', e);
            }
        }

        // Try to load existing digest for today
        const existingDigest = loadTodaysDigest();
        if (existingDigest) {
            setDigest(existingDigest);
        }
    }, []);

    const handleGenerateDigest = () => {
        // Check if digest already exists for today
        const existingDigest = loadTodaysDigest();
        if (existingDigest) {
            setDigest(existingDigest);
            return;
        }

        // Generate new digest
        const newDigest = generateDigest(jobsData, preferences);
        if (newDigest) {
            saveDigest(newDigest);
            setDigest(newDigest);
        }
    };

    const handleCopyToClipboard = async () => {
        const text = formatDigestForCopy(digest);
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleEmailDraft = () => {
        const mailtoLink = createEmailDraft(digest);
        window.location.href = mailtoLink;
    };

    const handleApply = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // No preferences set
    if (!preferences) {
        return (
            <div className="page-content">
                <h1 className="page-title">Daily Digest</h1>
                <p className="page-subtitle text-muted">
                    Get your personalized top 10 jobs delivered at 9AM daily.
                </p>

                <div className="banner banner--info">
                    <strong>Set preferences to generate a personalized digest.</strong>
                    <Link to="/settings" className="banner__link">Go to Settings →</Link>
                </div>
            </div>
        );
    }

    // No digest generated yet
    if (!digest) {
        return (
            <div className="page-content">
                <h1 className="page-title">Daily Digest</h1>
                <p className="page-subtitle text-muted">
                    Get your personalized top 10 jobs delivered at 9AM daily.
                </p>

                <div className="digest-container">
                    <div className="digest-card">
                        <div className="empty-state">
                            <div className="empty-state__content">
                                <h2 className="empty-state__title">No digest generated yet</h2>
                                <p className="empty-state__message">
                                    Click the button below to generate today's personalized job digest.
                                </p>
                                <button
                                    className="btn btn--primary btn--large"
                                    onClick={handleGenerateDigest}
                                >
                                    Generate Today's 9AM Digest (Simulated)
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="digest-note">
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </p>
                </div>
            </div>
        );
    }

    // No matching jobs found
    if (digest.jobs.length === 0) {
        return (
            <div className="page-content">
                <h1 className="page-title">Daily Digest</h1>
                <p className="page-subtitle text-muted">
                    Get your personalized top 10 jobs delivered at 9AM daily.
                </p>

                <div className="digest-container">
                    <div className="digest-card">
                        <div className="empty-state">
                            <div className="empty-state__content">
                                <h2 className="empty-state__title">No matching roles today</h2>
                                <p className="empty-state__message">
                                    Check again tomorrow or adjust your preferences.
                                </p>
                                <Link to="/settings" className="btn btn--secondary">
                                    Adjust Preferences
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Digest with jobs
    return (
        <div className="page-content">
            <h1 className="page-title">Daily Digest</h1>
            <p className="page-subtitle text-muted">
                Get your personalized top 10 jobs delivered at 9AM daily.
            </p>

            <div className="digest-container">
                <div className="digest-card">
                    {/* Header */}
                    <div className="digest-header">
                        <h2 className="digest-header__title">Top {digest.jobs.length} Jobs For You — 9AM Digest</h2>
                        <p className="digest-header__date">{getFormattedDate()}</p>
                    </div>

                    {/* Job List */}
                    <div className="digest-jobs">
                        {digest.jobs.map((job, index) => (
                            <div key={job.id} className="digest-job">
                                <div className="digest-job__header">
                                    <span className="digest-job__number">{index + 1}.</span>
                                    <h3 className="digest-job__title">{job.title}</h3>
                                </div>
                                <div className="digest-job__meta">
                                    <span className="digest-job__company">{job.company}</span>
                                    <span className="digest-job__separator">•</span>
                                    <span className="digest-job__location">{job.location}</span>
                                    <span className="digest-job__separator">•</span>
                                    <span className="digest-job__experience">{job.experience}</span>
                                </div>
                                <div className="digest-job__footer">
                                    <span className={`match-badge ${job.matchScore >= 80 ? 'match-badge--high' :
                                            job.matchScore >= 60 ? 'match-badge--medium' :
                                                job.matchScore >= 40 ? 'match-badge--low' :
                                                    'match-badge--verylow'
                                        }`}>
                                        {job.matchScore}% Match
                                    </span>
                                    <button
                                        className="btn btn--small btn--primary"
                                        onClick={() => handleApply(job.applyUrl)}
                                    >
                                        Apply →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="digest-footer">
                        <p className="digest-footer__text">
                            This digest was generated based on your preferences.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="digest-actions">
                    <button
                        className="btn btn--secondary"
                        onClick={handleCopyToClipboard}
                    >
                        {copied ? '✓ Copied!' : 'Copy Digest to Clipboard'}
                    </button>
                    <button
                        className="btn btn--secondary"
                        onClick={handleEmailDraft}
                    >
                        Create Email Draft
                    </button>
                </div>

                {/* Simulation Note */}
                <p className="digest-note">
                    Demo Mode: Daily 9AM trigger simulated manually.
                </p>
            </div>
        </div>
    );
}
