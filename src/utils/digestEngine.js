import { calculateMatchScore } from './matchScore';

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get formatted date for display (e.g., "Saturday, February 15, 2026")
 */
export function getFormattedDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

/**
 * Generate digest: Select top 10 jobs sorted by matchScore (desc) then postedDaysAgo (asc)
 */
export function generateDigest(jobs, preferences) {
    if (!preferences) {
        return null;
    }

    // Calculate match scores for all jobs
    const jobsWithScores = jobs.map(job => ({
        ...job,
        matchScore: calculateMatchScore(job, preferences)
    }));

    // Filter jobs with match score > 0
    const matchingJobs = jobsWithScores.filter(job => job.matchScore > 0);

    if (matchingJobs.length === 0) {
        return null;
    }

    // Sort by:
    // 1. matchScore descending (highest first)
    // 2. postedDaysAgo ascending (most recent first)
    const sortedJobs = matchingJobs.sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
            return b.matchScore - a.matchScore;
        }
        return a.postedDaysAgo - b.postedDaysAgo;
    });

    // Take top 10
    const top10 = sortedJobs.slice(0, 10);

    // Create digest object
    const digest = {
        date: getTodayDateString(),
        generatedAt: new Date().toISOString(),
        jobs: top10
    };

    return digest;
}

/**
 * Save digest to localStorage with date-based key
 */
export function saveDigest(digest) {
    const key = `jobTrackerDigest_${digest.date}`;
    localStorage.setItem(key, JSON.stringify(digest));
}

/**
 * Load today's digest from localStorage
 */
export function loadTodaysDigest() {
    const today = getTodayDateString();
    const key = `jobTrackerDigest_${today}`;
    const saved = localStorage.getItem(key);

    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load digest:', e);
            return null;
        }
    }

    return null;
}

/**
 * Format digest as plain text for clipboard
 */
export function formatDigestForCopy(digest) {
    if (!digest || !digest.jobs) return '';

    let text = 'TOP 10 JOBS FOR YOU — 9AM DIGEST\n';
    text += `${getFormattedDate()}\n\n`;

    digest.jobs.forEach((job, index) => {
        text += `${index + 1}. ${job.title}\n`;
        text += `   Company: ${job.company}\n`;
        text += `   Location: ${job.location}\n`;
        text += `   Experience: ${job.experience}\n`;
        text += `   Match Score: ${job.matchScore}%\n`;
        text += `   Apply: ${job.applyUrl}\n\n`;
    });

    text += '---\n';
    text += 'This digest was generated based on your preferences.\n';

    return text;
}

/**
 * Format digest for email body (URL encoded)
 */
export function formatDigestForEmail(digest) {
    const plainText = formatDigestForCopy(digest);
    return encodeURIComponent(plainText);
}

/**
 * Create mailto link for email draft
 */
export function createEmailDraft(digest) {
    const subject = encodeURIComponent('My 9AM Job Digest');
    const body = formatDigestForEmail(digest);
    return `mailto:?subject=${subject}&body=${body}`;
}
