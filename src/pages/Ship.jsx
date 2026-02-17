import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isReadyToShip, getTestProgress } from '../utils/testManager';

export default function Ship() {
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState({ passed: 0, total: 10 });

    useEffect(() => {
        setIsReady(isReadyToShip());
        setProgress(getTestProgress());
    }, []);

    if (!isReady) {
        return (
            <div className="page-content">
                <h1 className="page-title">Locked 🔒</h1>
                <div className="empty-state">
                    <div className="empty-state__content">
                        <h2 className="empty-state__title">Shipment Locked</h2>
                        <p className="empty-state__message">
                            You have completed {progress.passed} out of {progress.total} system verification tests.
                            <br />
                            Complete all 10 items to unlock shipping.
                        </p>
                        <Link to="/jt/07-test" className="btn btn--primary">
                            Go to Verification Checklist ({progress.passed}/{progress.total})
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <h1 className="page-title">Ready to Ship 🚀</h1>
            <p className="page-subtitle text-muted">
                All systems verified. You are clear for takeoff.
            </p>

            <div className="ship-card">
                <div className="ship-card__content">
                    <h2>Deployment Status</h2>
                    <p className="text-success">✅ All tests passed</p>
                    <p className="text-success">✅ Production build ready</p>
                    <p className="text-success">✅ Vercel deployment active</p>

                    <div className="ship-actions">
                        <a
                            href="https://vercel.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--secondary"
                        >
                            View Vercel Dashboard
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--secondary"
                        >
                            View GitHub Repo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
