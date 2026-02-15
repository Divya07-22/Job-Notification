export default function ProgressIndicator({ current, total }) {
    const percentage = (current / total) * 100;

    return (
        <div className="progress-indicator">
            <span className="text-small">Step {current} / {total}</span>
            <div className="progress-indicator__bar">
                <div
                    className="progress-indicator__fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
