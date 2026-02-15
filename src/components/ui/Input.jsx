export default function Input({ label, type = 'text', placeholder, value, onChange, multiline = false }) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            {multiline ? (
                <textarea
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}
