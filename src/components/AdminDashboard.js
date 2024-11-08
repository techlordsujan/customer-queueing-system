import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import api from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TableSortLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../assets/company_logo.png";

const useStyles = makeStyles(() => ({
  logo: {
    width: "150px", // Adjust width as needed
    margin: "20px auto",
    display: "block",
  },
}));

const AdminDashboard = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  const [queue, setQueue] = useState([]);
  const [filteredQueue, setFilteredQueue] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("queueNumber");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQueue(response.data);
        setFilteredQueue(response.data); // Initialize filtered queue
      } catch (err) {
        setMessage("Failed to load queue");
        console.error("Dashboard Error:", err.response?.data || err.message);
      }
    };
    fetchQueue();
  }, []);

  const markAsCompleted = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/admin/queue/${id}/complete`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update both `queue` and `filteredQueue` to reflect the completion
      setQueue((prevQueue) =>
        prevQueue.map((customer) =>
          customer._id === id ? { ...customer, status: "completed" } : customer
        )
      );
      setFilteredQueue((prevFilteredQueue) =>
        prevFilteredQueue.map((customer) =>
          customer._id === id ? { ...customer, status: "completed" } : customer
        )
      );
      setMessage("Customer marked as completed");
    } catch (error) {
      setMessage("Failed to mark as completed");
      console.error(
        "Mark as Completed Error:",
        error.response?.data || error.message
      );
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      queue.map((customer) => ({
        "First Name": customer.firstName,
        "Last Name": customer.lastName,
        Email: customer.email,
        "Queue Number": customer.queueNumber,
        Status: customer.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Queue");

    XLSX.writeFile(workbook, "Queue_List.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setFilteredQueue(
      queue.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(value) ||
          customer.lastName.toLowerCase().includes(value) ||
          customer.email.toLowerCase().includes(value)
      )
    );
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
    const sortedQueue = [...filteredQueue].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setFilteredQueue(sortedQueue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <img src={logo} alt="Company Logo" className={classes.logo} />{" "}
      <h4>Passport Renewal- Admin Dashboard</h4>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        style={{ marginBottom: "20px", float: "right" }}
      >
        Logout
      </Button>
      <Button
        onClick={exportToExcel}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Export
      </Button>
      {message && <p>{message}</p>}
      <TextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Queue Number</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "firstName"}
                  direction={sortDirection}
                  onClick={() => handleSort("firstName")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "lastName"}
                  direction={sortDirection}
                  onClick={() => handleSort("lastName")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQueue.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.queueNumber}</TableCell>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => markAsCompleted(customer._id)}
                    disabled={customer.status === "completed"}
                  >
                    {customer.status === "completed"
                      ? "Completed"
                      : "Mark as Completed"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
