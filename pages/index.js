import Head from "next/head";
import Image from "next/image";
import daoList from "../constants/daoList";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Layout
import { LandingLayout } from "../layouts";

// Components
import { DaoCard } from "../components";

export default function Home({ daos }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>Covalent DAO Dashboard</title>
        <meta name="description" content="DAO Analytics Dashboard" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div // Darken background image
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.50)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      />

      <Image
        src="/network.jpg"
        alt="network nodes"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <LandingLayout>
        <Grid item xs={12} align="center" sx={{ color: "#fff", zIndex: 10 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to DAO-lytics (?)
          </Typography>
          <Typography variant="h4" gutterBottom>
            {"<Insert brief project description here>"}
          </Typography>
          <Grid container spacing={2} mt={5}>
            {daos.length === 0
              ? "Error fetching DAOs"
              : daos.map((dao) => (
                  <Grid item xs={3} key={dao.contract_name}>
                    <DaoCard
                      name={dao.contract_name}
                      ticker={dao.contract_ticker_symbol}
                      price={dao.quote_rate}
                      address={dao.contract_address}
                      imgUrl={dao.logo_url}
                    />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </LandingLayout>
    </div>
  );
}

export async function getServerSideProps() {
  const daoNames = [];
  const daoTickers = [];
  daoList.map(({ contractName, contractTicker }) => {
    daoNames.push(contractName);
    daoTickers.push(contractTicker);
  });

  let daos = [];

  const res = await fetch(
    `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${daoTickers.toString()}&key=${
      process.env.COVALENT_API_KEY
    }`
  );
  const { data } = await res.json();

  if (!data) return { props: {} };

  // Remove duplicate tickers
  daos = data.items.filter(({ contract_name }) =>
    daoNames.includes(contract_name)
  );

  return { props: { daos } };
}
