import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';

export default function JobCard({ job, onView, onSave, isSaved, matchScore, showScore }) {

    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--color-success)';
        if (score >= 60) return 'var(--color-warning)'; // Amber
        if (score >= 40) return '#666'; // Neutral
        return '#999'; // Low
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
