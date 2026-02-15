import { isReadyToShip } from './testManager';

const PROOF_KEY = 'jobTrackerProof';
const SHIPPED_KEY = 'jobTrackerShipped';

// Project Milestones
export const PROJECT_STEPS = [
    { id: 1, label: 'Project Setup & Routing', status: 'completed' },
    { id: 2, label: 'Job Data & Job Card UI', status: 'completed' },
    { id: 3, label: 'Match Scoring System', status: 'completed' },
    { id: 4, label: 'Daily Digest Engine', status: 'completed' },
    { id: 5, label: 'Status Tracking & Filters', status: 'completed' },
    { id: 6, label: 'Smart Notifications', status: 'completed' },
    { id: 7, label: 'Test Checklist System', status: 'completed' },
    { id: 8, label: 'Final Proof & Ship', status: 'pending' }
];

export function getProofData() {
    try {
        const data = JSON.parse(localStorage.getItem(PROOF_KEY) || '{}');
        const isShipped = localStorage.getItem(SHIPPED_KEY) === 'true';
        return {
            lovable: data.lovable || '',
            github: data.github || '',
            deployed: data.deployed || '',
            isShipped
        };
    } catch (e) {
        return { lovable: '', github: '', deployed: '', isShipped: false };
    }
}

export function saveProofLinks(links) {
    try {
        const current = getProofData();
        const newData = { ...current, ...links };
        delete newData.isShipped;
        localStorage.setItem(PROOF_KEY, JSON.stringify(newData));
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error('Failed to save proof links:', e);
    }
}

export function validateUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export function shipProject() {
    try {
        if (canShipProject()) {
            localStorage.setItem(SHIPPED_KEY, 'true');
            window.dispatchEvent(new Event('storage'));
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export function canShipProject() {
    const { lovable, github, deployed } = getProofData();
    const linksValid = validateUrl(lovable) && validateUrl(github) && validateUrl(deployed);
    const testsPassed = isReadyToShip();
    return linksValid && testsPassed;
}

export function generateSubmissionText() {
    const { lovable, github, deployed } = getProofData();
    return `Job Notification Tracker — Final Submission

Lovable Project:
${lovable}

GitHub Repository:
${github}

Live Deployment:
${deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;
}
