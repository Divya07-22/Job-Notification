import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="page-content">
            <div className="landing-hero">
                <h1 className="landing-hero__title">Stop Missing The Right Jobs.</h1>
                <p className="landing-hero__subtitle">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
                <Link to="/settings" className="btn btn--primary btn--large">
                    Start Tracking
                </Link>
            </div>
        </div>
    );
}
