import { useState, useEffect } from 'react';
import { isReadyToShip } from '../utils/testManager';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const PROJECT_STEPS = [
    "Implement Job Data & Dashboard UI",
    "Implement Match Score Engine",
    "Implement Settings & Preferences",
    "Implement Daily Digest Simulator",
    "Implement Status Tracking Logic",
    "Implement Notification Toasts",
    "Implement Filter & Sort Logic",
    "Implement Test Verification Checklist"
];

export default function Proof() {
    const [artifacts, setArtifacts] = useState({
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    });

    const [testsPassed, setTestsPassed] = useState(false);
    const [shipped, setShipped] = useState(false);

    useEffect(() => {
        // Load artifacts
        const saved = localStorage.getItem('jobTrackerArtifacts');
        if (saved) setArtifacts(JSON.parse(saved));

        // Check tests
        setTestsPassed(isReadyToShip());

        // Check ship status
        const isShipped = localStorage.getItem('jobTrackerShipped') === 'true';
        setShipped(isShipped);
    }, []);

    const handleChange = (field, value) => {
        const newArtifacts = { ...artifacts, [field]: value };
        setArtifacts(newArtifacts);
        localStorage.setItem('jobTrackerArtifacts', JSON.stringify(newArtifacts));
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const allLinksValid =
        isValidUrl(artifacts.lovableLink) &&
        isValidUrl(artifacts.githubLink) &&
        isValidUrl(artifacts.deployedLink);

    const canShip = allLinksValid && testsPassed;

    const handleCopySubmission = () => {
        if (!canShip) return;

        const text = `
Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovableLink}

GitHub Repository:
${artifacts.githubLink}

Live Deployment:
${artifacts.deployedLink}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

        navigator.clipboard.writeText(text);
        alert('Submission copied to clipboard!');

        // Mark as shipped
        setShipped(true);
        localStorage.setItem('jobTrackerShipped', 'true');
    };

    return (
        <div className="page-content">
            <h1 className="page-title">Proof of Work</h1>
            <p className="page-subtitle text-muted">
                Finalize and submit your Job Notification Tracker.
            </p>

            {/* Status Badge */}
            <div style={{ marginBottom: '32px' }}>
                <span className={`badge ${shipped ? 'badge--shipped' : 'badge--in-progress'}`} style={{ fontSize: '1rem', padding: '8px 16px' }}>
                    Status: {shipped ? 'Shipped 🚀' : 'In Progress'}
                </span>
            </div>

            {shipped && (
                <div style={{
                    backgroundColor: '#F6FFED',
                    border: '1px solid #B7EB8F',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    color: '#389E0D'
                }}>
                    Project 1 Shipped Successfully.
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Step Summary */}
                <Card title="Step Completion Summary">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {PROJECT_STEPS.map((step, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--color-success)' }}>✓</span>
                                <span style={{ textDecoration: 'line-through', color: '#888' }}>{step}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Artifact Collection */}
                <Card title="Artifact Collection">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <Input
                                label="Lovable Project Link"
                                placeholder="https://lovable.dev/..."
                                value={artifacts.lovableLink}
                                onChange={(e) => handleChange('lovableLink', e.target.value)}
                            />
                            {artifacts.lovableLink && !isValidUrl(artifacts.lovableLink) && (
                                <span style={{ color: 'red', fontSize: '0.8rem' }}>Invalid URL</span>
                            )}
                        </div>
                        <div>
                            <Input
                                label="GitHub Repository Link"
                                placeholder="https://github.com/..."
                                value={artifacts.githubLink}
                                onChange={(e) => handleChange('githubLink', e.target.value)}
                            />
                            {artifacts.githubLink && !isValidUrl(artifacts.githubLink) && (
                                <span style={{ color: 'red', fontSize: '0.8rem' }}>Invalid URL</span>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Deployed URL"
                                placeholder="https://vercel.app/..."
                                value={artifacts.deployedLink}
                                onChange={(e) => handleChange('deployedLink', e.target.value)}
                            />
                            {artifacts.deployedLink && !isValidUrl(artifacts.deployedLink) && (
                                <span style={{ color: 'red', fontSize: '0.8rem' }}>Invalid URL</span>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Final Action */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <div style={{ marginBottom: '16px', textAlign: 'left', maxWidth: '400px', margin: '0 auto 16px auto' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Requirements to Ship:</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: testsPassed ? 'green' : 'red' }}>
                        <span>{testsPassed ? '✅' : '❌'}</span>
                        All 10 Tests Passed
                        {!testsPassed && (
                            <a href="/jt/07-test" style={{ marginLeft: '10px', textDecoration: 'underline', fontWeight: 'bold' }}>
                                (Go to Checklist)
                            </a>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isValidUrl(artifacts.lovableLink) ? 'green' : 'red' }}>
                        <span>{isValidUrl(artifacts.lovableLink) ? '✅' : '❌'}</span> Valid Lovable Link (starts with http/https)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isValidUrl(artifacts.githubLink) ? 'green' : 'red' }}>
                        <span>{isValidUrl(artifacts.githubLink) ? '✅' : '❌'}</span> Valid GitHub Link (starts with http/https)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isValidUrl(artifacts.deployedLink) ? 'green' : 'red' }}>
                        <span>{isValidUrl(artifacts.deployedLink) ? '✅' : '❌'}</span> Valid Deployed Link (starts with http/https)
                    </div>
                </div>

                <Button
                    variant="primary"
                    disabled={!canShip}
                    onClick={handleCopySubmission}
                    style={{ fontSize: '1.2rem', padding: '12px 32px' }}
                >
                    Copy Final Submission
                </Button>
            </div>
        </div>
    );
}
