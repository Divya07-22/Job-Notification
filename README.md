# KodNest Premium Job Notification Tracker

A sophisticated, persistent job tracking application built with **React** and **Vite**. This project features intelligent job matching, a daily digest simulator, and a complete application lifecycle from search to submission.

> **🚀 Live Deployment:** [https://job-notification-git-main-divya-vs-projects-a88519ac.vercel.app](https://job-notification-git-main-divya-vs-projects-a88519ac.vercel.app)

---

## 🎯 Project Overview

This application was built in **9 Distinct Tasks**, evolving from a simple skeleton to a production-ready system.

### 1. Premium Design System
-   **Philosophy:** "Calm, Intentional, Coherent, Confident."
-   **Typography:** Playfair Display (Serif headers) + Inter (Sans-serif body).
-   **Palette:** Off-white backgrounds (`#F7F6F3`) with Deep Red accents (`#8B0000`).
-   **Components:** Custom Buttons, Cards, Badges, and Inputs.

### 2. Route Skeleton
-   Full client-side routing using `react-router-dom`.
-   **Pages:** Home, Dashboard, Saved, Digest, Settings, Proof, Test, Ship.

### 3. Realistic Job Data
-   **Database:** A robust JSON dataset of **60 unique jobs**.
-   **Attributes:** Companies (Google, Swiggy, etc.), Roles, Salaries, Locations, and Skill Tags.

### 4. Advanced Dashboard
-   **Filtering:** Filter by Location (Remote/Hybrid), Experience (Fresher/Pro), and Status.
-   **Search:** Smart search that checks **Title**, **Company**, AND **Skills** (e.g., searching "React" finds jobs requiring React).
-   **Sorting:** Sort by Match Score, Salary, or Date.

### 5. Intelligent Match Score Engine
-   **Logic:** Calculates a % score based on your **Settings**.
    -   +25 points for matching Role keywords.
    -   +15 points for matching Location.
-   **Visuals:** Color-coded badges (Green >80%, Amber >60%, Grey <40%).
-   **Toggle:** "Show only jobs above my threshold" filter.

### 6. Daily Digest Simulator
-   **Feature:** Generates a curated list of "Top 10 Jobs" for the day.
-   **Persistence:** The digest is locked for 24 hours (simulating a real daily email).
-   **Actions:**
    -   **Create Email Draft:** Copies top 5 jobs to clipboard and opens mail client.
    -   **Copy to Clipboard:** Copies the entire list for sharing.

### 7. Status Tracking System
-   **Workflow:** Track applications as `Applied` -> `Rejected` -> `Selected`.
-   **History:** All status changes are logged and visible in the **Digest** history section.
-   **Persistence:** Statuses survive page reloads (stored in `localStorage`).

### 8. Saved Jobs
-   **Bookmarking:** Save interesting jobs to a dedicated "Saved" tab.
-   **Toggle:** simple heart/bookmark icon interaction.

### 9. Proof & Submission Gate
-   **Quality Assurance:** A built-in **Test Checklist** (`/jt/07-test`).
-   **Shipping Rule:** The **Ship Page** (`/jt/08-ship`) is **LOCKED** until all 10 tests are passed.
-   **Final Artifacts:** Collects Lovable/GitHub/Deploy links and validates them.
-   **Submission:** Generates a formatted text block for final handoff.

---

## 🛠️ Tech Stack

-   **Frontend:** React 18, Vite
-   **Styling:** Vanilla CSS (Variables & Layouts)
-   **State:** React Hooks (`useState`, `useEffect`, `useMemo`)
-   **Routing:** React Router v6
-   **Persistence:** Browser LocalStorage

---

## 📦 Installation

To run this project locally:

```bash
# 1. Clone the repository
git clone https://github.com/Divya07-22/Job-Notification.git

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

---

## 🧪 Verification

1.  Go to **/settings** and set "React" as your preferred role.
2.  Go to **/dashboard** and see the match scores update.
3.  Go to **/digest** and generate your daily briefing.
4.  Go to **/jt/07-test** and complete the checklist to unlock shipping.

---

**Built with ❤️ by KodNest Premium Systems.**
