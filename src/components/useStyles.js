// useStyles.js
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px", // Limits the form width
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginTop: "10px",
  },
}));

export default useStyles;
