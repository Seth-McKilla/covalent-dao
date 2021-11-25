// import { useState } from "react";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Hooks
import { web3Connect } from "../../web3";

export default function AppBar() {
  //   const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            DAOlytics
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => web3Connect()}
          >
            Connect
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
