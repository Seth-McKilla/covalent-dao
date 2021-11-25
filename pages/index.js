import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import daoList from "../constants/daoList";

// Mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Layout
import { LandingLayout } from "../layouts";

// Components
import { BgImage, DaoCard } from "../components";

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

      <BgImage />

      <LandingLayout>
        <Grid item xs={12} align="center" sx={{ color: "#fff", zIndex: 10 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to DAOlytics
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Typography variant="h4" mr={2}>
              The DAO Analytics Dashboard powered by
            </Typography>
            <Link href="https://www.covalenthq.com/" passHref>
              <a>
                <Image
                  src="https://www.covalenthq.com/static/images/covalent-logo-tri.svg"
                  height={50}
                  width={200}
                  alt="Covalent-logo"
                />
              </a>
            </Link>
          </Box>
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
