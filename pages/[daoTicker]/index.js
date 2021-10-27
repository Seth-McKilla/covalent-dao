import { useContext } from "react";
import { Context } from "../../context";
import Head from "next/head";
import Image from "next/image";
import daoList from "../../constants/daoList";
import _ from "lodash";
import JSONPretty from "react-json-pretty";

// Mui
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Layout
import { DashboardLayout } from "../../layouts";

export default function DaoDashboard({ tokenHolders }) {
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

        <Grid item xs={12} component={Paper}>
          <JSONPretty
            id="json-pretty"
            data={tokenHolders}
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

export async function getServerSideProps(ctx) {
  const { daoTicker } = ctx.params;
  const dao = _.find(daoList, { contractTicker: _.toUpper(daoTicker) });
  let tokenHolders = [];

  const res = await fetch(
    `https://api.covalenthq.com/v1/${dao.chainId}/tokens/${dao.contractAddress}/token_holders/?key=${process.env.COVALENT_API_KEY}`
  );
  const { data } = await res.json();

  if (!data) return { props: {} };
  tokenHolders = [...data.items];

  return { props: { tokenHolders } };
}
