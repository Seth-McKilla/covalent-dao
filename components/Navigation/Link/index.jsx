import { useRouter } from "next/router";
import { default as NextLink } from "next/link";
import _ from "lodash";

// Mui
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { useTheme, darken } from "@mui/material";

export default function Link({ title, icon }) {
  const {
    pathname,
    query: { daoName },
  } = useRouter();
  const currentRoute = pathname.split("/").pop();

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
    <NextLink href={`/${daoName}/${_.kebabCase(title)}`}>
      <a>
        <ListItem button alignItems="flex-start" sx={styles.item}>
          <Icon sx={{ marginRight: 1 }}>{icon}</Icon>
          <ListItemText primary={_.startCase(title)} />
        </ListItem>
      </a>
    </NextLink>
  );
}
