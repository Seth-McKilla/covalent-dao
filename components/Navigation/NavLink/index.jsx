import { useRouter } from "next/router";
import _ from "lodash";

// Mui
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { useTheme, darken } from "@mui/material";

export default function NavLink({ title, icon }) {
  const { pathname } = useRouter();
  let currentRoute = pathname.split("/").pop();
  if (currentRoute === "[contractAddress]") currentRoute = "dashboard";

  const isCurrentRoute = title === currentRoute;
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const styles = {
    item: {
      color: "#fff",
      backgroundColor: isCurrentRoute && primaryColor,
      "&:hover": {
        backgroundColor: isCurrentRoute && darken(primaryColor, 0.3),
      },
    },
  };

  return (
    <ListItem button alignItems="flex-start" sx={styles.item}>
      <Icon sx={{ marginRight: 1 }}>{icon}</Icon>
      <ListItemText primary={_.startCase(title)} />
    </ListItem>
  );
}
