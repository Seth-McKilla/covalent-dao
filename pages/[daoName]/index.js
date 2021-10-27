import { useContext } from "react";
import { Context } from "../../context";
import Head from "next/head";
import Image from "next/image";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
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
      </DashboardLayout>
    </div>
  );
}

export async function getStaticProps() {
  const chainId = "1";
  const address = "0x3472A5A71965499acd81997a54BBA8D852C6E53d";
  let tokenHolders = [];

  const res = await fetch(
    `https://api.covalenthq.com/v1/1/tokens/${address}/token_holders/?key=${process.env.COVALENT_API_KEY}`
  );
  const data = await res.json();
  console.log(data);

  if (!data) return { props: {} };

  return { props: { tokenHolders } };
}

export async function getStaticPaths() {
  return {
    paths: ["/uniswap"],
    fallback: true,
  };
}
