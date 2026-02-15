export default function Saved() {
    return (
        <div className="page-content">
            <h1 className="page-title">Saved Jobs</h1>

            <div className="empty-state">
                <div className="empty-state__content">
                    <h2 className="empty-state__title">No saved jobs yet.</h2>
                    <p className="empty-state__message">
                        Jobs you save will appear here for easy access.
                    </p>
                </div>
            </div>
        </div>
    );
}
