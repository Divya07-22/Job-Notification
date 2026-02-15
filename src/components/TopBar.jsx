import Badge from './ui/Badge';
import ProgressIndicator from './ui/ProgressIndicator';

export default function TopBar() {
    return (
        <header className="top-bar">
            <div className="top-bar__project">KodNest Premium</div>
            <div className="top-bar__progress">
                <ProgressIndicator current={3} total={8} />
            </div>
            <div className="top-bar__status">
                <Badge status="In Progress" />
            </div>
        </header>
    );
}
