/**
 * Calculate match score for a job based on user preferences
 * 
 * Scoring Rules (Exact):
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description (case-insensitive)
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * Maximum score: 100
 */

export function calculateMatchScore(job, preferences) {
    // If no preferences, return 0
    if (!preferences) return 0;

    let score = 0;

    // Parse user inputs (comma-separated strings to arrays)
    const roleKeywords = preferences.roleKeywords
        ? preferences.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k)
        : [];

    const userSkills = preferences.skills
        ? preferences.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
        : [];

    const preferredLocations = preferences.preferredLocations || [];
    const preferredMode = preferences.preferredMode || [];
    const experienceLevel = preferences.experienceLevel || '';

    // Rule 1: +25 if any roleKeyword appears in job.title (case-insensitive)
    if (roleKeywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const titleMatch = roleKeywords.some(keyword => titleLower.includes(keyword));
        if (titleMatch) {
            score += 25;
        }
    }

    // Rule 2: +15 if any roleKeyword appears in job.description (case-insensitive)
    if (roleKeywords.length > 0) {
        const descLower = job.description.toLowerCase();
        const descMatch = roleKeywords.some(keyword => descLower.includes(keyword));
        if (descMatch) {
            score += 15;
        }
    }

    // Rule 3: +15 if job.location matches preferredLocations
    if (preferredLocations.length > 0) {
        const locationMatch = preferredLocations.includes(job.location);
        if (locationMatch) {
            score += 15;
        }
    }

    // Rule 4: +10 if job.mode matches preferredMode
    if (preferredMode.length > 0) {
        const modeMatch = preferredMode.includes(job.mode);
        if (modeMatch) {
            score += 10;
        }
    }

    // Rule 5: +10 if job.experience matches experienceLevel
    if (experienceLevel && job.experience === experienceLevel) {
        score += 10;
    }

    // Rule 6: +15 if overlap between job.skills and user.skills (any match)
    if (userSkills.length > 0 && job.skills && job.skills.length > 0) {
        const jobSkillsLower = job.skills.map(s => s.toLowerCase());
        const skillsOverlap = userSkills.some(userSkill =>
            jobSkillsLower.some(jobSkill => jobSkill.includes(userSkill) || userSkill.includes(jobSkill))
        );
        if (skillsOverlap) {
            score += 15;
        }
    }

    // Rule 7: +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // Rule 8: +5 if source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
}

/**
 * Get match score badge class based on score
 */
export function getMatchBadgeClass(score) {
    if (score >= 80) return 'match-badge--high';      // Green
    if (score >= 60) return 'match-badge--medium';    // Amber
    if (score >= 40) return 'match-badge--low';       // Neutral
    return 'match-badge--verylow';                    // Grey
}

/**
 * Extract maximum salary value for sorting
 * Handles formats like:
 * - "10-18 LPA" → 18
 * - "₹25k-₹50k/month" → 50
 * - "3.5-4.5 LPA" → 4.5
 */
export function extractMaxSalary(job) {
    const salaryRange = job.salaryRange || '';

    // Extract all numbers from the string
    const numbers = salaryRange.match(/[\d.]+/g);
    if (!numbers || numbers.length === 0) return 0;

    // Convert to numbers and get the maximum
    const numericValues = numbers.map(n => parseFloat(n));
    const maxValue = Math.max(...numericValues);

    // If it's in LPA format, return as is
    if (salaryRange.includes('LPA')) {
        return maxValue;
    }

    // If it's in k/month format, convert to annual (rough estimate)
    if (salaryRange.includes('k') && salaryRange.includes('month')) {
        return maxValue * 12 / 100; // Convert to LPA equivalent
    }

    return maxValue;
}
