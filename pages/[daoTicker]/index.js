import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import JSONPretty from "react-json-pretty";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Layout
import { DashboardLayout } from "../../layouts";

export default function DaoDashboard() {
  const {
    query: { daoTicker },
    isReady,
  } = useRouter();

  const dao = _.find(daoList, { contractTicker: _.toUpper(daoTicker) });

  const { data, error } = useSWR(
    isReady && `/api/token-holders/${daoTicker}`,
    fetcher,
    { refreshInterval: 30 * 1000 }
  );

  const renderData = () => {
    if (error) return "Failed to load.";
    if (!data) return "Loading...";
    return data;
  };

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

        <Grid item xs={12} component={Paper}>
          <JSONPretty
            id="json-pretty"
            data={renderData()}
            theme={{
              main: "line-height:1.3;color:#66d9ef;",
              error: "line-height:1.3;color:#66d9ef;",
              key: "color:#f92672;",
              string: "color:#fd971f;",
              value: "color:#a6e22e;",
              boolean: "color:#ac81fe;",
            }}
          />
        </Grid>
      </DashboardLayout>
    </div>
  );
}
