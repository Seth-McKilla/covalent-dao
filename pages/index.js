import Head from "next/head";
//import Link from "next/link";
//import Image from "next/image";
import daoList from "../constants/daoList";

import { Box, useColorModeValue } from "@chakra-ui/react";

// Mui
//import Box from "@mui/material/Box";
//import Grid from "@mui/material/Grid";
//import Typography from "@mui/material/Typography";

// Layout
import { LandingLayout } from "../layouts";

// Components
import { DaoCard } from "../components";
import Sidebar from "../components/SideBar/sidebar.jsx";

export default function Home({ daos }) {
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

      <Sidebar />

      {/* <LandingLayout>
        <Box item xs={12} align="center" bg={useColorModeValue("white", "gray.800")} sx={{ color: "#fff", zIndex: 10 }}>
          <Box container spacing={2} mt={5}>
            {daos.length === 0
              ? "Error fetching DAOs"
              : daos.map((dao) => (
                  <Box item xs={3} key={dao.contract_name}>
                    <DaoCard
                      name={dao.contract_name}
                      ticker={dao.contract_ticker_symbol}
                      price={dao.quote_rate}
                      address={dao.contract_address}
                      imgUrl={dao.logo_url}
                    />
                  </Box>
                ))}
          </Box>
        </Box>
      </LandingLayout>  */}
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
