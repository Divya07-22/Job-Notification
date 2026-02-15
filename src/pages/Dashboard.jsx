export default function Dashboard() {
    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>

            <div className="empty-state">
                <div className="empty-state__content">
                    <h2 className="empty-state__title">No jobs yet.</h2>
                    <p className="empty-state__message">
                        In the next step, you will load a realistic dataset.
                    </p>
                </div>
            </div>
        </div>
    );
}
