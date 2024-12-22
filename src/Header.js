import React, { useState } from 'react';
import './styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user || !user.user_id) {
            console.error('Kullanıcı bilgileri bulunamadı ya da eksik. Lütfen tekrar giriş yapın.');
            alert('Kullanıcı bilgileri bulunamadı. Lütfen tekrar giriş yapın.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.user_id }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Logout başarılı:', data.message);
                localStorage.removeItem('user'); // Kullanıcı bilgilerini kaldır
                setIsLoggedIn(false); // Oturum durumu değiştir
                navigate('/'); // Ana sayfaya yönlendir
            } else {
                console.error('Logout sırasında hata oluştu:', data.error);
            }
        } catch (err) {
            console.error('Logout işlemi sırasında hata oluştu:', err);
        }
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