import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api"; // Adjust the path as needed
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "10px",
  },
}));

const CustomerDashboard = () => {
  const classes = useStyles();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [remainingQueue, setRemainingQueue] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQueueInfo = async () => {
      try {
        const response = await api.get(`/queue/info?email=${email}`); // Adjust the API endpoint as needed
        const queueData = response.data;

        // Assuming the response returns the remaining queue number
        setRemainingQueue(queueData.remainingQueue);

        // Calculate estimated time based on the environment variable
        const timePerCustomer = 5;
        const estimated = queueData.remainingQueue * timePerCustomer; // Estimated time in minutes
        setEstimatedTime(estimated);
      } catch (err) {
        setError("Failed to fetch queue information.");
        console.error("Error fetching queue info:", err);
      }
    };
    fetchQueueInfo();
    const intervalId = setInterval(fetchQueueInfo, 60000); // Fetch every 60 seconds
    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, [email]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h2 className={classes.title}>Queue Status</h2>
        <h4 className={classes.title}>{email}</h4>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className={classes.message}>Remaining Queue: {remainingQueue}</p>
        <p className={classes.message}>
          Estimated Time: {estimatedTime} minutes
        </p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
