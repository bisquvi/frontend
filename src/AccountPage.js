import React from 'react';
import { useState } from 'react';
import Layout from './Layout';

const AccountPage = ({ isLoggedIn, setIsLoggedIn, currentEmail }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');    


    const handlePasswordUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5000/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                
                    newPassword: password,
                }),
                
            });
            console.log(currentEmail);

            const data = await response.json();

            if (response.ok) {
                alert('Şifre başarıyla güncellendi!');
                setPassword('');
            } else {
                alert(`Hata: ${data.message}`);
            }
        } catch (error) {
            console.error('Şifre güncellenirken bir hata oluştu:', error);
            alert('Şifre güncellenirken bir hata oluştu.');
        }
    };

    return (
        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <div style={styles.container}>
                <h1>{currentEmail}'in Hesap Sayfası</h1>

                {/* Şifreyi Güncelleme Bölümü */}
                <div style={styles.section}>
                    <h3>Şifreyi Güncelle</h3>
                    <div style={styles.inputContainer}>
                        <input
                            type="password"
                            placeholder="Yeni Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                        <button
                            onClick={handlePasswordUpdate}
                            style={styles.button}
                        >
                            Güncelle
                        </button>
                    </div>
                </div>

                {/* E-Postayı Güncelleme Bölümü */}
                <div style={styles.section}>
                    <h3>E-Postayı Güncelle</h3>
                    <div style={styles.inputContainer}>
                        <input
                            type="email"
                            placeholder="Yeni E-Posta"
                            style={styles.input}
                        />
                        <button style={styles.button}>
                            Güncelle
                        </button>
                    </div>
                </div>

                {/* Kullanıcı Adını Güncelleme Bölümü */}
                <div style={styles.section}>
                    <h3>Kullanıcı Adını Güncelle</h3>
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Yeni Kullanıcı Adı"
                            style={styles.input}
                        />
                        <button style={styles.button}>
                            Güncelle
                        </button>
                    </div>
                </div>

                {/* Hesabı Silme Butonu */}
                <button style={styles.deleteButton}>
                    Hesabı Sil
                </button>
            </div>
        </Layout>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    section: {
        margin: '20px 0',
        textAlign: 'center',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        width: '300px',
        marginRight: '10px',
    },
    button: {
        padding: '5px 15px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '15px 30px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginTop: '30px',
    },
};

export default AccountPage;

