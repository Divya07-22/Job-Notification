import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">KodNest Premium</div>

                <button
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`}>
                    <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/saved" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Saved
                    </NavLink>
                    <NavLink to="/digest" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Digest
                    </NavLink>
                    <NavLink to="/settings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Settings
                    </NavLink>
                    <NavLink to="/proof" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Proof
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
