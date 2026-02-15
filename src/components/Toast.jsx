import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) {
                setTimeout(onClose, 300); // Wait for fade out animation
            }
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`toast toast--${type} ${visible ? 'toast--visible' : ''}`}>
            <div className="toast__icon">
                {type === 'success' && '✓'}
                {type === 'info' && 'ℹ'}
                {type === 'error' && '✕'}
            </div>
            <div className="toast__message">{message}</div>
        </div>
    );
}
