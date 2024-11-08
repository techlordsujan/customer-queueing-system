import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import useStyles from "./useStyles";
import logo from "../assets/company_logo.png";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/login", credentials);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login Error:", err.response?.data || err.message); // Logs the error for debugging
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleLogin}>
        <h2 className={classes.title}>Queuing System: Admin Login</h2>
        <img src={logo} alt="Company Logo" className={classes.logo} />{" "}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth // Makes the text field take the full width of the form
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          style={{ marginBottom: "20px" }} // Changed to marginBottom for better spacing
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth // Makes the button take the full width of the form
        >
          Login
        </Button>
        {error && <p className={classes.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
