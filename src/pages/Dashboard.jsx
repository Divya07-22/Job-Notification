import Button from '../components/ui/Button';

export default function Dashboard() {
    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle text-muted">Browse and apply to the latest tech jobs in India.</p>

            <div className="empty-state">
                <h3 className="empty-state__title">No jobs yet.</h3>
                <p className="empty-state__message">
                    In the next step, you will load a realistic dataset.
                </p>
                <div className="empty-state__action">
                    <Button disabled>Load Jobs (Coming Soon)</Button>
                </div>
            </div>
        </div>
    );
}
