/**
 * Job Status Manager
 * Manages job application status tracking with localStorage persistence
 */

const STATUS_STORAGE_KEY = 'jobTrackerStatus';
const HISTORY_STORAGE_KEY = 'jobTrackerStatusHistory';

export const JOB_STATUSES = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    REJECTED: 'Rejected',
    SELECTED: 'Selected'
};

/**
 * Get status for a specific job
 * @param {number} jobId - Job ID
 * @returns {string} Status (defaults to "Not Applied")
 */
export function getJobStatus(jobId) {
    try {
        const statuses = JSON.parse(localStorage.getItem(STATUS_STORAGE_KEY) || '{}');
        return statuses[jobId] || JOB_STATUSES.NOT_APPLIED;
    } catch (e) {
        console.error('Failed to load job status:', e);
        return JOB_STATUSES.NOT_APPLIED;
    }
}

/**
 * Set status for a specific job
 * @param {number} jobId - Job ID
 * @param {string} status - New status
 */
export function setJobStatus(jobId, status) {
    try {
        const statuses = JSON.parse(localStorage.getItem(STATUS_STORAGE_KEY) || '{}');
        statuses[jobId] = status;
        localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(statuses));
    } catch (e) {
        console.error('Failed to save job status:', e);
    }
}

/**
 * Get all job statuses
 * @returns {Object} Object mapping jobId to status
 */
export function getAllStatuses() {
    try {
        return JSON.parse(localStorage.getItem(STATUS_STORAGE_KEY) || '{}');
    } catch (e) {
        console.error('Failed to load all statuses:', e);
        return {};
    }
}

/**
 * Add a status change to history
 * @param {number} jobId - Job ID
 * @param {string} status - New status
 * @param {string} jobTitle - Job title
 * @param {string} company - Company name
 */
export function addStatusChange(jobId, status, jobTitle, company) {
    try {
        const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');

        const change = {
            jobId,
            jobTitle,
            company,
            status,
            timestamp: new Date().toISOString()
        };

        // Add to beginning of array
        history.unshift(change);

        // Keep only last 50 changes
        const trimmedHistory = history.slice(0, 50);

        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmedHistory));
    } catch (e) {
        console.error('Failed to save status change:', e);
    }
}

/**
 * Get status change history
 * @param {number} limit - Maximum number of entries to return
 * @returns {Array} Array of status changes
 */
export function getStatusHistory(limit = 10) {
    try {
        const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');
        return history.slice(0, limit);
    } catch (e) {
        console.error('Failed to load status history:', e);
        return [];
    }
}

/**
 * Clear all status data
 */
export function clearAllStatuses() {
    try {
        localStorage.removeItem(STATUS_STORAGE_KEY);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear statuses:', e);
    }
}

/**
 * Get badge color class for status
 * @param {string} status - Job status
 * @returns {string} CSS class name
 */
export function getStatusBadgeClass(status) {
    switch (status) {
        case JOB_STATUSES.APPLIED:
            return 'status-badge--applied';
        case JOB_STATUSES.REJECTED:
            return 'status-badge--rejected';
        case JOB_STATUSES.SELECTED:
            return 'status-badge--selected';
        case JOB_STATUSES.NOT_APPLIED:
        default:
            return 'status-badge--not-applied';
    }
}

/**
 * Format timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted relative time
 */
export function formatTimestamp(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
