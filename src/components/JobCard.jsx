import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { getStatusColor } from '../utils/statusManager';

export default function JobCard({ job, onView, onSave, isSaved, matchScore, showScore, currentStatus, onStatusChange }) {

    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--color-success)';
        if (score >= 60) return 'var(--color-warning)';
        if (score >= 40) return '#666';
        return '#999';
    };

    const handleStatusClick = (e, status) => {
        e.stopPropagation(); // Prevent card click
        onStatusChange(job.id, status, job.title, job.company);
    };

    return (
        <Card>
            <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 className="job-title" style={{ marginTop: 0, marginBottom: '4px', fontSize: '1.25rem' }}>{job.title}</h3>
                        {showScore && matchScore !== undefined && (
                            <span style={{
                                backgroundColor: getScoreColor(matchScore),
                                color: 'white',
                                fontSize: '0.75rem',
                                padding: '2px 6px',
                                borderRadius: '12px',
                                fontWeight: 'bold'
                            }}>
                                {matchScore}% Match
                            </span>
                        )}
                        {currentStatus && currentStatus !== 'Not Applied' && (
                            <span style={{
                                backgroundColor: getStatusColor(currentStatus),
                                color: 'white',
                                fontSize: '0.75rem',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                {currentStatus}
                            </span>
                        )}
                    </div>
                    <p className="job-company text-muted" style={{ margin: 0, fontWeight: 500 }}>{job.company}</p>
                </div>
                <Badge status={job.source} />
            </div>

            <div className="job-details" style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-md)', fontSize: '0.9rem', color: '#555' }}>
                <span className="detail-item">📍 {job.location} ({job.mode})</span>
                <span className="detail-item">💼 {job.experience}</span>
                <span className="detail-item">💰 {job.salaryRange}</span>
                <span className="detail-item">🕒 {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}</span>
            </div>

            {/* Status Actions */}
            <div className="status-actions" style={{ marginBottom: 'var(--space-sm)', padding: '8px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                <span style={{ fontSize: '0.8rem', marginRight: '8px', color: '#777' }}>Status:</span>
                {['Not Applied', 'Applied', 'Rejected', 'Selected'].map(status => (
                    <button
                        key={status}
                        onClick={(e) => handleStatusClick(e, status)}
                        style={{
                            background: currentStatus === status ? getStatusColor(status) : 'transparent',
                            color: currentStatus === status ? 'white' : '#555',
                            border: `1px solid ${currentStatus === status ? getStatusColor(status) : '#ddd'}`,
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            marginRight: '4px',
                            fontWeight: currentStatus === status ? 'bold' : 'normal'
                        }}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="job-actions" style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <Button variant="secondary" size="small" onClick={onView}>View</Button>
                <Button variant={isSaved ? "primary" : "secondary"} size="small" onClick={onSave}>
                    {isSaved ? "Saved" : "Save"}
                </Button>
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="small">Apply</Button>
                </a>
            </div>
        </Card>
    );
}
