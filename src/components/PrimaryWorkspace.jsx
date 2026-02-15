import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Badge from './ui/Badge';

export default function PrimaryWorkspace() {
    return (
        <div className="primary-workspace">

            {/* Typography Showcase */}
            <Card title="Typography System">
                <h1>Heading 1 - Playfair Display</h1>
                <h2>Heading 2 - Playfair Display</h2>
                <h3>Heading 3 - Playfair Display</h3>
                <p>Body text uses Inter at 18px with a relaxed line-height of 1.8. This ensures excellent readability and a calm, professional feel. Text blocks are constrained to 720px maximum width for optimal reading experience.</p>
                <p className="text-small text-muted">Small text for supporting information and metadata.</p>
            </Card>

            {/* Color System */}
            <Card title="Color Palette">
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', height: '80px', borderRadius: 'var(--border-radius)', marginBottom: 'var(--space-xs)' }}></div>
                        <p className="text-small"><strong>Background</strong><br />#F7F6F3</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ backgroundColor: 'var(--color-accent)', height: '80px', borderRadius: 'var(--border-radius)', marginBottom: 'var(--space-xs)' }}></div>
                        <p className="text-small"><strong>Accent</strong><br />#8B0000</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ backgroundColor: 'var(--color-success)', height: '80px', borderRadius: 'var(--border-radius)', marginBottom: 'var(--space-xs)' }}></div>
                        <p className="text-small"><strong>Success</strong><br />#4A6741</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ backgroundColor: 'var(--color-warning)', height: '80px', borderRadius: 'var(--border-radius)', marginBottom: 'var(--space-xs)' }}></div>
                        <p className="text-small"><strong>Warning</strong><br />#9A6B3E</p>
                    </div>
                </div>
            </Card>

            {/* Buttons */}
            <Card title="Buttons">
                <div className="btn-group mb-md">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                </div>
                <div className="btn-group">
                    <Button variant="primary" size="small">Small Primary</Button>
                    <Button variant="secondary" size="small">Small Secondary</Button>
                </div>
            </Card>

            {/* Form Elements */}
            <Card title="Form Elements">
                <Input label="Project Name" placeholder="Enter project name" />
                <Input label="Description" placeholder="Describe your project" multiline />
            </Card>

            {/* Status Badges */}
            <Card title="Status Indicators">
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                    <Badge status="Not Started" />
                    <Badge status="In Progress" />
                    <Badge status="Shipped" />
                </div>
            </Card>

            {/* Error State */}
            <div className="error-state">
                <div className="error-state__title">Build Failed</div>
                <div className="error-state__message">The deployment process encountered an error. Your configuration file is missing required environment variables.</div>
                <div className="error-state__action">→ Check your .env file and ensure all required variables are set.</div>
            </div>

            {/* Empty State */}
            <Card>
                <div className="empty-state">
                    <h3 className="empty-state__title">No Projects Yet</h3>
                    <p className="empty-state__message">Create your first project to get started with KodNest Premium Build System.</p>
                    <div className="empty-state__action">
                        <Button variant="primary">Create Project</Button>
                    </div>
                </div>
            </Card>

        </div>
    );
}
