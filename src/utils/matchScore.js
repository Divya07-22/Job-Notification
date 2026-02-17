
/**
 * Calculates a match score (0-100) for a job based on user preferences.
 * 
 * Rules:
 * - +25: Role Keyword in Title
 * - +15: Role Keyword in Description
 * - +15: Location Match
 * - +10: Mode Match
 * - +10: Experience Match
 * - +15: Skill Match (Any overlap)
 * - +5: Posted <= 2 days ago
 * - +5: Source is LinkedIn
 * 
 * @param {Object} job - The job object
 * @param {Object} prefs - User preferences object
 * @returns {number} Score between 0 and 100
 */
export const calculateMatchScore = (job, prefs) => {
    if (!prefs) return 0;

    let score = 0;

    // Parse preferences
    const roleKeywords = prefs.roleKeywords
        ? prefs.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k)
        : [];

    const userSkills = prefs.skills
        ? prefs.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s)
        : [];

    const preferredLocations = Array.isArray(prefs.preferredLocations) ? prefs.preferredLocations : [];
    const preferredModes = prefs.preferredMode || {}; // { Remote: true, Hybrid: false... }

    // 1. Role Keyword in Title (+25)
    // Check if any keyword is present in job title
    const titleLower = job.title.toLowerCase();
    const hasTitleMatch = roleKeywords.some(keyword => titleLower.includes(keyword));
    if (hasTitleMatch) score += 25;

    // 2. Role Keyword in Description (+15)
    // Check if any keyword is present in job description
    const descLower = job.description.toLowerCase();
    const hasDescMatch = roleKeywords.some(keyword => descLower.includes(keyword));
    if (hasDescMatch) score += 15;

    // 3. Location Match (+15)
    // If job location is in preferred locations list
    if (preferredLocations.includes(job.location)) {
        score += 15;
    }

    // 4. Mode Match (+10)
    // If job mode is selected in preferences
    // preferredMode is like { Remote: true, Onsite: false }
    if (preferredModes[job.mode]) {
        score += 10;
    }

    // 5. Experience Match (+10)
    // Exact string match
    if (prefs.experienceLevel === job.experience) {
        score += 10;
    }

    // 6. Skill Match (+15)
    // Any overlap between user skills and job skills
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    const hasSkillMatch = userSkills.some(skill =>
        jobSkillsLower.some(jobSkill => jobSkill.includes(skill))
    );
    if (hasSkillMatch) score += 15;

    // 7. Recency (+5)
    // Posted <= 2 days ago
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source (+5)
    // Source is LinkedIn
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
};

/**
 * Helper to extract max salary for sorting
 * Converts "10-18 LPA" -> 18
 * "3-5 LPA" -> 5
 * "₹15k–₹40k/month Internship" -> 4.8 (approx LPA)
 */
export const extractMaxSalary = (job) => {
    const salary = job.salaryRange.toLowerCase();

    // Handle "LPA"
    if (salary.includes('lpa')) {
        const matches = salary.match(/(\d+\.?\d*)\s*lpa/g);
        if (matches) {
            // Get the last number found which usually represents max
            const numbers = salary.match(/(\d+\.?\d*)/g);
            return numbers ? parseFloat(numbers[numbers.length - 1]) : 0;
        }
    }

    // Handle "month" (Internship)
    if (salary.includes('month')) {
        // "15k", "40k" -> convert to LPA approx
        // 40k * 12 = 4.8L
        const numbers = salary.match(/(\d+)k/g);
        if (numbers) {
            // take max
            const maxK = Math.max(...numbers.map(n => parseInt(n.replace('k', ''))));
            return (maxK * 12) / 100000;
        }
    }

    return 0;
};
