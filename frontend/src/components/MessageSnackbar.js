import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function MessageSnackbar(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={props.open}>
        <Alert
          style={{ fontSize: 15 }}
          severity={props.severity}
          action={<IconButton aria-label="close" size="small"></IconButton>}
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
