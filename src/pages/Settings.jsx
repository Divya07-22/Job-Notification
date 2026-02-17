import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Settings() {
    return (
        <div className="page-content">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle text-muted mb-lg">
                Configure your job preferences to get precision-matched recommendations.
            </p>

            <div className="settings-form">
                <Card title="Job Preferences">
                    <div className="form-section">
                        <Input
                            label="Role Keywords"
                            placeholder="e.g. Frontend Developer, ReactJS, UI Engineer"
                        />
                        <p className="form-hint">Comma-separated keys to match against job titles.</p>
                    </div>

                    <div className="form-section">
                        <Input
                            label="Preferred Locations"
                            placeholder="e.g. Bangalore, Remote, Hyderabad"
                        />
                        <p className="form-hint">Cities where you want to work.</p>
                    </div>

                    <div className="form-section">
                        <label className="input-label">Work Mode</label>
                        <div className="input-group" style={{ display: 'flex', gap: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" /> Remote
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" /> Hybrid
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" /> Onsite
                            </label>
                        </div>
                    </div>

                    <div className="form-section">
                        <label className="input-label">Experience Level</label>
                        <select className="input">
                            <option>Fresher (0 years)</option>
                            <option>0-1 Years</option>
                            <option>1-3 Years</option>
                            <option>3+ Years</option>
                        </select>
                    </div>

                    <div className="form-actions mt-lg">
                        <Button disabled>Save Preferences (Coming Soon)</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
