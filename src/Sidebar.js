import React, { useState, useEffect } from 'react';
import './styles/Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ content, backButtonPath }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const savedState = localStorage.getItem('isMenuOpen');
        return savedState === 'true';
    });
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

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