import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) return;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Enter valid username or password ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>☕ Welcome to Bandhan Cafe</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    borderRadius: "10px",
    textAlign: "center",
  },
  input: {
    display: "block",
    margin: "10px",
    padding: "10px",
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    background: "#3498db",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;