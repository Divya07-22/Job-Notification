export default function Card({ title, children, compact = false }) {
    return (
        <div className={`card ${compact ? 'card--compact' : ''}`}>
            {title && <h2 className="card__title">{title}</h2>}
            <div className="card__content">
                {children}
            </div>
        </div>
    );
}
