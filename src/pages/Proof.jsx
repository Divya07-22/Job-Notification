import ProofFooter from '../components/ProofFooter';

export default function Proof() {
    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="page-title">Proof of Work</h1>
                <p className="page-subtitle text-muted">Submit your progress.</p>

                <div className="empty-state">
                    <h3 className="empty-state__title">Artifact Collection</h3>
                    <p className="empty-state__message">
                        This section will collect your project artifacts (GitHub, Lovable, Deployment) for submission.
                    </p>
                </div>
            </div>

        </div>
    );
}
