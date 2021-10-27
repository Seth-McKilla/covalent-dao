import { useState } from "react";

// Mui
import Grid from "@mui/material/Grid";

// Components
import { Navigation } from "../../components";

export default function Dashboard({ children, ...rest }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Navigation
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />
      <Grid container spacing={2} pl={!mobileOpen && 32} pt={2}>
        {children}
      </Grid>
    </div>
  );
}
