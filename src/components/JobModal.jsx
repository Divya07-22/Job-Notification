import { useEffect } from 'react';

export default function JobModal({ job, onClose }) {
    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!job) return null;

    const handleApply = () => {
        window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>

                <div className="modal-header">
                    <h2 className="modal-title">{job.title}</h2>
                    <p className="modal-company">{job.company}</p>
                </div>

                <div className="modal-meta">
                    <div className="modal-meta__item">
                        <span className="modal-meta__label">Location:</span>
                        <span className="modal-meta__value">{job.location}</span>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__label">Mode:</span>
                        <span className={`badge badge--mode badge--${job.mode.toLowerCase()}`}>
                            {job.mode}
                        </span>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__label">Experience:</span>
                        <span className="modal-meta__value">{job.experience}</span>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__label">Salary:</span>
                        <span className="modal-meta__value">{job.salaryRange}</span>
                    </div>
                    <div className="modal-meta__item">
                        <span className="modal-meta__label">Source:</span>
                        <span className={`badge badge--source badge--${job.source.toLowerCase()}`}>
                            {job.source}
                        </span>
                    </div>
                </div>

                <div className="modal-section">
                    <h3 className="modal-section__title">Skills Required</h3>
                    <div className="modal-skills">
                        {job.skills.map((skill, index) => (
                            <span key={index} className="badge badge--skill">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="modal-section">
                    <h3 className="modal-section__title">Description</h3>
                    <p className="modal-description">{job.description}</p>
                </div>

                <div className="modal-footer">
                    <button className="btn btn--primary btn--large" onClick={handleApply}>
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
}
