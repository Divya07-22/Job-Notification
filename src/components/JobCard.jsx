import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';

export default function JobCard({ job, onView, onSave, isSaved }) {
    return (
        <Card>
            <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                <div>
                    <h3 className="job-title" style={{ marginTop: 0, marginBottom: '4px', fontSize: '1.25rem' }}>{job.title}</h3>
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
