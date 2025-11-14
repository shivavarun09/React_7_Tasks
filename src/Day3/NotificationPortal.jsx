import React from "react";
import ReactDOM from "react-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function NotificationPortal({ open, message, onClose }) {
  const portalRoot = document.getElementById("portal-root");

  return ReactDOM.createPortal(
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "middle" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>,
    portalRoot
  );
}
