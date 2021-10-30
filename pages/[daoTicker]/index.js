import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import useSWR from "swr";
// import fetcher from "../../utils/fetcher";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green, red, grey } from "@mui/material/colors";

// Layout
import { DashboardLayout } from "../../layouts";

// Components
import { PieChart } from "../../components";

// DUMMY DATA
// @ Pie Chart
const data = [
  { name: "Positive 😊", value: 454, color: green[600] },
  { name: "Negative 😢", value: 261, color: red[600] },
  { name: "Neutral 😐", value: 97, color: grey[600] },
];

export default function DaoDashboard() {
  const {
    query: { daoTicker },
    isReady,
  } = useRouter();

  const dao = _.find(daoList, { contractTicker: _.toUpper(daoTicker) });

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
          {dao && (
            <div style={{ display: "flex" }}>
              <Image
                src={dao.logoUrl}
                height={50}
                width={50}
                alt={`${dao.contractName}-logo`}
              />
              <Typography variant="h4" align="left" ml={1}>
                {dao.contractName}
              </Typography>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <PieChart data={data} title="Sentiment Analysis" />
            </Grid>
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}
