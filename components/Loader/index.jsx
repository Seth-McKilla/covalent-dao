// Mui
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "65vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Typography variant="h5">Fetching analytics...</Typography>
    </Box>
  );
}
