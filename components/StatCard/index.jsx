// Mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

export default function StatCard({ title, value, valueColor, Icon }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const styles = {
    container: {
      marginTop: 6,
    },
    icon: {
      position: "absolute",
      padding: 3,
      borderRadius: "5%",
      boxShadow: `0 0 20px 2px ${secondaryColor}`,
      marginTop: -6,
      marginLeft: 2,
      backgroundColor: primaryColor,
      color: "#fff",
      fontSize: "6rem",
    },
    header: {
      marginTop: 8,
    },
  };

  return (
    <Card elevation={10} sx={styles.container}>
      <Icon sx={styles.icon} />
      <CardHeader title={title} sx={styles.header} />
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color={valueColor}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
