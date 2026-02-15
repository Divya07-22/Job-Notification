import { useState, useEffect } from 'react';
import { getMatchBadgeClass } from '../utils/matchScore';
import { getJobStatus, setJobStatus, addStatusChange, JOB_STATUSES, getStatusBadgeClass } from '../utils/statusManager';
import Toast from './Toast';

export default function JobCard({ job, onView, onSave, isSaved, matchScore, showScore, onStatusChange }) {
    const [status, setStatus] = useState(JOB_STATUSES.NOT_APPLIED);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Load status on mount
    useEffect(() => {
        const currentStatus = getJobStatus(job.id);
        setStatus(currentStatus);
    }, [job.id]);

    const formatDaysAgo = (days) => {
        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        return `${days} days ago`;
    };

    const handleApply = () => {
        window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setJobStatus(job.id, newStatus);
        addStatusChange(job.id, newStatus, job.title, job.company);
        setShowDropdown(false);

        // Show toast notification
        setToastMessage(`Status updated: ${newStatus}`);
        setShowToast(true);

        // Notify parent
        if (onStatusChange) {
            onStatusChange(job.id, newStatus);
        }
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <>
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

                {/* Status Dropdown */}
                <div className="job-card__status">
                    <label className="job-card__status-label">Status:</label>
                    <div className="status-dropdown">
                        <button
                            className={`status-badge ${getStatusBadgeClass(status)}`}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {status} ▼
                        </button>
                        {showDropdown && (
                            <div className="status-dropdown__menu">
                                {Object.values(JOB_STATUSES).map((statusOption) => (
                                    <div
                                        key={statusOption}
                                        className={`status-dropdown__item ${status === statusOption ? 'status-dropdown__item--active' : ''}`}
                                        onClick={() => handleStatusChange(statusOption)}
                                    >
                                        <span className={`status-badge ${getStatusBadgeClass(statusOption)}`}>
                                            {statusOption}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
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

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type="success"
                    duration={3000}
                    onClose={handleToastClose}
                />
            )}
        </>
    );
}
