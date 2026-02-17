import { useState, useEffect, useMemo } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import FilterBar from '../components/FilterBar';
import { calculateMatchScore, extractMaxSalary } from '../utils/matchScore';
import { getJobStatus, updateJobStatus } from '../utils/statusManager';

export default function Dashboard() {
    const [filters, setFilters] = useState({
        keyword: '',
        location: 'all',
        mode: 'all',
        experience: 'all',
        source: 'all',
        status: 'all', // New filter
        sort: 'latest'
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    // Status State Map: { [jobId]: 'Applied' }
    const [statusMap, setStatusMap] = useState({});

    // Toast State
    const [toast, setToast] = useState(null);

    // Load saved jobs & preferences & status
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) setSavedJobIds(JSON.parse(saved));

        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                setPreferences(JSON.parse(savedPrefs));
            } catch (e) {
                console.error('Failed to load preferences:', e);
            }
        }

        // Load all statuses
        const loadedStatusMap = {};
        jobsData.forEach(job => {
            loadedStatusMap[job.id] = getJobStatus(job.id);
        });
        setStatusMap(loadedStatusMap);
    }, []);

    const handleSaveJob = (jobId) => {
        let newSavedJobs;
        if (savedJobIds.includes(jobId)) {
            newSavedJobs = savedJobIds.filter(id => id !== jobId);
        } else {
            newSavedJobs = [...savedJobIds, jobId];
        }
        setSavedJobIds(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    const handleStatusChange = (jobId, newStatus, title, company) => {
        // Update local state
        setStatusMap(prev => ({ ...prev, [jobId]: newStatus }));

        // Persist
        updateJobStatus(jobId, newStatus, title, company);

        // Show Toast
        setToast(`Status updated: ${newStatus}`);
        setTimeout(() => setToast(null), 3000);
    };

    // Calculate match scores and filter jobs
    const filteredJobs = useMemo(() => {
        // Add match scores to all jobs if preferences exist
        let processedJobs = jobsData.map(job => {
            const score = preferences ? calculateMatchScore(job, preferences) : 0;
            return {
                ...job,
                matchScore: score,
                status: statusMap[job.id] || 'Not Applied'
            };
        });

        // Apply filters
        return processedJobs.filter(job => {
            // Keyword
            if (filters.keyword) {
                const lowerKeyword = filters.keyword.toLowerCase();
                const inTitle = job.title.toLowerCase().includes(lowerKeyword);
                const inCompany = job.company.toLowerCase().includes(lowerKeyword);
                const inSkills = job.skills.some(skill => skill.toLowerCase().includes(lowerKeyword));

                if (!inTitle && !inCompany && !inSkills) {
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
            // Status Filter
            if (filters.status !== 'all' && job.status !== filters.status) return false;

            // Match Threshold Toggle
            if (showOnlyMatches && preferences) {
                if (job.matchScore < (preferences.minMatchScore || 40)) return false;
            }

            return true;
        }).sort((a, b) => {
            if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
            if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
            if (filters.sort === 'matchScore') return b.matchScore - a.matchScore;
            if (filters.sort === 'salaryHigh') return extractMaxSalary(b) - extractMaxSalary(a);
            if (filters.sort === 'salaryLow') return extractMaxSalary(a) - extractMaxSalary(b);
            return 0;
        });
    }, [jobsData, filters, preferences, showOnlyMatches, statusMap]);

    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle text-muted">
                Browse and apply to the latest tech jobs in India.
            </p>

            {/* Notification Toast */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 2000,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {toast}
                </div>
            )}

            {!preferences && (
                <div style={{
                    backgroundColor: '#e3f2fd',
                    color: '#0d47a1',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    border: '1px solid #bbdefb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span><strong>Set your preferences to activate intelligent matching.</strong></span>
                    <a href="/settings" style={{ color: '#0d47a1', fontWeight: 'bold', textDecoration: 'none' }}>Go to Settings →</a>
                </div>
            )}

            {preferences && (
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                        <input
                            type="checkbox"
                            checked={showOnlyMatches}
                            onChange={(e) => setShowOnlyMatches(e.target.checked)}
                            style={{ marginRight: '8px', width: '18px', height: '18px' }}
                        />
                        Show only jobs above my threshold ({preferences.minMatchScore || 40}%)
                    </label>
                </div>
            )}

            <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                jobCount={filteredJobs.length}
                showMatchScore={!!preferences}
            />

            <div className="job-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={() => setSelectedJob(job)}
                            onSave={() => handleSaveJob(job.id)}
                            isSaved={savedJobIds.includes(job.id)}
                            matchScore={job.matchScore}
                            showScore={!!preferences}
                            currentStatus={job.status}
                            onStatusChange={handleStatusChange}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <h3 className="empty-state__title">
                            {showOnlyMatches ? "No roles match your criteria." : "No jobs found."}
                        </h3>
                        <p className="empty-state__message">
                            {showOnlyMatches ? "Adjust filters or lower your threshold." : "Try adjusting your filters."}
                        </p>
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
