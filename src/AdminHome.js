import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [hovered, setHovered] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
        throw new Error(`API isteği başarısız oldu, durum kodu: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Kullanıcılar çekilemedi:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logs");
      if (!response.ok) {
        throw new Error(`API isteği başarısız oldu, durum kodu: ${response.status}`);
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Loglar çekilemedi:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admins");
      if (!response.ok) {
        throw new Error(`API isteği başarısız oldu, durum kodu: ${response.status}`);
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Adminler çekilemedi:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Kullanıcı silinemedi, durum kodu: ${response.status}`);
      }

      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error('Kullanıcı silinemedi:', error);
    }
  };

  const addAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: newAdminUsername,
          password: newAdminPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Admin eklenemedi, durum kodu: ${response.status}`);
      }

      alert("Yeni admin başarıyla eklendi!");
      setNewAdminUsername("");
      setNewAdminPassword("");
      fetchAdmins();
    } catch (error) {
      console.error("Admin eklenemedi:", error);
    }
  };

  useEffect(() => {
    if (selectedTab === "users") {
      fetchUsers();
    } else if (selectedTab === "otherManagement") {
      fetchLogs();
    } else if (selectedTab === "adminAdd") {
      fetchAdmins();
    }
  }, [selectedTab]);

  return (
    <div style={styles.container}>
      <div style={styles.sidePanel}>
        <button
          style={{
            ...styles.sideButton,
            ...(hovered === 0 ? styles.sideButtonHover : {}),
          }}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setSelectedTab("users")}
        >
          Kullanıcıları Yönet
        </button>
        <button
          style={{
            ...styles.sideButton,
            ...(hovered === 1 ? styles.sideButtonHover : {}),
          }}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setSelectedTab("adminAdd")}
        >
          Admin Ekle
        </button>
        <button
          style={{
            ...styles.sideButton,
            ...(hovered === 2 ? styles.sideButtonHover : {}),
          }}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setSelectedTab("otherManagement")}
        >
          User Logs
        </button>
      </div>
      <div style={styles.mainContent}>
        <h1 style={styles.header}>Admin Paneli</h1>

        <div style={styles.tabs}>
          {selectedTab === "users" && users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.user_id} style={styles.listItem}>
                  {user.name} - {user.email}
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteUser(user.user_id)}
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          ) : selectedTab === "users" && users.length === 0 ? (
            <p>Kullanıcı bulunamadı.</p>
          ) : selectedTab === "adminAdd" ? (
            <div>
              <input
                type="text"
                placeholder="Yeni Admin Adı"
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Yeni Admin Şifresi"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                style={styles.input}
              />
              <button onClick={addAdmin} style={styles.button}>
                Admin Ekle
              </button>
              {admins.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Admin ID</th>
                      <th>Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.admin_id}>
                        <td>{admin.admin_id}</td>
                        <td>{admin.login}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Admin bulunamadı.</p>
              )}
            </div>
          ) : selectedTab === "otherManagement" && logs.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>User ID</th>
                  <th>Activity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.log_id}>
                    <td>{log.log_id}</td>
                    <td>{log.user_id}</td>
                    <td>{log.activity}</td>
                    <td>{log.log_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : selectedTab === "otherManagement" && logs.length === 0 ? (
            <p>Log bulunamadı.</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidePanel: {
    width: "200px",
    height: "100%",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    position: "fixed",
  },
  sideButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    borderBottom: "1px solid #555",
    transition: "background-color 0.3s, transform 0.2s",
  },
  sideButtonHover: {
    backgroundColor: "#555",
    transform: "scale(1.05)",
  },
  mainContent: {
    marginLeft: "220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingTop: "20px",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "3px",
    transition: "background-color 0.3s",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    margin: "10px 0",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default AdminHome;
