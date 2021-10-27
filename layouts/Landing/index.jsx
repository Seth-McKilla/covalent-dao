// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Landing({ children }) {
  return (
    <Container sx={{ height: "100vh" }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        {children}
      </Grid>
    </Container>
  );
}
