import Card from './ui/Card';
import Button from './ui/Button';

export default function SecondaryPanel() {
    return (
        <aside className="secondary-panel">
            <Card compact>

                <div className="panel-section">
                    <h3 className="panel-section__title">Current Step</h3>
                    <p className="panel-section__content">
                        Review the design system components and ensure visual consistency across all elements.
                    </p>
                </div>

                <div className="panel-section">
                    <h3 className="panel-section__title">Prompt</h3>
                    <div className="prompt-box">
                        <div className="prompt-box__content">
                            Create a premium SaaS design system with calm aesthetics, consistent spacing, and professional typography.
                        </div>
                    </div>
                </div>

                <div className="panel-section">
                    <h3 className="panel-section__title">Actions</h3>
                    <div className="btn-group" style={{ flexDirection: 'column' }}>
                        <Button variant="secondary" size="small">Copy Prompt</Button>
                        <Button variant="secondary" size="small">Build in Lovable</Button>
                        <Button variant="primary" size="small">It Worked</Button>
                        <Button variant="secondary" size="small">Report Error</Button>
                        <Button variant="secondary" size="small">Add Screenshot</Button>
                    </div>
                </div>

            </Card>
        </aside>
    );
}
