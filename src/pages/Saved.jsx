import Button from '../components/ui/Button';

export default function Saved() {
    return (
        <div className="page-content">
            <h1 className="page-title">Saved Jobs</h1>
            <p className="page-subtitle text-muted">Your shortlisted opportunities.</p>

            <div className="empty-state">
                <h3 className="empty-state__title">No saved jobs.</h3>
                <p className="empty-state__message">
                    Jobs you save from the dashboard will appear here for easy access.
                </p>
                <div className="empty-state__action">
                    <Button variant="secondary" disabled>Browse Jobs (Coming Soon)</Button>
                </div>
            </div>
        </div>
    );
}
