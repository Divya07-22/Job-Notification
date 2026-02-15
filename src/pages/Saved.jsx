import { useState, useEffect } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';

export default function Saved() {
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    // Load saved jobs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(JSON.parse(saved));
        }
    }, []);

    // Get saved job objects
    const savedJobs = jobsData.filter(job => savedJobIds.includes(job.id));

    const handleUnsaveJob = (jobId) => {
        const newSavedJobs = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    if (savedJobs.length === 0) {
        return (
            <div className="page-content">
                <h1 className="page-title">Saved Jobs</h1>

                <div className="empty-state">
                    <div className="empty-state__content">
                        <h2 className="empty-state__title">No saved jobs yet.</h2>
                        <p className="empty-state__message">
                            Jobs you save will appear here for easy access. Start browsing jobs on the dashboard!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <h1 className="page-title">Saved Jobs</h1>
            <p className="page-subtitle text-muted">
                You have {savedJobs.length} saved {savedJobs.length === 1 ? 'job' : 'jobs'}.
            </p>

            <div className="job-grid">
                {savedJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onView={() => setSelectedJob(job)}
                        onSave={() => handleUnsaveJob(job.id)}
                        isSaved={true}
                    />
                ))}
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
}
