import React, { use, useState } from 'react';
import './styles/Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ content }) => {
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
        // If on categories page, navigate to home
        const pathParts = location.pathname.split('/');
        if (pathParts.length === 2 && pathParts[1] !== '') {
            navigate('/'); // Navigate to homepage
        }
    };

    return (
        <>
            {/* Hamburger ikon */}
            <div className="hamburger-icon" onClick={toggleMenu}>
                ☰
            </div>
            {/* Sidebar menü */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="back-button" onClick={handleBack}>← geri dön</div>
                {content}
            </div>
        </>
    );
};

export default Sidebar;
