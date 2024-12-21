import React, { useState } from 'react';
import './styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ content, backButtonPath }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const savedState = localStorage.getItem('isMenuOpen');
        return savedState === 'true';
    });
    const navigate = useNavigate();

    const toggleMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        localStorage.setItem('isMenuOpen', newState);
    };

    const handleBack = () => {
        if (backButtonPath) {
            navigate(backButtonPath);
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <div className="hamburger-icon" onClick={toggleMenu}>
                ☰
            </div>
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="back-button" onClick={handleBack}>⮜ geri dön</div>
                {content}
            </div>
        </>
    );
};

export default Sidebar;