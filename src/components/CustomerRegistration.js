import React, { useState } from "react";
import api from "../api";
import { CircularProgress, TextField, Button } from "@mui/material";
import useStyles from "./useStyles";

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("true");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setMessage("");
      const response = await api.post("/register", formData); // Update the route to match your backend
      setError("false");
      setMessage(
        `Registration successful. Your queue number is ${response.data.customer.queueNumber}.`
      );
      setFormData({ firstName: "", lastName: "", email: "" });
    } catch (error) {
      setError("true");
      console.log("Registration Error:", error.response.data || error.message); // Logs the error for debugging
      setMessage(
        error.response.data
          ? error.response.data.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Password Renewal Queuing Registration</h2>
        {message && (
          <p
            className={
              error !== "true" ? classes.successMessage : classes.errorMessage
            }
          >
            {message}
          </p>
        )}
        <TextField
          type="text"
          label="First Name"
          variant="outlined"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          style={{ marginBottom: "20px" }}
          fullWidth
        />
        <TextField
          type="text"
          label="Last Name"
          variant="outlined"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          style={{ marginBottom: "20px" }}
          fullWidth
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ marginBottom: "20px" }}
          fullWidth
        />
        {loading ? (
          <CircularProgress style={{ margin: "20px 0" }} />
        ) : (
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Register
          </Button>
        )}
      </form>
    </div>
  );
};

export default CustomerRegistration;
