import React, { useState } from 'react';
import './styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="header-container">
            <div className="header">
                <div className="logo">LOGO</div>
                <input type="text" placeholder="Ürün ara..." className="search-input" />
                {isLoggedIn ? (
                    <div className="account-menu">
                        <button
                            className="account-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Hesabım
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate('/account')}>Hesap Sayfası</button>
                                <button onClick={() => navigate('/favorites')}>Favoriler</button>
                                <button onClick={handleLogout}>Çıkış Yap</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')}>Giriş Yap</button>
                )}
            </div>
        </div>
    );
};

export default Header;