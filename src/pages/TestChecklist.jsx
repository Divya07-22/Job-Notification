import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TEST_ITEMS, getTestStatus, setTestItem, resetTests, getTestProgress } from '../utils/testManager';

export default function TestChecklist() {
    const [status, setStatus] = useState({});
    const [progress, setProgress] = useState({ passed: 0, total: 10 });

    const loadData = () => {
        setStatus(getTestStatus());
        setProgress(getTestProgress());
    };

    useEffect(() => {
        loadData();

        // Listen for updates (from reset or other tabs)
        window.addEventListener('storage', loadData);
        return () => window.removeEventListener('storage', loadData);
    }, []);

    const handleToggle = (id) => {
        const newValue = !status[id];
        setTestItem(id, newValue);

        // Update local status map immediately
        const newStatus = { ...status, [id]: newValue };
        setStatus(newStatus);

        // Recalculate match count based on truth
        const newPassed = TEST_ITEMS.filter(item => newStatus[item.id] === true).length;
        setProgress({ passed: newPassed, total: TEST_ITEMS.length });
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all test progress?')) {
            resetTests();
            loadData();
        }
    };

    const isComplete = progress.passed === progress.total;

    return (
        <div className="page-content">
            <h1 className="page-title">System Verification</h1>
            <p className="page-subtitle text-muted">
                Manual verification checklist required before shipping.
            </p>

            {/* Summary Card */}
            <div className={`summary-card ${isComplete ? 'summary-card--success' : 'summary-card--warning'}`}>
                <div className="summary-card__header">
                    <h2 className="summary-card__title">Tests Passed: {progress.passed} / {progress.total}</h2>
                    {isComplete ? (
                        <span className="summary-badge summary-badge--success">Ready to Ship 🚀</span>
                    ) : (
                        <span className="summary-badge summary-badge--warning">In Progress</span>
                    )}
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-bar__fill"
                        style={{ width: `${(progress.passed / progress.total) * 100}%` }}
                    ></div>
                </div>

                {!isComplete && (
                    <p className="summary-message">
                        ⚠️ Resolve all issues before shipping.
                    </p>
                )}
            </div>

            {/* Checklist */}
            <div className="checklist-container">
                {TEST_ITEMS.map(item => (
                    <div key={item.id} className="checklist-item">
                        <label className="checklist-label">
                            <input
                                type="checkbox"
                                className="checklist-checkbox"
                                checked={!!status[item.id]}
                                onChange={() => handleToggle(item.id)}
                            />
                            <span className="checklist-text">{item.label}</span>
                        </label>
                        <div className="checklist-tooltip">
                            <span className="tooltip-icon">ℹ️</span>
                            <span className="tooltip-text">{item.tooltip}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="checklist-actions">
                <button
                    className="btn btn--secondary btn--small"
                    onClick={handleReset}
                >
                    Reset Test Status
                </button>

                <Link
                    to="/jt/08-ship"
                    className={`btn btn--primary ${!isComplete ? 'btn--disabled' : ''}`}
                    onClick={(e) => !isComplete && e.preventDefault()}
                >
                    Proceed to Ship →
                </Link>
            </div>
        </div>
    );
}
