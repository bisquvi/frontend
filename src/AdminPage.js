import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/home");
      } else {
        alert(data.message);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Sunucu hatası, lütfen daha sonra tekrar deneyin!");
    }
  };
  

  const goBack = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.backButton}>
        &#11164; Geri
      </button>
      <h2>Admin Paneli</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "5px 10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default AdminPage;
