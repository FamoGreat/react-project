import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://174.138.186.155:700/api/Account/login",
        { username, password },
        { withCredentials: true }
      );
      login(response.data.user, response.data.accessToken); // Store in memory
      alert("Logged in successfully");
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
