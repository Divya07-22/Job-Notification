import { useState, useEffect } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import FilterBar from '../components/FilterBar';

export default function Dashboard() {
    const [filters, setFilters] = useState({
        keyword: '',
        location: 'all',
        mode: 'all',
        experience: 'all',
        source: 'all',
        sort: 'latest'
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);

    // Load saved jobs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(JSON.parse(saved));
        }
    }, []);

    const handleSaveJob = (jobId) => {
        let newSavedJobs;
        if (savedJobIds.includes(jobId)) {
            // Unsave
            newSavedJobs = savedJobIds.filter(id => id !== jobId);
        } else {
            // Save
            newSavedJobs = [...savedJobIds, jobId];
        }
        setSavedJobIds(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    // Filter Logic
    const filteredJobs = jobsData.filter(job => {
        // Keyword
        if (filters.keyword) {
            const lowerKeyword = filters.keyword.toLowerCase();
            if (!job.title.toLowerCase().includes(lowerKeyword) &&
                !job.company.toLowerCase().includes(lowerKeyword)) {
                return false;
            }
        }
        // Location
        if (filters.location !== 'all' && job.location !== filters.location) return false;
        // Mode
        if (filters.mode !== 'all' && job.mode !== filters.mode) return false;
        // Experience
        if (filters.experience !== 'all' && job.experience !== filters.experience) return false;
        // Source
        if (filters.source !== 'all' && job.source !== filters.source) return false;

        return true;
    }).sort((a, b) => {
        if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
        if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
        return 0;
    });

    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle text-muted">
                Browse and apply to the latest tech jobs in India.
            </p>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <div className="job-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={() => setSelectedJob(job)}
                            onSave={() => handleSaveJob(job.id)}
                            isSaved={savedJobIds.includes(job.id)}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <h3 className="empty-state__title">No jobs found.</h3>
                        <p className="empty-state__message">Try adjusting your filters.</p>
                    </div>
                )}
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
