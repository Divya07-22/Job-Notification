export default function Digest() {
    return (
        <div className="page-content">
            <h1 className="page-title">Daily Digest</h1>

            <div className="empty-state">
                <div className="empty-state__content">
                    <h2 className="empty-state__title">No digest generated yet.</h2>
                    <p className="empty-state__message">
                        Your daily digest will be delivered at 9AM with precision-matched opportunities.
                    </p>
                </div>
            </div>
        </div>
    );
}
