export default function Badge({ status }) {
    const statusClass = `badge--${status.toLowerCase().replace(' ', '-')}`;

    return (
        <span className={`badge ${statusClass}`}>
            {status}
        </span>
    );
}
