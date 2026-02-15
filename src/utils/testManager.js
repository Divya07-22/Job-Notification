/**
 * Test Checklist Manager
 * Manages the state of the built-in test checklist
 */

const TEST_STATUS_KEY = 'jobTrackerTestStatus';

export const TEST_ITEMS = [
    {
        id: 'pref_persist',
        label: 'Preferences persist after refresh',
        tooltip: 'Change preferences in Settings, refresh the page, and verify they are still set.'
    },
    {
        id: 'score_calc',
        label: 'Match score calculates correctly',
        tooltip: 'Verify that jobs with matching keywords/skills have higher scores.'
    },
    {
        id: 'toggle_work',
        label: '"Show only matches" toggle works',
        tooltip: 'Enable the toggle on Dashboard and ensure only high-match jobs are shown.'
    },
    {
        id: 'save_persist',
        label: 'Save job persists after refresh',
        tooltip: 'Save a job, refresh, and check if it is still in the Saved tab.'
    },
    {
        id: 'apply_tab',
        label: 'Apply opens in new tab',
        tooltip: 'Click Apply button and confirm it opens the link in a new browser tab.'
    },
    {
        id: 'status_persist',
        label: 'Status update persists after refresh',
        tooltip: 'Change a job status, refresh, and confirm the badge remains correct.'
    },
    {
        id: 'status_filter',
        label: 'Status filter works correctly',
        tooltip: 'Filter by "Applied" and ensure only applied jobs are visible.'
    },
    {
        id: 'digest_gen',
        label: 'Digest generates top 10 by score',
        tooltip: 'Generate a digest and verify it picks the highest scoring jobs.'
    },
    {
        id: 'digest_persist',
        label: 'Digest persists for the day',
        tooltip: 'Refresh the Digest page and ensure the same digest is loaded.'
    },
    {
        id: 'no_console',
        label: 'No console errors on main pages',
        tooltip: 'Open DevTools (F12) > Console and check for red errors while navigating.'
    }
];

/**
 * Get current test status
 * @returns {Object} Map of testId -> boolean
 */
export function getTestStatus() {
    try {
        return JSON.parse(localStorage.getItem(TEST_STATUS_KEY) || '{}');
    } catch (e) {
        console.error('Failed to load test status:', e);
        return {};
    }
}

/**
 * Set status for a test item
 * @param {string} testId 
 * @param {boolean} isChecked 
 */
export function setTestItem(testId, isChecked) {
    try {
        const status = getTestStatus();
        status[testId] = isChecked;
        localStorage.setItem(TEST_STATUS_KEY, JSON.stringify(status));

        // Dispatch storage event for cross-tab/component updates
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error('Failed to save test status:', e);
    }
}

/**
 * Reset all test statuses
 */
export function resetTests() {
    try {
        localStorage.removeItem(TEST_STATUS_KEY);
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error('Failed to reset tests:', e);
    }
}

/**
 * Check if the product is ready to ship
 * @returns {boolean} True if all 10 tests are passed
 */
export function isReadyToShip() {
    const status = getTestStatus();
    return TEST_ITEMS.every(item => status[item.id] === true);
}

/**
 * Get progress counts
 * @returns {Object} { passed, total }
 */
export function getTestProgress() {
    const status = getTestStatus();
    const passed = TEST_ITEMS.filter(item => status[item.id] === true).length;
    return {
        passed,
        total: TEST_ITEMS.length
    };
}
