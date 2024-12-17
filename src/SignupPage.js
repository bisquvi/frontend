import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const pastelColors = [
            '#FFD1DC',
            '#D1E8E2',
            '#FFB3BA',
            '#B5EAEA',
            '#FFEC8B',
            '#C1E1DC'
        ];

        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

        document.body.style.backgroundColor = randomColor;

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleSignUp = async () => {
        if (!username.trim() || !email.trim() || !password.trim()) {
            setError('Şifre, kullanıcı adı ve E-mail alanlarını doldurunuz.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setError('');
                alert('Sign up successful!');
                navigate('/login');
            } else {
                setError(data.error || 'An error occurred during sign up.');
            }
        } catch (error) {
            setError('An error occurred during sign up.');
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
                <h2 style={{ marginBottom: '20px', color: '#4a4a4a' }}>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
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
                    onClick={handleSignUp}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#00796b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Sign Up
                </button>
                <p style={{ marginTop: '20px', fontSize: '14px' }}>
                    Already have an account?{' '}
                    <span
                        style={{ color: '#00796b', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;