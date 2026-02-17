
const STATUS_KEY = 'jobTrackerStatus';
const HISTORY_KEY = 'jobTrackerStatusHistory';

export const getJobStatus = (jobId) => {
    const stored = localStorage.getItem(STATUS_KEY);
    if (!stored) return 'Not Applied';

    const statusMap = JSON.parse(stored);
    return statusMap[jobId] || 'Not Applied';
};

export const updateJobStatus = (jobId, newStatus, jobTitle, jobCompany) => {
    // 1. Update Status Map
    const stored = localStorage.getItem(STATUS_KEY);
    const statusMap = stored ? JSON.parse(stored) : {};

    statusMap[jobId] = newStatus;
    localStorage.setItem(STATUS_KEY, JSON.stringify(statusMap));

    // 2. Add to History (for Digest)
    if (newStatus !== 'Not Applied') {
        const historyStored = localStorage.getItem(HISTORY_KEY);
        const history = historyStored ? JSON.parse(historyStored) : [];

        const newEntry = {
            jobId,
            jobTitle,
            jobCompany,
            status: newStatus,
            date: new Date().toISOString()
        };

        // Prepend and limit to 50 items
        const updatedHistory = [newEntry, ...history].slice(0, 50);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    }

    return newStatus;
};

export const getStatusHistory = () => {
    const historyStored = localStorage.getItem(HISTORY_KEY);
    return historyStored ? JSON.parse(historyStored) : [];
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'Applied': return 'var(--color-primary)';  // Blueish
        case 'Rejected': return 'var(--color-danger)';   // Red
        case 'Selected': return 'var(--color-success)';  // Green
        default: return '#999'; // Neutral
    }
};
