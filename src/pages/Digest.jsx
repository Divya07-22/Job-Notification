export default function Digest() {
    return (
        <div className="page-content">
            <h1 className="page-title">Daily Digest</h1>
            <p className="page-subtitle text-muted">Your personalized morning briefing.</p>

            <div className="empty-state">
                <h3 className="empty-state__title">No digest available.</h3>
                <p className="empty-state__message">
                    Once you set your preferences, we'll generate a daily match report here at 9AM.
                </p>
            </div>
        </div>
    );
}
