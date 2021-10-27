import { useContext } from "react";
import { Context } from "../../context";
import Head from "next/head";
import Image from "next/image";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Layout
import { DashboardLayout } from "../../layouts";

export default function DaoDashboard() {
  const {
    state: { info },
  } = useContext(Context);

  return (
    <div>
      <Head>
        <title>Covalent DAO Dashboard</title>
        <meta name="description" content="DAO Analytics Dashboard" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardLayout>
        <Grid item xs={12}>
          {info && (
            <div style={{ display: "flex" }}>
              <Image
                src={info.imgUrl}
                height={50}
                width={50}
                alt={`${info.name}-logo`}
              />
              <Typography variant="h4" align="left" ml={1}>
                {info.name}
              </Typography>
            </div>
          )}
        </Grid>
      </DashboardLayout>
    </div>
  );
}
