import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    PROJECT_STEPS,
    getProofData,
    saveProofLinks,
    validateUrl,
    shipProject,
    canShipProject,
    generateSubmissionText
} from '../utils/proofManager';
import { isReadyToShip } from '../utils/testManager';

export default function Proof() {
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [isShipped, setIsShipped] = useState(false);
    const [testsComplete, setTestsComplete] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadData = () => {
            const data = getProofData();
            setLinks({
                lovable: data.lovable,
                github: data.github,
                deployed: data.deployed
            });
            setIsShipped(data.isShipped);
            setTestsComplete(isReadyToShip());
        };
        loadData();
        window.addEventListener('storage', loadData);
        return () => window.removeEventListener('storage', loadData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newLinks = { ...links, [name]: value };
        setLinks(newLinks);
        saveProofLinks(newLinks);
    };

    const handleShip = () => {
        if (canShipProject()) {
            shipProject();
            setIsShipped(true);
        }
    };

    const handleCopy = async () => {
        const text = generateSubmissionText();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const steps = PROJECT_STEPS.map(step => {
        if (step.id === 8) {
            return { ...step, status: isShipped ? 'completed' : 'pending' };
        }
        return step;
    });

    const isValid = canShipProject();

    return (
        <div className="page-content">
            <h1 className="page-title">Proof of Work</h1>
            <p className="page-subtitle text-muted">Final verification and submission for Project 1.</p>

            {isShipped && (
                <div className="shipped-banner">Project 1 Shipped Successfully.</div>
            )}

            <div className="proof-grid">
                <div className="proof-card">
                    <h2 className="proof-card__title">Step Completion Summary</h2>
                    <div className="step-list">
                        {steps.map(step => (
                            <div key={step.id} className={`step-item step-item--${step.status}`}>
                                <div className="step-item__icon">
                                    {step.status === 'completed' ? '✅' : '⏳'}
                                </div>
                                <span className="step-item__label">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="proof-card">
                    <h2 className="proof-card__title">Artifact Collection</h2>
                    <div className="artifact-form">
                        <div className="form-group">
                            <label className="form-label">Lovable Project Link</label>
                            <input
                                type="text"
                                className={`input ${links.lovable && !validateUrl(links.lovable) ? 'input--error' : ''}`}
                                name="lovable"
                                value={links.lovable}
                                onChange={handleChange}
                                placeholder="https://lovable.dev..."
                                disabled={isShipped}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">GitHub Repository Link</label>
                            <input
                                type="text"
                                className={`input ${links.github && !validateUrl(links.github) ? 'input--error' : ''}`}
                                name="github"
                                value={links.github}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                disabled={isShipped}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Deployed URL</label>
                            <input
                                type="text"
                                className={`input ${links.deployed && !validateUrl(links.deployed) ? 'input--error' : ''}`}
                                name="deployed"
                                value={links.deployed}
                                onChange={handleChange}
                                placeholder="https://....vercel.app"
                                disabled={isShipped}
                            />
                        </div>
                    </div>
                </div>

                <div className="proof-card">
                    <h2 className="proof-card__title">Submission & Shipping</h2>
                    <div className="validation-status mb-lg">
                        <div className={`validation-item ${testsComplete ? 'validation-item--pass' : 'validation-item--fail'}`}>
                            <span className="validation-icon">{testsComplete ? '✅' : '⚠️'}</span>
                            <span>Test Checklist (10/10)</span>
                            {!testsComplete && <Link to="/jt/07-test" className="validation-link">Complete Tests</Link>}
                        </div>
                        <div className={`validation-item ${isValid ? 'validation-item--pass' : 'validation-item--fail'}`}>
                            <span className="validation-icon">{isValid ? '✅' : '⚠️'}</span>
                            <span>All Artifact Links Valid</span>
                        </div>
                    </div>

                    <div className="proof-actions">
                        <button className="btn btn--secondary" onClick={handleCopy} disabled={!isValid}>
                            {copied ? 'Copied!' : 'Copy Final Submission'}
                        </button>
                        {!isShipped ? (
                            <button className="btn btn--primary" onClick={handleShip} disabled={!isValid}>
                                Mark as Shipped
                            </button>
                        ) : (
                            <div className="shipped-badge">Shipped</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
