import Link from "next/link";
// Mui
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// @ Icons
import DashboardIcon from "@mui/icons-material/Dashboard";

// Components
import NavLink from "./NavLink";

export default function Navigation({ open, handleDrawerToggle }) {
  const styles = {
    drawer: {
      backgroundColor: "#000",
      width: 240,
      height: "100%",
    },
  };

  const routes = [
    {
      title: "dashboard",
      icon: <DashboardIcon />,
    },
  ];

  const Links = () => {
    const listItems = routes.map((props, index) => (
      <NavLink key={`${props.title}-${index}`} {...props} />
    ));

    return (
      <Box sx={styles.drawer}>
        <Link href="/" passHref>
          <a>
            <Typography
              variant="h4"
              color="common.white"
              p={2}
              align="center"
              gutterBottom
            >
              DAOlytics
            </Typography>
          </a>
        </Link>
        <List>{listItems}</List>
      </Box>
    );
  };

  return (
    <Box>
      <Paper sx={{ display: { md: "none", xs: "block" } }}>
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Links />
        </Drawer>
      </Paper>
      <Paper sx={{ display: { xs: "none", sm: "block" } }}>
        <Drawer variant="permanent" open>
          <Links />
        </Drawer>
      </Paper>
    </Box>
  );
}
