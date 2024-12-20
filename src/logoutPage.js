import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
    
                if (user) {
                    const response = await fetch('http://localhost:5000/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.user_id }),
                    });
    
                    const data = await response.json();
    
                    if (response.ok && data.message === 'Logout başarılı.') {
                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                        navigate('/');
                    } else {
                        console.error('Çıkış yapılırken hata oluştu:', data.error);
                    }
                } else {
                    console.error('Kullanıcı bilgileri bulunamadı ya da eksik.');
                }
            } catch (error) {
                console.error('Çıkış işlemi sırasında hata oluştu:', error);
            }
        };
    
        logout();
    }, [navigate, setIsLoggedIn]);

    return (
        <div>
            <p>Çıkış yapılıyor...</p>
        </div>
    );
};

export default LogoutPage;