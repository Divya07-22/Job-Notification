import { useState, useEffect, useMemo } from 'react';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import FilterBar from '../components/FilterBar';
import { calculateMatchScore, extractMaxSalary } from '../utils/matchScore';

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
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    // Load saved jobs from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            setSavedJobIds(JSON.parse(saved));
        }
    }, []);

    // Load preferences from localStorage
    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            try {
                setPreferences(JSON.parse(savedPrefs));
            } catch (e) {
                console.error('Failed to load preferences:', e);
            }
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

    // Calculate match scores and filter jobs
    const filteredJobs = useMemo(() => {
        // Add match scores to all jobs if preferences exist
        let processedJobs = jobsData.map(job => {
            const score = preferences ? calculateMatchScore(job, preferences) : 0;
            return { ...job, matchScore: score };
        });

        // Apply filters
        return processedJobs.filter(job => {
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

            // Match Threshold Toggle
            if (showOnlyMatches && preferences) {
                if (job.matchScore < (preferences.minMatchScore || 40)) return false;
            }

            return true;
        }).sort((a, b) => {
            if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo; // Ascending days ago = latest first? No wait. 0 days ago is latest. So ascending is correct.
            if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
            if (filters.sort === 'matchScore') return b.matchScore - a.matchScore; // High to low
            if (filters.sort === 'salaryHigh') return extractMaxSalary(b) - extractMaxSalary(a);
            if (filters.sort === 'salaryLow') return extractMaxSalary(a) - extractMaxSalary(b);
            return 0;
        });
    }, [jobsData, filters, preferences, showOnlyMatches]);

    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle text-muted">
                Browse and apply to the latest tech jobs in India.
            </p>

            {/* Preference Warning Banner */}
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

            {/* Toggle for Match Score */}
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
