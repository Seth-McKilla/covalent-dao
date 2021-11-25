// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Components
import { AppBar } from "../../components";

export default function Landing({ children }) {
  return (
    <>
      <AppBar />
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
    </>
  );
}
