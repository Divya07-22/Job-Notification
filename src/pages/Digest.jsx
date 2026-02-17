import { useState, useEffect } from 'react';
import jobsData from '../data/jobsData';
import { calculateMatchScore } from '../utils/matchScore';
import { getStatusHistory, getStatusColor } from '../utils/statusManager';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Digest() {
    const [digest, setDigest] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusHistory, setStatusHistory] = useState([]);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const todayDate = getTodayDate();
    const storageKey = `jobTrackerDigest_${todayDate}`;

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }

        const savedDigest = localStorage.getItem(storageKey);
        if (savedDigest) {
            setDigest(JSON.parse(savedDigest));
        }

        // Load Status History
        setStatusHistory(getStatusHistory());
    }, [storageKey]);

    const generateDigest = () => {
        if (!preferences) return;

        setLoading(true);
        setTimeout(() => {
            const scoredJobs = jobsData.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, preferences)
            }));

            const relevantJobs = scoredJobs.filter(job => job.matchScore > 0);

            relevantJobs.sort((a, b) => {
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            const top10 = relevantJobs.slice(0, 10);

            setDigest(top10);
            localStorage.setItem(storageKey, JSON.stringify(top10));
            setLoading(false);
        }, 800);
    };

    const copyToClipboard = () => {
        if (!digest) return;

        const lines = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company} (${job.matchScore}% Match)\n${job.applyUrl}`
        );

        const text = `Top 10 Jobs For You - ${new Date().toLocaleDateString()}\n\n${lines.join('\n\n')}`;
        navigator.clipboard.writeText(text);
        alert('Digest copied to clipboard!');
    };

    const createEmailDraft = () => {
        if (!digest) return;

        // 1. Generate the full email body (all jobs)
        const lines = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company} (${job.matchScore}% Match)\n${job.applyUrl}`
        );

        const body = `Here are your top jobs for ${new Date().toLocaleDateString()}:\n\n${lines.join('\n\n')}`;

        // 2. Copy to clipboard
        navigator.clipboard.writeText(body).then(() => {
            // 3. Open mail client with SUBJECT ONLY (to avoid URL length limits)
            const subject = encodeURIComponent(`My 9AM Job Digest (${new Date().toLocaleDateString()})`);
            window.location.href = `mailto:?subject=${subject}`;

            // 4. Notify user
            alert("Email body copied to clipboard! \n\n1. Your mail app should open now.\n2. Paste (Ctrl+V) the text into the body.");
        }).catch(err => {
            console.error('Failed to copy digest:', err);
            alert('Failed to copy digest. Please allow clipboard access.');
        });
    };

    if (!preferences) {
        return (
            <div className="page-content">
                <h1 className="page-title">Daily Digest</h1>
                <div className="empty-state">
                    <h3 className="empty-state__title">Personalize your digest.</h3>
                    <p className="empty-state__message">Set your preferences to generate a personalized 9AM digest.</p>
                    <Button variant="primary" onClick={() => window.location.href = '/settings'}>Go to Settings</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <h1 className="page-title">Daily Digest</h1>
            <p className="page-subtitle text-muted">
                Your curated list of precision-matched roles.
            </p>

            {/* Status Updates Section */}
            {statusHistory.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Recent Status Updates</h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {statusHistory.slice(0, 5).map((update, idx) => (
                            <div key={idx} style={{
                                backgroundColor: 'white',
                                padding: '16px',
                                borderRadius: '8px',
                                border: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{update.jobTitle}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{update.jobCompany}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        color: getStatusColor(update.status),
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem'
                                    }}>
                                        {update.status}
                                    </span>
                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        {new Date(update.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!digest ? (
                <div className="digest-starter" style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Card>
                        <div style={{ padding: '20px' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '10px' }}>Ready for your briefing?</h2>
                            <p className="text-muted" style={{ marginBottom: '20px' }}>
                                Generate your personalized list of top opportunities for today.
                            </p>
                            <Button onClick={generateDigest} disabled={loading}>
                                {loading ? 'Generating...' : "Generate Today's 9AM Digest (Simulated)"}
                            </Button>
                            <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '16px' }}>
                                Demo Mode: Daily 9AM trigger simulated manually.
                            </p>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="digest-view">

                    <div className="digest-actions" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                        <Button variant="secondary" size="small" onClick={copyToClipboard}>Copy Digest to Clipboard</Button>
                        <Button variant="secondary" size="small" onClick={createEmailDraft}>Create Email Draft</Button>
                    </div>

                    {/* Email Container (Same as before) */}
                    {digest.length === 0 ? (
                        <div className="empty-state">
                            <h3 className="empty-state__title">No matching roles today.</h3>
                            <p className="empty-state__message">Check again tomorrow or adjust your filters.</p>
                        </div>
                    ) : (
                        <div className="email-container" style={{
                            backgroundColor: '#f4f4f4',
                            padding: '40px',
                            borderRadius: 'var(--border-radius)',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <div className="email-card" style={{
                                backgroundColor: 'white',
                                padding: '40px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                            }}>
                                {/* Email Header */}
                                <div className="email-header" style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
                                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '0 0 8px 0', color: '#333' }}>
                                        Top 10 Jobs For You — 9AM Digest
                                    </h1>
                                    <p style={{ margin: 0, color: '#666' }}>{new Date().toLocaleDateString()}</p>
                                </div>

                                {/* Email Body */}
                                <div className="email-body">
                                    {digest.map((job, index) => (
                                        <div key={job.id} className="digest-item" style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #f0f0f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1a1a1a' }}>
                                                        {index + 1}. {job.title}
                                                    </h3>
                                                    <p style={{ margin: '0 0 8px 0', color: '#555', fontWeight: 500 }}>
                                                        {job.company} • {job.location}
                                                    </p>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>
                                                        {job.experience} • {job.salaryRange}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <Badge status={`${job.matchScore}% Match`} />
                                                    <div style={{ marginTop: '8px' }}>
                                                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{
                                                            fontSize: '14px',
                                                            color: 'var(--color-primary)',
                                                            textDecoration: 'none',
                                                            fontWeight: 600
                                                        }}>Apply Now &rarr;</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="email-footer" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', color: '#999', fontSize: '13px' }}>
                                    <p>This digest was generated based on your preferences.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
