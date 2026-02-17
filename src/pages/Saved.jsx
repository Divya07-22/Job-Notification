import { useState, useEffect } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function Saved() {
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(JSON.parse(saved));
        }
    }, []);

    const handleSaveJob = (jobId) => {
        // Only allow removing from this page
        const newSavedJobs = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    const savedJobs = jobsData.filter(job => savedJobIds.includes(job.id));

    return (
        <div className="page-content">
            <h1 className="page-title">Saved Jobs</h1>
            <p className="page-subtitle text-muted">Your shortlisted opportunities.</p>

            {savedJobs.length > 0 ? (
                <div className="job-grid">
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={() => setSelectedJob(job)}
                            onSave={() => handleSaveJob(job.id)}
                            isSaved={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <h3 className="empty-state__title">No saved jobs.</h3>
                    <p className="empty-state__message">
                        Jobs you save from the dashboard will appear here.
                    </p>
                    <div className="empty-state__action">
                        <Link to="/dashboard">
                            <Button variant="primary">Browse Jobs</Button>
                        </Link>
                    </div>
                </div>
            )}

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
}
