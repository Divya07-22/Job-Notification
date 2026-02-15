export default function Button({ children, variant = 'primary', size = 'default', onClick, className = '' }) {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? 'btn--primary' : 'btn--secondary';
    const sizeClass = size === 'small' ? 'btn--small' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
