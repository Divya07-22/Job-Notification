import { getMatchBadgeClass } from '../utils/matchScore';

export default function JobCard({ job, onView, onSave, isSaved, matchScore, showScore }) {
    const formatDaysAgo = (days) => {
        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        return `${days} days ago`;
    };

    const handleApply = () => {
        window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="job-card">
            {/* Match Score Badge */}
            {showScore && matchScore !== undefined && (
                <div className={`match-badge ${getMatchBadgeClass(matchScore)}`}>
                    {matchScore}% Match
                </div>
            )}

            <div className="job-card__header">
                <h3 className="job-card__title">{job.title}</h3>
                <p className="job-card__company">{job.company}</p>
            </div>

            <div className="job-card__meta">
                <div className="job-card__meta-row">
                    <span className="job-card__location">{job.location}</span>
                    <span className={`badge badge--mode badge--${job.mode.toLowerCase()}`}>
                        {job.mode}
                    </span>
                </div>
                <div className="job-card__meta-row">
                    <span className="job-card__experience">{job.experience}</span>
                    <span className="job-card__salary">{job.salaryRange}</span>
                </div>
            </div>

            <div className="job-card__footer">
                <div className="job-card__footer-left">
                    <span className={`badge badge--source badge--${job.source.toLowerCase()}`}>
                        {job.source}
                    </span>
                    <span className="job-card__posted">{formatDaysAgo(job.postedDaysAgo)}</span>
                </div>
                <div className="job-card__footer-right">
                    <button className="btn btn--small btn--secondary" onClick={onView}>
                        View
                    </button>
                    <button
                        className={`btn btn--small ${isSaved ? 'btn--saved' : 'btn--secondary'}`}
                        onClick={onSave}
                    >
                        {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button className="btn btn--small btn--primary" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
