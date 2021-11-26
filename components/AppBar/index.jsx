import { useCallback, useEffect, useContext } from "react";
import { Context } from "../../context";
import web3Modal from "../../web3";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AppBar() {
  const { state, dispatch } = useContext(Context);
  console.log(state);

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
