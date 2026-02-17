import { useState, useEffect } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { getJobStatus, updateJobStatus } from '../utils/statusManager';

export default function Saved() {
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [statusMap, setStatusMap] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(JSON.parse(saved));
        }

        // Load all statuses
        const loadedStatusMap = {};
        jobsData.forEach(job => {
            loadedStatusMap[job.id] = getJobStatus(job.id);
        });
        setStatusMap(loadedStatusMap);
    }, []);

    const handleSaveJob = (jobId) => {
        const newSavedJobs = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    const handleStatusChange = (jobId, newStatus, title, company) => {
        setStatusMap(prev => ({ ...prev, [jobId]: newStatus }));
        updateJobStatus(jobId, newStatus, title, company);
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
                            currentStatus={statusMap[job.id] || 'Not Applied'}
                            onStatusChange={handleStatusChange}
                        // Pass showScore=false here as not explicit req but nice to have? User didn't ask.
                        // But keeping consistent.
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
