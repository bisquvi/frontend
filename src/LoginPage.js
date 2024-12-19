import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const pastelColors = [
            '#DCD6F7',
            '#FCE38A',
            '#EAFFD0',
            '#95E1D3',
            '#D3E0DC',
            '#E9EDC9'
        ];

        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

        document.body.style.backgroundColor = randomColor;

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError('E-posta ve şifre boş bırakılamaz.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.message === 'Login başarılı.') {
                setError('');
                setIsLoggedIn(true);
                localStorage.setItem('user', JSON.stringify({ email }));
                navigate('/');
            } else {
                setError(data.error || 'Geçersiz e-posta veya şifre.');
            }
        } catch (err) {
            console.error('Login işlemi sırasında hata oluştu:', err);
            setError('Sunucuyla bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '30px',
                    width: '350px',
                    textAlign: 'center',
                }}
            >
                <p style={{ marginTop: '5px', marginRight: '300px', fontSize: '14px' }}>
                    <span
                        style={{ color: '#6c63ff', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        &#11164; Geri
                    </span>
                </p>

                <h2 style={{ marginBottom: '20px', color: '#4a4a4a' }}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#6c63ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Login
                </button>
                <p style={{ marginTop: '20px', fontSize: '14px' }}>
                    Not a member?{' '}
                    <span
                        style={{ color: '#6c63ff', cursor: 'pointer' }}
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;