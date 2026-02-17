import Button from './ui/Button';

export default function JobModal({ job, onClose }) {
    if (!job) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-lg)',
                borderRadius: 'var(--border-radius)',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 0 }}>{job.title}</h2>
                <h4 className="text-muted" style={{ fontWeight: 500, marginTop: '-10px', marginBottom: 'var(--space-md)' }}>{job.company}</h4>

                <div className="modal-body">
                    <p><strong>Location:</strong> {job.location} ({job.mode})</p>
                    <p><strong>Experience:</strong> {job.experience}</p>
                    <p><strong>Salary:</strong> {job.salaryRange}</p>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-md) 0' }} />

                    <h5>Description</h5>
                    <p style={{ lineHeight: '1.6' }}>{job.description}</p>

                    <h5 style={{ marginTop: 'var(--space-md)' }}>Skills</h5>
                    <div className="skills-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {job.skills.map((skill, index) => (
                            <span key={index} style={{
                                backgroundColor: 'var(--color-background)',
                                border: '1px solid var(--color-border)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="modal-actions" style={{ marginTop: 'var(--space-lg)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">Apply Now</Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
