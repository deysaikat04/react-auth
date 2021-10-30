import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertComponent = ({ open, setOpen, type, errorMsg }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={type}
        sx={{ width: "100%" }}
      >
        <span>{errorMsg ? errorMsg : "Network error!"}</span>
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
