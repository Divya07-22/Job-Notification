import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobsData';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import FilterBar from '../components/FilterBar';
import { calculateMatchScore, extractMaxSalary } from '../utils/matchScore';

import { getJobStatus } from '../utils/statusManager';

export default function Dashboard() {
    const [filters, setFilters] = useState({
        keyword: '',
        location: 'all',
        mode: 'all',
        experience: 'all',
        source: 'all',
        status: 'all',
        sort: 'latest'
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
    const [statusUpdateTrigger, setStatusUpdateTrigger] = useState(0);

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

    // Calculate match scores and filter jobs
    const filteredJobs = useMemo(() => {
        // Add match scores to all jobs
        let jobs = jobsData.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));

        // Apply filters
        jobs = jobs.filter(job => {
            // Keyword search
            if (filters.keyword) {
                const keyword = filters.keyword.toLowerCase();
                const matchesTitle = job.title.toLowerCase().includes(keyword);
                const matchesCompany = job.company.toLowerCase().includes(keyword);
                if (!matchesTitle && !matchesCompany) return false;
            }

            // Location filter
            if (filters.location !== 'all' && job.location !== filters.location) {
                return false;
            }

            // Mode filter
            if (filters.mode !== 'all' && job.mode !== filters.mode) {
                return false;
            }

            // Experience filter
            if (filters.experience !== 'all' && job.experience !== filters.experience) {
                return false;
            }

            // Source filter
            if (filters.source !== 'all' && job.source !== filters.source) {
                return false;
            }

            // Status filter
            if (filters.status !== 'all') {
                const jobStatus = getJobStatus(job.id);
                if (jobStatus !== filters.status) {
                    return false;
                }
            }

            // Match threshold filter
            if (showOnlyMatches && preferences && job.matchScore < preferences.minMatchScore) {
                return false;
            }

            return true;
        });

        // Sort jobs
        jobs.sort((a, b) => {
            switch (filters.sort) {
                case 'latest':
                    return a.postedDaysAgo - b.postedDaysAgo;
                case 'oldest':
                    return b.postedDaysAgo - a.postedDaysAgo;
                case 'matchScore':
                    return (b.matchScore || 0) - (a.matchScore || 0);
                case 'salaryHigh':
                    return extractMaxSalary(b) - extractMaxSalary(a);
                case 'salaryLow':
                    return extractMaxSalary(a) - extractMaxSalary(b);
                default:
                    return 0;
            }
        });

        return jobs;
    }, [jobsData, filters, preferences, showOnlyMatches, statusUpdateTrigger]);

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

    return (
        <div className="page-content">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle text-muted">
                Browse and apply to the latest tech jobs in India.
            </p>

            {/* Banner if preferences not set */}
            {!preferences && (
                <div className="banner banner--info">
                    <strong>Set your preferences to activate intelligent matching.</strong>
                    <Link to="/settings" className="banner__link">Go to Settings →</Link>
                </div>
            )}

            {/* Show Only Matches Toggle */}
            {preferences && (
                <div className="toggle-container">
                    <label className="toggle-control">
                        <input
                            type="checkbox"
                            checked={showOnlyMatches}
                            onChange={(e) => setShowOnlyMatches(e.target.checked)}
                        />
                        <span>Show only jobs above my threshold ({preferences.minMatchScore}%)</span>
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
                {filteredJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onView={() => setSelectedJob(job)}
                        onSave={() => handleSaveJob(job.id)}
                        isSaved={savedJobIds.includes(job.id)}
                        matchScore={job.matchScore}
                        showScore={!!preferences}
                        onStatusChange={() => setStatusUpdateTrigger(prev => prev + 1)}
                    />
                ))}
            </div>

            {/* Empty state - no results */}
            {filteredJobs.length === 0 && !showOnlyMatches && (
                <div className="empty-state">
                    <div className="empty-state__content">
                        <h2 className="empty-state__title">No jobs found</h2>
                        <p className="empty-state__message">
                            Try adjusting your filters to see more results.
                        </p>
                    </div>
                </div>
            )}

            {/* Empty state - no matches above threshold */}
            {filteredJobs.length === 0 && showOnlyMatches && (
                <div className="empty-state">
                    <div className="empty-state__content">
                        <h2 className="empty-state__title">No roles match your criteria</h2>
                        <p className="empty-state__message">
                            Adjust filters or lower your threshold in settings to see more jobs.
                        </p>
                        <Link to="/settings" className="btn btn--secondary">
                            Adjust Preferences
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
